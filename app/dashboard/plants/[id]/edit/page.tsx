"use client";

import React, { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function EditPlantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const supabase = createClient();
  const router = useRouter();

  const [form, setForm] = useState({
    species: "",
    source: "",
    initial_n_date: "",
    initial_i_date: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("plants")
        .select("species, source, initial_n_date, initial_i_date, notes")
        .eq("id", unwrappedParams.id)
        .single();

      if (data) {
        setForm({
          species: data.species ?? "",
          source: data.source ?? "",
          initial_n_date: data.initial_n_date ?? "",
          initial_i_date: data.initial_i_date ?? "",
          notes: data.notes ?? "",
        });
      } else if (error) {
        console.error("Error fetching plant data:", error);
      }

      setLoading(false);
    })();
  }, [unwrappedParams.id, supabase]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("plants")
      .update(form)
      .eq("id", unwrappedParams.id);

    if (!error) {
      router.push(`/dashboard/plants/${unwrappedParams.id}`);
    } else {
      alert("Update failed.");
      console.error("Update error:", error);
    }
  }

  if (loading)
    return <p className="p-6 text-center text-spore-grey">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Plants", href: "/dashboard/plants" },
          {
            label: form.species || "Plant Details",
            href: `/dashboard/plants/${unwrappedParams.id}`,
          },
          { label: "Edit" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form Section */}
        <div>
          <h1 className="text-3xl font-bold mb-6 text-biochar-black">
            ✏️ Edit Plant
          </h1>

          <form
            onSubmit={handleUpdate}
            className="space-y-6 bg-white shadow-xl rounded-2xl p-8"
          >
            {/* Species */}
            <div>
              <label
                htmlFor="species"
                className="block text-sm font-medium text-spore-grey mb-1"
              >
                Species <span className="text-red-500">*</span>
              </label>
              <input
                id="species"
                name="species"
                type="text"
                required
                className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
                placeholder="e.g. Musa acuminata"
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
              />
            </div>

            {/* Source */}
            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium text-spore-grey mb-1"
              >
                Source
              </label>
              <input
                id="source"
                name="source"
                type="text"
                className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
                placeholder="e.g. Greenhouse A, TC Vendor"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="initial_n_date"
                  className="block text-sm font-medium text-spore-grey mb-1"
                >
                  Initial N Date
                </label>
                <input
                  id="initial_n_date"
                  name="initial_n_date"
                  type="date"
                  className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
                  value={form.initial_n_date}
                  onChange={(e) =>
                    setForm({ ...form, initial_n_date: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="initial_i_date"
                  className="block text-sm font-medium text-spore-grey mb-1"
                >
                  Initial I Date
                </label>
                <input
                  id="initial_i_date"
                  name="initial_i_date"
                  type="date"
                  className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
                  value={form.initial_i_date}
                  onChange={(e) =>
                    setForm({ ...form, initial_i_date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-spore-grey mb-1"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={5}
                className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime resize-none"
                placeholder="Any relevant notes about this plant..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-future-lime text-biochar-black font-semibold py-3 px-4 rounded-lg shadow hover:bg-lime-400 transition"
              >
                💾 Update Plant
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Section */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-biochar-black mb-6 border-b border-gray-200 pb-4">
            Live Preview
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-1">
                {form.species || (
                  <span className="italic text-gray-400">No species</span>
                )}
              </h3>
              {form.source && (
                <p className="text-gray-500 text-sm">{form.source}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Initial N Date
                </p>
                <p className="text-base text-green-900">
                  {form.initial_n_date || (
                    <i className="text-gray-400">Not set</i>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Initial I Date
                </p>
                <p className="text-base text-green-900">
                  {form.initial_i_date || (
                    <i className="text-gray-400">Not set</i>
                  )}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
                Notes
              </p>
              <div className="p-4 rounded-lg bg-gray-50 min-h-[6rem] text-green-900 whitespace-pre-wrap">
                {form.notes || <i className="text-gray-400">No notes yet</i>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
