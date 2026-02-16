import { network } from "hardhat";

async function main() {
  const { ethers } = await network.connect();
  const contractFactory = await ethers.getContractFactory("AcademicRecords");
  const contract = await contractFactory.deploy();
  await contract.waitForDeployment();

  const deployedAddress = await contract.getAddress();
  console.log(`AcademicRecords deployed to: ${deployedAddress}`);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});
