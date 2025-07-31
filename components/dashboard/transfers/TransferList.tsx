import type { PlantTransfer } from "@/lib/types";
import Link from "next/link";

export default function TransferList({
  transfers,
}: {
  transfers: PlantTransfer[];
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-moss-shadow">Transfers</h2>

      {transfers.length === 0 ? (
        <p className="text-gray-500">No transfers available.</p>
      ) : (
        <ul className="divide-y divide-spore-grey/20">
          {transfers.map((t) => (
            <li key={t.id}>
              <Link
                href={`/dashboard/transfers/${t.id}`}
                className="block px-4 py-3 hover:bg-future-lime/10 rounded-lg transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <p className="font-semibold text-moss-shadow">
                      {t.plant?.species ?? "Unnamed Plant"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Cycle {t.transfer_cycle} •{" "}
                      {new Date(t.transfer_date).toLocaleDateString()}
                    </p>
                    {t.notes && (
                      <p className="mt-1 text-xs text-gray-500 italic">
                        {t.notes}
                      </p>
                    )}
                  </div>
                  <svg
                    className="w-5 h-5 text-future-lime flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
