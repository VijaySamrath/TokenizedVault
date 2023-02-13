const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Erc4626 Tokenized Vault", async function () {

    async function deploy() {
        
        const TestToken = await ethers.getContractFactory("TestToken");
        testToken = await TestToken.deploy()
        await testToken.deployed()
        console.log("TestToken deployed to address:", testToken.address)
      
        const ERC4626TokenizedVault = await ethers.getContractFactory("ERC4626TokenizedVault");
        eRC4626TokenizedVault = await ERC4626TokenizedVault.deploy(testToken.address)
        await eRC4626TokenizedVault.deployed()
        console.log("ERC4626TokenizedVault deployed to address:", eRC4626TokenizedVault.address)
      
}

  before("Before", async () => {
        accounts = await ethers.getSigners();
        await deploy();
    })

    it("should Token name be", async () => {
      
        console.log("Token Name", await testToken.name())

        console.log("Token name of the Vault", await eRC4626TokenizedVault.name())
      
    })

    it("providing Asset to the Vault" , async () => {
        
        await testToken.transfer(eRC4626TokenizedVault.address, ethers.utils.parseEther("1"))
        console.log("Token balance of eRC4626TokenizedVault", await eRC4626TokenizedVault.totalAssets())

    })

    it("Deposit asset and providing address of the receiver for the Share given by the vault" , async () => {
        
        await testToken.approve(eRC4626TokenizedVault.address, 1000000000000000)

        console.log("Preview Deposit of token in the Vault", await eRC4626TokenizedVault.previewDeposit(100000000000))
        // await eRC4626TokenizedVault["deposit(uint256, address)"](100000000000, accounts[1].address)
        await eRC4626TokenizedVault["deposit(uint256)"](100000000000)
        console.log("Balance of accounts[0] in the Vault" , await eRC4626TokenizedVault.balanceOf(accounts[0].address))
        console.log("Total supply of the Vault", await eRC4626TokenizedVault.totalSupply())
        console.log("Token balance of eRC4626TokenizedVault", await eRC4626TokenizedVault.totalAssets())
        console.log("Shares for the Deposited Assets ", await eRC4626TokenizedVault.convertToShares(100000000000))
    
    })
    
    it("Testing the Mint function Token deposited in the vaults" , async () => {
        
        console.log("Preview Mint For the given share", await eRC4626TokenizedVault.previewMint(9999))
        await eRC4626TokenizedVault["mint(uint256,address)"](9999, accounts[1].address)
        console.log("Total supply of the Vault", await eRC4626TokenizedVault.totalSupply())

        console.log("Token balance of eRC4626TokenizedVault After minting the shares", await eRC4626TokenizedVault.totalAssets())

    })

    it("withdraw the asset deposited in the Vault", async() => {

        await eRC4626TokenizedVault["withdraw(uint256)"](100000009999)
        console.log("Total supply of the Vault", await eRC4626TokenizedVault.totalSupply())

    })

    it("Redeem the share From teh VAULT", async() => {

        console.log("Preview Redeem of the share", await eRC4626TokenizedVault.previewRedeem(999))
        await eRC4626TokenizedVault["redeem(uint256)"](9990000998)

    })

})   