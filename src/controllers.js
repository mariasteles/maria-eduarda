import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {

    async cadastrar(req, res) {

        const { nome, email, senha, tipo } = req.body;

        try {

            const usuarioExiste = await prisma.usuario.findUnique({
                where: {
                    email
                }
            });

            if (usuarioExiste) {
                return res.status(400).json({
                    mensagem: "Este e-mail já está cadastrado."
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

            return res.status(201).json({

                mensagem: "Usuário cadastrado com sucesso.",

                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo: usuario.tipo
                }

            });

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
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
                    mensagem: "Email ou senha inválidos."
                });

            }

            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );

            if (!senhaCorreta) {

                return res.status(401).json({
                    mensagem: "Email ou senha inválidos."
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

            return res.json({

                mensagem: "Login realizado com sucesso.",

                token

            });

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

}

export default new AuthController();