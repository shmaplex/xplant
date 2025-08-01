"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  fetchPlants,
  fetchMediaRecipeOptions,
  linkPlantToRecipe,
} from "@/lib/api/media";

type PlantOption = {
  id: string;
  species: string;
};

type RecipeOption = {
  id: string;
  title: string;
};

export default function MediaRecipeLinker() {
  const [plants, setPlants] = useState<PlantOption[]>([]);
  const [recipes, setRecipes] = useState<RecipeOption[]>([]);
  const [selected, setSelected] = useState({ plant_id: "", recipe_id: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [plantsData, recipesData] = await Promise.all([
          fetchPlants(),
          fetchMediaRecipeOptions(),
        ]);
        setPlants(plantsData);
        setRecipes(recipesData);
      } catch (err) {
        console.error("Failed to load plants or recipes:", err);
        toast.error("Failed to load data.");
      }
    };
    load();
  }, []);

  const link = async () => {
    if (!selected.plant_id || !selected.recipe_id) {
      toast.warning("Please select both a plant and a recipe.");
      return;
    }

    setLoading(true);
    const { error } = await linkPlantToRecipe(
      selected.plant_id,
      selected.recipe_id
    );
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.info("This plant is already linked to the selected recipe.");
      } else {
        toast.error("Failed to link recipe.");
        console.error(error);
      }
    } else {
      toast.success("Media recipe linked to plant!");
      setSelected({ plant_id: "", recipe_id: "" });
    }
  };

  return (
    <div className="w-full mx-auto bg-white shadow rounded-2xl p-6 space-y-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-moss-shadow">
        Link Media Recipe to Plant
      </h2>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-moss-shadow">
          Select Plant
        </label>
        <select
          value={selected.plant_id}
          onChange={(e) =>
            setSelected({ ...selected, plant_id: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
        >
          <option value="">— Choose a plant —</option>
          {plants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.species}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-moss-shadow">
          Select Media Recipe
        </label>
        <select
          value={selected.recipe_id}
          onChange={(e) =>
            setSelected({ ...selected, recipe_id: e.target.value })
          }
          className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-psybeam-purple focus:outline-none"
        >
          <option value="">— Choose a recipe —</option>
          {recipes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={link}
        disabled={loading}
        className="w-full bg-psybeam-purple text-white font-semibold py-2.5 rounded-lg hover:bg-psybeam-purple/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Linking…" : "Link Recipe"}
      </button>
    </div>
  );
}
