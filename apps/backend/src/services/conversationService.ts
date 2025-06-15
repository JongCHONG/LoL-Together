import mongoose from "mongoose";

import Conversation from "../models/Conversation";

export class ConversationService {
  static async createConversation(data: {
    messages?: mongoose.Types.ObjectId[];
    users: mongoose.Types.ObjectId[];
  }) {
    const conversation = new Conversation(data);
    return await conversation.save();
  }

  static async getConversationById(id: string) {
    return await Conversation.findById(id).populate({
      path: "users",
      select: "riot_id",
    });
  }

  static async getConversationListByUserId(userId: string) {
    return Conversation.find({ users: userId }).populate({
      path: "users",
      select: "riot_id",
    });
  }

  static async updateConversation(
    id: string,
    data: {
      messages?: mongoose.Types.ObjectId[];
      users?: mongoose.Types.ObjectId[];
    }
  ) {
    return await Conversation.findByIdAndUpdate(id, data, {
      new: true,
    })
      // .populate("messages")
      .populate({ path: "users", select: "riot_id" });
  }

  static async deleteConversation(id: string) {
    return await Conversation.findByIdAndDelete(id);
  }
}
