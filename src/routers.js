import { Router } from "express";

import authController from "../controllers/authController.js";

const router = Router();

router.post("/cadastro", authController.cadastrar);

router.post("/login", authController.login);

export default router;