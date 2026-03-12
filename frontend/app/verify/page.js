'use client';

import { useRef, useState } from 'react';

export default function VerifyPage() {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [record, setRecord] = useState(null);
  // QR scanner state is disabled; verification is done via student ID only.
  // const [scannerActive, setScannerActive] = useState(false);
  // const videoRef = useRef(null);
  // const streamRef = useRef(null);
  // const rafRef = useRef(null);
  // const scannerEnabledRef = useRef(false);

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

  // QR scanner logic is disabled. Verification is performed using student ID only.
  // function stopScanner() { ... }
  // async function startScanner() { ... }

  const issueDate = record?.issueTimestamp
    ? new Date(Number(record.issueTimestamp) * 1000).toLocaleString()
    : null;

  return (
    <div className="main-container">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h1 className="page-title">Certificate Verification</h1>
        <p className="page-subtitle">
          Verify academic credentials using student ID
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
          </div>
        </form>

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
