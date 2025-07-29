"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "react-toastify";

interface TaskFormProps {
  onTaskAdded?: () => void;
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const supabase = createClient();
  const [form, setForm] = useState({
    title: "",
    category: "media_prep",
    due_date: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the current user
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast.error("You must be logged in to add tasks.");
      return;
    }

    const { title, category, due_date, notes } = form;

    const { error } = await supabase.from("tasks").insert({
      user_id: user.id,
      title,
      category, // must be snake_case
      due_date,
      notes,
      is_completed: false,
    });

    if (error) {
      console.error("Insert error:", error);
      toast.error("Failed to add task");
    } else {
      toast.success("Task added!");
      setForm({ title: "", category: "media_prep", due_date: "", notes: "" });

      if (onTaskAdded) onTaskAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold">Add Task</h2>

      <input
        type="text"
        placeholder="Task title"
        value={form.title}
        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        className="p-2 border rounded w-full"
        required
      />

      <select
        value={form.category}
        onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
        className="p-2 border rounded w-full"
      >
        <option value="media_prep">Media Prep</option>
        <option value="subculture">Subculturing</option>
        <option value="cleaning">Cleaning</option>
        <option value="monitoring">Monitoring</option>
        <option value="other">Other</option>
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
        className="bg-moss-shadow text-white px-4 py-2 rounded w-full"
      >
        Add Task
      </button>
    </form>
  );
}
