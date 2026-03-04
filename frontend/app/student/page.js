'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (data.authenticated && data.user?.role === 'student') {
          setUser(data.user);
        } else {
          router.push('/student/login');
        }
      } catch {
        router.push('/student/login');
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (user?.studentId) {
      fetchSummary(user.studentId);
    }
  }, [user]);

  useEffect(() => {
    if (!error) {
      return;
    }
    const timer = setTimeout(() => setError(''), 4500);
    return () => clearTimeout(timer);
  }, [error]);

  async function fetchSummary(studentId) {
    setLoading(true);
    setError('');
    setSummary(null);
    try {
      const response = await fetch(
        `/api/admin/student-summary?studentId=${encodeURIComponent(studentId)}`,
      );
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to fetch student summary');
      }
      setSummary(payload.data);
    } catch (requestError) {
      setError(requestError.message || 'Unexpected error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/student/login');
  }

  if (checkingAuth) {
    return (
      <div
        className="main-container"
        style={{ textAlign: 'center', paddingTop: '4rem' }}
      >
        <span
          className="spinner"
          style={{ width: 40, height: 40, borderWidth: 3 }}
        ></span>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="main-container">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="page-title">Student Portal</h1>
          <p className="page-subtitle">Welcome back, {user.fullName}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {loading && (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <span
            className="spinner"
            style={{ width: 30, height: 30, borderWidth: 3 }}
          ></span>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
            Loading your academic summary...
          </p>
        </div>
      )}

      {error && (
        <div className="toast-container">
          <div className="alert alert-error toast">{error}</div>
        </div>
      )}

      {summary && (
        <>
          {/* Stats Row */}
          <div className="grid grid-3 mb-2">
            <div className="summary-panel">
              <div className="label">CGPA</div>
              <div className="value">{summary.cgpa || 'N/A'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon blue">📚</div>
              <div className="stat-content">
                <div className="stat-value">{summary.courses?.length || 0}</div>
                <div className="stat-label">Courses</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon green">🏆</div>
              <div className="stat-content">
                <div className="stat-value">
                  {summary.activities?.length || 0}
                </div>
                <div className="stat-label">Activities</div>
              </div>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-2 mb-2">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Financial Clearance</h3>
                <span
                  className={`badge ${summary.financial?.clearance_approved ? 'badge-success' : 'badge-warning'}`}
                >
                  {summary.financial?.clearance_approved
                    ? '✓ Approved'
                    : '⏳ Pending'}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                {summary.financial?.clearance_approved
                  ? 'Your financial clearance has been approved.'
                  : 'Please complete your financial obligations to obtain clearance.'}
              </p>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Certificate Status</h3>
                <span
                  className={`badge ${summary.certificate?.issued ? (summary.certificate.status === 'Valid' ? 'badge-success' : 'badge-danger') : 'badge-info'}`}
                >
                  {summary.certificate?.issued
                    ? summary.certificate.status
                    : 'Not Issued'}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
                {summary.certificate?.issued
                  ? 'Your certificate has been issued and recorded on blockchain.'
                  : 'Certificate will be issued after graduation and clearance approval.'}
              </p>
              {summary.certificate?.issued &&
                summary.certificate?.status === 'Valid' &&
                summary.certificate?.pdfPath && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <a
                      href={summary.certificate.pdfPath}
                      download
                      className="btn btn-success"
                    >
                      Download Certificate (PDF)
                    </a>
                  </div>
                )}
            </div>
          </div>

          {/* Student Info */}
          <div className="card mb-2">
            <div className="card-header">
              <h3 className="card-title">Student Information</h3>
            </div>
            <div className="grid grid-2">
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  Full Name
                </div>
                <div style={{ fontWeight: 500 }}>
                  {summary.student?.fullName}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  Program
                </div>
                <div style={{ fontWeight: 500 }}>
                  {summary.student?.program}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  Student ID
                </div>
                <div style={{ fontWeight: 500 }}>{user.studentId}</div>
              </div>
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  Status
                </div>
                <span className="badge badge-info">
                  {summary.student?.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="card mb-2">
            <div className="card-header">
              <h3 className="card-title">Courses & Grades</h3>
            </div>
            {summary.courses?.length > 0 ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Grade</th>
                      <th>Credits</th>
                      <th>Semester</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.courses.map((course) => (
                      <tr
                        key={`${course.course_code}-${course.year}-${course.semester}`}
                      >
                        <td style={{ fontWeight: 500 }}>
                          {course.course_code}
                        </td>
                        <td>{course.course_name}</td>
                        <td>
                          <span
                            className={`badge ${['A', 'A+', 'A-'].includes(course.grade) ? 'badge-success' : ['B', 'B+', 'B-'].includes(course.grade) ? 'badge-info' : 'badge-warning'}`}
                          >
                            {course.grade}
                          </span>
                        </td>
                        <td>{course.credit_hours}</td>
                        <td>
                          {course.semester} {course.year}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p
                style={{
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  padding: '1rem',
                }}
              >
                No courses enrolled yet.
              </p>
            )}
          </div>

          {/* Activities */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Extracurricular Activities</h3>
            </div>
            {summary.activities?.length > 0 ? (
              <div
                style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}
              >
                {summary.activities.map((activity, index) => (
                  <div
                    key={`${activity.activity_name}-${index}`}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--background)',
                      borderRadius: 'var(--radius)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>
                      {activity.activity_name}
                    </div>
                    {activity.participation_date && (
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {activity.participation_date}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  color: 'var(--text-secondary)',
                  textAlign: 'center',
                  padding: '1rem',
                }}
              >
                No activities recorded yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
