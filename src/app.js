/* eslint-disable no-unused-vars */
import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import mongoose from "mongoose";
import ManipuladorDeErros from "./middlewares/ManipuladorDeErros.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);

app.use(ManipuladorDeErros);

export default app;