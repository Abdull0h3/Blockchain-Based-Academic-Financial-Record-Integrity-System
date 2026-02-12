// SQL Server connection pool for the academic_system database.
// This file centralizes database access so that API routes never create
// ad-hoc connections. The pool is reused across requests in development
// to avoid exhausting database connections.
//
// SECURITY:
// - The DB password is loaded from process.env.DB_PASSWORD.
// - This file is used **only** on the server (API routes), never in the browser.

import sql from "mssql";

const hasInstance = !!process.env.DB_INSTANCE;

const dbConfig = {
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "academic_system",
  // Use either fixed port or named instance, not both.
  port: hasInstance
    ? undefined
    : process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : 1433,
  options: {
    encrypt: false, // for local dev; set true with proper certs in production
    trustServerCertificate: true,
    instanceName: hasInstance ? process.env.DB_INSTANCE : undefined,
  },
};

// In Next.js dev mode, modules can be re-evaluated multiple times.
// We attach the pool promise to the global object to ensure a single instance.
let poolPromise;

if (!global._academicSqlPoolPromise) {
  global._academicSqlPoolPromise = sql.connect(dbConfig);
}

poolPromise = global._academicSqlPoolPromise;

export async function getSqlPool() {
  return poolPromise;
}

export { sql };

