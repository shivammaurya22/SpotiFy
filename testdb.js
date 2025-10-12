import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  console.log("Mongo URI:", uri); // for debugging

  if (!uri) {
    throw new Error("MONGODB_URI is undefined. Check your .env file.");
  }

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");
}

connectDB().catch(err => console.error("❌ MongoDB Error:", err.message));
