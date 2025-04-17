import mongoose from "mongoose";
import { getAuth } from "@clerk/nextjs/server";
import SessionData from "@/models/schema.js"; // adjust path if needed

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI in environment variables.");
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

export async function GET(req) {
  console.log("📥 Incoming GET request to /api/sessions");

  try {
    const { userId } = await getAuth(req);
    console.log("👤 Clerk userId:", userId);

    if (!userId) {
      console.log("❌ No userId found. User not authenticated.");
      return new Response(
        JSON.stringify({ success: false, error: "User not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("🔌 Connecting to MongoDB...");
    await connectToDatabase();

    console.log(`📦 Fetching sessions for userId: ${userId}`);
    const sessionData = await SessionData.find({ userId }).sort({ createdAt: -1 });

    console.log(`✅ Retrieved ${sessionData.length} sessions`);

    const sessionDataWithDay = sessionData.map((session) => {
      const date = new Date(session.createdAt);
      const dayOfWeek = isNaN(date) ? "Unknown" : date.toLocaleString("en-US", { weekday: "long" });
      return { ...session.toObject(), dayOfWeek };
    });

    console.log("📅 Added day of the week to sessions");

    return new Response(JSON.stringify(sessionDataWithDay), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("🔥 Error fetching data:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
