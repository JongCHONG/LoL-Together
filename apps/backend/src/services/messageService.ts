import mongoose from "mongoose";
import Message from "../models/Message";

export class MessageService {
  static async createMessage(data: {
    text: string;
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    conversation?: mongoose.Types.ObjectId;
  }) {
    const message = new Message(data);
    return await message.save();
  }

  static async getMessageById(id: string) {
    return Message.findById(id)
      .populate({ path: "sender", select: "riot_id" })
      .populate({ path: "receiver", select: "riot_id" })
  }

  static async updateMessage(
    id: string,
    updateData: Partial<{
      text: string;
      sender: mongoose.Types.ObjectId;
      receiver: mongoose.Types.ObjectId;
      conversation: mongoose.Types.ObjectId;
    }>
  ) {
    return Message.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    })
      .populate({ path: "sender", select: "riot_id" })
      .populate({ path: "receiver", select: "riot_id" })
  }

  static async deleteMessage(id: string) {
    return Message.findByIdAndDelete(id);
  }
}
