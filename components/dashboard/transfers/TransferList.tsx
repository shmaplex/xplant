"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { PlantTransfer } from "@/lib/types";

export default function TransferList() {
  const [transfers, setTransfers] = useState<PlantTransfer[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchTransfers = async () => {
      const { data, error } = await supabase
        .from("plant_transfers")
        .select("*, plant:plants(species)")
        .order("transfer_date", { ascending: false });

      if (!error && data) setTransfers(data as PlantTransfer[]);
    };

    fetchTransfers();
  }, []);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4 text-moss-shadow">
        All Transfers
      </h2>
      <ul className="space-y-2 max-h-[300px] overflow-y-auto">
        {transfers.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center border-b pb-2 text-sm"
          >
            <span>{new Date(t.transfer_date).toLocaleDateString()}</span>
            <span>{t.plant?.species ?? "Unnamed Plant"}</span>
            <span className="italic text-gray-600">{t.notes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
