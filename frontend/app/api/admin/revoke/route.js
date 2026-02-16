import { NextResponse } from "next/server";
import { getPool } from "../../../lib/db";
import { contract, ensureContractIsDeployed } from "../../../lib/blockchain";

export const runtime = "nodejs";

async function getTableColumns(connection, tableName) {
  const [rows] = await connection.execute(`SHOW COLUMNS FROM ${tableName}`);
  return new Set(rows.map((row) => String(row.Field).toLowerCase()));
}

export async function POST(request) {
  let connection;

  try {
    await ensureContractIsDeployed();
    const body = await request.json();
    const { studentId } = body;

    if (!studentId || !String(studentId).trim()) {
      return NextResponse.json({ success: false, error: "studentId is required" }, { status: 400 });
    }

    const normalizedStudentId = String(studentId).trim();
    const pool = await getPool();
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [certRows] = await connection.execute(
      `
        SELECT id, is_revoked
        FROM certificates
        WHERE student_id = ?
        ORDER BY id DESC
        LIMIT 1
      `,
      [normalizedStudentId]
    );

    if (certRows.length === 0) {
      await connection.rollback();
      return NextResponse.json(
        { success: false, error: "Certificate does not exist for this student" },
        { status: 404 }
      );
    }

    if (Boolean(certRows[0].is_revoked)) {
      await connection.rollback();
      return NextResponse.json({ success: false, error: "Certificate already revoked" }, { status: 409 });
    }

    const tx = await contract.revokeRecord(normalizedStudentId);
    const receipt = await tx.wait();

    const certificateColumns = await getTableColumns(connection, "certificates");
    const updateParts = ["is_revoked = 1"];
    const updateParams = [];

    if (certificateColumns.has("revoked_at")) {
      updateParts.push("revoked_at = NOW()");
    }

    if (certificateColumns.has("revoke_tx_hash")) {
      updateParts.push("revoke_tx_hash = ?");
      updateParams.push(receipt.hash);
    } else if (certificateColumns.has("blockchain_tx_hash")) {
      // Fallback for schemas that don't have a dedicated revoke tx hash column.
      updateParts.push("blockchain_tx_hash = ?");
      updateParams.push(receipt.hash);
    }

    updateParams.push(certRows[0].id);

    await connection.execute(
      `
        UPDATE certificates
        SET ${updateParts.join(", ")}
        WHERE id = ?
      `,
      updateParams
    );

    await connection.commit();

    return NextResponse.json(
      {
        success: true,
        message: "Certificate revoked successfully",
        studentId: normalizedStudentId,
        blockchainTxHash: receipt.hash,
      },
      { status: 200 }
    );
  } catch (error) {
    if (connection) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error("Rollback failed:", rollbackError);
      }
    }

    console.error("Admin revoke error:", error);
    return NextResponse.json(
      { success: false, error: error.shortMessage || error.message || "Internal server error" },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
