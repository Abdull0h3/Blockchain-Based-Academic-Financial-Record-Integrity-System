export default function HomePage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", display: "grid", gap: 12 }}>
      <h1>University Academic Record System</h1>
      <p>Use the navigation bar to access Admin, Student, and Employer Verification modules.</p>
      <ul>
        <li>Admin: manage student data, grades, activities, clearance, and certificates.</li>
        <li>Student: view academic summary and certificate status.</li>
        <li>Verify: employer-side verification using student ID or QR scanner.</li>
      </ul>
    </main>
  );
}
