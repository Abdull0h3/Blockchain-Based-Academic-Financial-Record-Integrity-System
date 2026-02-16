import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export const runtime = "nodejs";

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

function calculateCgpa(rows) {
  let weighted = 0;
  let totalCredits = 0;

  for (const row of rows) {
    const credits = Number(row.credit_hours || 0);
    const point = gradeToPoint(row.grade);
    if (credits > 0 && Number.isFinite(point)) {
      weighted += point * credits;
      totalCredits += credits;
    }
  }

  if (totalCredits === 0) {
    return 0;
  }

  return Number((weighted / totalCredits).toFixed(2));
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");

    if (!studentId) {
      return NextResponse.json({ success: false, error: "studentId is required" }, { status: 400 });
    }

    const students = await executeQuery(
      `
        SELECT student_id, full_name, email, program, enrollment_year, graduation_year, status
        FROM students
        WHERE student_id = ?
        LIMIT 1
      `,
      [studentId]
    );

    if (students.length === 0) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }

    const courses = await executeQuery(
      `
        SELECT
          sc.course_code,
          c.course_name,
          c.credit_hours,
          sc.grade,
          sc.semester,
          sc.year
        FROM student_courses sc
        INNER JOIN courses c ON c.course_code = sc.course_code
        WHERE sc.student_id = ?
        ORDER BY sc.year, sc.semester
      `,
      [studentId]
    );

    const activities = await executeQuery(
      `
        SELECT a.activity_name, a.description, sa.participation_date
        FROM student_activities sa
        INNER JOIN activities a ON a.id = sa.activity_id
        WHERE sa.student_id = ?
        ORDER BY sa.participation_date DESC
      `,
      [studentId]
    );

    const financial = await executeQuery(
      `
        SELECT tuition_paid, clearance_approved, updated_at
        FROM financial_records
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `,
      [studentId]
    );

    const certificates = await executeQuery(
      `
        SELECT document_hash, blockchain_tx_hash, contract_address, is_revoked, issued_at
        FROM certificates
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `,
      [studentId]
    );

    const student = students[0];
    const certificate = certificates[0] || null;

    return NextResponse.json(
      {
        success: true,
        data: {
          student: {
            studentId: student.student_id,
            fullName: student.full_name,
            email: student.email,
            program: student.program,
            enrollmentYear: student.enrollment_year,
            graduationYear: student.graduation_year,
            status: student.status,
          },
          courses,
          cgpa: calculateCgpa(courses),
          activities,
          financial: financial[0] || {
            tuition_paid: false,
            clearance_approved: false,
            updated_at: null,
          },
          certificate: certificate
            ? {
                issued: true,
                documentHash: certificate.document_hash,
                blockchainTxHash: certificate.blockchain_tx_hash,
                contractAddress: certificate.contract_address,
                status: certificate.is_revoked ? "Revoked" : "Valid",
                issuedAt: certificate.issued_at,
              }
            : { issued: false },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Student summary API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
