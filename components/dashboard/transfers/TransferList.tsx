import type { PlantTransfer } from "@/lib/types";

export default function TransferList({
  transfers,
}: {
  transfers: PlantTransfer[];
}) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4 text-moss-shadow">Transfers</h2>
      {transfers.length === 0 ? (
        <p className="text-gray-500">No transfers available.</p>
      ) : (
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
      )}
    </div>
  );
}
