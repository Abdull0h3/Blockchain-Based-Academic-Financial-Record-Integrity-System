// Deployment script for the AcademicRecords smart contract.
// This script:
// 1. Uses the PRIVATE_KEY from .env (loaded by Hardhat) to deploy the contract.
// 2. Logs the deployed contract address to the console.
// 3. Exports the contract ABI to frontend/abi.json so the Next.js backend
//    can interact with the contract via ethers.js (server-side only).

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  const { ethers, artifacts } = hre;

  // The deployer is derived from the PRIVATE_KEY configured in hardhat.config.js.
  const [deployer] = await ethers.getSigners();
  console.log("Deploying AcademicRecords with account:", deployer.address);

  // Hardhat's ethers v6 signer exposes the provider; we read balance via provider.
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deployer balance:", ethers.formatEther(balance), "ETH");

  // Deploy the AcademicRecords contract.
  const AcademicRecords = await ethers.getContractFactory("AcademicRecords");
  const contract = await AcademicRecords.deploy();

  // ethers v6: wait for the contract to be fully deployed.
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("AcademicRecords deployed to:", contractAddress);

  // Save the address to a local JSON file for convenience.
  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const addressFile = path.join(deploymentsDir, "AcademicRecords.address.json");
  fs.writeFileSync(
    addressFile,
    JSON.stringify({ contractAddress }, null, 2),
    "utf-8"
  );
  console.log("Contract address saved to:", addressFile);

  // Export the ABI so the Next.js backend (API routes) can use it with ethers.js.
  const artifact = await artifacts.readArtifact("AcademicRecords");
  const frontendAbiPath = path.join(
    __dirname,
    "..",
    "..",
    "frontend",
    "abi.json"
  );

  // Ensure the frontend directory exists before writing.
  const frontendDir = path.dirname(frontendAbiPath);
  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir, { recursive: true });
  }

  fs.writeFileSync(
    frontendAbiPath,
    JSON.stringify(artifact.abi, null, 2),
    "utf-8"
  );

  console.log("ABI exported to:", frontendAbiPath);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });

