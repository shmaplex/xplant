"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PlantSummary } from "@/lib/types";
import { FiSave } from "react-icons/fi";

export default function StageForm() {
  const [plants, setPlants] = useState<PlantSummary[]>([]);
  const [form, setForm] = useState({
    plant_id: "",
    stage: "Mother Block",
    room: "",
    entered_on: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const supabase = createClient();

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
      className="bg-white/70 shadow p-6 rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-lichen-blue-dark">
        Add / Change Stage
      </h2>

      {/* Plant Select */}
      <div>
        <label
          htmlFor="plant"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Select Plant <span className="text-red-600">*</span>
        </label>
        <select
          id="plant"
          value={form.plant_id}
          onChange={(e) => setForm({ ...form, plant_id: e.target.value })}
          required
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black focus:outline-none focus:ring-2 focus:ring-lichen-blue"
        >
          <option value="">-- Choose a Plant --</option>
          {plants.map((p) => (
            <option key={p.id} value={p.id}>
              {p.species}
            </option>
          ))}
        </select>
      </div>

      {/* Stage Select */}
      <div>
        <label
          htmlFor="stage"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Stage
        </label>
        <select
          id="stage"
          value={form.stage}
          onChange={(e) => setForm({ ...form, stage: e.target.value })}
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black focus:outline-none focus:ring-2 focus:ring-lichen-blue"
        >
          <option value="Mother Block">Mother Block</option>
          <option value="Acclimation">Acclimation</option>
          <option value="Production">Production</option>
          <option value="Cold Storage">Cold Storage</option>
        </select>
      </div>

      {/* Room */}
      <div>
        <label
          htmlFor="room"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Room
        </label>
        <input
          type="text"
          id="room"
          placeholder="Room name or code"
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black focus:outline-none focus:ring-2 focus:ring-lichen-blue"
        />
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="entered_on"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Entered On
        </label>
        <input
          type="date"
          id="entered_on"
          value={form.entered_on}
          onChange={(e) => setForm({ ...form, entered_on: e.target.value })}
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black focus:outline-none focus:ring-2 focus:ring-lichen-blue"
        />
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Notes
        </label>
        <textarea
          id="notes"
          placeholder="Add any relevant details..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          rows={4}
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black resize-none focus:outline-none focus:ring-2 focus:ring-lichen-blue"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-lichen-blue-dark text-white font-semibold py-3 px-4 rounded-lg shadow hover:bg-lichen-blue transition"
      >
        <FiSave className="w-5 h-5" />
        Save Stage
      </button>
    </form>
  );
}
