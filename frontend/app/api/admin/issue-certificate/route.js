import { NextResponse } from "next/server";
import { createHash } from "crypto";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { getPool } from "../../../lib/db";
import { contract, ensureContractIsDeployed } from "../../../lib/blockchain";

export const runtime = "nodejs";

async function getTableColumns(connection, tableName) {
  const [rows] = await connection.execute(`SHOW COLUMNS FROM ${tableName}`);
  return new Set(rows.map((row) => String(row.Field).toLowerCase()));
}

function normalizeStatus(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function gradeToPoint(grade) {
  const map = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };

  return map[String(grade || "").toUpperCase()];
}

function calculateCgpa(courses) {
  let totalWeightedPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    const creditHours = Number(course.credit_hours ?? 0);
    const gradePointFromRow = Number(course.grade_point);
    const derivedGradePoint = Number.isFinite(gradePointFromRow)
      ? gradePointFromRow
      : gradeToPoint(course.grade);

    if (creditHours > 0 && Number.isFinite(derivedGradePoint)) {
      totalWeightedPoints += derivedGradePoint * creditHours;
      totalCredits += creditHours;
    }
  }

  if (totalCredits === 0) {
    return null;
  }

  return Number((totalWeightedPoints / totalCredits).toFixed(2));
}

function resolvePdfFontPath() {
  const candidates = [
    process.env.PDF_FONT_PATH,
    "C:\\Windows\\Fonts\\arial.ttf",
    "C:\\Windows\\Fonts\\calibri.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
  ].filter(Boolean);

  return candidates.find((candidate) => fs.existsSync(candidate)) || null;
}

async function writePdf({ studentId, fullName, program, cgpa, graduationYear }) {
  const safeStudentId = String(studentId).replace(/[^a-zA-Z0-9_-]/g, "_");
  const certificatesDir = path.join(process.cwd(), "public", "uploads", "certificates");
  const fileName = `${safeStudentId}.pdf`;
  const absolutePath = path.join(certificatesDir, fileName);
  const publicPath = `/uploads/certificates/${fileName}`;

  await fs.promises.mkdir(certificatesDir, { recursive: true });

  const verificationUrl = `http://localhost:3000/verify/${encodeURIComponent(studentId)}`;
  const qrDataUrl = await QRCode.toDataURL(verificationUrl);
  const qrBuffer = Buffer.from(qrDataUrl.split(",")[1], "base64");
  const fontPath = resolvePdfFontPath();

  await new Promise((resolve, reject) => {
    // Use a real TTF font file to avoid runtime lookup issues for bundled AFM files.
    const doc = new PDFDocument({ size: "A4", margin: 50, font: fontPath || undefined });
    const stream = fs.createWriteStream(absolutePath);

    stream.on("finish", resolve);
    stream.on("error", reject);
    doc.on("error", reject);
    doc.pipe(stream);

    doc.fontSize(24).text("University Academic Certificate", { align: "center" });
    doc.moveDown(1.5);
    doc.fontSize(14).text(`Student Name: ${fullName}`);
    doc.text(`Student ID: ${studentId}`);
    doc.text(`Program: ${program}`);
    doc.text(`CGPA: ${cgpa.toFixed(2)}`);
    doc.text(`Graduation Year: ${graduationYear}`);
    doc.moveDown(1.5);
    doc.fontSize(11).text("Scan QR to verify certificate:", { align: "left" });
    doc.image(qrBuffer, { fit: [120, 120] });
    doc.moveDown();
    doc.fontSize(10).fillColor("gray").text(verificationUrl);
    doc.end();
  });

  return publicPath;
}

async function isAlreadyIssuedOnChain(studentId) {
  try {
    const record = await contract.verifyRecord(studentId);
    return Boolean(record?.timestamp && record.timestamp.toString() !== "0");
  } catch (_error) {
    // verifyRecord reverts when record does not exist
    return false;
  }
}

export async function POST(request) {
  let connection;

  try {
    await ensureContractIsDeployed();
    const body = await request.json();
    const { studentId } = body;

    if (!studentId || !String(studentId).trim()) {
      return NextResponse.json({ success: false, error: "studentId is required" }, { status: 400 });
    }

    const normalizedStudentId = String(studentId).trim();
    const pool = await getPool();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [students] = await connection.execute(
      `
        SELECT
          s.student_id,
          s.full_name,
          s.program,
          s.graduation_year,
          s.status,
          COALESCE(fr.clearance_approved, 0) AS financial_clearance,
          COALESCE(GROUP_CONCAT(a.activity_name ORDER BY a.activity_name SEPARATOR ', '), '') AS activities_summary
        FROM students s
        LEFT JOIN financial_records fr ON fr.student_id = s.student_id
        LEFT JOIN student_activities sa ON sa.student_id = s.student_id
        LEFT JOIN activities a ON a.id = sa.activity_id
        WHERE s.student_id = ?
        GROUP BY
          s.student_id, s.full_name, s.program, s.graduation_year, s.status, fr.clearance_approved
        LIMIT 1
      `,
      [normalizedStudentId]
    );

    if (students.length === 0) {
      await connection.rollback();
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }

    const student = students[0];
    const status = normalizeStatus(student.status);
    if (status !== "graduated") {
      await connection.rollback();
      return NextResponse.json(
        { success: false, error: "Student is not eligible: status must be graduated" },
        { status: 400 }
      );
    }

    if (!Boolean(student.financial_clearance)) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, error: "Financial clearance is not approved" },
        { status: 400 }
      );
    }

    const [existingCertificates] = await connection.execute(
      `
        SELECT id, is_revoked
        FROM certificates
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `,
      [normalizedStudentId]
    );

    if (existingCertificates.length > 0) {
      const existing = existingCertificates[0];
      if (Boolean(existing.is_revoked)) {
        await connection.rollback();
        return NextResponse.json(
          { success: false, error: "Cannot issue certificate again for a revoked record" },
          { status: 400 }
        );
      }

      await connection.rollback();
      return NextResponse.json(
        { success: false, error: "Certificate already issued for this student" },
        { status: 409 }
      );
    }

    const [courses] = await connection.execute(
      `
        SELECT sc.grade, c.credit_hours
        FROM student_courses sc
        INNER JOIN courses c ON c.course_code = sc.course_code
        WHERE sc.student_id = ?
      `,
      [normalizedStudentId]
    );

    const cgpa = calculateCgpa(courses);
    if (cgpa === null) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, error: "Unable to calculate CGPA from student_courses" },
        { status: 400 }
      );
    }

    const graduationYear = Number(student.graduation_year);
    const graduationDate = Number.isFinite(graduationYear)
      ? `${graduationYear}-06-30`
      : new Date().toISOString().slice(0, 10);

    const academicString = `${normalizedStudentId}|${student.full_name}|${student.program}|${cgpa.toFixed(2)}|${student.graduation_year}`;
    const documentHash = createHash("sha256").update(academicString).digest("hex");

    const onChainExists = await isAlreadyIssuedOnChain(normalizedStudentId);
    if (onChainExists) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, error: "Certificate already exists on blockchain for this student" },
        { status: 409 }
      );
    }

    const tx = await contract.issueRecord(normalizedStudentId, documentHash, "University");
    const receipt = await tx.wait();

    const pdfPath = await writePdf({
      studentId: normalizedStudentId,
      fullName: student.full_name,
      program: student.program,
      cgpa,
      graduationYear: student.graduation_year,
    });

    const certificateColumns = await getTableColumns(connection, "certificates");
    const insertColumns = ["student_id"];
    const insertParams = [normalizedStudentId];
    const valueTokens = ["?"];

    // Snapshot issuance-time academic fields to support tamper detection later.
    if (certificateColumns.has("full_name")) {
      insertColumns.push("full_name");
      valueTokens.push("?");
      insertParams.push(student.full_name);
    }
    if (certificateColumns.has("program")) {
      insertColumns.push("program");
      valueTokens.push("?");
      insertParams.push(student.program);
    }

    insertColumns.push("cgpa");
    valueTokens.push("?");
    insertParams.push(cgpa);

    insertColumns.push("graduation_date");
    valueTokens.push("?");
    insertParams.push(graduationDate);

    insertColumns.push("document_hash");
    valueTokens.push("?");
    insertParams.push(documentHash);

    insertColumns.push("contract_address");
    valueTokens.push("?");
    insertParams.push(process.env.CONTRACT_ADDRESS);

    insertColumns.push("issued_at");
    valueTokens.push("NOW()");

    insertColumns.push("blockchain_tx_hash");
    valueTokens.push("?");
    insertParams.push(receipt.hash);

    insertColumns.push("is_revoked");
    valueTokens.push("0");

    // Optional column for storing generated certificate path if the schema has it.
    if (certificateColumns.has("pdf_path")) {
      insertColumns.push("pdf_path");
      valueTokens.push("?");
      insertParams.push(pdfPath);
    }

    const [result] = await connection.execute(
      `
        INSERT INTO certificates (${insertColumns.join(", ")})
        VALUES (${valueTokens.join(", ")})
      `,
      insertParams
    );

    await connection.commit();

    return NextResponse.json(
      {
        success: true,
        message: "Certificate issued successfully",
        certificateId: result.insertId,
        studentId: normalizedStudentId,
        cgpa,
        documentHash,
        blockchainTxHash: receipt.hash,
        pdfPath,
        activitiesSummary: student.activities_summary,
      },
      { status: 201 }
    );
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
    }

    console.error("Admin issue-certificate error:", error);
    return NextResponse.json(
      { success: false, error: error.shortMessage || error.message || "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
