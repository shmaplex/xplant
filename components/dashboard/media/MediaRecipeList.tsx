"use client";

import { useEffect, useState } from "react";
import { MediaRecipe } from "@/lib/types";
import MediaRecipeCard from "@/components/dashboard/media/MediaRecipeCard";
import { fetchMediaRecipes } from "@/lib/api/media";
import MediaRecipeNotFound from "./MediaRecipeNotFound";
import SearchInput from "@/components/ui/SearchInput";

const PAGE_SIZE = 12;

export default function MediaRecipeList() {
  const [recipes, setRecipes] = useState<MediaRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadRecipes(0, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  async function loadRecipes(pageNum: number, searchTerm = search) {
    if (pageNum === 0) setLoading(true);
    else setLoadingMore(true);

    try {
      const newRecipes = await fetchMediaRecipes(
        PAGE_SIZE,
        pageNum * PAGE_SIZE,
        searchTerm
      );

      if (newRecipes.length < PAGE_SIZE) setHasMore(false);
      else setHasMore(true);

      if (pageNum === 0) {
        setRecipes(newRecipes);
      } else {
        setRecipes((prev) => {
          const all = [...prev, ...newRecipes];
          const seen = new Set<string>();
          return all.filter((r) => {
            if (seen.has(r.id)) return false;
            seen.add(r.id);
            return true;
          });
        });
      }

      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching media recipes:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  return (
    <>
      <div className="mb-6">
        <SearchInput
          value={search}
          onChange={setSearch}
          title="Search Media Recipes"
          subtitle="Quickly find your plant tissue culture media by recipe name or components."
          placeholder="Search recipes by title or ingredients..."
        />
      </div>

      {loading ? (
        <p className="text-center text-sm text-spore-grey py-20">
          Loading media recipes...
        </p>
      ) : recipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No recipes found
          </h3>
          <p className="text-gray-500 max-w-md mb-6">
            We couldn&apos;t find any media recipes matching your search. Try
            adjusting your keywords or show all recipes again.
          </p>
          <button
            onClick={() => setSearch("")}
            className="px-4 py-2 bg-psybeam-purple text-white rounded-lg shadow hover:bg-psybeam-purple-dark transition"
          >
            Clear search
          </button>
        </div>
      ) : (
        <>
          <div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 h-auto overflow-y-auto p-4 bg-white/20 rounded-2xl border border-gray-200"
            style={{ minHeight: "600px" }}
          >
            {recipes.map((recipe) => (
              <MediaRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-2 bg-psybeam-purple text-white rounded hover:bg-psybeam-purple-dark transition"
                onClick={() => loadRecipes(page + 1)}
                disabled={loadingMore}
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
