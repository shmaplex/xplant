"use client";

import Link from "next/link";
import Image from "next/image";
import { Plant } from "@/lib/types";
import { useState } from "react";

export default function PlantCard({ plant }: { plant: Plant }) {
  const fallback = "/png/placeholder-plant.png";
  const [imgSrc, setImgSrc] = useState(plant.photo_url || fallback);

  return (
    <Link href={`/dashboard/plants/${plant.id}`}>
      <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
        <div className="relative w-full h-auto aspect-square mb-2">
          <Image
            src={imgSrc}
            alt={plant.species}
            fill
            className="object-cove rounded-md"
            onError={() => setImgSrc(fallback)}
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
          />
        </div>

        <h3 className="font-semibold text-lg">{plant.species}</h3>
        <p className="text-sm text-gray-600">
          Stage: {plant.current_stage?.stage ?? "Unknown"}
        </p>
        <p className="text-xs text-gray-400">
          Transfers: {plant.transfer_cycle}
        </p>
      </div>
    </Link>
  );
}
