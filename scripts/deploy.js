const hre = require("hardhat");

async function main() {
  console.log("Déploiement du contrat DiplomeSBT...");

  const DiplomeSBT = await hre.ethers.getContractFactory("DiplomeSBT");
  const diplome = await DiplomeSBT.deploy();

  await diplome.waitForDeployment();

  const address = await diplome.getAddress();
  console.log("-----------------------------------------");
  console.log(`Contrat DiplomeSBT déployé avec succès !`);
  console.log(`Adresse : ${address}`);
  console.log(`Propriétaire : ${await diplome.owner()}`);
  console.log("-----------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
