import { MediaRecipe } from "@/lib/types";

export default function LinkedMediaRecipes({
  recipes,
}: {
  recipes: MediaRecipe[];
}) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow max-w-6xl mx-auto">
      <h2 className="text-xl font-semibold text-[var(--moss-shadow)] mb-4">
        Linked Media Recipes
      </h2>
      {recipes.length === 0 ? (
        <p className="text-gray-600">No linked media recipes.</p>
      ) : (
        <ul className="space-y-2 text-sm text-gray-700">
          {recipes.map((r) => (
            <li key={r.id} className="bg-[var(--spore-grey)]/20 rounded-lg p-3">
              {r.title}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
