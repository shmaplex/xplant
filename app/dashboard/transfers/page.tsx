// /dashboard/transfers/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import TransferList from "@/components/dashboard/transfers/TransferList";
import TransferWarning from "@/components/dashboard/transfers/TransferWarning";
import TransferTimeline from "@/components/dashboard/transfers/TransferTimeline";
import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";
import type { Plant, PlantTransfer } from "@/lib/types";

export default function TransfersPage() {
  const supabase = createClientComponentClient();
  const user = useUser();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [transfers, setTransfers] = useState<PlantTransfer[]>([]);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const { data: plantData } = await supabase
        .from("plants")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      const { data: transferData } = await supabase
        .from("plant_transfers")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      setPlants(plantData || []);
      setTransfers(transferData || []);
    };

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

      {/* Plant Selector */}
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
              {plant.species} – {plant.current_stage}
            </option>
          ))}
        </select>
      </div>

      {/* New Transfer Form */}
      <NewTransferForm plants={plants} />

      {/* Warning */}
      {selectedPlant && (
        <div className="my-6">
          <TransferWarning plant={selectedPlant} />
        </div>
      )}

      {/* Timeline */}
      <div className="my-6">
        <TransferTimeline transfers={filteredTransfers} />
      </div>

      {/* Transfer List */}
      <div className="my-6">
        <TransferList transfers={filteredTransfers} />
      </div>
    </div>
  );
}
