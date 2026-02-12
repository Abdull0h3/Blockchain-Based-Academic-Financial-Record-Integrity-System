// Blockchain connector for the AcademicRecords smart contract.
// All blockchain interactions happen **server-side** in API routes.
// The frontend NEVER accesses private keys or admin functions directly.
//
// SECURITY:
// - PRIVATE_KEY and CONTRACT_ADDRESS are read from environment variables.
// - This module must only be imported from server-side code (e.g. API routes).

import { JsonRpcProvider, Wallet, Contract } from "ethers";
import abi from "../abi.json";

const providerUrl = process.env.RPC_URL || "http://127.0.0.1:8545";

function getWallet() {
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("PRIVATE_KEY is not set in environment variables");
  }

  const provider = new JsonRpcProvider(providerUrl);
  return new Wallet(privateKey, provider);
}

export function getAcademicRecordsContract() {
  const contractAddress = process.env.CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("CONTRACT_ADDRESS is not set in environment variables");
  }

  const wallet = getWallet();
  // The wallet signs all state-changing transactions, providing a digital
  // signature that the EVM verifies on chain.
  return new Contract(contractAddress, abi, wallet);
}

