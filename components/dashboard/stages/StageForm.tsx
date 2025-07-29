"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { PlantSummary } from "@/lib/types";

export default function StageForm() {
  const [plants, setPlants] = useState<PlantSummary[]>([]);
  const [form, setForm] = useState({
    plant_id: "",
    stage: "Mother Block",
    room: "",
    entered_on: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const supabase = createClientComponentClient();

  useEffect(() => {
    const loadPlants = async () => {
      const { data } = await supabase.from("plants").select("id, species");
      if (data) setPlants(data);
    };
    loadPlants();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("plant_stages").insert([form]);
    if (!error) {
      alert("Stage added!");
      setForm({ ...form, notes: "" });
    } else {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded-xl space-y-3"
    >
      <h2 className="text-lg font-semibold">Add/Change Stage</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          value={form.plant_id}
          onChange={(e) => setForm({ ...form, plant_id: e.target.value })}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Plant</option>
          {plants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.species}
            </option>
          ))}
        </select>

        <select
          value={form.stage}
          onChange={(e) => setForm({ ...form, stage: e.target.value as any })}
          className="border p-2 rounded"
        >
          <option value="Mother Block">Mother Block</option>
          <option value="Acclimation">Acclimation</option>
          <option value="Production">Production</option>
          <option value="Cold Storage">Cold Storage</option>
        </select>

        <input
          type="text"
          placeholder="Room"
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={form.entered_on}
          onChange={(e) => setForm({ ...form, entered_on: e.target.value })}
          className="border p-2 rounded"
        />
      </div>

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-moss-shadow text-white px-4 py-2 rounded"
      >
        Save Stage
      </button>
    </form>
  );
}
