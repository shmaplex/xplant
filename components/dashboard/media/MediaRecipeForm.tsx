"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MediaComponentRow from "./MediaComponentRow";

type ComponentItem = {
  id: string;
  name: string;
  qty: string;
};

export default function MediaRecipeForm({ recipeId }: { recipeId?: string }) {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [recipeComponents, setRecipeComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [allComponentNames, setAllComponentNames] = useState<string[]>([]);

  // Product state
  const [products, setProducts] = useState<any[]>([]);
  const [linkedProductIds, setLinkedProductIds] = useState<string[]>([]);

  /**
   * Initialize blank component only for new recipes
   */
  useEffect(() => {
    if (!recipeId) {
      setRecipeComponents([{ id: crypto.randomUUID(), name: "", qty: "" }]);
    }
  }, [recipeId]);

  /**
   * Load existing recipe when editing
   */
  useEffect(() => {
    if (!recipeId) return;

    const loadRecipe = async () => {
      const { data, error } = await supabase
        .from("media_recipes")
        .select("title, components, linked_product_ids")
        .eq("id", recipeId)
        .maybeSingle();

      if (error) {
        console.error("Failed to fetch recipe:", error);
        return;
      }

      if (data) {
        setTitle(data.title || "");
        setRecipeComponents(
          (data.components || []).map((c: any) => ({
            id: crypto.randomUUID(),
            name: c.name,
            qty: c.qty,
          }))
        );
        setLinkedProductIds(data.linked_product_ids || []);
      }
    };

    loadRecipe();
  }, [recipeId, supabase]);

  /**
   * Fetch existing component names for autocomplete suggestions
   */
  useEffect(() => {
    const fetchComponents = async () => {
      const { data, error } = await supabase
        .from("media_recipes")
        .select("components");
      if (error) {
        console.error(error);
        return;
      }

      const names = new Set<string>();
      data?.forEach((recipe) => {
        if (Array.isArray(recipe.components)) {
          recipe.components.forEach((c: any) => {
            if (c.name) names.add(c.name);
          });
        }
      });
      setAllComponentNames(Array.from(names).sort());
    };
    fetchComponents();
  }, [supabase]);

  /**
   * Fetch all products for linking
   */
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("id,title")
        .order("title");

      if (error) {
        console.error("Error loading products:", error);
        return;
      }
      setProducts(data || []);
    }
    fetchProducts();
  }, [supabase]);

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

    const { error } = await supabase.from("media_recipes").upsert(
      [
        {
          id: recipeId, // ensures update if editing
          user_id: session.user.id,
          title,
          components: cleanComponents,
          linked_product_ids: linkedProductIds,
        },
      ],
      { onConflict: "id" }
    );

    setLoading(false);

    if (error) {
      toast.error("Failed to save recipe.");
      console.error(error);
    } else {
      toast.success("Media recipe saved!");
      if (!recipeId) {
        // reset form only when creating new
        setTitle("");
        setRecipeComponents([{ id: crypto.randomUUID(), name: "", qty: "" }]);
        setLinkedProductIds([]);
      }
    }
  };

  if (recipeComponents.length === 0) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Recipe Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input w-full rounded border border-spore-grey/50 focus:ring-2 focus:ring-psybeam-purple focus:outline-none p-2"
          placeholder="Enter recipe title"
          required
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

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-moss-shadow mb-2">
          Link to Products
        </legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto border rounded p-2 bg-white">
          {products.map((p) => (
            <label key={p.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={linkedProductIds.includes(p.id)}
                onChange={() => toggleLinkedProduct(p.id)}
              />
              {p.title}
            </label>
          ))}
        </div>
      </fieldset>

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
