"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Plant } from "@/lib/types";

export default function TransferWarning() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPlants = async () => {
      const { data } = await supabase.from("plants").select("*");
      if (data) setPlants(data);
    };

    fetchPlants();
  }, []);

  const atRisk = plants.filter((p) => p.transfer_cycle >= 10);

  if (atRisk.length === 0) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-6">
      <h3 className="font-semibold text-yellow-800 mb-2">
        ⚠ Transfer Cycle Warnings
      </h3>
      <ul className="text-sm text-yellow-900 space-y-1">
        {atRisk.map((p) => (
          <li key={p.id}>
            {p.species} – {p.transfer_cycle}/12 cycles reached
            {p.transfer_cycle >= 12 && " (⚠ Consider restarting culture)"}
          </li>
        ))}
      </ul>
    </div>
  );
}
