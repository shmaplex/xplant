"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createClient } from "@/lib/supabase/client";

export default function ContaminationStats() {
  const [data, setData] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.rpc("contamination_by_date");

      if (error) {
        console.error("Error fetching contamination stats:", error);
        return;
      }

      if (data) setData(data);
    };

    fetchStats();
  }, [supabase]);

  return (
    <div className="bg-white p-4 shadow rounded-xl">
      <h2 className="text-lg font-semibold mb-4">Contamination Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#b7ef48" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
