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
    <div className="px-6 mx-auto w-full py-10 max-w-6xl bg-[var(--milk-bio)] min-h-screen">
      <h1 className="text-3xl font-bold text-[var(--moss-shadow)] mb-6">
        Transfer Cycle Tracker
      </h1>

      <div className="mb-6">
        <label className="block mb-2 text-[var(--moss-shadow)] font-semibold">
          Select Plant:
        </label>
        <select
          value={selectedPlantId || ""}
          onChange={(e) => setSelectedPlantId(e.target.value)}
          className="w-full sm:w-1/2 p-2 rounded border border-[var(--spore-grey)] bg-white"
        >
          <option value="">All Plants</option>
          {uniquePlants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.species} – {plant.current_stage?.stage ?? "No stage"}
            </option>
          ))}
        </select>
      </div>

      {selectedPlant && (
        <div className="my-6">
          <TransferWarning plant={selectedPlant} />
        </div>
      )}

      <div className="my-6">
        <TransferTimeline transfers={filteredTransfers} />
      </div>

      <div className="my-6">
        <TransferList transfers={filteredTransfers} />
      </div>
    </div>
  );
}
