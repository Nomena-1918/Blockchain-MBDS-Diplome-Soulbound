const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DiplomeSBT Smart Contract", function () {
  let DiplomeSBT;
  let diplomeContract;
  let owner;
  let student1;
  let student2;
  let stranger;

  const mockCid = "QmX9bJX3kFRs7tWvFp1LkGz8mN5sQ2yRhTc4wU6vD8eA1b";

  beforeEach(async function () {
    [owner, student1, student2, stranger] = await ethers.getSigners();
    DiplomeSBT = await ethers.getContractFactory("DiplomeSBT");
    diplomeContract = await DiplomeSBT.deploy();
  });

  describe("1. Déploiement", function () {
    it("Devrait définir le bon propriétaire (Owner)", async function () {
      expect(await diplomeContract.owner()).to.equal(owner.address);
    });

    it("Devrait initialiser le nom et le symbole corrects", async function () {
      expect(await diplomeContract.name()).to.equal("ITU SBT Diploma");
      expect(await diplomeContract.symbol()).to.equal("ITUSBT");
    });
  });

  describe("2. Émission de diplômes (Mint)", function () {
    it("Devrait permettre à l'owner d'émettre un diplôme", async function () {
      const tx = await diplomeContract.connect(owner).mint(student1.address, mockCid);
      await tx.wait();

      expect(await diplomeContract.balanceOf(student1.address)).to.equal(1);
      const tokenId = await diplomeContract.studentTokens(student1.address);
      expect(tokenId).to.equal(0);

      expect(await diplomeContract.tokenURI(tokenId)).to.equal(`ipfs://${mockCid}`);
    });

    it("Devrait échouer si une adresse tierce tente d'émettre un diplôme", async function () {
      await expect(
        diplomeContract.connect(stranger).mint(student1.address, mockCid)
      ).to.be.revertedWithCustomError(diplomeContract, "OnlyUniversityAdmin");
    });

    it("Devrait interdire l'émission vers l'adresse zéro", async function () {
      await expect(
        diplomeContract.connect(owner).mint(ethers.ZeroAddress, mockCid)
      ).to.be.revertedWithCustomError(diplomeContract, "InvalidRecipientAddress");
    });

    it("Devrait interdire l'émission avec un CID vide", async function () {
      await expect(
        diplomeContract.connect(owner).mint(student1.address, "")
      ).to.be.revertedWithCustomError(diplomeContract, "InvalidIPFSHash");
    });

    it("Devrait interdire l'émission de multiples diplômes pour un même étudiant", async function () {
      await diplomeContract.connect(owner).mint(student1.address, mockCid);
      
      await expect(
        diplomeContract.connect(owner).mint(student1.address, "anotherCid")
      ).to.be.revertedWithCustomError(diplomeContract, "StudentAlreadyHasDiploma");
    });
  });

  describe("3. Invariance Soulbound (Critique)", function () {
    beforeEach(async function () {
      await diplomeContract.connect(owner).mint(student1.address, mockCid);
    });

    it("Devrait bloquer le transfert de jeton via transferFrom", async function () {
      const tokenId = await diplomeContract.studentTokens(student1.address);
      
      await expect(
        diplomeContract.connect(student1).transferFrom(student1.address, student2.address, tokenId)
      ).to.be.revertedWithCustomError(diplomeContract, "TokenIsSoulbound");
    });

    it("Devrait bloquer le transfert de jeton via safeTransferFrom", async function () {
      const tokenId = await diplomeContract.studentTokens(student1.address);
      
      await expect(
        diplomeContract.connect(student1)["safeTransferFrom(address,address,uint256)"](
          student1.address, 
          student2.address, 
          tokenId
        )
      ).to.be.revertedWithCustomError(diplomeContract, "TokenIsSoulbound");
    });

    it("Devrait bloquer les transferts initiés par l'owner du contrat", async function () {
      const tokenId = await diplomeContract.studentTokens(student1.address);
      
      await expect(
        diplomeContract.connect(owner).transferFrom(student1.address, student2.address, tokenId)
      ).to.be.revertedWithCustomError(diplomeContract, "TokenIsSoulbound");
    });

    it("Devrait interdire l'approbation de transfert (approve)", async function () {
      const tokenId = await diplomeContract.studentTokens(student1.address);
      
      await expect(
        diplomeContract.connect(student1).approve(stranger.address, tokenId)
      ).to.be.revertedWithCustomError(diplomeContract, "TokenIsSoulbound");
    });

    it("Devrait interdire l'approbation globale (setApprovalForAll)", async function () {
      await expect(
        diplomeContract.connect(student1).setApprovalForAll(stranger.address, true)
      ).to.be.revertedWithCustomError(diplomeContract, "TokenIsSoulbound");
    });
  });
});
