import { ethers } from "ethers";
import ABI from "../abi.json";

function validateEnv() {
  const required = ["PRIVATE_KEY", "CONTRACT_ADDRESS"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}

validateEnv();

// Provider = read/write connection to the Ethereum JSON-RPC node.
// It talks to Hardhat local chain at http://127.0.0.1:8545.
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL || "http://127.0.0.1:8545");

// Wallet = backend signing identity. Every state-changing tx is signed with
// this private key before being broadcast. The key must stay server-side only.
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Contract instance bound to the signing wallet.
// Digital signature flow:
// 1) API route calls a write method (e.g., issueRecord).
// 2) ethers prepares transaction data.
// 3) wallet signs tx with PRIVATE_KEY.
// 4) signed tx is sent to chain and validated by nodes.
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, ABI, wallet);

let contractCodeValidated = false;

export async function ensureContractIsDeployed() {
  if (contractCodeValidated) {
    return;
  }

  const code = await provider.getCode(process.env.CONTRACT_ADDRESS);
  if (!code || code === "0x") {
    throw new Error(
      "Invalid CONTRACT_ADDRESS: no contract bytecode found. Set CONTRACT_ADDRESS to the deployed AcademicRecords contract address."
    );
  }

  contractCodeValidated = true;
}

export { provider, wallet, contract };
