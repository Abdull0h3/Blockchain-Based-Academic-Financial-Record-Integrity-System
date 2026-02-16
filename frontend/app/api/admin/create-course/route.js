import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { course_code, course_name, credit_hours } = body;

    if (!course_code || !course_name || credit_hours == null) {
      return NextResponse.json(
        { success: false, error: "course_code, course_name, credit_hours are required" },
        { status: 400 }
      );
    }

    const hours = Number(credit_hours);
    if (!Number.isFinite(hours) || hours <= 0) {
      return NextResponse.json(
        { success: false, error: "credit_hours must be a positive number" },
        { status: 400 }
      );
    }

    const existing = await executeQuery("SELECT id FROM courses WHERE course_code = ? LIMIT 1", [
      course_code,
    ]);
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "Course code already exists" },
        { status: 409 }
      );
    }

    await executeQuery(
      "INSERT INTO courses (course_code, course_name, credit_hours) VALUES (?, ?, ?)",
      [String(course_code).trim(), String(course_name).trim(), hours]
    );

    return NextResponse.json({ success: true, message: "Course created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Create course API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
