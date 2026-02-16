"use client";

import { useState } from "react";

const initialForm = {
  studentId: "",
  name: "",
  program: "",
  certificateData: "",
};

export default function IssueForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Frontend sends only user data to backend API.
      // API routes then handle DB writes and blockchain transactions securely.
      const response = await fetch("/api/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Failed to issue record");
      }

      setSuccessMessage(
        `Record issued successfully for ${payload.studentId}. Tx: ${payload.transactionHash}`
      );
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError.message || "Unexpected error while issuing record");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.75rem" }}>
      <input
        name="studentId"
        value={form.studentId}
        onChange={handleChange}
        placeholder="Student ID"
        required
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Student Name"
        required
      />
      <input
        name="program"
        value={form.program}
        onChange={handleChange}
        placeholder="Program"
        required
      />
      <textarea
        name="certificateData"
        value={form.certificateData}
        onChange={handleChange}
        placeholder="Certificate Data"
        required
        rows={4}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Issuing..." : "Issue Record"}
      </button>

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      {successMessage ? <p style={{ color: "green" }}>{successMessage}</p> : null}
    </form>
  );
}
