import { Router, RequestHandler } from "express";

import {
  getAllTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  addUserToTeam,
  removeUserFromTeam,
} from "../controllers/teamController";
import { checkTeamNameExists } from "../middlewares/checkTeamNameExists";
import { checkUserInTeam, checkUserNotInTeam } from "../middlewares/checkUserInTeam";

const router = Router();

router.get("/list", getAllTeams);
router.get("/:teamId", getAllTeams as RequestHandler);
router.post("/create", checkTeamNameExists, createTeam as RequestHandler);
router.put("/:teamId", updateTeam as RequestHandler);
router.delete("/:teamId", deleteTeam as RequestHandler);
router.post("/add-user", checkUserInTeam, addUserToTeam as RequestHandler);
router.post("/remove-user", checkUserNotInTeam, removeUserFromTeam as RequestHandler);

export default router;
