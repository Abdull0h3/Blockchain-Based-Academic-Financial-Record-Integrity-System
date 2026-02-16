"use client";

import { useState } from "react";

export default function VerifyForm() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setRecord(null);

    try {
      // Security boundary:
      // The frontend never talks to blockchain directly and never sees private keys.
      // It calls the backend API, which performs controlled contract reads/writes.
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to verify record");
      }

      setRecord(payload.data);
    } catch (verifyError) {
      setError(verifyError.message || "Unexpected error while verifying record");
    } finally {
      setLoading(false);
    }
  }

  const formattedDate =
    record?.timestamp != null ? new Date(Number(record.timestamp) * 1000).toLocaleString() : "";

  return (
    <div style={{ display: "grid", gap: "0.75rem" }}>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
        <input
          value={studentId}
          onChange={(event) => setStudentId(event.target.value)}
          placeholder="Student ID"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Record"}
        </button>
      </form>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {record ? (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
          <p>
            <strong>Student ID:</strong> {record.studentId}
          </p>
          <p>
            <strong>Document Hash:</strong> {record.documentHash}
          </p>
          <p>
            <strong>Issuer:</strong> {record.issuer}
          </p>
          <p>
            <strong>Timestamp:</strong> {formattedDate}
          </p>
          <p>
            <strong>Status:</strong> {record.isValid ? "Valid" : "Revoked"}
          </p>
        </div>
      ) : null}
    </div>
  );
}
