"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const COLORS = ["#60a5fa", "#f87171"]; // Heads = Blue, Tails = Red

export default function CoinTossPieChart() {
  const [sessions, setSessions] = useState([]);
  const [totalHeads, setTotalHeads] = useState(0);
  const [totalTails, setTotalTails] = useState(0);

  // Fetch sessions on mount
  useEffect(() => {
    const fetchSessions = async () => {
      const res = await fetch("/api/dashboard-data");
      const data = await res.json();
      setSessions(data);
    };
    fetchSessions();
  }, []);

  // Calculate totals
  useEffect(() => {
    const totals = sessions.reduce(
      (acc, session) => {
        acc.heads += session.heads || 0;
        acc.tails += session.tails || 0;
        return acc;
      },
      { heads: 0, tails: 0 }
    );
    setTotalHeads(totals.heads);
    setTotalTails(totals.tails);
  }, [sessions]);

  const data = [
    { name: "Heads", value: totalHeads },
    { name: "Tails", value: totalTails },
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
