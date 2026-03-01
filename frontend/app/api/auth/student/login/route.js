import { NextResponse } from "next/server";
import { getPool } from "../../../../lib/db";
import { createToken, setAuthCookie, verifyPassword } from "../../../../lib/auth";

export async function POST(request) {
  try {
    const { studentId, password } = await request.json();

    if (!studentId || !password) {
      return NextResponse.json(
        { error: "Student ID and password are required" },
        { status: 400 }
      );
    }

    const pool = await getPool();
    
    // Get student from database
    const [rows] = await pool.execute(
      "SELECT student_id, full_name, email, program, password_hash FROM students WHERE student_id = ?",
      [studentId.trim()]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid student ID or password" },
        { status: 401 }
      );
    }

    const student = rows[0];

    // Check if password hash exists
    if (!student.password_hash) {
      return NextResponse.json(
        { error: "Account not activated. Contact admin." },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = await verifyPassword(password, student.password_hash);
    
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid student ID or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = createToken({
      studentId: student.student_id,
      fullName: student.full_name,
      email: student.email,
      program: student.program,
      role: "student",
    });

    // Set cookie
    await setAuthCookie(token);

    return NextResponse.json({
      message: "Login successful",
      user: {
        studentId: student.student_id,
        fullName: student.full_name,
        role: "student",
      },
    });
  } catch (error) {
    console.error("Student login error:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
