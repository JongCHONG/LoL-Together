import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./db";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import teamRoutes from "./routes/teamRoutes";
import announceRoutes from "./routes/announceRoutes";
import conversationRoutes from "./routes/conversationRoutes";

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/announces", announceRoutes);
app.use("/api/conversations", conversationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`➡️  Server running at http://localhost:${PORT}`);
});
