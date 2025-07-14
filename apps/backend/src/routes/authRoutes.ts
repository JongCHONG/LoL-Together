import { Router, RequestHandler } from "express";

import { register, login } from "../controllers/authController";
import { checkUserExists } from "../middlewares/checkUserExists";

const router = Router();

router.post("/register", checkUserExists, register as RequestHandler);
router.post("/login", login as RequestHandler);

export default router;
