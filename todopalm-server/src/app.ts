import cors from "cors";
import express from "express";
import { authenticateJwtRequestToken } from "./api/v1/middleware/jwt";
import v1Router from "./api/v1/routes";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(authenticateJwtRequestToken());

app.use("/api/v1", v1Router);

export default app;
