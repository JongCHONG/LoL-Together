import { Request, Response } from "express";
import Team from "../models/Team";

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  const { teamId } = req.params;

  try {
    const team = await Team.findById(teamId);
    // .populate("users", "-password")
    // .populate("announcements");
    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }
    res.status(200).json(team);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  const { leader_id, name } = req.body;

  try {
    const team = new Team({
      leader_id,
      name,
    });

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
    const updatedTeam = await Team.findByIdAndUpdate(teamId, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    });

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
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
