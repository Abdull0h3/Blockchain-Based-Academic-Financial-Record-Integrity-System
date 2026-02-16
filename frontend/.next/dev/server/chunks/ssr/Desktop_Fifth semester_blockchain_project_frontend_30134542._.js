module.exports = [
"[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VerifyPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function VerifyPage() {
    const [studentId, setStudentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [record, setRecord] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scannerActive, setScannerActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scannerEnabledRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    async function verifyById(id) {
        setLoading(true);
        setError("");
        setRecord(null);
        try {
            const response = await fetch("/api/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentId: id
                })
            });
            const payload = await response.json();
            if (!response.ok) {
                throw new Error(payload.error || "Verification failed");
            }
            setRecord(payload);
        } catch (requestError) {
            setError(requestError.message || "Unexpected error occurred");
        } finally{
            setLoading(false);
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const id = studentId.trim();
        if (!id) {
            setError("Please enter student ID");
            return;
        }
        await verifyById(id);
    }
    function stopScanner() {
        setScannerActive(false);
        scannerEnabledRef.current = false;
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track)=>track.stop());
            streamRef.current = null;
        }
    }
    async function startScanner() {
        try {
            if (!("BarcodeDetector" in window)) {
                throw new Error("QR scanner is not supported in this browser");
            }
            const detector = new window.BarcodeDetector({
                formats: [
                    "qr_code"
                ]
            });
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                }
            });
            streamRef.current = stream;
            setScannerActive(true);
            scannerEnabledRef.current = true;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
            }
            const scanLoop = async ()=>{
                if (!videoRef.current || !scannerEnabledRef.current) {
                    return;
                }
                try {
                    const codes = await detector.detect(videoRef.current);
                    if (codes.length > 0) {
                        const rawValue = codes[0].rawValue || "";
                        const match = rawValue.match(/\/verify\/([^/?#]+)/);
                        const extractedId = match ? decodeURIComponent(match[1]) : rawValue;
                        setStudentId(extractedId);
                        stopScanner();
                        await verifyById(extractedId);
                        return;
                    }
                } catch (_scanError) {
                // ignore intermittent frame read errors
                }
                rafRef.current = requestAnimationFrame(scanLoop);
            };
            rafRef.current = requestAnimationFrame(scanLoop);
        } catch (scannerError) {
            setError(scannerError.message || "Failed to start scanner");
            stopScanner();
        }
    }
    const issueDate = record?.issueTimestamp ? new Date(Number(record.issueTimestamp) * 1000).toLocaleString() : null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            maxWidth: 820,
            margin: "0 auto",
            display: "grid",
            gap: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Employer Verification"
            }, void 0, false, {
                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                style: {
                    display: "grid",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: studentId,
                        onChange: (e)=>setStudentId(e.target.value),
                        placeholder: "Enter Student ID",
                        style: {
                            padding: "0.6rem"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: loading,
                                children: loading ? "Verifying..." : "Verify"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 122,
                                columnNumber: 11
                            }, this),
                            !scannerActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: startScanner,
                                children: "Scan QR"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 126,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: stopScanner,
                                children: "Stop Scanner"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            scannerActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                ref: videoRef,
                style: {
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 8
                },
                muted: true
            }, void 0, false, {
                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                lineNumber: 138,
                columnNumber: 9
            }, this) : null,
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    color: "crimson"
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                lineNumber: 141,
                columnNumber: 16
            }, this) : null,
            record ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: "1rem"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Name:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 145,
                                columnNumber: 14
                            }, this),
                            " ",
                            record.fullName || "N/A"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 145,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Program:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 146,
                                columnNumber: 14
                            }, this),
                            " ",
                            record.program || "N/A"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 146,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "CGPA:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 147,
                                columnNumber: 14
                            }, this),
                            " ",
                            record.cgpa ?? "N/A"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Issuer:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 148,
                                columnNumber: 14
                            }, this),
                            " ",
                            record.issuer
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Issue Date:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 149,
                                columnNumber: 14
                            }, this),
                            " ",
                            issueDate || "N/A"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Status:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 150,
                                columnNumber: 14
                            }, this),
                            " ",
                            record.isRevoked ? "Revoked" : "Valid"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 150,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Fifth__semester$2f$blockchain$2f$project$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Integrity Check:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            " ",
                            record.integrityValid ? "Valid (hash matched)" : "Tampered (hash mismatch)"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                        lineNumber: 151,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
                lineNumber: 144,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Fifth semester/blockchain/project/frontend/app/verify/page.js",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/Fifth semester/blockchain/project/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=Desktop_Fifth%20semester_blockchain_project_frontend_30134542._.js.map