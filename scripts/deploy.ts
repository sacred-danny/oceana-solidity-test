import { ethers } from 'hardhat';

async function main() {
  const Solution = await ethers.getContractFactory("Solution");
  const solution = await Solution.deploy();
  await solution.deployed();
  console.log("Solution deployed to:", solution.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
