import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { student_id, status, graduation_year } = body;

    if (!student_id || !status) {
      return NextResponse.json(
        { success: false, error: "student_id and status are required" },
        { status: 400 }
      );
    }

    const normalizedStatus = String(status).trim().toLowerCase();
    if (!["active", "graduated"].includes(normalizedStatus)) {
      return NextResponse.json(
        { success: false, error: "status must be either 'active' or 'graduated'" },
        { status: 400 }
      );
    }

    const students = await executeQuery("SELECT id FROM students WHERE student_id = ? LIMIT 1", [
      student_id,
    ]);

    if (students.length === 0) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }

    if (normalizedStatus === "graduated") {
      const year = Number(graduation_year);
      if (!Number.isInteger(year) || year < 1900 || year > 3000) {
        return NextResponse.json(
          { success: false, error: "Valid graduation_year is required for graduated status" },
          { status: 400 }
        );
      }

      await executeQuery(
        `
          UPDATE students
          SET status = 'graduated', graduation_year = ?
          WHERE student_id = ?
        `,
        [year, String(student_id).trim()]
      );
    } else {
      await executeQuery(
        `
          UPDATE students
          SET status = 'active'
          WHERE student_id = ?
        `,
        [String(student_id).trim()]
      );
    }

    return NextResponse.json(
      { success: true, message: "Student status updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update student status API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
