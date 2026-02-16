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
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

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
"[project]/Desktop/Fifth semester/blockchain/project/frontend/app/api/admin/student-summary/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/app/lib/db.js [app-route] (ecmascript)");
;
;
const runtime = "nodejs";
function gradeToPoint(grade) {
    const map = {
        "A+": 4.0,
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        "B-": 2.7,
        "C+": 2.3,
        C: 2.0,
        "C-": 1.7,
        "D+": 1.3,
        D: 1.0,
        F: 0.0
    };
    return map[String(grade || "").toUpperCase()];
}
function calculateCgpa(rows) {
    let weighted = 0;
    let totalCredits = 0;
    for (const row of rows){
        const credits = Number(row.credit_hours || 0);
        const point = gradeToPoint(row.grade);
        if (credits > 0 && Number.isFinite(point)) {
            weighted += point * credits;
            totalCredits += credits;
        }
    }
    if (totalCredits === 0) {
        return 0;
    }
    return Number((weighted / totalCredits).toFixed(2));
}
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get("studentId");
        if (!studentId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "studentId is required"
            }, {
                status: 400
            });
        }
        const students = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(`
        SELECT student_id, full_name, email, program, enrollment_year, graduation_year, status
        FROM students
        WHERE student_id = ?
        LIMIT 1
      `, [
            studentId
        ]);
        if (students.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: "Student not found"
            }, {
                status: 404
            });
        }
        const courses = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(`
        SELECT
          sc.course_code,
          c.course_name,
          c.credit_hours,
          sc.grade,
          sc.semester,
          sc.year
        FROM student_courses sc
        INNER JOIN courses c ON c.course_code = sc.course_code
        WHERE sc.student_id = ?
        ORDER BY sc.year, sc.semester
      `, [
            studentId
        ]);
        const activities = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(`
        SELECT a.activity_name, a.description, sa.participation_date
        FROM student_activities sa
        INNER JOIN activities a ON a.id = sa.activity_id
        WHERE sa.student_id = ?
        ORDER BY sa.participation_date DESC
      `, [
            studentId
        ]);
        const financial = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(`
        SELECT tuition_paid, clearance_approved, updated_at
        FROM financial_records
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `, [
            studentId
        ]);
        const certificates = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$app$2f$lib$2f$db$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["executeQuery"])(`
        SELECT document_hash, blockchain_tx_hash, contract_address, is_revoked, issued_at
        FROM certificates
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `, [
            studentId
        ]);
        const student = students[0];
        const certificate = certificates[0] || null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: {
                student: {
                    studentId: student.student_id,
                    fullName: student.full_name,
                    email: student.email,
                    program: student.program,
                    enrollmentYear: student.enrollment_year,
                    graduationYear: student.graduation_year,
                    status: student.status
                },
                courses,
                cgpa: calculateCgpa(courses),
                activities,
                financial: financial[0] || {
                    tuition_paid: false,
                    clearance_approved: false,
                    updated_at: null
                },
                certificate: certificate ? {
                    issued: true,
                    documentHash: certificate.document_hash,
                    blockchainTxHash: certificate.blockchain_tx_hash,
                    contractAddress: certificate.contract_address,
                    status: certificate.is_revoked ? "Revoked" : "Valid",
                    issuedAt: certificate.issued_at
                } : {
                    issued: false
                }
            }
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Student summary API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message || "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b5d3fe74._.js.map