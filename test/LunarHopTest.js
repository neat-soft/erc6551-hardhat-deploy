const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const provider = waffle.provider;

require("@nomiclabs/hardhat-ethers");

describe("Test LunarHopMiner", function () {
    let owner, accounts, casino, admc; //  CEO: accounts[0], DEV: accounts[1]
    before(async () => {
        [owner, ...accounts] = await ethers.getSigners();

        const ADMCv2 = await ethers.getContractFactory("ADMCv2");
        admc = await ADMCv2.deploy("ADMCv2", "ADMC");
        await admc.deployed();
        console.log("admc address: ", admc.address);

        console.log("hello");
        const Casino = await ethers.getContractFactory("Casino");
        casino = await Casino.deploy("0xf87b8cC994125E5B2a82ed6d83fC4Df6f46B73CF");
        await casino.deployed();
        console.log("casino address: ", casino.address);
    });

    it("Purchase LunarHop NFT Test", async function() {
        console.log("-Purchase LunarHop NFT Test");
        const level = 0;
        const price = 50;
        await erc20Token.transfer(accounts[2].address, ethers.utils.parseEther(price.toString()));
        await erc20Token.connect(accounts[2]).approve(miner.address, ethers.utils.parseEther(price.toString()));
        await miner.connect(accounts[2]).buyLunarHop(level, accounts[0].address);

        await erc20Token.transfer(accounts[2].address, ethers.utils.parseEther(price.toString()));
        await erc20Token.connect(accounts[2]).approve(miner.address, ethers.utils.parseEther(price.toString()));
        await miner.connect(accounts[2]).buyLunarHop(level, accounts[0].address);
                
        await network.provider.send("evm_increaseTime", [30 * 24 * 3600]);
        await network.provider.send("evm_mine");

        // await miner.connect(accounts[2]).claimRewards(0);
        
        // await miner.connect(accounts[2]).buyAgain(level);
        await network.provider.send("evm_increaseTime", [1 * 24 * 3600]);
        await network.provider.send("evm_mine");

        console.log("Balance of account0: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[0].address)));
        console.log("Balance of account1: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[1].address)));
        console.log("Balance of account2: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[2].address)));
        console.log("InvestInfo of account2: ", await miner.connect(accounts[2]).getUserInfo());
        console.log("DepositInfo of account2: ", await miner.getUserDepositInfo(accounts[2].address, 0));
        
        await miner.connect(accounts[2]).sellLunarHop(0);
        let depositInfo = await miner.connect(accounts[2]).userInfo();

        console.log("Deposit: ", depositInfo);
        console.log("Total Rewards: ", await miner.getTotalRewards(accounts[2].address));
    });

    it("Referral Bonus Test", async function() {
        await miner.connect(accounts[1]).withdrawRefBonus();
        console.log("Balance of account0: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[1].address)));
    });

    // it("Users can buy Bored Apes. for example level 5", async function() {
    //     const level = 5;
    //     const price = 1000;
    //     await erc20Token.approve(miner.address, ethers.utils.parseEther(price.toString()));
    //     await miner.buyLunarHop(ethers.utils.parseEther(price.toString()), level, accounts[0].address);
    //     console.log("Contract Balance after buying Bored Ape whose level is ", level, ": ", ethers.utils.formatEther(await miner.getBalance()));
    //     await miner.connect(accounts[0]).withdrawRefBonus();
    //     console.log("Ref Amount: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[0].address)));

    //     await network.provider.send("evm_increaseTime", [7 * 24 * 3600]);
    //     await network.provider.send("evm_mine");
    //     console.log("Rewards Amount after 1 week", ethers.utils.formatEther(await miner.calcdiv(owner.address)));

    //     await network.provider.send("evm_increaseTime", [100 * 24 * 3600]);
    //     await network.provider.send("evm_mine");

    //     console.log("Rewards Amount after 100 days", ethers.utils.formatEther(await miner.calcdiv(owner.address)));
        
    //     console.log("Claimed Rewards Amount: ", await miner.claimRewards());
    // });

    // it("Users can buy Bored Apes. for example level 5", async function() {
    //     const level = 4;
    //     const price = 300;
    //     await erc20Token.approve(miner.address, ethers.utils.parseEther(price.toString()));
    //     await miner.buyLunarHop(ethers.utils.parseEther(price.toString()), level, accounts[0].address);
    //     console.log("Contract Balance after buying Bored Ape whose level is ", level, ": ", ethers.utils.formatEther(await miner.getBalance()));
    //     await miner.connect(accounts[0]).withdrawRefBonus();
    //     console.log("Ref Amount: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[0].address)));

    //     await network.provider.send("evm_increaseTime", [7 * 24 * 3600]);
    //     await network.provider.send("evm_mine");
    //     console.log("Rewards Amount after 1 week", ethers.utils.formatEther(await miner.calcdiv(owner.address)));

    //     await network.provider.send("evm_increaseTime", [100 * 24 * 3600]);
    //     await network.provider.send("evm_mine");

    //     console.log("Rewards Amount after 100 days", ethers.utils.formatEther(await miner.calcdiv(owner.address)));
        
    //     console.log("Claimed Rewards Amount: ", await miner.claimRewards());
    // });

    // it("Users can buy Bored Apes. for example level 5", async function() {
    //     const level = 3;
    //     const price = 120;
    //     await erc20Token.approve(miner.address, ethers.utils.parseEther(price.toString()));
    //     await miner.buyLunarHop(ethers.utils.parseEther(price.toString()), level, accounts[0].address);
    //     console.log("Contract Balance after buying Bored Ape whose level is ", level, ": ", ethers.utils.formatEther(await miner.getBalance()));
    //     await miner.connect(accounts[0]).withdrawRefBonus();
    //     console.log("Ref Amount: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[0].address)));

    //     await network.provider.send("evm_increaseTime", [7 * 24 * 3600]);
    //     await network.provider.send("evm_mine");
    //     console.log("Rewards Amount after 1 week", ethers.utils.formatEther(await miner.calcdiv(owner.address)));

    //     await network.provider.send("evm_increaseTime", [100 * 24 * 3600]);
    //     await network.provider.send("evm_mine");

    //     console.log("Rewards Amount after 100 days", ethers.utils.formatEther(await miner.calcdiv(owner.address)));
        
    //     console.log("Claimed Rewards Amount: ", await miner.claimRewards());
    // });

    // it("Users can buy Bored Apes. for example level 5", async function() {
    //     const level = 2;
    //     const price = 20;
    //     await erc20Token.approve(miner.address, ethers.utils.parseEther(price.toString()));
    //     await miner.buyLunarHop(ethers.utils.parseEther(price.toString()), level, accounts[0].address);
    //     console.log("Contract Balance after buying Bored Ape whose level is ", level, ": ", ethers.utils.formatEther(await miner.getBalance()));
    //     await miner.connect(accounts[0]).withdrawRefBonus();
    //     console.log("Ref Amount: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[0].address)));

    //     await network.provider.send("evm_increaseTime", [7 * 24 * 3600]);
    //     await network.provider.send("evm_mine");
    //     console.log("Rewards Amount after 1 week", ethers.utils.formatEther(await miner.calcdiv(owner.address)));

    //     await network.provider.send("evm_increaseTime", [100 * 24 * 3600]);
    //     await network.provider.send("evm_mine");

    //     console.log("Rewards Amount after 100 days", ethers.utils.formatEther(await miner.calcdiv(owner.address)));
        
    //     console.log("Claimed Rewards Amount: ", await miner.claimRewards());
    // });

    // it("Users can buy Bored Apes. for example level 5", async function() {
    //     const level = 1;
    //     const price = 5;
    //     await erc20Token.approve(miner.address, ethers.utils.parseEther(price.toString()));
    //     await miner.buyLunarHop(ethers.utils.parseEther(price.toString()), level, accounts[0].address);
    //     console.log("Contract Balance after buying Bored Ape whose level is ", level, ": ", ethers.utils.formatEther(await miner.getBalance()));
    //     await miner.connect(accounts[0]).withdrawRefBonus();
    //     console.log("Ref Amount: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[0].address)));

    //     await network.provider.send("evm_increaseTime", [7 * 24 * 3600]);
    //     await network.provider.send("evm_mine");
    //     console.log("Rewards Amount after 1 week", ethers.utils.formatEther(await miner.calcdiv(owner.address)));

    //     await network.provider.send("evm_increaseTime", [100 * 24 * 3600]);
    //     await network.provider.send("evm_mine");

    //     console.log("Rewards Amount after 100 days", ethers.utils.formatEther(await miner.calcdiv(owner.address)));
        
    //     console.log("Claimed Rewards Amount: ", await miner.claimRewards());
    // });

    // it("Users can buy Bored Apes. for example level 5", async function() {
    //     const level = 0;
    //     const price = 0;
    //     await erc20Token.approve(miner.address, ethers.utils.parseEther(price.toString()));
    //     await miner.buyLunarHop(ethers.utils.parseEther(price.toString()), level, accounts[0].address);
    //     console.log("Contract Balance after buying Bored Ape whose level is ", level, ": ", ethers.utils.formatEther(await miner.getBalance()));
    //     await miner.connect(accounts[0]).withdrawRefBonus();
    //     console.log("Ref Amount: ", ethers.utils.formatEther(await erc20Token.balanceOf(accounts[0].address)));

    //     await network.provider.send("evm_increaseTime", [7 * 24 * 3600]);
    //     await network.provider.send("evm_mine");
    //     console.log("Rewards Amount after 1 week", ethers.utils.formatEther(await miner.calcdiv(owner.address)));

    //     await network.provider.send("evm_increaseTime", [100 * 24 * 3600]);
    //     await network.provider.send("evm_mine");

    //     console.log("Rewards Amount after 100 days", ethers.utils.formatEther(await miner.calcdiv(owner.address)));
        
    //     console.log("Claimed Rewards Amount: ", await miner.claimRewards());
    // });
});