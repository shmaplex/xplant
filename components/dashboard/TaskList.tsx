"use client";

import React from "react";
import type { Task } from "@/lib/types";
import { FiClock } from "react-icons/fi";

type TaskListProps = {
  tasks?: Task[] | null;
};

export default function TaskList({ tasks }: TaskListProps) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-sm text-gray-500">No upcoming tasks.</p>;
  }

  // Only show tasks that are NOT completed
  const upcomingTasks = tasks.filter((task) => !task.is_completed);

  if (upcomingTasks.length === 0) {
    return <p className="text-sm text-gray-500">No upcoming tasks.</p>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  function getDueStatusColor(dueDateStr: string) {
    const dueDate = new Date(dueDateStr);
    dueDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(
      (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0)
      return {
        text: "text-red-600",
        hoverBorder: "hover:border-red-600",
      }; // overdue
    if (diffDays <= 3)
      return {
        text: "text-orange-500",
        hoverBorder: "hover:border-orange-500",
      }; // due soon
    return {
      text: "text-green-600",
      hoverBorder: "hover:border-green-600",
    }; // due later
  }

  return (
    <ul
      className="space-y-3 mt-2 max-h-48 overflow-y-auto pr-1 py-3"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      {upcomingTasks.map((task) => {
        const colors = getDueStatusColor(task.due_date);
        return (
          <li
            key={task.id}
            className={`flex items-start gap-3 bg-white border border-green-100 rounded-xl p-3 shadow-sm transition
              ${colors.hoverBorder}`}
          >
            {/* Pending icon */}
            <div className="flex-shrink-0 mt-0.5">
              <FiClock className={`w-5 h-5 ${colors.text}`} />
            </div>

            {/* Task details */}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${colors.text}`}>
                {task.title}
              </p>
              <p className="text-xs text-gray-500 capitalize truncate">
                {task.category.replace("_", " ")}
              </p>
              <p className={`text-xs ${colors.text}`}>
                Due {new Date(task.due_date).toLocaleDateString()}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
