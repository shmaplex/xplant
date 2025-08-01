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
      category,
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
      className="space-y-6 bg-lichen-blue-light/30 p-6 rounded-2xl border border-lichen-blue-light"
    >
      <h2 className="text-2xl font-bold text-lichen-blue-dark">Add Task</h2>

      <div className="space-y-2">
        <label className="text-sm font-medium text-lichen-blue-dark">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter task title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="p-3 rounded-lg w-full bg-white/70 border border-lichen-blue-light text-lichen-blue-dark placeholder-lichen-blue-dark/40 focus:ring-2 focus:ring-lichen-blue-dark focus:outline-none transition"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-lichen-blue-dark">
          Category
        </label>
        <select
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          className="p-3 rounded-lg w-full bg-white/70 border border-lichen-blue-light text-lichen-blue-dark focus:ring-2 focus:ring-lichen-blue-dark focus:outline-none transition"
        >
          <option value="media_prep">Media Prep</option>
          <option value="subculture">Subculturing</option>
          <option value="cleaning">Cleaning</option>
          <option value="monitoring">Monitoring</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-lichen-blue-dark">
          Due Date
        </label>
        <input
          type="date"
          value={form.due_date}
          onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
          className="p-3 rounded-lg w-full bg-white/70 border border-lichen-blue-light text-lichen-blue-dark focus:ring-2 focus:ring-lichen-blue-dark focus:outline-none transition"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-lichen-blue-dark">
          Notes
        </label>
        <textarea
          placeholder="Additional details (optional)"
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          className="p-3 rounded-lg w-full bg-white/70 border border-lichen-blue-light text-lichen-blue-dark placeholder-lichen-blue-dark/40 focus:ring-2 focus:ring-lichen-blue-dark focus:outline-none transition"
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="bg-lichen-blue-dark hover:bg-lichen-blue text-white font-semibold px-4 py-3 rounded-lg w-full transition-colors duration-300"
      >
        Add Task
      </button>
    </form>
  );
}
