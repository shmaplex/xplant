"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Task } from "@/lib/types";
import TaskItem from "./TaskItem";
import { toast } from "react-toastify";
import { isToday, isThisWeek, parseISO } from "date-fns";

export default function TaskList() {
  const supabase = createClientComponentClient();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "today" | "week">("all");

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("due_date");

    if (error) {
      toast.error("Failed to fetch tasks.");
    } else {
      setTasks(data || []);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const date = parseISO(task.due_date);
    if (filter === "today") return isToday(date);
    if (filter === "week") return isThisWeek(date);
    return true;
  });

  const toggleTask = async (id: string, done: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_completed: done }) // ✅ correct field
      .eq("id", id);

    if (error) {
      toast.error("Failed to update task");
    } else {
      toast.success(done ? "Task completed!" : "Task re-opened.");
      fetchTasks(); // ✅ refresh state after update
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
            onToggle={(done) => toggleTask(task.id, done)} // ✅ passes toggle action
          />
        ))}
        {filteredTasks.length === 0 && (
          <p className="text-sm text-gray-500">No tasks found.</p>
        )}
      </ul>
    </div>
  );
}
