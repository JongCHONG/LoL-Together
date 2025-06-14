import mongoose from "mongoose";

export class ConversationService {
  static async createConversation(data: {
    messages?: mongoose.Types.ObjectId[];
    users: mongoose.Types.ObjectId[];
  }) {
    const conversation = new mongoose.models.Conversation(data);
    return await conversation.save();
  }

  static async getConversationById(id: string) {
    return await mongoose.models.Conversation.findById(id)
      .populate("messages")
      .populate("users");
  }

  static async getAllConversations() {
    return await mongoose.models.Conversation.find()
      .populate("messages")
      .populate("users");
  }

  static async updateConversation(
    id: string,
    data: {
      messages?: mongoose.Types.ObjectId[];
      users?: mongoose.Types.ObjectId[];
    }
  ) {
    return await mongoose.models.Conversation.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate("messages")
      .populate("users");
  }

  static async deleteConversation(id: string) {
    return await mongoose.models.Conversation.findByIdAndDelete(id);
  }
}
