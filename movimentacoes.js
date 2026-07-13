import prisma from "../config/prisma.js";

class MovimentacaoController {

    // Entrada de estoque
    async entrada(req, res) {

        const { produtoId, quantidade, usuarioId } = req.body;

        try {

            const produto = await prisma.produto.findUnique({
                where: {
                    id: Number(produtoId)
                }
            });

            if (!produto) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado."
                });
            }

            const saldoAnterior = produto.quantidade;
            const saldoAtual = saldoAnterior + Number(quantidade);

            await prisma.produto.update({
                where: {
                    id: Number(produtoId)
                },
                data: {
                    quantidade: saldoAtual
                }
            });

            await prisma.movimentacao.create({
                data: {
                    tipo: "ENTRADA",
                    quantidade: Number(quantidade),
                    saldoAnterior,
                    saldoAtual,
                    usuarioId: Number(usuarioId),
                    produtoId: Number(produtoId)
                }
            });

            return res.json({
                mensagem: "Entrada registrada com sucesso."
            });

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

    // Saída de estoque
    async saida(req, res) {

        const { produtoId, quantidade, usuarioId } = req.body;

        try {

            const produto = await prisma.produto.findUnique({
                where: {
                    id: Number(produtoId)
                }
            });

            if (!produto) {

                return res.status(404).json({
                    mensagem: "Produto não encontrado."
                });

            }

            if (produto.quantidade < quantidade) {

                return res.status(400).json({
                    mensagem: "Estoque insuficiente."
                });

            }

            const saldoAnterior = produto.quantidade;
            const saldoAtual = saldoAnterior - Number(quantidade);

            await prisma.produto.update({

                where: {
                    id: Number(produtoId)
                },

                data: {
                    quantidade: saldoAtual
                }

            });

            await prisma.movimentacao.create({

                data: {

                    tipo: "SAIDA",

                    quantidade: Number(quantidade),

                    saldoAnterior,

                    saldoAtual,

                    usuarioId: Number(usuarioId),

                    produtoId: Number(produtoId)

                }

            });

            return res.json({
                mensagem: "Saída registrada com sucesso."
            });

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

    // Histórico
    async listar(req, res) {

        try {

            const movimentacoes = await prisma.movimentacao.findMany({

                include: {
                    usuario: true,
                    produto: true
                },

                orderBy: {
                    createdAt: "desc"
                }

            });

            return res.json(movimentacoes);

        } catch (erro) {

            return res.status(500).json({
                mensagem: erro.message
            });

        }

    }

}

export default new MovimentacaoController();