import { PlantTransfer, PlantStage } from "@/lib/types";
import Link from "next/link";
import TransferStepBar from "@/components/dashboard/transfers/TransferStepBar";
import TransferNotFound from "./TransferNotFound";

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
  if (!transfer) return <TransferNotFound />;

  const transferCycle = transfer.transfer_cycle ?? 0;
  const transferDate = transfer.transfer_date
    ? new Date(transfer.transfer_date).toLocaleDateString()
    : "Unknown";

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      {/* Main Transfer Card */}
      <div className="bg-white rounded-3xl shadow-xl p-10 relative z-10">
        <header className="border-b border-gray-100 pb-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Cycle */}
            <div>
              <h1 className="text-3xl font-bold text-moss-shadow">
                {transfer.plant?.species || "Unknown Plant"}
              </h1>
              {/* <p className="mt-2">
                <span className="inline-block text-xs uppercase tracking-wide bg-future-lime/20 text-moss-shadow px-2 py-1 rounded mr-2">
                  Cycle
                </span>
                <span className="font-semibold text-gray-700">
                  {transferCycle} / 12
                </span>
              </p> */}
            </div>

            {/* Right: Date */}
            <div className="mt-4 sm:mt-0 text-right">
              <p className="">
                <span className="inline-block text-xs uppercase tracking-wide bg-spore-grey/20 text-moss-shadow px-2 py-1 rounded mr-2">
                  Transfer Date
                </span>
                <span className="font-medium text-gray-700">
                  {transferDate}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6 max-w-full">
            <TransferStepBar
              value={transferCycle}
              max={12}
              baseHeightClassName="h-8"
            />
          </div>
        </header>

        <section className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-moss-shadow mb-3">
              Current Stage
            </h2>
            {currentStage ? (
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-medium">Stage:</span>{" "}
                  {currentStage.stage}
                </p>
                <p>
                  <span className="font-medium">Room:</span>{" "}
                  {currentStage.room || "Unknown"}
                </p>
                <p>
                  <span className="font-medium">Entered On:</span>{" "}
                  {currentStage.entered_on
                    ? new Date(currentStage.entered_on).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No current stage data available.
              </p>
            )}
          </div>
        </section>

        {/* Edit Button */}
        {canEdit && (
          <Link
            href={editUrl}
            aria-label="Edit Transfer"
            className="
              fixed bottom-5 right-8 sm:right-18
              bg-future-lime hover:bg-lime-500
              text-moss-shadow font-semibold
              shadow-lg rounded-full
              px-6 py-3
              transition-colors duration-300
              cursor-pointer
              z-20
            "
          >
            Edit Transfer
          </Link>
        )}
      </div>

      {/* Notes Drawer */}
      {transfer.notes && (
        <div
          className="-mt-4 mx-4 shadow-lg rounded-b-3xl p-6 
                      text-biochar-black text-sm leading-relaxed border-t 
                      border-lime-200 bg-gradient-to-br from-lime-50 to-milk-bio 
                      hover:translate-y-1 duration-500 transition ease-in-out"
        >
          <h3 className="text-base font-semibold text-moss-shadow mb-3">
            Notes
          </h3>
          <p className="whitespace-pre-line">{transfer.notes}</p>
        </div>
      )}
    </div>
  );
}
