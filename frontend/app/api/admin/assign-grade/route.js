import { NextResponse } from "next/server";
import { executeQuery } from "../../../lib/db";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { student_id, course_code, grade, semester, year } = body;

    if (!student_id || !course_code || !grade || !semester || !year) {
      return NextResponse.json(
        { success: false, error: "student_id, course_code, grade, semester, year are required" },
        { status: 400 }
      );
    }

    const studentExists = await executeQuery("SELECT id FROM students WHERE student_id = ? LIMIT 1", [
      student_id,
    ]);
    if (studentExists.length === 0) {
      return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
    }

    const courseExists = await executeQuery("SELECT id FROM courses WHERE course_code = ? LIMIT 1", [
      course_code,
    ]);
    if (courseExists.length === 0) {
      return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
    }

    const duplicate = await executeQuery(
      `
        SELECT id
        FROM student_courses
        WHERE student_id = ? AND course_code = ? AND semester = ? AND year = ?
        LIMIT 1
      `,
      [student_id, course_code, semester, Number(year)]
    );

    if (duplicate.length > 0) {
      return NextResponse.json(
        { success: false, error: "Grade entry already exists for this student/course/semester/year" },
        { status: 409 }
      );
    }

    await executeQuery(
      `
        INSERT INTO student_courses (student_id, course_code, grade, semester, year)
        VALUES (?, ?, ?, ?, ?)
      `,
      [String(student_id).trim(), String(course_code).trim(), String(grade).trim().toUpperCase(), String(semester).trim(), Number(year)]
    );

    return NextResponse.json({ success: true, message: "Grade assigned successfully" }, { status: 201 });
  } catch (error) {
    console.error("Assign grade API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
