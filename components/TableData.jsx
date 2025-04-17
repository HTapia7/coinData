"use client";

import { useEffect, useState } from "react";

export default function () {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch("/api/dashboard-data");
      const data = await res.json();
      setSessions(data);
    };
    fetchSessions();
  }, []);

  // Calculate totals
  const totals = sessions.reduce(
    (acc, session) => {
      acc.heads += session.heads || 0;
      acc.tails += session.tails || 0;
      acc.wins += session.wins || 0;
      acc.losses += session.losses || 0;
      return acc;
    },
    { heads: 0, tails: 0, wins: 0, losses: 0 }
  );

  // Calculate ratios in percentage
  const headTailRatio =
    totals.heads + totals.tails > 0
      ? ((totals.heads / (totals.heads + totals.tails)) * 100).toFixed(2)
      : 0;
  const winLossRatio =
    totals.wins + totals.losses > 0
      ? ((totals.wins / (totals.wins + totals.losses)) * 100).toFixed(2)
      : 0;

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/delete-data/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log(`Deleted session with ID ${id}`);

      // Optional: Refresh page or state
      setSessions(sessions.filter((session) => session._id !== id));
    } catch (err) {
      console.error("Failed to delete session:", err);
    }
  };

  return (
    <div className="p-8 max-w-8xl mx-auto">
      {sessions.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">No session data saved yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
          <table className="min-w-full table-auto border-collapse text-xl">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                <th className="py-6 px-10 border-b text-left">Date</th>
                <th className="py-6 px-10 border-b text-left">Heads</th>
                <th className="py-6 px-10 border-b text-left">Tails</th>
                <th className="py-6 px-10 border-b text-left">Wins</th>
                <th className="py-6 px-10 border-b text-left">Losses</th>
                <th className="py-6 px-10 border-b text-left">Heads/Tails Ratio (%)</th>
                <th className="py-6 px-10 border-b text-left">Wins/Losses Ratio (%)</th>
                <th className="py-6 px-10 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="bg-gray-50 hover:bg-gray-200">
                  <td className="py-6 px-10 border-b">
                    {new Date(session.createdAt).toLocaleString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-6 px-10 border-b text-center">{session.heads}</td>
                  <td className="py-6 px-10 border-b text-center">{session.tails}</td>
                  <td className="py-6 px-10 border-b text-center">{session.wins}</td>
                  <td className="py-6 px-10 border-b text-center">{session.losses}</td>
                  <td className="py-6 px-10 border-b text-center">
                    {((session.heads / (session.heads + session.tails)) * 100).toFixed(2)}%
                  </td>
                  <td className="py-6 px-10 border-b text-center">
                    {((session.wins / (session.wins + session.losses)) * 100).toFixed(2)}%
                  </td>
                  <td className="py-6 px-10 border-b text-center min-w-0">
                    <button
                      onClick={() => handleDelete(session._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Total row */}
            <tfoot>
              <tr className="bg-gray-200">
                <td className="py-6 px-10 text-center font-bold">Total</td>
                <td className="py-6 px-10 text-center font-bold">{totals.heads}</td>
                <td className="py-6 px-10 text-center font-bold">{totals.tails}</td>
                <td className="py-6 px-10 text-center font-bold">{totals.wins}</td>
                <td className="py-6 px-10 text-center font-bold">{totals.losses}</td>
                <td className="py-6 px-10 text-center font-bold">{headTailRatio}%</td>
                <td className="py-6 px-10 text-center font-bold">{winLossRatio}%</td>
                <td className="py-6 px-10 text-center"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
