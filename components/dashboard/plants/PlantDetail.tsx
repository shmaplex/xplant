import {
  Plant,
  PlantStage,
  PlantTransfer,
  ContaminationLog,
  MediaRecipe,
} from "@/lib/types";
import Link from "next/link";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PlantHero from "@/components/dashboard/plants/PlantHero";
import LinkedMediaRecipes from "@/components/dashboard/plants/LinkedMediaRecipes";
import PlantMediaSection from "@/components/dashboard/plants/PlantMediaSection";
import PlantMediaGallery from "@/components/dashboard/plants/PlantMediaGallery";
import PlantMediaUploader from "@/components/dashboard/plants/PlantMediaUploader";
import StageHistory from "@/components/dashboard/stages/StageHistory";
import TransferHistory from "@/components/dashboard/transfers/TransferHistory";
import ContaminationLogs from "@/components/dashboard/contamination/ContaminationLogs";
import { PrintButton } from "@/components/ui/PrintButton";

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

  const breadcrumbItems = [
    { label: "Plants", href: "/dashboard/plants" },
    { label: plant.species }, // current page, no href
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-10">
      <div className="flex items-center justify-between">
        <Breadcrumbs items={breadcrumbItems} />
        {printUrl && <PrintButton printUrl={printUrl} label="Print Label" />}
      </div>
      <div className="space-y-12">
        <PlantHero
          plant={plant}
          currentStage={currentStage}
          printUrl={printUrl}
        />

        <PlantMediaSection title="Media & Progress">
          <PlantMediaGallery plantId={plant.id} />
        </PlantMediaSection>

        {canEdit && (
          <PlantMediaSection
            title="Upload Media for Plant Progress"
            showUploader
            plantId={plant.id}
          >
            <PlantMediaUploader plantId={plant.id} />
          </PlantMediaSection>
        )}

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
    </div>
  );
}
