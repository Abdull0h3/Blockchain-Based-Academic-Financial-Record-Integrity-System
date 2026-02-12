import "./globals.css";

export const metadata = {
  title: "University Academic Records DApp",
  description:
    "Decentralized academic record integrity system using blockchain and MySQL.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50 min-h-screen">
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}

