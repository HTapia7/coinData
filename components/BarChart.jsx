"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

export default function CoinWinLossBarChart() {
  const [sessions, setSessions] = useState([]);
  const [totalHeads, setTotalHeads] = useState(0);
  const [totalTails, setTotalTails] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch("/api/dashboard-data");
      const data = await res.json();
      setSessions(data);
    };
    fetchSessions();
  }, []);

  // Calculate totals for Heads/Tails and Wins/Losses
  useEffect(() => {
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
    setTotalHeads(totals.heads);
    setTotalTails(totals.tails);
    setTotalWins(totals.wins);
    setTotalLosses(totals.losses);
  }, [sessions]);

  const data = [
    { name: "Heads", count: totalHeads },
    { name: "Tails", count: totalTails },
    { name: "Wins", count: totalWins },
    { name: "Losses", count: totalLosses },
  ];

  return (
    <div className="h-[350px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF",
            }}
            itemStyle={{
              color: "#FFFFFF",
              fontSize: "14px",
            }}
            formatter={(value, name) => [`${value}`, name]}
          />
          <Legend />
          <Bar dataKey="count" fill="#60a5fa" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
