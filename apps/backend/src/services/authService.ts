import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const signUp = async (
  email: string,
  password: string,
  summoner_name: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    password: hashedPassword,
    email,
    summoner_name,
  });

  await user.save();

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { user, token };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid login");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid login");
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { user, token };
};
