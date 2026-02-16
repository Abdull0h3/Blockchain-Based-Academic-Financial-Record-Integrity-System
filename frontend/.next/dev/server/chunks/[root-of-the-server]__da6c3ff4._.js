module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/Desktop/Fifth semester/blockchain/project/frontend/app/abi.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"studentId","type":"string"},{"indexed":false,"internalType":"string","name":"documentHash","type":"string"}],"name":"RecordIssued","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"studentId","type":"string"}],"name":"RecordRevoked","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_studentId","type":"string"},{"internalType":"string","name":"_documentHash","type":"string"},{"internalType":"string","name":"_issuer","type":"string"}],"name":"issueRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_studentId","type":"string"}],"name":"revokeRecord","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_studentId","type":"string"}],"name":"verifyRecord","outputs":[{"components":[{"internalType":"string","name":"studentId","type":"string"},{"internalType":"string","name":"documentHash","type":"string"},{"internalType":"string","name":"issuer","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"bool","name":"isValid","type":"bool"}],"internalType":"struct AcademicRecords.Record","name":"","type":"tuple"}],"stateMutability":"view","type":"function"}]);}),
"[project]/Desktop/Fifth semester/blockchain/project/frontend/app/lib/blockchain.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contract",
    ()=>contract,
    "ensureContractIsDeployed",
    ()=>ensureContractIsDeployed,
    "provider",
    ()=>provider,
    "wallet",
    ()=>wallet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$abi$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/app/abi.json (json)");
;
;
function validateEnv() {
    const required = [
        "PRIVATE_KEY",
        "CONTRACT_ADDRESS"
    ];
    const missing = required.filter((key)=>!process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
}
validateEnv();
// Provider = read/write connection to the Ethereum JSON-RPC node.
// It talks to Hardhat local chain at http://127.0.0.1:8545.
const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(process.env.RPC_URL || "http://127.0.0.1:8545");
// Wallet = backend signing identity. Every state-changing tx is signed with
// this private key before being broadcast. The key must stay server-side only.
const wallet = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Wallet(process.env.PRIVATE_KEY, provider);
// Contract instance bound to the signing wallet.
// Digital signature flow:
// 1) API route calls a write method (e.g., issueRecord).
// 2) ethers prepares transaction data.
// 3) wallet signs tx with PRIVATE_KEY.
// 4) signed tx is sent to chain and validated by nodes.
const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(process.env.CONTRACT_ADDRESS, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$abi$2e$json__$28$json$29$__["default"], wallet);
let contractCodeValidated = false;
async function ensureContractIsDeployed() {
    if (contractCodeValidated) {
        return;
    }
    const code = await provider.getCode(process.env.CONTRACT_ADDRESS);
    if (!code || code === "0x") {
        throw new Error("Invalid CONTRACT_ADDRESS: no contract bytecode found. Set CONTRACT_ADDRESS to the deployed AcademicRecords contract address.");
    }
    contractCodeValidated = true;
}
;
}),
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/Desktop/Fifth semester/blockchain/project/frontend/app/lib/db.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "executeQuery",
    ()=>executeQuery,
    "getPool",
    ()=>getPool,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/mysql2/promise.js [app-route] (ecmascript)");
;
let pool;
function createPool() {
    const parsedPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$mysql2$2f$promise$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "academic_system",
        waitForConnections: true,
        port: Number.isNaN(parsedPort) ? 3306 : parsedPort,
        connectionLimit: 10,
        queueLimit: 0
    });
}
async function getPool() {
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
async function executeQuery(sql, params = []) {
    try {
        const db = await getPool();
        const [result] = await db.execute(sql, params);
        return result;
    } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Database query failed");
    }
}
;
}),
"[project]/Desktop/Fifth semester/blockchain/project/frontend/app/api/verify/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$blockchain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/app/lib/blockchain.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/app/lib/db.js [app-route] (ecmascript)");
;
;
;
;
const runtime = "nodejs";
function toDateOnlyString(value) {
    if (!value) {
        return null;
    }
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return date.toISOString().slice(0, 10);
}
function toGraduationYear(value) {
    if (!value) {
        return null;
    }
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
        return null;
    }
    return String(date.getUTCFullYear());
}
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$blockchain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureContractIsDeployed"])();
        const body = await request.json();
        const { studentId } = body;
        if (!studentId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "studentId is required"
            }, {
                status: 400
            });
        }
        const normalizedStudentId = String(studentId).trim();
        const certificateRows = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(`
        SELECT
          student_id,
          full_name,
          program,
          cgpa,
          graduation_date,
          document_hash,
          blockchain_tx_hash,
          is_revoked,
          issued_at
        FROM certificates
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `, [
            normalizedStudentId
        ]);
        if (certificateRows.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Certificate not found in database"
            }, {
                status: 404
            });
        }
        const certificate = certificateRows[0];
        if (!("full_name" in certificate) || !("program" in certificate)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Certificates schema must include full_name and program columns for immutable verification"
            }, {
                status: 500
            });
        }
        let blockchainRecord;
        try {
            blockchainRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$blockchain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["contract"].verifyRecord(normalizedStudentId);
        } catch (error) {
            const message = error.shortMessage || error.message || "Blockchain lookup failed";
            const isNotFound = message.includes("Record not found") || message.includes("BAD_DATA");
            if (isNotFound) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: "Record not found on blockchain"
                }, {
                    status: 404
                });
            }
            throw error;
        }
        const graduationDate = toDateOnlyString(certificate.graduation_date);
        const graduationYear = toGraduationYear(certificate.graduation_date);
        const cgpaFormatted = Number(certificate.cgpa).toFixed(2);
        // Primary canonical format (must match issuance logic exactly):
        // `${studentId}|${fullName}|${program}|${cgpa.toFixed(2)}|${graduationYear}`
        const canonical = `${certificate.student_id}|${certificate.full_name}|${certificate.program}|${cgpaFormatted}|${graduationYear}`;
        const recalculatedHash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(canonical).digest("hex");
        // Backward-compatible fallback if any old issuance used graduation_date directly.
        const legacyCanonical = `${certificate.student_id}|${certificate.full_name}|${certificate.program}|${cgpaFormatted}|${graduationDate}`;
        const legacyRecalculatedHash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(legacyCanonical).digest("hex");
        const integrityValid = recalculatedHash === blockchainRecord.documentHash || legacyRecalculatedHash === blockchainRecord.documentHash;
        const issueTimestamp = blockchainRecord.timestamp.toString();
        const isRevoked = Boolean(certificate.is_revoked) || !blockchainRecord.isValid;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            studentId: certificate.student_id,
            fullName: certificate.full_name,
            program: certificate.program,
            cgpa: certificate.cgpa,
            graduationDate,
            issuer: blockchainRecord.issuer,
            issueTimestamp,
            isRevoked,
            blockchainHash: blockchainRecord.documentHash,
            recalculatedHash,
            integrityValid
        });
    } catch (error) {
        console.error("Verify API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.shortMessage || error.message || "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__da6c3ff4._.js.map