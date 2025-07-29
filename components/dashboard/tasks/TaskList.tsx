"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Task } from "@/lib/types";
import TaskItem from "./TaskItem";
import { toast } from "react-toastify";
import { isToday, isThisWeek, parseISO } from "date-fns";

export default function TaskList({
  tasks,
  onTasksChanged,
}: {
  tasks: Task[];
  onTasksChanged: () => void;
}) {
  const supabase = createClient();
  const [filter, setFilter] = useState<"all" | "today" | "week">("all");

  const filteredTasks = tasks.filter((task) => {
    const date = parseISO(task.due_date);
    if (filter === "today") return isToday(date);
    if (filter === "week") return isThisWeek(date);
    return true;
  });

  const toggleTask = async (id: string, done: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_completed: done })
      .eq("id", id);
    if (error) toast.error("Failed to update task");
    else {
      toast.success(done ? "Task completed!" : "Task re-opened.");
      onTasksChanged();
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) toast.error("Failed to delete task");
    else {
      toast.success("Task deleted!");
      onTasksChanged();
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <div className="flex gap-2 mb-2">
        {["all", "today", "week"].map((f) => (
          <button
            key={f}
            className={`px-3 py-1 rounded ${
              filter === f
                ? "bg-moss-shadow text-white"
                : "bg-spore-grey text-gray-700"
            }`}
            onClick={() => setFilter(f as any)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={(done) => toggleTask(task.id, done)}
            onDelete={() => deleteTask(task.id)} // <-- pass delete handler here
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-sm text-gray-500">No tasks found.</p>
        )}
      </ul>
    </div>
  );
}
