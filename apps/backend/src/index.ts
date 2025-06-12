import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./db";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import teamRoutes from "./routes/teamRoutes";

connectDB();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("api/teams", teamRoutes)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`➡️  Server running at http://localhost:${PORT}`);
});
