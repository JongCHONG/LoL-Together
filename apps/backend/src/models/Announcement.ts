import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAnnouncement extends Document {
  user: Types.ObjectId;
  text: string;
  team: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

// Hook post-save pour synchroniser avec User et Team
// AnnouncementSchema.post("save", async (announcement: IAnnouncement) => {
//   await mongoose
//     .model("User")
//     .findOneAndUpdate(
//       { _id: announcement.user },
//       { $addToSet: { announcements: announcement._id } }
//     );
  
//   await mongoose
//     .model("Team")
//     .findOneAndUpdate(
//       { _id: announcement.team },
//       { $addToSet: { announcements: announcement._id } }
//     );
// });

// Hook post-delete pour nettoyer les références
// AnnouncementSchema.post("findOneAndDelete", async (announcement: IAnnouncement) => {
//   await mongoose
//     .model("User")
//     .findOneAndUpdate(
//       { _id: announcement.user },
//       { $pull: { announcements: announcement._id } }
//     );
  
//   await mongoose
//     .model("Team")
//     .findOneAndUpdate(
//       { _id: announcement.team },
//       { $pull: { announcements: announcement._id } }
//     );
// });

const Announcement = mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);
export default Announcement;
