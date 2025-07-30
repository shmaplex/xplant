import React from "react";
import Link from "next/link";
import type { Plant } from "@/lib/types";
import TransferStepBar from "@/components/dashboard/transfers/TransferStepBar";

type PlantListProps = {
  plants?: Plant[] | null;
};

export default function PlantList({ plants }: PlantListProps) {
  if (!plants || plants.length === 0) {
    return (
      <p className="text-gray-500 text-sm italic mt-3">No plants logged yet.</p>
    );
  }

  return (
    <ul className="space-y-4 max-h-72 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-moss-shadow scrollbar-track-transparent">
      {plants.map((plant) => {
        const latestStage = plant.current_stage ?? null;

        return (
          <li key={plant.id}>
            <Link
              href={`/dashboard/plants/${plant.id}`}
              className="
                block rounded-xl border border-gray-200 bg-white
                transition hover:border-future-lime
                focus:outline-none focus:ring-2 focus:ring-future-lime
                overflow-hidden
              "
              title={`${plant.species} — Stage: ${
                latestStage?.stage ?? "Unknown"
              }`}
            >
              <div className="px-4 pt-3 pb-5">
                {/* Species name */}
                <h4 className="text-lg font-semibold text-[var(--moss-shadow)] leading-tight mb-3 truncate">
                  {plant.species}
                </h4>

                {/* Stage section */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Stage
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-gray-800">
                      {latestStage?.stage ?? "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <TransferStepBar value={plant.transfer_cycle} max={12} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
