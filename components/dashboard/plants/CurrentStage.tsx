import { PlantStage } from "@/lib/types";
import StageCard from "@/components/ui/StageCard";

export default function CurrentStage({ stage }: { stage: PlantStage }) {
  return (
    <div className="max-w-md">
      <StageCard
        stage={stage}
        label="Current Stage"
        colors={{
          badge: "bg-[#6ea420]",
          header: "bg-[#b7ef48]/30",
          title: "text-[#6ea420]",
        }}
      />
    </div>
  );
}
