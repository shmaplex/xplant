"use client";

import { useState } from "react";
import type { Task } from "@/lib/types";

export default function TaskItem({
  task,
  onToggle,
}: {
  task: Task;
  onToggle: (done: boolean) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    await onToggle(!task.is_completed);
    setLoading(false);
  };

  return (
    <div
      className={`p-4 rounded-xl shadow flex justify-between items-center ${
        task.is_completed ? "bg-spore-grey" : "bg-white"
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
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`text-sm px-3 py-1 rounded transition ${
          task.is_completed
            ? "bg-psybeam-purple text-white"
            : "bg-future-lime text-black"
        }`}
      >
        {loading ? "Saving..." : task.is_completed ? "Undo" : "Done"}
      </button>
    </div>
  );
}
