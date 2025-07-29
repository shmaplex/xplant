import { PlantTransfer } from "@/lib/types";
import { formatDate } from "@/lib/date";

export default function TransferHistory({
  transfers,
}: {
  transfers: PlantTransfer[];
}) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-[var(--future-lime)] mb-4">
        Transfer History
      </h2>
      {transfers.length === 0 ? (
        <p className="text-gray-600">No transfer records found.</p>
      ) : (
        <ul className="space-y-3">
          {transfers.map((t) => (
            <li key={t.id} className="bg-[var(--spore-grey)]/20 rounded-lg p-4">
              <p className="font-medium">{formatDate(t.transfer_date)}</p>
              <p className="text-sm">
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
