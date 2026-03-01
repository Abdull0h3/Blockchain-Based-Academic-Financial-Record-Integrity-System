'use client';

import { useRef, useState } from 'react';

export default function VerifyPage() {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [record, setRecord] = useState(null);
  const [scannerActive, setScannerActive] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const scannerEnabledRef = useRef(false);

  async function verifyById(id) {
    setLoading(true);
    setError('');
    setRecord(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: id }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Verification failed');
      }
      setRecord(payload);
    } catch (requestError) {
      setError(requestError.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const id = studentId.trim();
    if (!id) {
      setError('Please enter student ID');
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
      if (!('BarcodeDetector' in window)) {
        throw new Error('QR scanner is not supported in this browser');
      }

      const detector = new window.BarcodeDetector({ formats: ['qr_code'] });
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
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
            const rawValue = codes[0].rawValue || '';
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
      setError(scannerError.message || 'Failed to start scanner');
      stopScanner();
    }
  }

  const issueDate = record?.issueTimestamp
    ? new Date(Number(record.issueTimestamp) * 1000).toLocaleString()
    : null;

  return (
    <div className="main-container">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Certificate Verification</h1>
        <p className="page-subtitle">
          Verify academic credentials using student ID or QR code
        </p>
      </div>

      <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Student ID</label>
            <input
              className="form-input"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID (e.g., STU-1001)"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Verifying...
                </>
              ) : (
                '🔍 Verify Certificate'
              )}
            </button>
            {!scannerActive ? (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={startScanner}
              >
                📷 Scan QR
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger"
                onClick={stopScanner}
              >
                Stop Scanner
              </button>
            )}
          </div>
        </form>

        {scannerActive && (
          <div style={{ marginTop: '1rem' }}>
            <video
              ref={videoRef}
              style={{
                width: '100%',
                borderRadius: 'var(--radius)',
                border: '2px solid var(--border)',
              }}
              muted
            />
          </div>
        )}

        {error && <div className="alert alert-error mt-2">{error}</div>}
      </div>

      {record && (
        <div
          className="verify-result mt-2"
          style={{ maxWidth: 600, margin: '1.5rem auto' }}
        >
          <div
            className={`verify-header ${record.isRevoked || !record.integrityValid ? 'invalid' : 'valid'}`}
          >
            <div style={{ fontSize: '2rem' }}>
              {record.isRevoked || !record.integrityValid ? '❌' : '✓'}
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>
                {record.isRevoked
                  ? 'Certificate Revoked'
                  : !record.integrityValid
                    ? 'Integrity Check Failed'
                    : 'Certificate Valid'}
              </div>
              <div style={{ opacity: 0.9, fontSize: '0.875rem' }}>
                {record.integrityValid
                  ? 'Document hash matches blockchain record'
                  : 'Document may have been tampered with'}
              </div>
            </div>
          </div>

          <div className="verify-body">
            <div className="verify-field">
              <span className="label">Full Name</span>
              <span className="value">{record.fullName || 'N/A'}</span>
            </div>
            <div className="verify-field">
              <span className="label">Program</span>
              <span className="value">{record.program || 'N/A'}</span>
            </div>
            <div className="verify-field">
              <span className="label">CGPA</span>
              <span className="value">{record.cgpa ?? 'N/A'}</span>
            </div>
            <div className="verify-field">
              <span className="label">Issuer</span>
              <span className="value">{record.issuer}</span>
            </div>
            <div className="verify-field">
              <span className="label">Issue Date</span>
              <span className="value">{issueDate || 'N/A'}</span>
            </div>
            <div className="verify-field">
              <span className="label">Status</span>
              <span
                className={`badge ${record.isRevoked ? 'badge-danger' : 'badge-success'}`}
              >
                {record.isRevoked ? 'Revoked' : 'Valid'}
              </span>
            </div>
            <div className="verify-field">
              <span className="label">Blockchain Verified</span>
              <span
                className={`badge ${record.integrityValid ? 'badge-success' : 'badge-danger'}`}
              >
                {record.integrityValid ? '✓ Verified' : '✗ Failed'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
