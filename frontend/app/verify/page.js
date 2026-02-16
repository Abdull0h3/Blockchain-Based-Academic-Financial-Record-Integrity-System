"use client";

import { useRef, useState } from "react";

export default function VerifyPage() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [record, setRecord] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const scannerEnabledRef = useRef(false);

  async function verifyById(id) {
    setLoading(true);
    setError("");
    setRecord(null);

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: id }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || "Verification failed");
      }
      setRecord(payload);
    } catch (requestError) {
      setError(requestError.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const id = studentId.trim();
    if (!id) {
      setError("Please enter student ID");
      return;
    }
    await verifyById(id);
  }

  function stopScanner() {
    setScannerActive(false);
    scannerEnabledRef.current = false;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }

  async function startScanner() {
    try {
      if (!("BarcodeDetector" in window)) {
        throw new Error("QR scanner is not supported in this browser");
      }

      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setScannerActive(true);
      scannerEnabledRef.current = true;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      const scanLoop = async () => {
        if (!videoRef.current || !scannerEnabledRef.current) {
          return;
        }
        try {
          const codes = await detector.detect(videoRef.current);
          if (codes.length > 0) {
            const rawValue = codes[0].rawValue || "";
            const match = rawValue.match(/\/verify\/([^/?#]+)/);
            const extractedId = match ? decodeURIComponent(match[1]) : rawValue;
            setStudentId(extractedId);
            stopScanner();
            await verifyById(extractedId);
            return;
          }
        } catch (_scanError) {
          // ignore intermittent frame read errors
        }
        rafRef.current = requestAnimationFrame(scanLoop);
      };

      rafRef.current = requestAnimationFrame(scanLoop);
    } catch (scannerError) {
      setError(scannerError.message || "Failed to start scanner");
      stopScanner();
    }
  }

  const issueDate = record?.issueTimestamp
    ? new Date(Number(record.issueTimestamp) * 1000).toLocaleString()
    : null;

  return (
    <main style={{ maxWidth: 820, margin: "0 auto", display: "grid", gap: 12 }}>
      <h1>Employer Verification</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter Student ID"
          style={{ padding: "0.6rem" }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
          {!scannerActive ? (
            <button type="button" onClick={startScanner}>
              Scan QR
            </button>
          ) : (
            <button type="button" onClick={stopScanner}>
              Stop Scanner
            </button>
          )}
        </div>
      </form>

      {scannerActive ? (
        <video ref={videoRef} style={{ width: "100%", maxWidth: 420, borderRadius: 8 }} muted />
      ) : null}

      {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

      {record ? (
        <section style={{ border: "1px solid #ddd", borderRadius: 10, padding: "1rem" }}>
          <p><strong>Name:</strong> {record.fullName || "N/A"}</p>
          <p><strong>Program:</strong> {record.program || "N/A"}</p>
          <p><strong>CGPA:</strong> {record.cgpa ?? "N/A"}</p>
          <p><strong>Issuer:</strong> {record.issuer}</p>
          <p><strong>Issue Date:</strong> {issueDate || "N/A"}</p>
          <p><strong>Status:</strong> {record.isRevoked ? "Revoked" : "Valid"}</p>
          <p>
            <strong>Integrity Check:</strong>{" "}
            {record.integrityValid ? "Valid (hash matched)" : "Tampered (hash mismatch)"}
          </p>
        </section>
      ) : null}
    </main>
  );
}
