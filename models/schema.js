// models/SessionData.js
import mongoose from "mongoose";

const SessionDataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  heads: { type: Number, required: true },
  tails: { type: Number, required: true },
  wins: { type: Number, required: true },
  losses: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.SessionData ||
  mongoose.model("SessionData", SessionDataSchema);
