"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { ContaminationLog } from "@/lib/types";

interface ContaminationFormProps {
  initial?: ContaminationLog; // pass this when editing
  onSuccess?: () => void; // optional callback on successful submit
}

export default function ContaminationForm({
  initial,
  onSuccess,
}: ContaminationFormProps) {
  const [form, setForm] = useState({
    plant_id: "",
    type: "mold",
    issue: "",
    description: "",
    photo: null as File | null,
  });

  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  // Pre-fill the form if `initial` is provided (editing)
  useEffect(() => {
    if (initial) {
      setForm({
        plant_id: initial.plant_id || "",
        type: initial.type || "mold",
        issue: initial.issue || "",
        description: initial.description || "",
        photo: null,
      });
    }
  }, [initial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl: string | null = initial?.photo_url ?? null;

    // Upload new photo if selected
    if (form.photo) {
      const { data, error } = await supabase.storage
        .from("contamination-photos")
        .upload(`contamination/${Date.now()}-${form.photo.name}`, form.photo, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Upload failed:", error);
        setUploading(false);
        return;
      }
      imageUrl = data?.path ?? null;
    }

    // If editing, update instead of insert
    if (initial?.id) {
      const { error } = await supabase
        .from("contamination_logs")
        .update({
          plant_id: form.plant_id,
          type: form.type,
          issue: form.issue,
          description: form.description,
          photo_url: imageUrl,
        })
        .eq("id", initial.id);

      setUploading(false);

      if (!error) {
        alert("Contamination log updated.");
        onSuccess?.();
      } else {
        console.error("Update failed:", error);
      }
    } else {
      // Otherwise, create new
      const { error } = await supabase.from("contamination_logs").insert([
        {
          plant_id: form.plant_id,
          type: form.type,
          issue: form.issue,
          description: form.description,
          photo_url: imageUrl,
        },
      ]);

      setUploading(false);

      if (!error) {
        alert("Contamination logged.");
        setForm({
          plant_id: "",
          type: "mold",
          issue: "",
          description: "",
          photo: null,
        });
        onSuccess?.();
      } else {
        console.error("Insert failed:", error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold text-moss-shadow">
        {initial ? "Edit Contamination Log" : "Log Contamination"}
      </h2>

      <input
        type="text"
        placeholder="Plant ID"
        value={form.plant_id}
        onChange={(e) => setForm({ ...form, plant_id: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />

      <div>
        <label className="block mb-1 font-medium">Type</label>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="mold">Mold</option>
          <option value="bacteria">Bacteria</option>
          <option value="hyperhydricity">Hyperhydricity</option>
          <option value="other">Other</option>
        </select>
      </div>

      {form.type !== "other" && (
        <input
          type="text"
          placeholder="Issue"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
      )}

      <textarea
        placeholder="Description (optional)"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
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
        {uploading
          ? initial
            ? "Updating..."
            : "Logging..."
          : initial
          ? "Update Log"
          : "Submit"}
      </button>
    </form>
  );
}
