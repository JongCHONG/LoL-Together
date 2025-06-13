import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  password: string;
  email: string;
  summoner_name: string;
  summoner_infos?: object;
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
    summoner_name: { type: String, required: true, unique: true },
    summoner_infos: { type: Object },
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

// UserSchema.post("save", async (user) => {
//   await mongoose
//     .model("Announcement")
//     .findOneAndUpdate(
//       { _id: user.announcements },
//       { $push: { users: user._id } }
//     );
//   await mongoose
//     .model("Conversation")
//     .findOneAndUpdate(
//       { _id: user.conversations },
//       { $push: { users: user._id } }
//     );
//   await mongoose
//     .model("Team")
//     .findOneAndUpdate({ _id: user.teams }, { $push: { users: user._id } });
// });

UserSchema.post("findOneAndDelete", async (user) => {
  await mongoose
    .model("Announce")
    .deleteMany({ user: user._id });
  // await mongoose
  //   .model("Conversation")
  //   .findOneAndUpdate(
  //     { _id: user.conversations },
  //     { $pull: { users: user._id } }
  //   );
  await mongoose.model("Team").updateMany(
    { users: user._id },
    { $pull: { users: user._id } }
  );
});

const User = mongoose.model("User", UserSchema);

export default User;
