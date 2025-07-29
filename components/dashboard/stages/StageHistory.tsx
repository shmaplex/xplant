"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { PlantStage } from "@/lib/types";

export default function StageHistory() {
  const [history, setHistory] = useState<PlantStage[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from("plant_stages")
        .select("*")
        .order("entered_on", { ascending: false });
      if (data) setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="bg-white shadow p-4 rounded-xl mt-6">
      <h2 className="text-xl font-semibold mb-4">Stage History</h2>
      <div className="max-h-[300px] overflow-y-auto text-sm space-y-2">
        {history.map((entry) => (
          <div key={entry.id} className="border-b pb-2">
            <p>
              <strong>Plant ID:</strong> {entry.plant_id}
            </p>
            <p>
              <strong>Stage:</strong> {entry.stage}
            </p>
            <p>
              <strong>Room:</strong> {entry.room}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(entry.entered_on).toLocaleDateString()}
            </p>
            {entry.notes && (
              <p className="italic text-gray-500">{entry.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
