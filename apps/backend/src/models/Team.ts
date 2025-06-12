import mongoose, { Document, Schema, Types } from "mongoose";

export interface ITeam extends Document {
  leader_id: string;
  name: string;
  logo?: string;
  rank?: string;
  languages?: string[];
  region?: string;
  description?: string;
  disponibilities?: string[];
  website?: string;
  users?: Types.ObjectId[];
  announcements?: Types.ObjectId[];
}

const TeamSchema = new Schema<ITeam>(
  {
    leader_id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    logo: { type: String },
    rank: { type: String },
    languages: [{ type: String }],
    region: { type: String },
    description: { type: String },
    disponibilities: [{ type: String }],
    website: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    announcements: [{ type: Schema.Types.ObjectId, ref: "Announcement" }],
  },
  { timestamps: true }
);

TeamSchema.post("save", async (team: ITeam) => {
  await mongoose
    .model("User")
    .findOneAndUpdate(
      { _id: { $in: team.leader_id } },
      { $push: { teams: team._id } }
    );
  console.log(`Team ${team._id} added to leader ${team.leader_id}.`);
});

TeamSchema.post("findOneAndDelete", async (team: ITeam) => {
  const result = await mongoose
    .model("User")
    .updateMany(
      { teams: team._id },
      { $pull: { teams: team._id } }
    );
  console.log(`Team ${team._id} removed from ${result.modifiedCount} user(s).`);
});

const Team = mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
