import { getAuth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import SessionData from "@/models/schema";
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;
  if (!process.env.MONGO_URI) throw new Error("Missing MONGO_URI in environment variables.");
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

export async function DELETE(req, { params }) {

  const { userId } = await getAuth(req);

  if (!userId) {
    return new Response(
      JSON.stringify({ success: false, error: "User not authenticated" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { id } = params;
  if (!id) {
    return new Response(
      JSON.stringify({ success: false, error: "Session ID is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await connectToDatabase();

    const deleted = await SessionData.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return new Response(
        JSON.stringify({ success: false, error: "Session not found or not authorized" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, deletedId: id }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
