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
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-moss-shadow mb-4">
        Contamination Over Time
      </h2>

      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "var(--moss-shadow)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "var(--moss-shadow)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid var(--spore-grey)",
                borderRadius: "0.75rem",
                fontSize: "0.85rem",
              }}
              labelStyle={{ color: "var(--moss-shadow)" }}
            />
            <Bar
              dataKey="count"
              fill="var(--future-lime)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          No contamination data available yet.
        </p>
      )}
    </div>
  );
}
