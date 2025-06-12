import { Router, RequestHandler } from "express";

import { getTeams } from "../controllers/teamController";

const router = Router();

router.get("/list", getTeams);

export default router;
