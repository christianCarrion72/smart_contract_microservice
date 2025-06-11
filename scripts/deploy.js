require("dotenv").config();
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contract with account:", deployer.address);

  const HistoriaClinica = await ethers.getContractFactory("HistoriaClinica");
  const contrato = await HistoriaClinica.deploy();
  await contrato.waitForDeployment();

  console.log("Contrato desplegado en:", await contrato.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
