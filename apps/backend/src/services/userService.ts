import User, { IUser } from "../models/User";

class UserService {
  async getUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId).select("-password");
  }

  async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-password");
  }

  async deleteUser(userId: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(userId).select("-password");
  }
}

export default new UserService();
