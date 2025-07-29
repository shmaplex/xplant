import { PlantStage } from "@/lib/types";
import StageCard from "@/components/ui/StageCard";
import { History } from "lucide-react";

export default function StageHistory({ stages }: { stages: PlantStage[] }) {
  const hasStages = stages.length > 0;

  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-semibold text-[#5b3fa8] mb-8">
        Stage History
      </h2>

      {!hasStages ? (
        <div className="flex flex-col items-center justify-center py-20 bg-spore-grey/10 w-full rounded-xl text-center mx-auto">
          <History className="w-14 h-14 text-[var(--psybeam-purple)] mb-5" />
          <p className="text-[var(--psybeam-purple)] text-xl font-semibold">
            No stage history found
          </p>
          <p className="text-[var(--psybeam-purple)]/80 text-base mt-2 max-w-xs">
            No past stages are recorded for this plant.
          </p>
        </div>
      ) : (
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            max-w-full
          "
        >
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              label="Stage"
              colors={{
                badge: "bg-psybeam-purple",
                header: "bg-psybeam-purple/10",
                title: "text-psybeam-purple",
                room: "bg-psybeam-purple/50 text-[#5b3fa8]/80",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
