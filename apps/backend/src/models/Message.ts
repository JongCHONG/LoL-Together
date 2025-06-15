import { Schema, model, Document, Types } from "mongoose";

interface IMessage extends Document {
  text: string;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  conversationId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    text: {
      type: String,
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.post("findOneAndDelete", async function (message: IMessage) {
  await model("Conversation").findOneAndUpdate(
    { _id: message.conversationId },
    { $pull: { messages: message._id } }
  );
});

MessageSchema.post('save', async function(message: IMessage) {
    await model('Conversation').findOneAndUpdate(
      { _id: message.conversationId },
      { $push: { messages: message._id } }
    );
});

const Message = model<IMessage>("Message", MessageSchema);

export default Message;
