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
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/process [external] (process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("process", () => require("process"));

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
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

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
"[project]/Desktop/Fifth semester/blockchain/project/frontend/app/api/issue/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/app/lib/db.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$blockchain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/app/lib/blockchain.js [app-route] (ecmascript)");
;
;
;
;
const runtime = "nodejs";
async function POST(request) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$blockchain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureContractIsDeployed"])();
        const body = await request.json();
        const { studentId, name, program, certificateData } = body;
        if (!studentId || !name || !program || !certificateData) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "studentId, name, program, and certificateData are required"
            }, {
                status: 400
            });
        }
        // Hashing guarantees integrity: if the original certificate data changes,
        // its SHA-256 hash changes, so tampering is detectable.
        const certificateHash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(String(certificateData)).digest("hex");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(`
        INSERT INTO students (student_id, name, program, certificate_hash)
        VALUES (?, ?, ?, ?)
      `, [
            studentId,
            name,
            program,
            certificateHash
        ]);
        // Blockchain write gives immutability: once mined, this transaction
        // history cannot be altered without rewriting chain consensus history.
        const tx = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$blockchain$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["contract"].issueRecord(studentId, certificateHash, "University");
        const receipt = await tx.wait();
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: "Record issued successfully",
            studentId,
            certificateHash,
            transactionHash: receipt.hash,
            blockNumber: receipt.blockNumber
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Issue API error:", error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__8bd0bf5f._.js.map