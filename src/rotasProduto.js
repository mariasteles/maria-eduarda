import { Router } from "express";

import produtoController from "../controllers/produtoController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = Router();

router.get(
    "/produtos",
    authMiddleware,
    produtoController.listar
);

router.get(
    "/produtos/:id",
    authMiddleware,
    produtoController.buscar
);

router.post(
    "/produtos",
    authMiddleware,
    adminMiddleware,
    produtoController.cadastrar
);

router.put(
    "/produtos/:id",
    authMiddleware,
    adminMiddleware,
    produtoController.atualizar
);

router.delete(
    "/produtos/:id",
    authMiddleware,
    adminMiddleware,
    produtoController.excluir
);

export default router;