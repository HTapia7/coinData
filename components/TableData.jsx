"use client";

import { useEffect, useState } from "react";

export default function DashboardTable() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("/api/dashboard-data");
        const data = await res.json();
        setSessions(data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

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

  // Calculate total games
  const totalGames = totals.heads + totals.tails;

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
      await fetch(`/api/delete-data/${id}`, { method: "DELETE" });
      setSessions((prev) => prev.filter((session) => session._id !== id));
    } catch (err) {
      console.error("Failed to delete session:", err);
    }
  };

  return (
    <div className="p-8 max-w-8xl mx-auto">
      {sessions.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">No session data saved yet.</p>
      ) : (
        <>
          {/* Display Total Games Played */}
          <div className="text-center text-2xl font-semibold mb-4">
            Total Games Played: {totalGames}
          </div>

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
                {sessions.map((session) => {
                  const headTail = session.heads + session.tails;
                  const winLoss = session.wins + session.losses;

                  return (
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
                        {headTail > 0 ? ((session.heads / headTail) * 100).toFixed(2) : "0.00"}%
                      </td>
                      <td className="py-6 px-10 border-b text-center">
                        {winLoss > 0 ? ((session.wins / winLoss) * 100).toFixed(2) : "0.00"}%
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
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-200 font-bold">
                  <td className="py-6 px-10 text-center">Total</td>
                  <td className="py-6 px-10 text-center">{totals.heads}</td>
                  <td className="py-6 px-10 text-center">{totals.tails}</td>
                  <td className="py-6 px-10 text-center">{totals.wins}</td>
                  <td className="py-6 px-10 text-center">{totals.losses}</td>
                  <td className="py-6 px-10 text-center">{headTailRatio}%</td>
                  <td className="py-6 px-10 text-center">{winLossRatio}%</td>
                  <td className="py-6 px-10 text-center"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
