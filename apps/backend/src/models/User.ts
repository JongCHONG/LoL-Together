import mongoose, { Document, Schema, Types } from "mongoose";

export interface RiotInfos {
  profileIconId: number;
  summonerLevel: number;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
  gameEndTimestamp?: number; 
}

export interface IUser extends Document {
  password: string;
  email: string;
  riot_id: string;
  tagline: string;
  riot_infos?: RiotInfos;
  avatar?: string;
  discord?: string;
  region?: string;
  languages?: string[];
  description?: string;
  disponibilities?: string[];
  roles?: string[];
  announcements?: Types.ObjectId[];
  conversations?: Types.ObjectId[];
  teams?: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    riot_id: { type: String, required: true, unique: true },
    tagline: { type: String, required: true },
    riot_infos: { type: Object },
    avatar: { type: String },
    discord: { type: String },
    region: { type: String },
    languages: [{ type: String }],
    description: { type: String },
    disponibilities: [{ type: String }],
    roles: [{ type: String }],
    announcements: [{ type: Schema.Types.ObjectId, ref: "Announcement" }],
    conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }],
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  },
  { timestamps: true }
);


UserSchema.post("findOneAndDelete", async (user) => {
  await mongoose.model("Announce").deleteMany({ user: user._id });

  await mongoose
    .model("Team")
    .updateMany({ users: user._id }, { $pull: { users: user._id } });

  await mongoose
    .model("Message")
    .deleteMany({ $or: [{ sender: user._id }, { receiver: user._id }] });

  const conversations = await mongoose
    .model("Conversation")
    .find({ users: user._id })
    .select("_id");

  const conversationIds = conversations.map((conv) => conv._id);

  await mongoose
    .model("Conversation")
    .deleteMany({ _id: { $in: conversationIds } });

  if (conversationIds.length > 0) {
    await mongoose
      .model("Message")
      .deleteMany({ conversation: { $in: conversationIds } });
  }
});

const User = mongoose.model("User", UserSchema);

export default User;
