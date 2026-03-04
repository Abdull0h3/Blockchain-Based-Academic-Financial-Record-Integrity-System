'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [certificateStudentId, setCertificateStudentId] = useState('');
  const [loadingAction, setLoadingAction] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [summary, setSummary] = useState(null);

  const [studentForm, setStudentForm] = useState({
    full_name: '',
    student_id: '',
    email: '',
    program: '',
    enrollment_year: '',
    password: '',
  });
  const [courseForm, setCourseForm] = useState({
    course_code: '',
    course_name: '',
    credit_hours: '',
  });
  const [gradeForm, setGradeForm] = useState({
    student_id: '',
    course_code: '',
    grade: '',
    semester: '',
    year: '',
  });
  const [activityForm, setActivityForm] = useState({
    student_id: '',
    activity_name: '',
    description: '',
    participation_date: '',
  });
  const [clearanceForm, setClearanceForm] = useState({
    student_id: '',
    tuition_paid: true,
    clearance_approved: true,
  });
  const [statusForm, setStatusForm] = useState({
    student_id: '',
    status: 'active',
    graduation_year: '',
  });
  const [summaryStudentId, setSummaryStudentId] = useState('');

  // Check authentication on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (data.authenticated && data.user?.role === 'admin') {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      } catch {
        router.push('/admin/login');
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!error) {
      return;
    }
    const timer = setTimeout(() => setError(''), 4500);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    if (!successMessage) {
      return;
    }
    const timer = setTimeout(() => setSuccessMessage(''), 3500);
    return () => clearTimeout(timer);
  }, [successMessage]);

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  async function postJson(endpoint, body, actionName, resetFn) {
    setError('');
    setSuccessMessage('');
    setResult(null);
    setLoadingAction(actionName);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Request failed');
      }
      setSuccessMessage(payload.message || 'Operation completed');
      if (payload.blockchainTxHash || payload.pdfPath) {
        setResult(payload);
      }
      if (actionName === 'issue' && payload.pdfPath) {
        const downloadLink = document.createElement('a');
        downloadLink.href = payload.pdfPath;
        downloadLink.setAttribute(
          'download',
          payload.pdfPath.split('/').pop() || 'certificate.pdf',
        );
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
      if (resetFn) {
        resetFn();
      }
    } catch (requestError) {
      setError(requestError.message || 'Unexpected error occurred');
    } finally {
      setLoadingAction('');
    }
  }

  async function runAction(action) {
    const normalizedStudentId = certificateStudentId.trim();
    if (!normalizedStudentId) {
      setError('Please enter a valid student ID');
      return;
    }

    const endpoint =
      action === 'issue' ? '/api/admin/issue-certificate' : '/api/admin/revoke';
    await postJson(endpoint, { studentId: normalizedStudentId }, action);
  }

  async function fetchSummary() {
    const id = summaryStudentId.trim();
    if (!id) {
      setError('Enter a student ID to view summary');
      return;
    }

    setError('');
    setSuccessMessage('');
    setLoadingAction('summary');

    try {
      const response = await fetch(
        `/api/admin/student-summary?studentId=${encodeURIComponent(id)}`,
      );
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to fetch summary');
      }
      setSummary(payload.data);
    } catch (requestError) {
      setError(requestError.message || 'Failed to fetch summary');
      setSummary(null);
    } finally {
      setLoadingAction('');
    }
  }

  const isIssueLoading = loadingAction === 'issue';
  const isRevokeLoading = loadingAction === 'revoke';
  const isBusy = Boolean(loadingAction);

  // Show loading while checking authentication
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

  // This shouldn't render if not authenticated (redirected), but safety check
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="main-container">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">
            Manage students, courses, grades, and certificates
          </p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {(error || successMessage) && (
        <div className="toast-container">
          {error && <div className="alert alert-error toast">{error}</div>}
          {successMessage && (
            <div className="alert alert-success toast">{successMessage}</div>
          )}
        </div>
      )}

      {/* Certificate Operations */}
      <div className="card mb-2">
        <div className="card-header">
          <h2 className="card-title">🎓 Certificate Operations</h2>
        </div>
        <div className="form-group">
          <label htmlFor="studentId" className="form-label">
            Student ID
          </label>
          <input
            id="studentId"
            className="form-input"
            value={certificateStudentId}
            onChange={(event) => setCertificateStudentId(event.target.value)}
            placeholder="e.g. STU-1001"
            disabled={isBusy}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => runAction('issue')}
            disabled={isIssueLoading || isRevokeLoading}
            className="btn btn-success"
          >
            {isIssueLoading ? (
              <>
                <span className="spinner"></span> Issuing...
              </>
            ) : (
              'Issue Certificate'
            )}
          </button>
          <button
            onClick={() => runAction('revoke')}
            disabled={isIssueLoading || isRevokeLoading}
            className="btn btn-danger"
          >
            {isRevokeLoading ? (
              <>
                <span className="spinner"></span> Revoking...
              </>
            ) : (
              'Revoke Certificate'
            )}
          </button>
        </div>
        {result && (
          <div className="alert alert-info mt-2">
            {result.blockchainTxHash && (
              <p style={{ margin: 0 }}>TX: {result.blockchainTxHash}</p>
            )}
            {result.pdfPath && (
              <p style={{ margin: '0.25rem 0 0 0' }}>
                PDF:{' '}
                <a href={result.pdfPath} download>
                  Download certificate
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-2 mb-2">
        {/* Create Student */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">👤 Create Student</h3>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Full Name"
              value={studentForm.full_name}
              onChange={(e) =>
                setStudentForm((s) => ({ ...s, full_name: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Student ID"
              value={studentForm.student_id}
              onChange={(e) =>
                setStudentForm((s) => ({ ...s, student_id: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Email"
              value={studentForm.email}
              onChange={(e) =>
                setStudentForm((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Program"
              value={studentForm.program}
              onChange={(e) =>
                setStudentForm((s) => ({ ...s, program: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Enrollment Year"
              value={studentForm.enrollment_year}
              onChange={(e) =>
                setStudentForm((s) => ({
                  ...s,
                  enrollment_year: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="password"
              placeholder="Initial Password"
              value={studentForm.password}
              onChange={(e) =>
                setStudentForm((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={isBusy}
            onClick={() =>
              postJson(
                '/api/admin/create-student',
                studentForm,
                'create-student',
                () =>
                  setStudentForm({
                    full_name: '',
                    student_id: '',
                    email: '',
                    program: '',
                    enrollment_year: '',
                    password: '',
                  }),
              )
            }
          >
            {loadingAction === 'create-student' ? (
              <>
                <span className="spinner"></span> Creating...
              </>
            ) : (
              'Create Student'
            )}
          </button>
        </div>

        {/* Create Course */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📚 Create Course</h3>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Course Code"
              value={courseForm.course_code}
              onChange={(e) =>
                setCourseForm((s) => ({ ...s, course_code: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Course Name"
              value={courseForm.course_name}
              onChange={(e) =>
                setCourseForm((s) => ({ ...s, course_name: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Credit Hours"
              value={courseForm.credit_hours}
              onChange={(e) =>
                setCourseForm((s) => ({ ...s, credit_hours: e.target.value }))
              }
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={isBusy}
            onClick={() =>
              postJson(
                '/api/admin/create-course',
                courseForm,
                'create-course',
                () =>
                  setCourseForm({
                    course_code: '',
                    course_name: '',
                    credit_hours: '',
                  }),
              )
            }
          >
            {loadingAction === 'create-course' ? (
              <>
                <span className="spinner"></span> Creating...
              </>
            ) : (
              'Create Course'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-2 mb-2">
        {/* Assign Grade */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📝 Assign Grade</h3>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Student ID"
              value={gradeForm.student_id}
              onChange={(e) =>
                setGradeForm((s) => ({ ...s, student_id: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Course Code"
              value={gradeForm.course_code}
              onChange={(e) =>
                setGradeForm((s) => ({ ...s, course_code: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Grade (A, B+, etc.)"
              value={gradeForm.grade}
              onChange={(e) =>
                setGradeForm((s) => ({ ...s, grade: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Semester (Fall, Spring)"
              value={gradeForm.semester}
              onChange={(e) =>
                setGradeForm((s) => ({ ...s, semester: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Year"
              value={gradeForm.year}
              onChange={(e) =>
                setGradeForm((s) => ({ ...s, year: e.target.value }))
              }
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={isBusy}
            onClick={() =>
              postJson(
                '/api/admin/assign-grade',
                gradeForm,
                'assign-grade',
                () =>
                  setGradeForm({
                    student_id: '',
                    course_code: '',
                    grade: '',
                    semester: '',
                    year: '',
                  }),
              )
            }
          >
            {loadingAction === 'assign-grade' ? (
              <>
                <span className="spinner"></span> Assigning...
              </>
            ) : (
              'Assign Grade'
            )}
          </button>
        </div>

        {/* Add Activity */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🏆 Add Activity</h3>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Student ID"
              value={activityForm.student_id}
              onChange={(e) =>
                setActivityForm((s) => ({ ...s, student_id: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Activity Name"
              value={activityForm.activity_name}
              onChange={(e) =>
                setActivityForm((s) => ({
                  ...s,
                  activity_name: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Description"
              value={activityForm.description}
              onChange={(e) =>
                setActivityForm((s) => ({ ...s, description: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <input
              className="form-input"
              type="date"
              placeholder="Participation Date"
              value={activityForm.participation_date}
              onChange={(e) =>
                setActivityForm((s) => ({
                  ...s,
                  participation_date: e.target.value,
                }))
              }
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={isBusy}
            onClick={() =>
              postJson(
                '/api/admin/add-activity',
                activityForm,
                'add-activity',
                () =>
                  setActivityForm({
                    student_id: '',
                    activity_name: '',
                    description: '',
                    participation_date: '',
                  }),
              )
            }
          >
            {loadingAction === 'add-activity' ? (
              <>
                <span className="spinner"></span> Adding...
              </>
            ) : (
              'Add Activity'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-2 mb-2">
        {/* Update Student Status */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📊 Update Status</h3>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Student ID"
              value={statusForm.student_id}
              onChange={(e) =>
                setStatusForm((s) => ({ ...s, student_id: e.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <select
              className="form-select"
              value={statusForm.status}
              onChange={(e) =>
                setStatusForm((s) => ({ ...s, status: e.target.value }))
              }
            >
              <option value="active">Active</option>
              <option value="graduated">Graduated</option>
            </select>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Graduation Year (if graduated)"
              value={statusForm.graduation_year}
              onChange={(e) =>
                setStatusForm((s) => ({
                  ...s,
                  graduation_year: e.target.value,
                }))
              }
              disabled={statusForm.status !== 'graduated'}
            />
          </div>
          <button
            className="btn btn-primary btn-block"
            disabled={isBusy}
            onClick={() =>
              postJson(
                '/api/admin/update-student-status',
                statusForm,
                'update-status',
                () =>
                  setStatusForm({
                    student_id: '',
                    status: 'active',
                    graduation_year: '',
                  }),
              )
            }
          >
            {loadingAction === 'update-status' ? (
              <>
                <span className="spinner"></span> Updating...
              </>
            ) : (
              'Update Status'
            )}
          </button>
        </div>

        {/* Approve Clearance */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">💰 Approve Clearance</h3>
          </div>
          <div className="form-group">
            <input
              className="form-input"
              placeholder="Student ID"
              value={clearanceForm.student_id}
              onChange={(e) =>
                setClearanceForm((s) => ({ ...s, student_id: e.target.value }))
              }
            />
          </div>
          <div
            className="form-group flex gap-2"
            style={{ alignItems: 'center' }}
          >
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <input
                type="checkbox"
                checked={clearanceForm.tuition_paid}
                onChange={(e) =>
                  setClearanceForm((s) => ({
                    ...s,
                    tuition_paid: e.target.checked,
                  }))
                }
              />
              Tuition Paid
            </label>
            <label
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <input
                type="checkbox"
                checked={clearanceForm.clearance_approved}
                onChange={(e) =>
                  setClearanceForm((s) => ({
                    ...s,
                    clearance_approved: e.target.checked,
                  }))
                }
              />
              Clearance Approved
            </label>
          </div>
          <button
            className="btn btn-success btn-block"
            disabled={isBusy}
            onClick={() =>
              postJson(
                '/api/admin/approve-clearance',
                clearanceForm,
                'approve-clearance',
                () =>
                  setClearanceForm({
                    student_id: '',
                    tuition_paid: true,
                    clearance_approved: true,
                  }),
              )
            }
          >
            {loadingAction === 'approve-clearance' ? (
              <>
                <span className="spinner"></span> Approving...
              </>
            ) : (
              'Approve Clearance'
            )}
          </button>
        </div>
      </div>

      {/* View Student Summary */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔍 View Student Summary</h3>
        </div>
        <div className="flex gap-2">
          <input
            className="form-input"
            placeholder="Enter Student ID"
            value={summaryStudentId}
            onChange={(e) => setSummaryStudentId(e.target.value)}
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={fetchSummary}
            disabled={loadingAction === 'summary'}
          >
            {loadingAction === 'summary' ? (
              <>
                <span className="spinner"></span> Loading...
              </>
            ) : (
              'View Summary'
            )}
          </button>
        </div>

        {summary && (
          <div
            className="mt-2"
            style={{
              background: 'var(--background)',
              borderRadius: 'var(--radius)',
              padding: '1rem',
            }}
          >
            <div className="grid grid-2 gap-2">
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Name
                </div>
                <div style={{ fontWeight: 500 }}>
                  {summary.student.fullName}
                </div>
              </div>
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Program
                </div>
                <div style={{ fontWeight: 500 }}>{summary.student.program}</div>
              </div>
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  CGPA
                </div>
                <div style={{ fontWeight: 500 }}>{summary.cgpa || 'N/A'}</div>
              </div>
              <div>
                <div
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Status
                </div>
                <span
                  className={`badge ${summary.certificate?.issued ? 'badge-success' : 'badge-info'}`}
                >
                  {summary.certificate?.issued
                    ? summary.certificate.status
                    : 'Not issued'}
                </span>
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
          </div>
        )}
      </div>
    </div>
  );
}
