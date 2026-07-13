import { Router } from "express";
import movimentacaoController from "../controllers/movimentacaoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/entrada", authMiddleware, movimentacaoController.entrada);

router.post("/saida", authMiddleware, movimentacaoController.saida);

router.get("/movimentacoes", authMiddleware, movimentacaoController.listar);

export default router;