// app/api/save-session/route.js (or wherever this lives)
import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import SessionData from "@/models/schema"; // adjust the path if needed

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI in environment variables.");
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

export async function POST(req) {
  const { userId } = await getAuth(req);

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, error: "User not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  let data;
  try {
    data = await req.json();
  } catch (err) {
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
    return new Response(
      JSON.stringify({
        success: false,
        error: "Invalid data types for session values",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const totalCoinToss = heads + tails;
  const totalGames = wins + losses;

  if (totalCoinToss !== totalGames) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Mismatch between Coin Counter and Win Loss",
        details: {
          heads,
          tails,
          wins,
          losses,
          totalCoinToss,
          totalGames,
          difference: totalCoinToss - totalGames,
        },
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

    const savedSession = await session.save();

    return new Response(
      JSON.stringify({ success: true, sessionId: savedSession._id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
