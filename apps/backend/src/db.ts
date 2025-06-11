import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI n'est pas défini dans les variables d'environnement.");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connecté !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1); 
  }
};
