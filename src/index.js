require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { ethers } = require("ethers");
const abi = require("../artifacts/contracts/HistoriaClinica.sol/HistoriaClinica.json");

// Configurar conexión con Ethereum (Sepolia)
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contrato = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi.abi, signer);

// Definir el esquema GraphQL
const schema = buildSchema(`
  type Query {
    _: Boolean
  }

  type Mutation {
    registrarHistoria(
      fecha: String!
      sintomas: String!
      diagnostico: String!
      tratamiento: String!
    ): String
  }
`);

// Resolver de las mutaciones
const root = {
  registrarHistoria: async ({ fecha, sintomas, diagnostico, tratamiento }) => {
    try {
      const tx = await contrato.registrarHistoria(fecha, sintomas, diagnostico, tratamiento);
      await tx.wait(); // Espera que se mine
      return tx.hash;
    } catch (err) {
      console.error("Error en registrarHistoria:", err);
      throw new Error("Fallo al registrar en la blockchain");
    }
  },
};

// Crear servidor
const app = express();
app.use("/graphql", graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

// Iniciar microservicio
app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000/graphql");
});
