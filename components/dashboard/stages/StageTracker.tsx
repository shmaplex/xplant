"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PlantStage, PlantSummary } from "@/lib/types";

export default function StageTracker() {
  const [stages, setStages] = useState<PlantStage[]>([]);
  const [plants, setPlants] = useState<PlantSummary[]>([]);
  const supabase = createClient();

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

  return (
    <div className="bg-white/70 shadow p-6 rounded-xl">
      <h2 className="text-2xl font-semibold text-lichen-blue-dark mb-6">
        Current Stages
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stages.map((s) => {
          const plant = plants.find((p) => p.id === s.plant_id);
          return (
            <div
              key={s.id}
              className="bg-lichen-blue-light/50 border border-lichen-blue/30 rounded-xl p-4"
            >
              <h3 className="font-bold text-lichen-blue-dark text-lg">
                {plant?.species ?? "Unnamed Plant"}
              </h3>
              <p className="text-sm text-moss-shadow">Stage: {s.stage}</p>
              <p className="text-sm text-moss-shadow">Room: {s.room}</p>
              <p className="text-xs text-gray-600">
                Since: {new Date(s.entered_on).toLocaleDateString()}
              </p>
              {s.notes && (
                <p className="mt-2 text-xs text-gray-500 italic">{s.notes}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
