"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MediaComponentRow from "./MediaComponentRow";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  fetchMediaRecipeById,
  fetchRecipeLinkedProducts,
  fetchAllComponentNames,
  fetchProducts,
  saveMediaRecipe,
  updateRecipeProductLinks,
} from "@/api/media";

import Input from "@/components/ui/Input";
import MediaProductLinkSelector from "@/components/dashboard/media/MediaProductLinkSelector";

type ComponentItem = {
  id: string;
  name: string;
  qty: string;
};

export default function MediaRecipeForm({ recipeId }: { recipeId?: string }) {
  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [recipeComponents, setRecipeComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [allComponentNames, setAllComponentNames] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [linkedProductIds, setLinkedProductIds] = useState<string[]>([]);

  useEffect(() => {
    if (!recipeId) {
      setRecipeComponents([{ id: crypto.randomUUID(), name: "", qty: "" }]);
    }
  }, [recipeId]);

  useEffect(() => {
    if (!recipeId) return;

    const loadRecipe = async () => {
      try {
        const data = await fetchMediaRecipeById(recipeId);
        if (data) {
          setTitle(data.title || "");
          setRecipeComponents(
            (data.components || []).map((c: any) => ({
              id: crypto.randomUUID(),
              name: c.name,
              qty: c.qty,
            }))
          );
        }

        const links = await fetchRecipeLinkedProducts(recipeId);
        setLinkedProductIds(links);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      }
    };

    loadRecipe();
  }, [recipeId]);

  useEffect(() => {
    fetchAllComponentNames()
      .then(setAllComponentNames)
      .catch((err) => console.error("Failed to fetch component names:", err));
  }, []);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  const toggleLinkedProduct = (id: string) => {
    setLinkedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleComponentChange = (
    id: string,
    field: "name" | "qty",
    value: string
  ) => {
    setRecipeComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, [field]: value } : comp))
    );
  };

  const addComponent = () => {
    setRecipeComponents((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", qty: "" },
    ]);
  };

  const removeComponent = (id: string) => {
    setRecipeComponents((prev) => prev.filter((comp) => comp.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.warning("Recipe title is required.");
      return;
    }

    const cleanComponents = recipeComponents.filter(
      (c) => c.name.trim() && c.qty.trim()
    );

    if (cleanComponents.length === 0) {
      toast.warning("At least one component is required.");
      return;
    }

    setLoading(true);

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      toast.error("User session not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const recipe_id = await saveMediaRecipe({
        recipeId,
        userId: session.user.id,
        title,
        components: cleanComponents,
      });

      await updateRecipeProductLinks(recipe_id, linkedProductIds);

      toast.success("Media recipe saved!");
      setTimeout(() => {
        router.push(`/dashboard/media/${recipe_id}`);
      }, 1000);
    } catch (err) {
      console.error("Failed to save recipe:", err);
      toast.error("Failed to save recipe.");
    } finally {
      setLoading(false);
    }
  };

  if (recipeComponents.length === 0) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Recipe Title
        </label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter recipe title"
          required
          className="w-full"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-moss-shadow mb-2">
          Components
        </legend>
        {recipeComponents.map((comp) => (
          <MediaComponentRow
            key={comp.id}
            id={comp.id}
            name={comp.name}
            qty={comp.qty}
            onChange={handleComponentChange}
            onRemove={removeComponent}
            disableRemove={recipeComponents.length === 1}
            suggestions={allComponentNames}
            InputComponent={Input} // pass down the input component if your MediaComponentRow supports it
          />
        ))}

        <button
          type="button"
          onClick={addComponent}
          className="text-sm text-psybeam-purple hover:underline mt-2"
        >
          + Add another component
        </button>
      </fieldset>

      <MediaProductLinkSelector
        products={products}
        linkedProductIds={linkedProductIds}
        toggleLinkedProduct={toggleLinkedProduct}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-psybeam-purple text-white font-semibold py-2 rounded hover:bg-psybeam-purple/90 transition disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Recipe"}
      </button>
    </form>
  );
}
