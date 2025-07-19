import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAnnounce extends Document {
  user?: Types.ObjectId;
  text: string;
  team?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AnnounceSchema = new Schema<IAnnounce>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team" },
  },
  { timestamps: true }
);

AnnounceSchema.post("save", async (announce: IAnnounce) => {
  await mongoose
    .model("User")
    .findOneAndUpdate(
      { _id: announce.user },
      { $addToSet: { announces: announce._id } }
    );
  
  await mongoose
    .model("Team")
    .findOneAndUpdate(
      { _id: announce.team },
      { $addToSet: { announces: announce._id } }
    );
});

AnnounceSchema.post("findOneAndDelete", async (announce: IAnnounce) => {
  await mongoose
    .model("User")
    .findOneAndUpdate(
      { _id: announce.user },
      { $pull: { announces: announce._id } }
    );
  
  await mongoose
    .model("Team")
    .findOneAndUpdate(
      { _id: announce.team },
      { $pull: { announces: announce._id } }
    );
});

const Announce = mongoose.model<IAnnounce>("Announce", AnnounceSchema);
export default Announce;
