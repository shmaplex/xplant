"use client";

import Link from "next/link";
import { MediaRecipe } from "@/lib/types";
import { HiOutlineStar } from "react-icons/hi";

interface MediaRecipeCardProps {
  recipe: MediaRecipe;
  linkedPlants?: { id: string; species: string }[]; // fetched separately
}

export default function MediaRecipeCard({
  recipe,
  linkedPlants = [],
}: MediaRecipeCardProps) {
  return (
    <div className="relative bg-white rounded-2xl shadow border border-spore-grey/30 hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Badge for system recipes */}
      {recipe.origin === "system" && (
        <div
          className="absolute top-0 right-0 z-10
                     bg-organic-amber-light/20 text-organic-amber
                     text-xs font-semibold px-3 py-1 rounded-bl-lg
                     flex items-center gap-1 pointer-events-none select-none"
          title="System Recipe Spotlight"
        >
          <HiOutlineStar className="h-3 w-3" aria-hidden="true" />
          Spotlight
        </div>
      )}

      <Link
        href={`/dashboard/media/${recipe.id}`}
        className="block p-5 flex-1 focus:outline-none focus:ring-2 focus:ring-psybeam-purple"
      >
        <h3 className="text-lg font-semibold text-biochar-black mb-3 pt-2">
          {recipe.title}
        </h3>

        <div className="mb-3 text-sm text-moss-shadow space-y-1 min-h-[60px]">
          {Array.isArray(recipe.components) && recipe.components.length > 0 ? (
            recipe.components.map((comp, i) => (
              <div key={i}>
                <span className="font-semibold">{comp.name}</span>: {comp.qty}
              </div>
            ))
          ) : (
            <p className="italic text-gray-400">No components listed.</p>
          )}
        </div>
      </Link>

      {/* Footer: Linked Plants */}
      {linkedPlants.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-3 bg-gray-50">
          <p className="text-xs font-semibold text-psybeam-purple mb-2">
            Linked Plants
          </p>
          <div className="flex flex-wrap gap-2">
            {linkedPlants.map((plant) => (
              <Link
                key={plant.id}
                href={`/dashboard/plants/${plant.id}`}
                className="bg-future-lime text-biochar-black text-xs px-2 py-1 rounded hover:underline"
              >
                {plant.species}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
