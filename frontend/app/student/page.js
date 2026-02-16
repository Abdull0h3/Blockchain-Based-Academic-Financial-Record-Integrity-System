"use client";

import { useState } from "react";

export default function StudentPage() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  async function fetchSummary() {
    const id = studentId.trim();
    if (!id) {
      setError("Please enter student ID");
      return;
    }

    setLoading(true);
    setError("");
    setSummary(null);
    try {
      const response = await fetch(`/api/admin/student-summary?studentId=${encodeURIComponent(id)}`);
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Failed to fetch student summary");
      }
      setSummary(payload.data);
    } catch (requestError) {
      setError(requestError.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 12 }}>
      <h1>Student Academic Portal</h1>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          style={{ flex: 1, padding: "0.6rem" }}
        />
        <button onClick={fetchSummary} disabled={loading}>
          {loading ? "Loading..." : "View Summary"}
        </button>
      </div>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {summary ? (
        <section style={{ border: "1px solid #ddd", borderRadius: 10, padding: "1rem" }}>
          <p><strong>Full Name:</strong> {summary.student.fullName}</p>
          <p><strong>Program:</strong> {summary.student.program}</p>
          <p><strong>CGPA:</strong> {summary.cgpa}</p>
          <p>
            <strong>Financial Clearance:</strong>{" "}
            {summary.financial.clearance_approved ? "Approved" : "Pending"}
          </p>
          <p>
            <strong>Certificate Status:</strong>{" "}
            {summary.certificate.issued ? summary.certificate.status : "Not issued"}
          </p>
          <h3>Courses & Grades</h3>
          <ul>
            {summary.courses.map((course) => (
              <li key={`${course.course_code}-${course.year}-${course.semester}`}>
                {course.course_code} - {course.course_name} | Grade: {course.grade} | Credits:{" "}
                {course.credit_hours}
              </li>
            ))}
          </ul>
          <h3>Activities</h3>
          <ul>
            {summary.activities.length === 0 ? (
              <li>No activities</li>
            ) : (
              summary.activities.map((activity, index) => (
                <li key={`${activity.activity_name}-${index}`}>
                  {activity.activity_name}
                  {activity.participation_date ? ` (${activity.participation_date})` : ""}
                </li>
              ))
            )}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
