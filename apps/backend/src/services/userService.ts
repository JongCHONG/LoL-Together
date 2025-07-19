import User, { IUser } from "../models/User";

export class UserService {
  static async getAllUsers(): Promise<IUser[]> {
    return await User.find().select("-password");
  }

  static async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId)
      .select("-password")
      .populate({ path: "announces", select: "-user" });
  }

  static async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-password");
  }

  static async deleteUser(userId: string): Promise<IUser | null> {
    return await User.findOneAndDelete({ _id: userId }).select("-password");
  }
}
