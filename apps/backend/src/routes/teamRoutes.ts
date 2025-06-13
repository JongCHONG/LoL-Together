import { Router, RequestHandler } from "express";

import {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  addUserToTeam,
  removeUserFromTeam
} from "../controllers/teamController";
import { checkTeamExists } from "../middlewares/checkTeamExists";

const router = Router();

router.get("/list", getAllTeams);
router.get("/:teamId", getAllTeams as RequestHandler);
router.post("/create", checkTeamExists, createTeam as RequestHandler);
router.put("/:teamId", checkTeamExists, updateTeam as RequestHandler);
router.delete("/:teamId", deleteTeam as RequestHandler);
router.post("/add-user", addUserToTeam as RequestHandler);
router.post("/remove-user", removeUserFromTeam as RequestHandler);

export default router;
