import TooltipItem from "@/components/ui/TooltipItem"; // adjust path
import Image from "next/image";
import { Plant, PlantStage } from "@/lib/types";
import { formatDate } from "@/lib/date";
import CurrentStage from "@/components/dashboard/plants/CurrentStage";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { FaPrint } from "react-icons/fa";
import Link from "next/link";

export default function PlantHero({
  plant,
  currentStage,
  printUrl,
}: {
  plant: Plant & { plant_stages?: PlantStage[] };
  currentStage?: PlantStage;
  printUrl?: string;
}) {
  const breadcrumbItems = [
    { label: "Plants", href: "/dashboard/plants" },
    { label: plant.species }, // current page, no href
  ];

  const tooltips = {
    source: "Where the original plant material came from.",
    nDate:
      "N Date: When the plant was cut from the mother block and entered culture (used to track transfer cycles).",
    iDate:
      "I Date: When the plant was first put into culture (initiation date).",
    transferCycle:
      "Number of subculture transfers this plant has undergone. Typically a maximum of 12 cycles.",
    media:
      "The type of media formulations used for this plant during tissue culture.",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="relative w-full h-auto aspect-square rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={plant.photo_url || "/png/placeholder-plant.png"}
          alt={plant.species}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col justify-center space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <Breadcrumbs items={breadcrumbItems} />
            {printUrl && (
              <Link
                href={printUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-white bg-biochar-black hover:bg-future-lime/90 hover:text-biochar-black duration-500 ease-in-out px-3 py-2 rounded-md shadow-sm transition"
              >
                <FaPrint className="w-3 h-3" />
                Print Label
              </Link>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {plant.species}
          </h1>
          <p className="text-gray-500 mb-8">
            Detailed culture log and lifecycle overview
          </p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <TooltipItem
              label="Source"
              tooltip={tooltips.source}
              value={plant.source || "N/A"}
            />

            <TooltipItem
              label="Initial N Date"
              tooltip={tooltips.nDate}
              tooltipWidth="w-64"
              value={formatDate(plant.initial_n_date)}
            />

            <TooltipItem
              label="Initial I Date"
              tooltip={tooltips.iDate}
              tooltipWidth="w-64"
              value={formatDate(plant.initial_i_date)}
            />

            <TooltipItem
              label="Transfer Cycle"
              tooltip={tooltips.transferCycle}
              tooltipWidth="w-60"
              value={plant.transfer_cycle}
            />

            {plant.media?.length > 0 && (
              <div className="sm:col-span-2">
                <TooltipItem
                  label="Media"
                  tooltip={tooltips.media}
                  tooltipWidth="w-60"
                  value={plant.media.join(", ")}
                />
              </div>
            )}
          </dl>
        </div>

        {currentStage && <CurrentStage stage={currentStage} />}
      </div>
    </div>
  );
}
