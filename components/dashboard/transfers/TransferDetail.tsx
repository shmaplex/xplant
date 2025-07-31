import { PlantTransfer, PlantStage } from "@/lib/types";
import Link from "next/link";

export default function TransferDetail({
  transfer,
  currentStage,
  canEdit,
  editUrl,
}: {
  transfer: PlantTransfer & { plant?: { plant_stages?: PlantStage[] } };
  currentStage: PlantStage | null;
  canEdit: boolean;
  editUrl: string;
}) {
  if (!transfer) {
    return <p>Transfer not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Transfer Detail for {transfer.plant?.species || "Unknown Plant"} (Cycle{" "}
        {transfer.transfer_cycle})
      </h1>
      <p>
        Transfer Date:{" "}
        {transfer.transfer_date
          ? new Date(transfer.transfer_date).toLocaleDateString()
          : "Unknown"}
      </p>
      {currentStage && (
        <p>
          Current Stage: <strong>{currentStage.stage}</strong> in{" "}
          <em>{currentStage.room || "Unknown room"}</em>
        </p>
      )}
      {transfer.notes && (
        <p className="mt-4">
          <strong>Notes:</strong> {transfer.notes}
        </p>
      )}

      {/* Floating Edit Button */}
      {canEdit && (
        <Link
          href={editUrl}
          aria-label="Edit Transfer"
          className="
            fixed bottom-5 right-6 sm:right-24
            bg-[var(--future-lime)] hover:bg-lime-500
            text-black font-medium shadow-lg rounded-full
            px-6 py-3
            transition-colors duration-300
            z-50
          "
        >
          ✏️ Edit Transfer
        </Link>
      )}
    </div>
  );
}
