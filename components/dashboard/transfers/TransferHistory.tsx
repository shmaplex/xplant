import { FiClipboard } from "react-icons/fi";
import { PlantTransfer } from "@/lib/types";
import TransferCard from "@/components/dashboard/transfers/TransferCard";

export default function TransferHistory({
  transfers,
}: {
  transfers: (PlantTransfer & { stage?: { name: string } })[];
}) {
  const hasTransfers = transfers.length > 0;

  console.log("transfers", transfers);
  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-moss-shadow mb-4">
        Transfer History
      </h2>

      {!hasTransfers ? (
        <div className="flex flex-col items-center justify-center py-16 bg-spore-grey/10 rounded-xl text-center">
          <FiClipboard className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No transfer records found
          </p>
          <p className="text-gray-400 text-sm mt-1">
            This plant has not undergone any transfers yet.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transfers.map((t) => (
            <li key={t.id}>
              <TransferCard transfer={t} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
