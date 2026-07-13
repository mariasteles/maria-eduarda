import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(authRoutes);

app.get("/", (req, res) => {

    res.json({
        mensagem: "API do Almoxarifado"
    });

});

export default app;