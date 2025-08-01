"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (done: boolean) => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await onToggle(!task.is_completed);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setDeleting(true);
    await onDelete();
    setDeleting(false);
  };

  return (
    <div
      className={`p-4 rounded-xl shadow flex justify-between items-center ${
        task.is_completed ? "bg-lichen-blue-light" : "bg-white"
      }`}
    >
      <div>
        <h4
          className={`font-semibold ${
            task.is_completed ? "line-through text-gray-500" : ""
          }`}
        >
          {task.title}
        </h4>
        <p className="text-xs text-gray-400 capitalize">
          {task.category.replace("_", " ")}
        </p>
        {task.notes && (
          <p className="text-sm text-gray-500 mt-1">{task.notes}</p>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          disabled={loading || deleting}
          className={`text-sm px-3 py-1 rounded transition ease-in-out duration-500 ${
            task.is_completed
              ? "bg-psybeam-purple hover:bg-psybeam-purple-dark text-white hover:text-psybeam-purple"
              : "bg-future-lime hover:bg-moss-shadow text-black hover:text-future-lime"
          }`}
        >
          {loading ? "Saving..." : task.is_completed ? "Undo" : "Done"}
        </button>

        <button
          onClick={handleDelete}
          disabled={loading || deleting}
          className="text-sm px-3 py-1 rounded bg-bio-red text-white ease-in-out duration-500 hover:text-white hover:bg-bio-red-dark transition"
          title="Delete task"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
