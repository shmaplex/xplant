import type { Plant } from "@/lib/types";

export default function TransferWarning({ plant }: { plant: Plant }) {
  if (plant.transfer_cycle < 10) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded mb-6">
      <h3 className="font-semibold text-yellow-800 mb-2">
        ⚠ Transfer Cycle Warning
      </h3>
      <p className="text-sm text-yellow-900">
        {plant.species} has reached {plant.transfer_cycle}/12 cycles.
        {plant.transfer_cycle >= 12 && " ⚠ Consider restarting culture."}
      </p>
    </div>
  );
}
