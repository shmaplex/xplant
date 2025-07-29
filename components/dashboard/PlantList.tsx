import React from "react";
import type { Plant } from "@/lib/types";

type PlantListProps = {
  plants?: Plant[] | null;
};

export default function PlantList({ plants }: PlantListProps) {
  if (!plants || plants.length === 0) {
    return <p className="text-gray-600 text-sm">No plants logged yet.</p>;
  }

  return (
    <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
      {plants.map((plant) => {
        // current_stage is a single PlantStage or null
        const latestStage = plant.current_stage ?? null;

        const warningLevel =
          plant.transfer_cycle >= 12
            ? "bg-red-100 text-red-700"
            : plant.transfer_cycle >= 10
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700";

        return (
          <li
            key={plant.id}
            className={`flex justify-between items-center p-2 rounded ${warningLevel}`}
          >
            <span className="truncate">
              {plant.species} ({plant.transfer_cycle}/12)
            </span>
            <span className="text-xs uppercase font-bold tracking-wider">
              {latestStage?.stage ?? "Unknown"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
