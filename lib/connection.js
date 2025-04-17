// lib/connection.js
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) {
    console.log("🟢 Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "coinTracker", // not strictly needed if MONGO_URI has it, but safe
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    throw err;
  }
};
