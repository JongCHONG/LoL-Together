import Team, { ITeam } from "../models/Team";

class TeamService {
  async getTeams(): Promise<ITeam[]> {
    return await Team.find();
  }

  async getTeamById(teamId: string): Promise<ITeam | null> {
    return await Team.findById(teamId)
      .populate("users", "-password")
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
}

export default new TeamService();