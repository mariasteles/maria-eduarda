const express = require("express");

const prisma = require("./config/prisma");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

    const usuarios = await prisma.usuario.findMany();

    res.json({
        mensagem: "API funcionando!",
        usuarios
    });

});

module.exports = app;