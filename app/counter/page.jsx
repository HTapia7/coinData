"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import CoinCounter from "@/components/CoinCounter.jsx";
import WinLossCounter from "@/components/WinLossCounter.jsx";
import "react-toastify/dist/ReactToastify.css";
import { useAuth, useClerk } from "@clerk/nextjs";

export default function Counter() {
  const { isLoaded, userId } = useAuth();
  const { openSignIn } = useClerk();

  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const handleSave = async () => {
    if (!userId) {
      toast.error("You must be logged in to save data.");
      return;
    }

    try {
      const res = await fetch("/api/save-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heads, tails, wins, losses }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.error || "Failed to save session."}`);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setHeads(0);
        setTails(0);
        setWins(0);
        setLosses(0);
        toast.success("Successful! Check Dashboard!!");
      } else {
        toast.error("Failed to save session.");
      }
    } catch (error) {
      toast.error("Error saving session: " + error.message);
    }
  };

  return (
    <div className="min-h-screen text-white p-6">
      {/* Save Button or Login Prompt */}
      <div className="flex justify-end mb-6">
        {isLoaded && userId ? (
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => openSignIn()}
            className="text-red-500 text-lg font-medium italic hover:underline"
          >
            Login to save data
          </button>
        )}
      </div>

      {/* Counters */}
      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg w-full lg:w-[48%]">
          <CoinCounter
            heads={heads}
            setHeads={setHeads}
            tails={tails}
            setTails={setTails}
          />
        </div>

        <div className="bg-zinc-800 rounded-xl p-6 shadow-lg w-full lg:w-[48%]">
          <WinLossCounter
            wins={wins}
            setWins={setWins}
            losses={losses}
            setLosses={setLosses}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}
