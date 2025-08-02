"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchContaminationStats } from "@/lib/api/contamination";

export default function ContaminationStats() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await fetchContaminationStats();
        setData(stats);
      } catch (err) {
        setError("Error fetching contamination stats.");
        console.error(err);
      }
    };
    loadStats();
  }, []);

  const hasData = data && data.length > 0;

  if (error) {
    return <p className="text-red-500 text-center font-medium mt-4">{error}</p>;
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-bio-red mb-6">
        Contamination Trends
      </h2>

      {hasData ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#991b1b" }} // bio-red-dark
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#991b1b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #fecaca",
                  borderRadius: "0.75rem",
                  fontSize: "0.85rem",
                }}
                labelStyle={{ color: "#b91c1c" }}
              />
              <Bar
                dataKey="count"
                fill="#ef4444" // bio-red base
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No contamination data available yet.
        </p>
      )}
    </div>
  );
}
