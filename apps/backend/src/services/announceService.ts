import mongoose from "mongoose";
import Announce from "../models/Announce";

export class AnnounceService {
  static async createAnnounce(data: {
    user?: mongoose.Types.ObjectId;
    text: string;
    team?: mongoose.Types.ObjectId;
  }) {
    const announce = new Announce(data);
    return await announce.save();
  }

  static async getAnnounceById(id: string) {
    return await Announce.findById(id);
  }

  static async getAllAnnounces() {
    return await Announce.find();
  }

  static async updateAnnounce(
    id: string,
    data: {
      user?: mongoose.Types.ObjectId;
      text?: string;
      team?: mongoose.Types.ObjectId;
    }
  ) {
    return await Announce.findOneAndUpdate({ _id: id }, data, { new: true });
  }

  static async deleteAnnounce(id: string) {
    return await Announce.findByIdAndDelete(id);
  }
}
