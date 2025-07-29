// =========================================
// 📄 PAGE: /dashboard/plants/new/page.tsx
// =========================================
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function NewPlantForm() {
  const [form, setForm] = useState({
    species: "",
    source: "",
    initial_n_date: "",
    initial_i_date: "",
    notes: "",
  });

  const router = useRouter();
  const supabase = createClientComponentClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = (await supabase.auth.getUser()).data.user;

    const { data, error } = await supabase
      .from("plants")
      .insert([
        {
          user_id: user?.id,
          species: form.species,
          source: form.source,
          initial_n_date: form.initial_n_date,
          initial_i_date: form.initial_i_date,
          notes: form.notes,
        },
      ])
      .select()
      .single();

    if (!error && data) {
      await supabase.from("plant_stages").insert([
        {
          plant_id: data.id,
          stage: "Mother Block",
          entered_on: new Date().toISOString(),
          notes: "Initial stage",
        },
      ]);
      router.push(`/dashboard/plants/${data.id}`);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-biochar-black">
          🌱 Add New Plant
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-spore-grey mb-1">
              Species <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
              placeholder="e.g. Musa acuminata"
              value={form.species}
              onChange={(e) => setForm({ ...form, species: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-spore-grey mb-1">
              Source
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
              placeholder="e.g. Greenhouse A, TC Vendor"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-spore-grey mb-1">
                Initial N Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
                value={form.initial_n_date}
                onChange={(e) =>
                  setForm({ ...form, initial_n_date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-spore-grey mb-1">
                Initial I Date
              </label>
              <input
                type="date"
                className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
                value={form.initial_i_date}
                onChange={(e) =>
                  setForm({ ...form, initial_i_date: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-spore-grey mb-1">
              Notes
            </label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
              placeholder="Any relevant notes about this plant..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-future-lime text-biochar-black font-semibold py-3 px-4 rounded-lg shadow hover:bg-lime-400 transition"
            >
              ➕ Save Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
