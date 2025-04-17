"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#60a5fa", "#f87171"]; // Wins = Blue, Losses = Red

export default function WinLossPieChart() {
  const [sessions, setSessions] = useState([]);
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

  useEffect(() => {
    const totals = sessions.reduce(
      (acc, session) => {
        acc.wins += session.wins || 0;
        acc.losses += session.losses || 0;
        return acc;
      },
      { wins: 0, losses: 0 }
    );
    setTotalWins(totals.wins);
    setTotalLosses(totals.losses);
  }, [sessions]);

  const data = [
    { name: "Wins", value: totalWins },
    { name: "Losses", value: totalLosses },
  ];

  return (
    <div className="h-[350px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937", // dark gray bg
              border: "none",
              borderRadius: "8px",
              color: "#FFFFFF", // text color white ✅
            }}
            itemStyle={{
              color: "#FFFFFF", // fix text color inside tooltip ✅
              fontSize: "14px",
            }}
            formatter={(value, name) => [`${value}`, name]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ paddingTop: "20px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
