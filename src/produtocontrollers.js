import prisma from "../config/prisma.js";

class ProdutoController {

    // Cadastrar produto
    async cadastrar(req, res) {

        const { nome, descricao, quantidade } = req.body;

        try {

            const produto = await prisma.produto.create({
                data: {
                    nome,
                    descricao,
                    quantidade
                }
            });

            return res.status(201).json({
                mensagem: "Produto cadastrado com sucesso!",
                produto
            });

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

    // Listar todos os produtos
    async listar(req, res) {

        try {

            const produtos = await prisma.produto.findMany({
                orderBy: {
                    id: "asc"
                }
            });

            return res.json(produtos);

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

    // Buscar produto por ID
    async buscar(req, res) {

        const { id } = req.params;

        try {

            const produto = await prisma.produto.findUnique({
                where: {
                    id: Number(id)
                }
            });

            if (!produto) {

                return res.status(404).json({
                    mensagem: "Produto não encontrado."
                });

            }

            return res.json(produto);

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

    // Atualizar produto
    async atualizar(req, res) {

        const { id } = req.params;

        const { nome, descricao, quantidade } = req.body;

        try {

            const produto = await prisma.produto.update({

                where: {
                    id: Number(id)
                },

                data: {
                    nome,
                    descricao,
                    quantidade
                }

            });

            return res.json({
                mensagem: "Produto atualizado com sucesso!",
                produto
            });

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

    // Excluir produto
    async excluir(req, res) {

        const { id } = req.params;

        try {

            await prisma.produto.delete({

                where: {
                    id: Number(id)
                }

            });

            return res.json({
                mensagem: "Produto excluído com sucesso!"
            });

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

}

export default new ProdutoController();