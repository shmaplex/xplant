"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlantForm() {
  const [form, setForm] = useState({
    species: "",
    source: "",
    initial_n_date: "",
    initial_i_date: "",
    current_stage: "acclimating",
    media: "",
    notes: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, media: [form.media] }), // force media into array
    });

    if (res.ok) {
      router.push("/dashboard/plants");
    } else {
      const err = await res.json();
      console.error("Error saving plant:", err);
      alert("Failed to save plant.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow max-w-xl mx-auto"
    >
      {[
        { name: "species", label: "Species/Cultivar" },
        { name: "source", label: "Source" },
        { name: "initial_n_date", label: "N Date", type: "date" },
        { name: "initial_i_date", label: "I Date", type: "date" },
        { name: "media", label: "Media Used" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          <input
            type={field.type || "text"}
            name={field.name}
            value={(form as any)[field.name]}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-psybeam-purple focus:border-psybeam-purple"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700">Stage</label>
        <select
          name="current_stage"
          value={form.current_stage}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-psybeam-purple focus:border-psybeam-purple"
        >
          <option value="acclimating">Acclimating</option>
          <option value="acclimated">Acclimated</option>
          <option value="production">Production</option>
          <option value="cold storage">Cold Storage</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-psybeam-purple focus:border-psybeam-purple"
        />
      </div>

      <button
        type="submit"
        className="bg-[var(--future-lime)] text-black px-4 py-2 rounded-md font-semibold hover:bg-lime-300 transition"
      >
        Save Plant
      </button>
    </form>
  );
}
