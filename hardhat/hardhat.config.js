// Hardhat configuration for the Academic Records smart contract.
// Uses dotenv to load the PRIVATE_KEY from a local .env file.
// The private key is only used on the backend and must NEVER be committed.

require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

/** @type import("hardhat/config").HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    // In-memory Hardhat network for fast local testing.
    hardhat: {},

    // Local Hardhat node running at http://127.0.0.1:8545
    // The PRIVATE_KEY account will be used as the deployer/admin.
    localhost: {
      url: "http://127.0.0.1:8545",
      // Only set accounts if a PRIVATE_KEY is provided to avoid accidental empty config.
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : undefined,
    },
  },
};

