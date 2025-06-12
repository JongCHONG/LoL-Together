import { Router, RequestHandler } from "express";

import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/teamController";
import { checkTeamExists } from "../middlewares/checkTeamExists";

const router = Router();

router.get("/list", getTeams);
router.get("/:teamId", getTeams as RequestHandler);
router.post("/create", checkTeamExists, createTeam as RequestHandler);
router.put("/:teamId", checkTeamExists, updateTeam as RequestHandler);
router.delete("/:teamId", deleteTeam as RequestHandler);

export default router;
