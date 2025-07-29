import {
  Plant,
  PlantStage,
  PlantTransfer,
  ContaminationLog,
  MediaRecipe,
} from "@/lib/types";
import PlantHero from "@/components/dashboard/plants/PlantHero";
import StageHistory from "@/components/dashboard/plants/StageHistory";
import TransferHistory from "@/components/dashboard/plants/TransferHistory";
import ContaminationLogs from "@/components/dashboard/plants/ContaminationLogs";
import LinkedMediaRecipes from "@/components/dashboard/plants/LinkedMediaRecipes";

export default function PlantDetail({
  plant,
  transfers,
  logs,
  recipes,
}: {
  plant: Plant & { plant_stages?: PlantStage[] };
  transfers: PlantTransfer[];
  logs: ContaminationLog[];
  recipes: MediaRecipe[];
}) {
  const currentStage = plant.plant_stages?.[0];

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10 space-y-12">
      <PlantHero plant={plant} currentStage={currentStage} />

      {plant.plant_stages && plant.plant_stages.length > 0 && (
        <StageHistory stages={plant.plant_stages} />
      )}

      <TransferHistory transfers={transfers} />

      <ContaminationLogs logs={logs} />

      <LinkedMediaRecipes recipes={recipes} />
    </div>
  );
}
