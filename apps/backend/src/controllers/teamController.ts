import { Request, Response } from "express";

import { TeamService } from "../services/teamService";

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await TeamService.getAllTeams();
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const team = await TeamService.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }
    res.status(200).json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const team = await TeamService.createTeam(data);

    await team.save();
    res.status(201).json({ message: "Team created successfully", team });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  const updateData = req.body;

  try {
    const updatedTeam = await TeamService.updateTeam(teamId, updateData);
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res
      .status(200)
      .json({ message: "Update Team successfully", team: updatedTeam });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  const { teamId } = req.params;
  try {
    const deletedTeam = await TeamService.deleteTeam(teamId);
    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addUserToTeam = async (req: Request, res: Response) => {
  const { userId, teamId } = req.body;

  try {
    await TeamService.addUserToTeam(userId, teamId);
    res.status(200).json({ message: "User add to team successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeUserFromTeam = async (req: Request, res: Response) => {
  const { userId, teamId } = req.body;

  try {
    await TeamService.removeUserFromTeam(userId, teamId);
    res.status(200).json({ message: "User removed from team successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
