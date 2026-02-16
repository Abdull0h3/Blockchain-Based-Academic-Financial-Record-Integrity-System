import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { full_name, student_id, email, program, enrollment_year } = body;

    if (!full_name || !student_id || !program || !enrollment_year) {
      return NextResponse.json(
        { success: false, error: "full_name, student_id, program, enrollment_year are required" },
        { status: 400 }
      );
    }

    const existing = await executeQuery("SELECT id FROM students WHERE student_id = ? LIMIT 1", [
      student_id,
    ]);
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Student ID already exists" },
        { status: 409 }
      );
    }

    await executeQuery(
      `
        INSERT INTO students (
          full_name, student_id, email, program, enrollment_year
        ) VALUES (?, ?, ?, ?, ?)
      `,
      [String(full_name).trim(), String(student_id).trim(), email || null, String(program).trim(), Number(enrollment_year)]
    );

    return NextResponse.json({ success: true, message: "Student created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Create student API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
