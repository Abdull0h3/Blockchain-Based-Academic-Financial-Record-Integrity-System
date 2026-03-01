"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StudentPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();
        if (data.authenticated && data.user?.role === "student") {
          setUser(data.user);
        } else {
          router.push("/student/login");
        }
      } catch {
        router.push("/student/login");
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router]);

  // Fetch summary when user is authenticated
  useEffect(() => {
    if (user?.studentId) {
      fetchSummary(user.studentId);
    }
  }, [user]);

  async function fetchSummary(studentId) {
    setLoading(true);
    setError("");
    setSummary(null);
    try {
      const response = await fetch(`/api/admin/student-summary?studentId=${encodeURIComponent(studentId)}`);
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

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/student/login");
  }

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <main style={{ maxWidth: 900, margin: "2rem auto", textAlign: "center" }}>
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Student Academic Portal</h1>
        <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
          Logout
        </button>
      </div>
      <p>Welcome, <strong>{user.fullName}</strong></p>

      {loading && <p>Loading your academic summary...</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

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
