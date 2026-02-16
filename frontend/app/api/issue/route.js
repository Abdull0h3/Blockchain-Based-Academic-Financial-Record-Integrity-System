import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { executeQuery, getPool } from "../../lib/db";
import { contract, ensureContractIsDeployed } from "../../lib/blockchain";

export const runtime = "nodejs";

async function insertStudentRecord({ studentId, name, program, certificateHash }) {
  const pool = await getPool();
  const [columns] = await pool.query("SHOW COLUMNS FROM students");
  const columnSet = new Set(columns.map((column) => String(column.Field).toLowerCase()));

  const nameColumn = columnSet.has("full_name")
    ? "full_name"
    : columnSet.has("name")
      ? "name"
      : null;

  if (!nameColumn) {
    throw new Error("students table must contain either 'name' or 'full_name' column");
  }

  if (!columnSet.has("student_id") || !columnSet.has("program")) {
    throw new Error("students table must contain 'student_id' and 'program' columns");
  }

  const insertColumns = ["student_id", nameColumn, "program"];
  const insertValues = [studentId, name, program];

  if (columnSet.has("certificate_hash")) {
    insertColumns.push("certificate_hash");
    insertValues.push(certificateHash);
  }

  const placeholders = insertColumns.map(() => "?").join(", ");
  const sql = `INSERT INTO students (${insertColumns.join(", ")}) VALUES (${placeholders})`;

  await executeQuery(sql, insertValues);
}

export async function POST(request) {
  try {
    await ensureContractIsDeployed();

    const body = await request.json();
    const { studentId, name, program, certificateData } = body;

    if (!studentId || !name || !program || !certificateData) {
      return NextResponse.json(
        { success: false, error: "studentId, name, program, and certificateData are required" },
        { status: 400 }
      );
    }

    // Hashing guarantees integrity: if the original certificate data changes,
    // its SHA-256 hash changes, so tampering is detectable.
    const certificateHash = createHash("sha256")
      .update(String(certificateData))
      .digest("hex");

    await insertStudentRecord({ studentId, name, program, certificateHash });

    // Blockchain write gives immutability: once mined, this transaction
    // history cannot be altered without rewriting chain consensus history.
    const tx = await contract.issueRecord(studentId, certificateHash, "University");
    const receipt = await tx.wait();

    return NextResponse.json(
      {
        success: true,
        message: "Record issued successfully",
        studentId,
        certificateHash,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Issue API error:", error);
    return NextResponse.json(
      { success: false, error: error.shortMessage || error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
