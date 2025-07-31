import {
  Plant,
  PlantStage,
  PlantTransfer,
  ContaminationLog,
  MediaRecipe,
} from "@/lib/types";
import Link from "next/link";
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
  canEdit,
  editUrl,
  printUrl,
}: {
  plant: Plant & { plant_stages?: PlantStage[] };
  transfers: PlantTransfer[];
  logs: ContaminationLog[];
  recipes: MediaRecipe[];
  canEdit: boolean;
  editUrl: string;
  printUrl?: string;
}) {
  const currentStage = plant.plant_stages?.[0];

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10 space-y-12">
      <PlantHero
        plant={plant}
        currentStage={currentStage}
        printUrl={printUrl}
      />

      {plant.plant_stages && plant.plant_stages.length > 0 && (
        <StageHistory stages={plant.plant_stages} />
      )}

      <TransferHistory transfers={transfers} />

      <ContaminationLogs logs={logs} />

      <LinkedMediaRecipes recipes={recipes} />

      {/* Floating Edit Plant Button */}
      {canEdit && (
        <Link
          href={editUrl}
          className="
            fixed bottom-5 right-6 sm:right-24
            bg-[var(--future-lime)] hover:bg-lime-500
            text-black font-medium shadow-lg rounded-full
            px-6 py-3
            transition-colors duration-300
            z-50
          "
          aria-label="Edit Plant"
        >
          ✏️ Edit Plant
        </Link>
      )}
    </div>
  );
}
