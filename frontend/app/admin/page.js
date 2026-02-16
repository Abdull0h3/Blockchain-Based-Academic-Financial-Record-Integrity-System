"use client";

import { useState } from "react";

export default function AdminDashboardPage() {
  const [certificateStudentId, setCertificateStudentId] = useState("");
  const [loadingAction, setLoadingAction] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [summary, setSummary] = useState(null);

  const [studentForm, setStudentForm] = useState({
    full_name: "",
    student_id: "",
    email: "",
    program: "",
    enrollment_year: "",
  });
  const [courseForm, setCourseForm] = useState({
    course_code: "",
    course_name: "",
    credit_hours: "",
  });
  const [gradeForm, setGradeForm] = useState({
    student_id: "",
    course_code: "",
    grade: "",
    semester: "",
    year: "",
  });
  const [activityForm, setActivityForm] = useState({
    student_id: "",
    activity_name: "",
    description: "",
    participation_date: "",
  });
  const [clearanceForm, setClearanceForm] = useState({
    student_id: "",
    tuition_paid: true,
    clearance_approved: true,
  });
  const [statusForm, setStatusForm] = useState({
    student_id: "",
    status: "active",
    graduation_year: "",
  });
  const [summaryStudentId, setSummaryStudentId] = useState("");

  async function postJson(endpoint, body, actionName, resetFn) {
    setError("");
    setSuccessMessage("");
    setResult(null);
    setLoadingAction(actionName);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Request failed");
      }
      setSuccessMessage(payload.message || "Operation completed");
      if (payload.blockchainTxHash || payload.pdfPath) {
        setResult(payload);
      }
      if (resetFn) {
        resetFn();
      }
    } catch (requestError) {
      setError(requestError.message || "Unexpected error occurred");
    } finally {
      setLoadingAction("");
    }
  }

  async function runAction(action) {
    const normalizedStudentId = certificateStudentId.trim();
    if (!normalizedStudentId) {
      setError("Please enter a valid student ID");
      return;
    }

    const endpoint =
      action === "issue" ? "/api/admin/issue-certificate" : "/api/admin/revoke";
    await postJson(endpoint, { studentId: normalizedStudentId }, action);
  }

  async function fetchSummary() {
    const id = summaryStudentId.trim();
    if (!id) {
      setError("Enter a student ID to view summary");
      return;
    }

    setError("");
    setSuccessMessage("");
    setLoadingAction("summary");

    try {
      const response = await fetch(`/api/admin/student-summary?studentId=${encodeURIComponent(id)}`);
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Failed to fetch summary");
      }
      setSummary(payload.data);
    } catch (requestError) {
      setError(requestError.message || "Failed to fetch summary");
      setSummary(null);
    } finally {
      setLoadingAction("");
    }
  }

  const isIssueLoading = loadingAction === "issue";
  const isRevokeLoading = loadingAction === "revoke";
  const isBusy = Boolean(loadingAction);

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem 1.25rem",
        fontFamily: "Arial, sans-serif",
        display: "grid",
        gap: "1rem",
      }}
    >
      <h1 style={{ marginBottom: 0 }}>Academic Record Admin Dashboard</h1>
      <p style={{ marginTop: 0 }}>
        Admin actions are executed via backend API routes only. This keeps private keys in the
        backend and enforces secure DApp architecture.
      </p>

      <section
        style={{
          border: "1px solid #ddd",
          borderRadius: 12,
          padding: "1rem",
          display: "grid",
          gap: "0.75rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Certificate Operations</h2>
        <label htmlFor="studentId" style={{ display: "block", marginBottom: 4, fontWeight: 700 }}>
          Student ID
        </label>
        <input
          id="studentId"
          value={certificateStudentId}
          onChange={(event) => setCertificateStudentId(event.target.value)}
          placeholder="e.g. STU-1001"
          style={{ width: "100%", padding: "0.6rem" }}
          disabled={isBusy}
        />

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => runAction("issue")}
            disabled={isIssueLoading || isRevokeLoading}
            style={{ minWidth: 170 }}
          >
            {isIssueLoading ? "Issuing..." : "Issue Certificate"}
          </button>
          <button
            onClick={() => runAction("revoke")}
            disabled={isIssueLoading || isRevokeLoading}
            style={{ minWidth: 170 }}
          >
            {isRevokeLoading ? "Revoking..." : "Revoke Certificate"}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>Create Student</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Full Name"
            value={studentForm.full_name}
            onChange={(e) => setStudentForm((s) => ({ ...s, full_name: e.target.value }))}
          />
          <input
            placeholder="Student ID"
            value={studentForm.student_id}
            onChange={(e) => setStudentForm((s) => ({ ...s, student_id: e.target.value }))}
          />
          <input
            placeholder="Email"
            value={studentForm.email}
            onChange={(e) => setStudentForm((s) => ({ ...s, email: e.target.value }))}
          />
          <input
            placeholder="Program"
            value={studentForm.program}
            onChange={(e) => setStudentForm((s) => ({ ...s, program: e.target.value }))}
          />
          <input
            placeholder="Enrollment Year"
            value={studentForm.enrollment_year}
            onChange={(e) => setStudentForm((s) => ({ ...s, enrollment_year: e.target.value }))}
          />
          <button
            disabled={isBusy}
            onClick={() =>
              postJson("/api/admin/create-student", studentForm, "create-student", () =>
                setStudentForm({ full_name: "", student_id: "", email: "", program: "", enrollment_year: "" })
              )
            }
          >
            {loadingAction === "create-student" ? "Creating..." : "Create Student"}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>Create Course</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Course Code"
            value={courseForm.course_code}
            onChange={(e) => setCourseForm((s) => ({ ...s, course_code: e.target.value }))}
          />
          <input
            placeholder="Course Name"
            value={courseForm.course_name}
            onChange={(e) => setCourseForm((s) => ({ ...s, course_name: e.target.value }))}
          />
          <input
            placeholder="Credit Hours"
            value={courseForm.credit_hours}
            onChange={(e) => setCourseForm((s) => ({ ...s, credit_hours: e.target.value }))}
          />
          <button
            disabled={isBusy}
            onClick={() =>
              postJson("/api/admin/create-course", courseForm, "create-course", () =>
                setCourseForm({ course_code: "", course_name: "", credit_hours: "" })
              )
            }
          >
            {loadingAction === "create-course" ? "Creating..." : "Create Course"}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>Update Student Status</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Student ID"
            value={statusForm.student_id}
            onChange={(e) => setStatusForm((s) => ({ ...s, student_id: e.target.value }))}
          />
          <select
            value={statusForm.status}
            onChange={(e) => setStatusForm((s) => ({ ...s, status: e.target.value }))}
          >
            <option value="active">Active</option>
            <option value="graduated">Graduated</option>
          </select>
          <input
            placeholder="Graduation Year (required if Graduated)"
            value={statusForm.graduation_year}
            onChange={(e) => setStatusForm((s) => ({ ...s, graduation_year: e.target.value }))}
            disabled={statusForm.status !== "graduated"}
          />
          <button
            disabled={isBusy}
            onClick={() =>
              postJson("/api/admin/update-student-status", statusForm, "update-student-status", () =>
                setStatusForm({ student_id: "", status: "active", graduation_year: "" })
              )
            }
          >
            {loadingAction === "update-student-status" ? "Updating..." : "Update Status"}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>Assign Course Grade</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Student ID"
            value={gradeForm.student_id}
            onChange={(e) => setGradeForm((s) => ({ ...s, student_id: e.target.value }))}
          />
          <input
            placeholder="Course Code"
            value={gradeForm.course_code}
            onChange={(e) => setGradeForm((s) => ({ ...s, course_code: e.target.value }))}
          />
          <input
            placeholder="Grade (e.g. A, B+)"
            value={gradeForm.grade}
            onChange={(e) => setGradeForm((s) => ({ ...s, grade: e.target.value }))}
          />
          <input
            placeholder="Semester (e.g. Fall)"
            value={gradeForm.semester}
            onChange={(e) => setGradeForm((s) => ({ ...s, semester: e.target.value }))}
          />
          <input
            placeholder="Year"
            value={gradeForm.year}
            onChange={(e) => setGradeForm((s) => ({ ...s, year: e.target.value }))}
          />
          <button
            disabled={isBusy}
            onClick={() =>
              postJson("/api/admin/assign-grade", gradeForm, "assign-grade", () =>
                setGradeForm({ student_id: "", course_code: "", grade: "", semester: "", year: "" })
              )
            }
          >
            {loadingAction === "assign-grade" ? "Saving..." : "Assign Grade"}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>Record Activity Participation</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Student ID"
            value={activityForm.student_id}
            onChange={(e) => setActivityForm((s) => ({ ...s, student_id: e.target.value }))}
          />
          <input
            placeholder="Activity Name"
            value={activityForm.activity_name}
            onChange={(e) => setActivityForm((s) => ({ ...s, activity_name: e.target.value }))}
          />
          <input
            placeholder="Description (optional)"
            value={activityForm.description}
            onChange={(e) => setActivityForm((s) => ({ ...s, description: e.target.value }))}
          />
          <input
            type="date"
            value={activityForm.participation_date}
            onChange={(e) => setActivityForm((s) => ({ ...s, participation_date: e.target.value }))}
          />
          <button
            disabled={isBusy}
            onClick={() =>
              postJson("/api/admin/add-activity", activityForm, "add-activity", () =>
                setActivityForm({
                  student_id: "",
                  activity_name: "",
                  description: "",
                  participation_date: "",
                })
              )
            }
          >
            {loadingAction === "add-activity" ? "Saving..." : "Add Activity"}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>Approve Financial Clearance</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Student ID"
            value={clearanceForm.student_id}
            onChange={(e) => setClearanceForm((s) => ({ ...s, student_id: e.target.value }))}
          />
          <label>
            <input
              type="checkbox"
              checked={clearanceForm.tuition_paid}
              onChange={(e) => setClearanceForm((s) => ({ ...s, tuition_paid: e.target.checked }))}
            />{" "}
            Tuition Paid
          </label>
          <label>
            <input
              type="checkbox"
              checked={clearanceForm.clearance_approved}
              onChange={(e) =>
                setClearanceForm((s) => ({ ...s, clearance_approved: e.target.checked }))
              }
            />{" "}
            Clearance Approved
          </label>
          <button
            disabled={isBusy}
            onClick={() =>
              postJson("/api/admin/approve-clearance", clearanceForm, "approve-clearance", () =>
                setClearanceForm({ student_id: "", tuition_paid: true, clearance_approved: true })
              )
            }
          >
            {loadingAction === "approve-clearance" ? "Updating..." : "Approve Clearance"}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
        <h2 style={{ marginTop: 0 }}>View Student Academic Summary</h2>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            placeholder="Student ID"
            value={summaryStudentId}
            onChange={(e) => setSummaryStudentId(e.target.value)}
          />
          <button disabled={isBusy} onClick={fetchSummary}>
            {loadingAction === "summary" ? "Loading..." : "View Summary"}
          </button>
        </div>
        {summary ? (
          <div style={{ marginTop: 12, borderTop: "1px solid #eee", paddingTop: 10 }}>
            <p>
              <strong>Name:</strong> {summary.student.fullName}
            </p>
            <p>
              <strong>Program:</strong> {summary.student.program}
            </p>
            <p>
              <strong>CGPA:</strong> {summary.cgpa}
            </p>
            <p>
              <strong>Financial Clearance:</strong>{" "}
              {summary.financial.clearance_approved ? "Approved" : "Pending"}
            </p>
            <p>
              <strong>Certificate:</strong>{" "}
              {summary.certificate.issued ? summary.certificate.status : "Not issued"}
            </p>
          </div>
        ) : null}
      </section>

      {error ? (
        <section style={{ border: "1px solid #ffc9c9", borderRadius: 10, padding: "0.9rem" }}>
          <p style={{ color: "crimson", margin: 0 }}>
            <strong>Error:</strong> {error}
          </p>
        </section>
      ) : null}

      {successMessage ? (
        <section style={{ border: "1px solid #b7e4c7", borderRadius: 10, padding: "0.9rem" }}>
          <p style={{ color: "green", margin: 0 }}>{successMessage}</p>
        </section>
      ) : null}

      {result ? (
        <section style={{ border: "1px solid #ddd", borderRadius: 12, padding: "1rem" }}>
          <h3 style={{ marginTop: 0 }}>Operation Result</h3>
          <div style={{ display: "grid", gap: "0.4rem" }}>
            {result.studentId ? (
              <p>
                <strong>Student ID:</strong> {result.studentId}
              </p>
            ) : null}
            {result.cgpa != null ? (
              <p>
                <strong>CGPA:</strong> {result.cgpa}
              </p>
            ) : null}
            {result.documentHash ? (
              <p>
                <strong>Document Hash:</strong> {result.documentHash}
              </p>
            ) : null}
            {result.blockchainTxHash ? (
              <p>
                <strong>Blockchain Tx:</strong> {result.blockchainTxHash}
              </p>
            ) : null}
            {result.pdfPath ? (
              <p>
                <a href={result.pdfPath} target="_blank" rel="noreferrer">
                  Download Generated Certificate PDF
                </a>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}
    </main>
  );
}
