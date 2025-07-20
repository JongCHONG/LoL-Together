import mongoose, { Document, Schema, Types } from "mongoose";
import { Availabilities } from "./types";

export interface ITeam extends Document {
  leader_id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  discord?: string;
  languages?: string[];
  region?: string[];
  availabilities?: Availabilities[];
  users?: Types.ObjectId[];
  announces?: Types.ObjectId[];
}

const TeamSchema = new Schema<ITeam>(
  {
    leader_id: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    logo: { type: String },
    languages: [{ type: String }],
    region: [{ type: String }],
    description: { type: String },
    availabilities: {
      monday: { type: Boolean, default: false },
      tuesday: { type: Boolean, default: false },
      wednesday: { type: Boolean, default: false },
      thursday: { type: Boolean, default: false },
      friday: { type: Boolean, default: false },
      saturday: { type: Boolean, default: false },
      sunday: { type: Boolean, default: false },
    },
    website: { type: String },
    discord: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    announces: [{ type: Schema.Types.ObjectId, ref: "Announce" }],
  },
  { timestamps: true }
);

TeamSchema.post("save", async (team: ITeam) => {
  await mongoose
    .model("User")
    .findByIdAndUpdate(team.leader_id, { $addToSet: { teams: team._id } });
  console.log(`Team ${team._id} added to leader ${team.leader_id}.`);
});

TeamSchema.post("findOneAndDelete", async (team: ITeam) => {
  const result = await mongoose
    .model("User")
    .updateMany({ teams: team._id }, { $pull: { teams: team._id } });
  console.log(`Team ${team._id} removed from ${result.modifiedCount} user(s).`);

  const announceResult = await mongoose
    .model("Announce")
    .deleteMany({ team: team._id });
  console.log(
    `Deleted ${announceResult.deletedCount} announce(s) for team ${team._id}.`
  );
});

const Team = mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
