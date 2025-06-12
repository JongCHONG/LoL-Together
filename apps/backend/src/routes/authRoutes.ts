import { Router, RequestHandler } from "express";

import { signUp, login } from "../controllers/authController";
import { checkUserExists } from "../middlewares/checkUserExists";

const router = Router();

router.post("/signup", checkUserExists, signUp as RequestHandler);
router.post("/login", login as RequestHandler);

export default router;
