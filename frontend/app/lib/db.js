import mysql from "mysql2/promise";

let pool;

function createPool() {
  const parsedPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "academic_system",
    waitForConnections: true,
    port: Number.isNaN(parsedPort) ? 3306 : parsedPort,
    connectionLimit: 10,
    queueLimit: 0,
  });
}

export async function getPool() {
  try {
    if (!pool) {
      pool = createPool();
    }

    // Lightweight health-check to fail fast if DB credentials are invalid.
    await pool.query("SELECT 1");
    return pool;
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to MySQL");
  }
}

export async function executeQuery(sql, params = []) {
  try {
    const db = await getPool();
    const [result] = await db.execute(sql, params);
    return result;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Database query failed");
  }
}

export { pool };
