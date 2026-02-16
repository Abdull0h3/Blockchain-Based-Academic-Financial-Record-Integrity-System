import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { student_id, tuition_paid = true, clearance_approved = true } = body;

    if (!student_id) {
      return NextResponse.json({ success: false, error: "student_id is required" }, { status: 400 });
    }

    const studentExists = await executeQuery("SELECT id FROM students WHERE student_id = ? LIMIT 1", [
      student_id,
    ]);
    if (studentExists.length === 0) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }

    const existing = await executeQuery(
      `
        SELECT id
        FROM financial_records
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `,
      [student_id]
    );

    if (existing.length > 0) {
      await executeQuery(
        `
          UPDATE financial_records
          SET tuition_paid = ?, clearance_approved = ?
          WHERE id = ?
        `,
        [Boolean(tuition_paid), Boolean(clearance_approved), existing[0].id]
      );
    } else {
      await executeQuery(
        `
          INSERT INTO financial_records (student_id, tuition_paid, clearance_approved)
          VALUES (?, ?, ?)
        `,
        [String(student_id).trim(), Boolean(tuition_paid), Boolean(clearance_approved)]
      );
    }

    return NextResponse.json(
      { success: true, message: "Financial clearance updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Approve clearance API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
