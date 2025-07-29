"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { PlantStage, PlantSummary } from "@/lib/types";

export default function StageTracker() {
  const [stages, setStages] = useState<PlantStage[]>([]);
  const [plants, setPlants] = useState<PlantSummary[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data: stageData } = await supabase
        .from("plant_stages")
        .select("*")
        .order("entered_on", { ascending: false });
      const { data: plantData } = await supabase
        .from("plants")
        .select("id, species");
      if (stageData) setStages(stageData);
      if (plantData) setPlants(plantData);
    };

    fetchData();
  }, []);

  const roomColor = (room?: string) => {
    switch (room) {
      case "Room A":
        return "bg-blue-100";
      case "Room B":
        return "bg-green-100";
      case "Cold Storage":
        return "bg-slate-200";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="bg-white shadow p-4 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Current Stages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stages.map((s) => {
          const plant = plants.find((p) => p.id === s.plant_id);
          return (
            <div
              key={s.id}
              className={`p-3 rounded-lg ${roomColor(s.room)} border`}
            >
              <h3 className="font-bold text-moss-shadow text-lg">
                {plant?.species ?? "Unnamed Plant"}
              </h3>
              <p className="text-sm">Stage: {s.stage}</p>
              <p className="text-sm">Room: {s.room}</p>
              <p className="text-xs text-gray-600">
                Since: {new Date(s.entered_on).toLocaleDateString()}
              </p>
              {s.notes && (
                <p className="mt-1 text-xs text-gray-500 italic">{s.notes}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
