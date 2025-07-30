// components/transfers/TransferCard.tsx
import type { PlantTransfer } from "@/lib/types";

export default function TransferCard({
  transfer,
}: {
  transfer: PlantTransfer;
}) {
  const approachingLimit = transfer.transfer_cycle >= 10;

  return (
    <div
      className={`p-4 rounded-xl border shadow-sm bg-white space-y-2 ${
        approachingLimit ? "border-yellow-400" : "border-[var(--spore-grey)]"
      }`}
    >
      <div className="text-sm text-gray-500">
        {new Date(transfer.transfer_date).toLocaleDateString()}
      </div>
      <h3 className="font-semibold text-[var(--moss-shadow)]">
        {transfer.plant?.species ?? "Unnamed Plant"}
      </h3>
      <p className="text-xs">
        Transfer {transfer.transfer_cycle}/12{" "}
        {approachingLimit && (
          <span className="ml-1 text-yellow-600 font-semibold">
            &#9888; Consider restarting line
          </span>
        )}
      </p>
    </div>
  );
}
