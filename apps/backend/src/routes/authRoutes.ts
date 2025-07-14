import { Router, RequestHandler } from "express";

import { register, login, logout } from "../controllers/authController";
import { checkUserExists } from "../middlewares/checkUserExists";

const router = Router();

router.post("/register", checkUserExists, register as RequestHandler);
router.post("/login", login as RequestHandler);
router.post("/logout", logout as RequestHandler);

export default router;
