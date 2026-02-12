"use client";

import { useState } from "react";

// Simple UI to:
// - Issue a new record (for demo / admin simulation).
// - Verify an existing record by studentId.
//
// NOTE:
// - All sensitive operations (hashing, DB, blockchain) are performed
//   through API routes. The browser only makes HTTP requests.

export default function HomePage() {
  const [verifyStudentId, setVerifyStudentId] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const [issueForm, setIssueForm] = useState({
    studentId: "",
    name: "",
    program: "",
    certificateData: "",
  });
  const [issueLoading, setIssueLoading] = useState(false);
  const [issueError, setIssueError] = useState("");
  const [issueSuccess, setIssueSuccess] = useState(null);

  async function handleVerify(e) {
    e.preventDefault();
    setVerifyLoading(true);
    setVerifyError("");
    setVerifyResult(null);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: verifyStudentId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }
      setVerifyResult(data);
    } catch (err) {
      setVerifyError(err.message);
    } finally {
      setVerifyLoading(false);
    }
  }

  async function handleIssue(e) {
    e.preventDefault();
    setIssueLoading(true);
    setIssueError("");
    setIssueSuccess(null);
    try {
      const res = await fetch("/api/issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueForm),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Issue failed");
      }
      setIssueSuccess(data);
    } catch (err) {
      setIssueError(err.message);
    } finally {
      setIssueLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-3xl font-semibold mb-2">
          University Academic Records (DApp)
        </h1>
        <p className="text-slate-300 text-sm">
          Backend-enforced architecture: Frontend → API Routes → (MySQL +
          Smart Contract). No direct access to database or private keys from
          the browser.
        </p>
      </section>

      <section className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold">Issue Record (Admin)</h2>
        <p className="text-xs text-slate-400">
          For demonstration only. In production, this form would be protected
          behind university admin authentication.
        </p>
        <form onSubmit={handleIssue} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Student ID</label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
              value={issueForm.studentId}
              onChange={(e) =>
                setIssueForm({ ...issueForm, studentId: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
              value={issueForm.name}
              onChange={(e) =>
                setIssueForm({ ...issueForm, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Program</label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
              value={issueForm.program}
              onChange={(e) =>
                setIssueForm({ ...issueForm, program: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Certificate Data</label>
            <textarea
              className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
              rows={4}
              value={issueForm.certificateData}
              onChange={(e) =>
                setIssueForm({
                  ...issueForm,
                  certificateData: e.target.value,
                })
              }
              required
            />
          </div>
          <button
            type="submit"
            disabled={issueLoading}
            className="inline-flex items-center justify-center rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-medium px-4 py-1.5 disabled:opacity-60"
          >
            {issueLoading ? "Issuing..." : "Issue Record"}
          </button>
        </form>
        {issueError && (
          <p className="text-xs text-red-400 mt-2">Error: {issueError}</p>
        )}
        {issueSuccess && (
          <div className="mt-3 text-xs text-emerald-300 space-y-1">
            <p>Record issued successfully.</p>
            <p>Student ID: {issueSuccess.studentId}</p>
            <p>Certificate Hash: {issueSuccess.certificateHash}</p>
            <p>Tx Hash: {issueSuccess.transactionHash}</p>
          </div>
        )}
      </section>

      <section className="bg-slate-900 border border-slate-700 rounded-lg p-4 space-y-4">
        <h2 className="text-xl font-semibold">Verify Record</h2>
        <form onSubmit={handleVerify} className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm mb-1">Student ID</label>
            <input
              className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1 text-sm"
              value={verifyStudentId}
              onChange={(e) => setVerifyStudentId(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={verifyLoading}
            className="inline-flex items-center justify-center rounded bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-medium px-4 py-1.5 disabled:opacity-60"
          >
            {verifyLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
        {verifyError && (
          <p className="text-xs text-red-400 mt-2">Error: {verifyError}</p>
        )}
        {verifyResult && (
          <div className="mt-3 text-xs space-y-1 text-slate-200">
            {!verifyResult.exists ? (
              <p>No on-chain record found for this studentId.</p>
            ) : (
              <>
                <p>
                  <span className="font-semibold">Student ID:</span>{" "}
                  {verifyResult.studentId}
                </p>
                <p>
                  <span className="font-semibold">Document Hash:</span>{" "}
                  {verifyResult.documentHash}
                </p>
                <p>
                  <span className="font-semibold">Issuer:</span>{" "}
                  {verifyResult.issuer}
                </p>
                <p>
                  <span className="font-semibold">Timestamp:</span>{" "}
                  {verifyResult.timestamp}
                </p>
                <p>
                  <span className="font-semibold">Is Valid:</span>{" "}
                  {verifyResult.isValid ? "Yes" : "No (revoked)"}
                </p>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

