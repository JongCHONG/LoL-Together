import mongoose from "mongoose";

import Team, { ITeam } from "../models/Team";
import User from "../models/User";

export class TeamService {
 static async getAllTeams(): Promise<ITeam[]> {
    return await Team.find();
  }

 static async getTeamById(teamId: string): Promise<ITeam | null> {
    return await Team.findById(teamId).populate("users", "-password");
    // .populate("announcements");
  }

 static async createTeam(leaderId: string, name: string): Promise<ITeam> {
    const team = new Team({
      leader_id: leaderId,
      name,
      users: [leaderId],
    });
    return await team.save();
  }

 static async updateTeam(
    teamId: string,
    updateData: Partial<ITeam>
  ): Promise<ITeam | null> {
    return await Team.findByIdAndUpdate(teamId, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    });
  }

 static async deleteTeam(teamId: string): Promise<ITeam | null> {
    return await Team.findByIdAndDelete(teamId);
  }

 static async addUserToTeam(userId: string, teamId: string) {
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

 static async removeUserFromTeam(userId: string, teamId: string) {
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

