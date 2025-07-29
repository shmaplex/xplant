// =========================================
// 📄 PAGE: /dashboard/plants/[id]/edit/page.tsx
// =========================================
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Plant } from "@/lib/types";

export default function EditPlantPage({ params }: { params: { id: string } }) {
  const supabase = createClient(); // use custom browser client
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
        .eq("id", params.id)
        .single();

      if (data) {
        setForm({
          species: data.species ?? "",
          source: data.source ?? "",
          initial_n_date: data.initial_n_date ?? "",
          initial_i_date: data.initial_i_date ?? "",
          notes: data.notes ?? "",
        });
      }

      setLoading(false);
    })();
  }, [params.id, supabase]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("plants")
      .update(form)
      .eq("id", params.id);

    if (!error) {
      router.push(`/dashboard/plants/${params.id}`);
    } else {
      alert("Update failed.");
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-4">Edit Plant</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          required
          placeholder="Species"
          className="input"
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value })}
        />
        <input
          type="text"
          placeholder="Source"
          className="input"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
        />
        <input
          type="date"
          placeholder="N Date"
          className="input"
          value={form.initial_n_date}
          onChange={(e) => setForm({ ...form, initial_n_date: e.target.value })}
        />
        <input
          type="date"
          placeholder="I Date"
          className="input"
          value={form.initial_i_date}
          onChange={(e) => setForm({ ...form, initial_i_date: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          className="input"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <button
          type="submit"
          className="bg-[var(--future-lime)] px-4 py-2 rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
}
