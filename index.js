import express, { Router } from "express";
import cors from "cors";
import swagger from "swagger-ui-express";
import { swaggerDocument } from "./docs/swagger.js";

import { MongoDbConnection } from "./database/mongo/connection/connect.js";
import { makeUserFactory } from "./factories/user.factori.js";
import { makeCharacterFactory } from "./factories/character.factori.js";
import { makeAuthFactory } from "./factories/auth.factori.js";

const ConnectDb = new MongoDbConnection();
await ConnectDb.ConnectDb();

//const swagger = require ('swagger-ui-express')();
//const swaggerDocument = require("./docs/swagger.json");

const app = express();
const router = Router();


const user = makeUserFactory(router);
const character = makeCharacterFactory(router);
const auth = makeAuthFactory(router);

app.use(express.json());
app.use(cors());
app.use("/users", user.route());
app.use("/character", character.route());
app.use("/auth", auth.route());
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando em: http://localhost:3000");
});
