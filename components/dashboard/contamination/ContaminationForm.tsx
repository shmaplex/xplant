"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ContaminationForm() {
  const [form, setForm] = useState({
    plant_id: "",
    notes: "",
    photo: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl: string | null = null;
    if (form.photo) {
      const { data, error } = await supabase.storage
        .from("contamination-photos")
        .upload(`contamination/${Date.now()}-${form.photo.name}`, form.photo);

      if (error) {
        console.error("Upload failed:", error);
        setUploading(false);
        return;
      }
      imageUrl = data?.path ?? null;
    }

    const { error } = await supabase.from("contamination_logs").insert([
      {
        plant_id: form.plant_id,
        notes: form.notes,
        photo_url: imageUrl,
      },
    ]);

    setUploading(false);
    if (!error) {
      alert("Contamination logged.");
      setForm({ plant_id: "", notes: "", photo: null });
    } else {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow rounded-xl space-y-3"
    >
      <h2 className="text-lg font-semibold">Log Contamination</h2>
      <input
        type="text"
        placeholder="Plant ID"
        value={form.plant_id}
        onChange={(e) => setForm({ ...form, plant_id: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setForm({ ...form, photo: e.target.files?.[0] ?? null })
        }
        className="block"
      />
      <button
        type="submit"
        className="bg-moss-shadow text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={uploading}
      >
        {uploading ? "Logging..." : "Submit"}
      </button>
    </form>
  );
}
