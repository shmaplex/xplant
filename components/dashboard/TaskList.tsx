// app/dashboard/components/TaskList.tsx
import React from "react";
import type { Task } from "@/lib/types";

type TaskListProps = {
  tasks?: Task[] | null;
};

export default function TaskList({ tasks }: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-sm text-gray-500">No upcoming tasks.</p>;
  }

  return (
    <ul className="space-y-2 mt-2 max-h-48 overflow-y-auto pr-1">
      {tasks.map((task) => (
        <li key={task.id} className="text-sm text-gray-700">
          <span className="font-medium">{task.title}</span> —{" "}
          <span className="capitalize text-gray-500">
            {task.category.replace("_", " ")}
          </span>
          <span className="block text-xs text-gray-400">
            Due {new Date(task.due_date).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  );
}
