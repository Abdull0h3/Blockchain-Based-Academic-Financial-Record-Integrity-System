// POST /api/verify
// Verifies a student's record from the blockchain.
//
// Flow:
// 1. Read the on-chain record via verifyRecord(studentId).
// 2. Return the record as JSON.
// 3. If no record or it has been revoked, return a clear message.

import { NextResponse } from "next/server";
import { getAcademicRecordsContract } from "../../../lib/blockchain";

export async function POST(request) {
  try {
    const body = await request.json();
    const { studentId } = body || {};

    if (!studentId) {
      return NextResponse.json(
        { error: "studentId is required" },
        { status: 400 }
      );
    }

    const contract = getAcademicRecordsContract();
    const record = await contract.verifyRecord(studentId);

    // In Solidity, if a struct was never set, fields will be default values.
    const exists = record.timestamp !== 0n;
    const isValid = exists && record.isValid;

    if (!exists) {
      return NextResponse.json(
        {
          exists: false,
          isValid: false,
          message: "No on-chain record found for this studentId",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        exists: true,
        isValid,
        studentId: record.studentId,
        documentHash: record.documentHash,
        issuer: record.issuer,
        // Convert bigint timestamp (seconds) to ISO string on the server.
        timestamp: new Date(Number(record.timestamp) * 1000).toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/verify:", error);
    return NextResponse.json(
      {
        error: "Failed to verify record",
        details: error.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

