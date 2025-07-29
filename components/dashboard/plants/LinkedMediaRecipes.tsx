import { MediaRecipe } from "@/lib/types";
import { BookOpen } from "lucide-react";

export default function LinkedMediaRecipes({
  recipes,
}: {
  recipes: MediaRecipe[];
}) {
  const hasRecipes = recipes.length > 0;

  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-[var(--moss-shadow)] mb-4">
        Linked Media Recipes
      </h2>

      {!hasRecipes ? (
        <div className="flex flex-col items-center justify-center py-16 bg-[var(--spore-grey)] rounded-xl text-center">
          <BookOpen className="w-12 h-12 text-[var(--moss-shadow)] mb-4" />
          <p className="text-[var(--moss-shadow)] text-lg font-medium">
            No linked media recipes
          </p>
          <p className="text-gray-500 text-sm mt-1">
            There are currently no media recipes linked to this plant.
          </p>
        </div>
      ) : (
        <ul className="space-y-2 text-sm text-gray-700">
          {recipes.map((r) => (
            <li
              key={r.id}
              className="bg-[var(--spore-grey)]/20 rounded-lg p-3 hover:bg-[var(--spore-grey)]/40 transition"
            >
              {r.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
