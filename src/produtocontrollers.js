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

        const { nome } = req.query;
    
        const pagina = Number(req.query.pagina) || 1;
        const limite = Number(req.query.limite) || 10;
    
        try {
    
            const produtos = await prisma.produto.findMany({
    
                where: nome
                    ? {
                        nome: {
                            contains: nome,
                            mode: "insensitive"
                        }
                    }
                    : {},
    
                skip: (pagina - 1) * limite,
    
                take: limite,
    
                orderBy: {
                    nome: "asc"
                }
    
            });
    
            return res.status(200).json(produtos);
    
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