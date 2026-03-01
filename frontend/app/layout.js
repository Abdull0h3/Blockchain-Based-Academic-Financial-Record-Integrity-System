import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Academic Record System',
  description: 'Blockchain-based academic record DApp',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="header">
          <nav className="nav">
            <Link href="/" className="nav-brand">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
              Academic Records
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/admin" className="nav-link">
                Admin
              </Link>
              <Link href="/student" className="nav-link">
                Student
              </Link>
              <Link href="/verify" className="nav-link">
                Verify
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
