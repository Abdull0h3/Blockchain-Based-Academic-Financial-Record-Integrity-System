import sql from "mssql";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: undefined, // important: don't use instanceName when using port
  },
};

let poolPromise;

if (!global._academicSqlPoolPromise) {
  global._academicSqlPoolPromise = sql.connect(dbConfig);
}

poolPromise = global._academicSqlPoolPromise;

export async function getSqlPool() {
  return poolPromise;
}

export { sql };