import { PlantStage } from "@/lib/types";
import StageCard from "@/components/ui/StageCard";

export default function StageHistory({ stages }: { stages: PlantStage[] }) {
  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-[var(--psybeam-purple)] mb-4">
        Stage History
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>
  );
}
