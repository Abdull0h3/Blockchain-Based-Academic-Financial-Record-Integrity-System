import Link from "next/link";

export const metadata = {
  title: "Academic Record System",
  description: "Blockchain-based academic record DApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <header style={{ borderBottom: "1px solid #ddd", padding: "0.75rem 1rem" }}>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link href="/">Home</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/student">Student</Link>
            <Link href="/verify">Verify</Link>
          </nav>
        </header>
        <div style={{ padding: "1rem" }}>{children}</div>
      </body>
    </html>
  );
}
