const { ethers } = require("hardhat");

async function main() {

  const TestToken = await ethers.getContractFactory("TestToken");
  const testToken = await TestToken.deploy()
  await testToken.deployed()
  console.log("TestToken deployed to address:", testToken.address)

  const ERC4626TokenizedVault = await ethers.getContractFactory("ERC4626TokenizedVault");
  const eRC4626TokenizedVault = await ERC4626TokenizedVault.deploy(testToken.address)
  await eRC4626TokenizedVault.deployed()
  console.log("ERC4626TokenizedVault deployed to address:", eRC4626TokenizedVault.address)

  

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })