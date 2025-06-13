import mongoose from "mongoose";

import Team, { ITeam } from "../models/Team";
import User from "../models/User";

class TeamService {
  async getAllTeams(): Promise<ITeam[]> {
    return await Team.find();
  }

  async getTeamById(teamId: string): Promise<ITeam | null> {
    return await Team.findById(teamId).populate("users", "-password");
    // .populate("announcements");
  }

  async createTeam(leaderId: string, name: string): Promise<ITeam> {
    const team = new Team({
      leader_id: leaderId,
      name,
      users: [leaderId],
    });
    return await team.save();
  }

  async updateTeam(
    teamId: string,
    updateData: Partial<ITeam>
  ): Promise<ITeam | null> {
    return await Team.findByIdAndUpdate(teamId, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    });
  }

  async deleteTeam(teamId: string): Promise<ITeam | null> {
    return await Team.findByIdAndDelete(teamId);
  }

  async addUserToTeam(userId: string, teamId: string) {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(teamId)
    ) {
      throw new Error("ID invalide.");
    }

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { teams: teamId } },
      { new: true }
    );

    await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { users: userId } },
      { new: true }
    );
  }

  async removeUserFromTeam(userId: string, teamId: string) {
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(teamId)
    ) {
      throw new Error("ID invalide.");
    }

    await User.findByIdAndUpdate(
      userId,
      { $pull: { teams: teamId } },
      { new: true }
    );

    await Team.findByIdAndUpdate(
      teamId,
      { $pull: { users: userId } },
      { new: true }
    );
  }
}

export default new TeamService();
