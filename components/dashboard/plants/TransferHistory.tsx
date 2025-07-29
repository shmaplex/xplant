import { PlantTransfer } from "@/lib/types";
import { formatDate } from "@/lib/date";
import { ClipboardList } from "lucide-react"; // you can use react-icons too

export default function TransferHistory({
  transfers,
}: {
  transfers: PlantTransfer[];
}) {
  const hasTransfers = transfers.length > 0;

  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-moss-shadow mb-4">
        Transfer History
      </h2>

      {!hasTransfers ? (
        <div className="flex flex-col items-center justify-center py-16 bg-spore-grey/10 rounded-xl text-center">
          <ClipboardList className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No transfer records found
          </p>
          <p className="text-gray-400 text-sm mt-1">
            This plant has not undergone any transfers yet.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {transfers.map((t) => (
            <li
              key={t.id}
              className="bg-spore-grey/20 rounded-lg p-4 hover:bg-spore-grey/30 transition"
            >
              <p className="font-medium">{formatDate(t.transfer_date)}</p>
              <p className="text-sm text-gray-700">
                Stage: {t.stage}
                {t.notes && (
                  <>
                    <br />
                    Notes: {t.notes}
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
