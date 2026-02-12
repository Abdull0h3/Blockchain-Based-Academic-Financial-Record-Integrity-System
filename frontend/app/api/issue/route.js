// POST /api/issue
// Issues a new academic record for a student.
//
// Flow:
// 1. Hash the provided certificateData using SHA-256 (integrity guarantee).
// 2. Store student metadata + hash in MySQL.
// 3. Call the AcademicRecords smart contract to issueRecord(...) on chain.
//
// The frontend NEVER sees the private key or calls the contract directly.

import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSqlPool } from "../../../lib/db";
import { getAcademicRecordsContract } from "../../../lib/blockchain";

export async function POST(request) {
  try {
    const body = await request.json();
    const { studentId, name, program, certificateData } = body || {};

    if (!studentId || !name || !program || !certificateData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Hash the certificate data.
    // Any single-bit change in certificateData will drastically change this hash,
    // so comparing hashes later proves whether the data was tampered with.
    const certificateHash = crypto
      .createHash("sha256")
      .update(certificateData)
      .digest("hex");

    // 2. Store in SQL Server.
    // Parameterized query prevents SQL injection and works well with SQL Server.
    const pool = await getSqlPool();
    const insertSql = `
      INSERT INTO students (student_id, name, program, certificate_hash)
      VALUES (@studentId, @name, @program, @certificateHash)
    `;
    await pool
      .request()
      .input("studentId", studentId)
      .input("name", name)
      .input("program", program)
      .input("certificateHash", certificateHash)
      .query(insertSql);

    // 3. Call smart contract issueRecord.
    const contract = getAcademicRecordsContract();
    const tx = await contract.issueRecord(
      studentId,
      certificateHash,
      "University Registrar"
    );

    // Wait for the transaction to be mined.
    const receipt = await tx.wait();

    return NextResponse.json(
      {
        success: true,
        studentId,
        certificateHash,
        transactionHash: receipt.transactionHash,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/issue:", error);
    return NextResponse.json(
      {
        error: "Failed to issue record",
        details: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

