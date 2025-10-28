import express from "express";
import dotenv from "dotenv";
import routes from "./infra/routes/routes";
import {errorHandler} from "./infra/utils/error-handler";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
