import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { student_id, activity_name, description, participation_date } = body;

    if (!student_id || !activity_name) {
      return NextResponse.json(
        { success: false, error: "student_id and activity_name are required" },
        { status: 400 }
      );
    }

    const studentExists = await executeQuery("SELECT id FROM students WHERE student_id = ? LIMIT 1", [
      student_id,
    ]);
    if (studentExists.length === 0) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }

    const existingActivity = await executeQuery(
      "SELECT id FROM activities WHERE activity_name = ? LIMIT 1",
      [activity_name]
    );

    let activityId;
    if (existingActivity.length > 0) {
      activityId = existingActivity[0].id;
    } else {
      const insert = await executeQuery(
        "INSERT INTO activities (activity_name, description) VALUES (?, ?)",
        [String(activity_name).trim(), description || null]
      );
      activityId = insert.insertId;
    }

    const participationDate = participation_date || null;
    const duplicate = await executeQuery(
      `
        SELECT id
        FROM student_activities
        WHERE student_id = ? AND activity_id = ? AND participation_date <=> ?
        LIMIT 1
      `,
      [student_id, activityId, participationDate]
    );

    if (duplicate.length > 0) {
      return NextResponse.json(
        { success: false, error: "Activity participation already exists for this date" },
        { status: 409 }
      );
    }

    await executeQuery(
      `
        INSERT INTO student_activities (student_id, activity_id, participation_date)
        VALUES (?, ?, ?)
      `,
      [String(student_id).trim(), activityId, participationDate]
    );

    return NextResponse.json({ success: true, message: "Activity recorded successfully" }, { status: 201 });
  } catch (error) {
    console.error("Add activity API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
