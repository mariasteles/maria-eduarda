const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {

    async register(req, res) {

        const { nome, email, senha, tipo } = req.body;

        try {

            const existe = await prisma.usuario.findUnique({
                where: {
                    email
                }
            });

            if (existe) {
                return res.status(400).json({
                    message: "Email já cadastrado."
                });
            }

            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: senhaCriptografada,
                    tipo
                }
            });

            res.status(201).json(usuario);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

    async login(req, res) {

        const { email, senha } = req.body;

        try {

            const usuario = await prisma.usuario.findUnique({
                where: {
                    email
                }
            });

            if (!usuario) {

                return res.status(401).json({
                    message: "Email ou senha inválidos."
                });

            }

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {

                return res.status(401).json({
                    message: "Email ou senha inválidos."
                });

            }

            const token = jwt.sign(

                {
                    id: usuario.id,
                    tipo: usuario.tipo
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "8h"
                }

            );

            res.json({

                message: "Login realizado.",

                token

            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

}

module.exports = new AuthController();