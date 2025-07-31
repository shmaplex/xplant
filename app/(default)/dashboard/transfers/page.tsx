"use client";

import { useEffect, useState } from "react";
import TransferList from "@/components/dashboard/transfers/TransferList";
import TransferWarning from "@/components/dashboard/transfers/TransferWarning";
import TransferTimeline from "@/components/dashboard/transfers/TransferTimeline";
import type { PlantTransfer } from "@/lib/types";

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<PlantTransfer[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransfers = async () => {
      const res = await fetch("/api/transfers");
      const json = await res.json();
      if (res.ok) {
        setTransfers(json.data ?? []);
      } else {
        console.error(json.error || "Failed to load transfers");
      }
    };
    fetchTransfers();
  }, []);

  const uniquePlants = Array.from(
    new Map(
      transfers.filter((t) => t.plant).map((t) => [t.plant!.id, t.plant!])
    ).values()
  );

  const selectedPlant =
    uniquePlants.find((p) => p.id === selectedPlantId) || null;

  const filteredTransfers = selectedPlantId
    ? transfers.filter((t) => t.plant_id === selectedPlantId)
    : transfers;

  return (
    <div className="px-4 sm:px-6 lg:px-10 mx-auto max-w-7xl py-10 min-h-screen bg-[var(--milk-bio)]">
      <h1 className="text-3xl font-bold text-[var(--moss-shadow)] mb-8">
        Transfer Cycle Tracker
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Filter */}
          <div className="bg-white rounded-2xl shadow-sm border border-spore-grey/10 p-5">
            <label className="block mb-2 text-[var(--moss-shadow)] font-semibold">
              Filter by Plant
            </label>
            <select
              value={selectedPlantId || ""}
              onChange={(e) => setSelectedPlantId(e.target.value)}
              className="w-full p-2 rounded-lg border border-[var(--spore-grey)] bg-white focus:ring-2 focus:ring-future-lime"
            >
              <option value="">All Plants</option>
              {uniquePlants.map((plant) => (
                <option key={plant.id} value={plant.id}>
                  {plant.species} – {plant.current_stage?.stage ?? "No stage"}
                </option>
              ))}
            </select>
          </div>

          {/* Warning */}
          {selectedPlant && (
            <div className="bg-white rounded-2xl shadow-sm border border-yellow-200 p-5">
              <TransferWarning plant={selectedPlant} />
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-spore-grey/10 p-5">
            <TransferTimeline transfers={filteredTransfers} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-spore-grey/10 p-5">
            <TransferList transfers={filteredTransfers} />
          </div>
        </div>
      </div>
    </div>
  );
}
