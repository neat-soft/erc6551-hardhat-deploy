// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers, upgrades } = require('hardhat');
const hre = require("hardhat");

async function main() {

  const ERC6551Registry = await ethers.getContractFactory("ERC6551Registry");
  const ERC6551Account = await ethers.getContractFactory("ERC6551Account");
  // deploy contract 
  let registry = await ERC6551Registry.deploy();
  let account = await ERC6551Account.deploy();
  await registry.deployed();
  await account.deployed();
  console.log("ERC6551Registry address: ", registry.address);
  console.log("ERC6551Account address: ", account.address);
}


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
