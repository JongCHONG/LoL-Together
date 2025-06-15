import mongoose, { Schema, Document, Types } from "mongoose";

interface IConversation extends Document {
  messages: Types.ObjectId[];
  users: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

ConversationSchema.post("save", async function (conversation: IConversation) {
  await mongoose
    .model("User")
    .updateMany(
      { _id: { $in: conversation.users } },
      { $push: { conversations: conversation._id } }
    );
});

ConversationSchema.post(
  "findOneAndDelete",
  async function (conversation: IConversation) {
    await mongoose
      .model("User")
      .updateMany(
        { _id: { $in: conversation.users } },
        { $pull: { conversations: conversation._id } }
      );
    await mongoose
      .model("Message")
      .deleteMany({ conversationId: conversation._id });
  }
);

const Conversation = mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);

export default Conversation;
