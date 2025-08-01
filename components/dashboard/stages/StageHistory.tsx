import { PlantStage } from "@/lib/types";
import StageCard from "@/components/ui/StageCard";
import { MdHistory } from "react-icons/md";

export default function StageHistory({ stages }: { stages: PlantStage[] }) {
  const hasStages = stages.length > 0;

  return (
    <section className="bg-white/70 rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-organic-amber mb-8">
        Stage History
      </h2>

      {!hasStages ? (
        <div className="flex flex-col items-center justify-center py-20 bg-organic-amber-light/60 w-full rounded-xl text-center">
          <MdHistory className="w-14 h-14 text-organic-amber mb-5" />
          <p className="text-organic-amber text-xl font-semibold">
            No stage history found
          </p>
          <p className="text-organic-amber/70 text-base mt-2 max-w-xs">
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
          "
        >
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              label="Stage"
              colors={{
                badge: "bg-organic-amber",
                header: "bg-organic-amber/10",
                title: "text-organic-amber",
                room: "bg-organic-amber-light/50 text-organic-amber/80",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
