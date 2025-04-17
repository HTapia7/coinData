import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import SessionData from "@/models/schema.js"; // adjust path if needed

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI in environment variables.");
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

export async function POST(req) {
  console.log("📥 Incoming POST request to /api/sessions");

  const { userId } = await getAuth(req);
  console.log("👤 Clerk userId:", userId);

  if (!userId) {
    console.log("❌ No userId found. User not authenticated.");
    return new Response(
      JSON.stringify({ success: false, error: "User not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  let data;
  try {
    data = await req.json();
    console.log("📦 Received JSON:", data);
  } catch (err) {
    console.error("❗ Invalid JSON format:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid JSON format",
        message: err.message,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { heads, tails, wins, losses } = data;

  if (
    typeof heads !== "number" ||
    typeof tails !== "number" ||
    typeof wins !== "number" ||
    typeof losses !== "number"
  ) {
    console.warn("⚠️ Invalid data types for session values:", data);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid data types for session values",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await connectToDatabase();

    const session = new SessionData({
      userId,
      heads,
      tails,
      wins,
      losses,
    });

    console.log("📝 Saving session to database...");
    const savedSession = await session.save();

    console.log("✅ Session inserted with ID:", savedSession._id);

    return new Response(
      JSON.stringify({ success: true, sessionId: savedSession._id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("🔥 Error saving session:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
