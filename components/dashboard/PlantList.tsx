import React from "react";
import Link from "next/link";
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
        const latestStage = plant.current_stage ?? null;

        const warningLevel =
          plant.transfer_cycle >= 12
            ? "bg-red-100 text-red-700"
            : plant.transfer_cycle >= 10
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700";

        return (
          <li key={plant.id}>
            <Link
              href={`/dashboard/plants/${plant.id}`}
              className={`
                flex justify-between items-center p-3 rounded-md
                ${warningLevel}
                hover:bg-opacity-90 hover:shadow-md transition
                focus:outline-none focus:ring-2 focus:ring-future-lime
                truncate
              `}
              title={`${plant.species} — Stage: ${
                latestStage?.stage ?? "Unknown"
              }`}
            >
              <span className="font-semibold truncate">
                {plant.species}{" "}
                <span className="text-sm font-normal">
                  ({plant.transfer_cycle}/12)
                </span>
              </span>
              <span className="text-xs uppercase font-bold tracking-wider whitespace-nowrap">
                {latestStage?.stage ?? "Unknown"}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
