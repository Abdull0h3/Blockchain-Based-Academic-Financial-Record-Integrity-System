import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { contract, ensureContractIsDeployed } from "../../lib/blockchain";
import { executeQuery } from "../../lib/db";

export const runtime = "nodejs";

function toDateOnlyString(value) {
  if (!value) {
    return null;
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toISOString().slice(0, 10);
}

function toGraduationYear(value) {
  if (!value) {
    return null;
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return String(date.getUTCFullYear());
}

export async function POST(request) {
  try {
    await ensureContractIsDeployed();

    const body = await request.json();
    const { studentId } = body;

    if (!studentId) {
      return NextResponse.json(
        { success: false, error: "studentId is required" },
        { status: 400 }
      );
    }

    const normalizedStudentId = String(studentId).trim();
    const certificateRows = await executeQuery(
      `
        SELECT
          student_id,
          full_name,
          program,
          cgpa,
          graduation_date,
          document_hash,
          blockchain_tx_hash,
          is_revoked,
          issued_at
        FROM certificates
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `,
      [normalizedStudentId]
    );

    if (certificateRows.length === 0) {
      return NextResponse.json(
        { success: false, error: "Certificate not found in database" },
        { status: 404 }
      );
    }

    const certificate = certificateRows[0];
    if (!("full_name" in certificate) || !("program" in certificate)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Certificates schema must include full_name and program columns for immutable verification",
        },
        { status: 500 }
      );
    }

    let blockchainRecord;
    try {
      blockchainRecord = await contract.verifyRecord(normalizedStudentId);
    } catch (error) {
      const message = error.shortMessage || error.message || "Blockchain lookup failed";
      const isNotFound = message.includes("Record not found") || message.includes("BAD_DATA");
      if (isNotFound) {
        return NextResponse.json(
          { success: false, error: "Record not found on blockchain" },
          { status: 404 }
        );
      }
      throw error;
    }

    const graduationDate = toDateOnlyString(certificate.graduation_date);
    const graduationYear = toGraduationYear(certificate.graduation_date);
    const cgpaFormatted = Number(certificate.cgpa).toFixed(2);

    // Primary canonical format (must match issuance logic exactly):
    // `${studentId}|${fullName}|${program}|${cgpa.toFixed(2)}|${graduationYear}`
    const canonical = `${certificate.student_id}|${certificate.full_name}|${certificate.program}|${cgpaFormatted}|${graduationYear}`;
    const recalculatedHash = createHash("sha256").update(canonical).digest("hex");

    // Backward-compatible fallback if any old issuance used graduation_date directly.
    const legacyCanonical = `${certificate.student_id}|${certificate.full_name}|${certificate.program}|${cgpaFormatted}|${graduationDate}`;
    const legacyRecalculatedHash = createHash("sha256").update(legacyCanonical).digest("hex");

    const integrityValid =
      recalculatedHash === blockchainRecord.documentHash ||
      legacyRecalculatedHash === blockchainRecord.documentHash;
    const issueTimestamp = blockchainRecord.timestamp.toString();
    const isRevoked = Boolean(certificate.is_revoked) || !blockchainRecord.isValid;

    return NextResponse.json({
      studentId: certificate.student_id,
      fullName: certificate.full_name,
      program: certificate.program,
      cgpa: certificate.cgpa,
      graduationDate,
      issuer: blockchainRecord.issuer,
      issueTimestamp,
      isRevoked,
      blockchainHash: blockchainRecord.documentHash,
      recalculatedHash,
      integrityValid,
    });
  } catch (error) {
    console.error("Verify API error:", error);

    return NextResponse.json(
      { success: false, error: error.shortMessage || error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
