"use client";

import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";

import { createClient } from "@/lib/supabase/client";
import TransferList from "@/components/dashboard/transfers/TransferList";
import TransferWarning from "@/components/dashboard/transfers/TransferWarning";
import TransferTimeline from "@/components/dashboard/transfers/TransferTimeline";
import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";
import type { Plant, PlantTransfer } from "@/lib/types";

export default function TransfersPage() {
  const supabase = createClient();
  const user = useUser();

  const [plants, setPlants] = useState<Plant[]>([]);
  const [transfers, setTransfers] = useState<PlantTransfer[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user) return;

    const { data: plantData, error: plantError } = await supabase
      .from("plants")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    const { data: transferData, error: transferError } = await supabase
      .from("plant_transfers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (!plantError) setPlants(plantData ?? []);
    if (!transferError) setTransfers(transferData ?? []);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const selectedPlant = plants.find((p) => p.id === selectedPlantId) || null;
  const filteredTransfers = selectedPlantId
    ? transfers.filter((t) => t.plant_id === selectedPlantId)
    : transfers;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto bg-[var(--milk-bio)] min-h-screen">
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
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.species} – {plant.current_stage?.stage || "No stage"}
            </option>
          ))}
        </select>
      </div>

      <NewTransferForm plants={plants} />

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
