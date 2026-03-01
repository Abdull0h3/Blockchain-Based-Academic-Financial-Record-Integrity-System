import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="main-container">
      <section className="hero">
        <h1>Blockchain-Based Academic Records</h1>
        <p>
          Secure, tamper-proof academic credentials powered by blockchain
          technology. Issue, manage, and verify academic records with complete
          transparency.
        </p>
        <div className="hero-actions">
          <Link href="/admin/login" className="btn btn-primary btn-lg">
            Admin Portal
          </Link>
          <Link href="/student/login" className="btn btn-secondary btn-lg">
            Student Portal
          </Link>
          <Link href="/verify" className="btn btn-outline btn-lg">
            Verify Certificate
          </Link>
        </div>
      </section>

      <div className="grid grid-3">
        <div className="feature-card">
          <div
            className="feature-icon"
            style={{ background: '#eff6ff', color: '#2563eb' }}
          >
            🎓
          </div>
          <h3>Admin Dashboard</h3>
          <p>
            Register students, assign grades, manage activities, and issue
            blockchain-verified certificates.
          </p>
        </div>

        <div className="feature-card">
          <div
            className="feature-icon"
            style={{ background: '#ecfdf5', color: '#10b981' }}
          >
            📚
          </div>
          <h3>Student Portal</h3>
          <p>
            View your academic summary, track grades, check clearance status,
            and download certificates.
          </p>
        </div>

        <div className="feature-card">
          <div
            className="feature-icon"
            style={{ background: '#fef3c7', color: '#f59e0b' }}
          >
            ✓
          </div>
          <h3>Employer Verification</h3>
          <p>
            Instantly verify academic credentials using student ID or QR code
            scanning.
          </p>
        </div>
      </div>

      <section className="card mt-2">
        <div className="card-header">
          <h2 className="card-title">How It Works</h2>
        </div>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>1️⃣</div>
            <strong>Issue Certificate</strong>
            <p
              style={{
                color: 'var(--text-secondary)',
                margin: '0.5rem 0 0 0',
                fontSize: '0.875rem',
              }}
            >
              Admin issues certificate after verifying student data and
              clearance
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>2️⃣</div>
            <strong>Record on Blockchain</strong>
            <p
              style={{
                color: 'var(--text-secondary)',
                margin: '0.5rem 0 0 0',
                fontSize: '0.875rem',
              }}
            >
              Certificate hash is immutably stored on the Ethereum blockchain
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>3️⃣</div>
            <strong>Verify Anytime</strong>
            <p
              style={{
                color: 'var(--text-secondary)',
                margin: '0.5rem 0 0 0',
                fontSize: '0.875rem',
              }}
            >
              Employers can verify authenticity instantly via blockchain
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
