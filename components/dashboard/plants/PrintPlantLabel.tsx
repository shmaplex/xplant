"use client";

import PlantQRCode from "./PlantQRCode";
import { Plant } from "@/lib/types";
import { formatDate } from "@/lib/date";

export default function PrintPlantLabel({ plant }: { plant: Plant }) {
  const labelId = `PLANT-${plant.id.slice(0, 6).toUpperCase()}`;

  return (
    <div className="print-only w-[320px] aspect-[4/5] bg-white text-gray-900 print:border-0 border border-gray-300 rounded-lg print:shadow-none shadow-lg p-4 flex flex-col justify-between font-sans">
      <header className="mb-2">
        <h1 className="text-lg font-bold tracking-wide">{plant.species}</h1>
        <p className="text-xs text-gray-500 mt-1">{labelId}</p>
      </header>

      <div className="text-sm space-y-1 border-t border-b py-2 mt-2">
        <div className="flex justify-between">
          <span className="font-semibold">Stage:</span>
          <span className="font-mono tracking-tight">
            {plant.current_stage?.stage || "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Date In:</span>
          <span className="font-mono tracking-tight">
            {plant.current_stage?.entered_on
              ? formatDate(plant.current_stage.entered_on)
              : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Cycle:</span>
          <span className="font-mono tracking-tight">
            {plant.transfer_cycle ?? "—"}
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <PlantQRCode plantId={plant.id} />
      </div>
    </div>
  );
}
