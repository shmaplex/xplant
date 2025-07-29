"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskForm() {
  const supabase = createClientComponentClient();
  const [form, setForm] = useState({
    task_type: "Media Prep",
    due_date: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { task_type, due_date, notes } = form;

    const { error } = await supabase.from("tasks").insert({
      task_type,
      due_date,
      notes,
      completed: false,
    });

    if (error) {
      toast.error("Failed to add task");
    } else {
      toast.success("Task added!");
      setForm({ task_type: "Media Prep", due_date: "", notes: "" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold">Add Task</h2>

      <select
        value={form.task_type}
        onChange={(e) => setForm((f) => ({ ...f, task_type: e.target.value }))}
        className="p-2 border rounded w-full"
      >
        <option>Media Prep</option>
        <option>Subculturing</option>
        <option>Cleaning</option>
        <option>Monitoring</option>
      </select>

      <input
        type="date"
        value={form.due_date}
        onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
        className="p-2 border rounded w-full"
        required
      />

      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        className="p-2 border rounded w-full"
      />

      <button
        type="submit"
        className="bg-moss-shadow text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}
