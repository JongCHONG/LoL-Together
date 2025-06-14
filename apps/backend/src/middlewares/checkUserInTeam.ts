import { Request, Response, NextFunction } from "express";
import Team from "../models/Team";

export const checkUserInTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, teamId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    if (team.users && team.users.includes(userId)) {
      res.status(400).json({ message: "User already in team" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkUserNotInTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, teamId } = req.body;

    const team = await Team.findById(teamId);
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }

    if (team.users && team.users.includes(userId)) {
      res.status(400).json({ message: "User is not in team" });
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};
