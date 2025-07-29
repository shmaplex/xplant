"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";

import TaskForm from "@/components/dashboard/tasks/TaskForm";
import TaskList from "@/components/dashboard/tasks/TaskList";
import TaskCalendar from "@/components/dashboard/tasks/TaskCalendar";
import { Task } from "@/lib/types";

export default function TasksPage() {
  const supabase = createClient();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("due_date");

    if (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks.");
    } else {
      setTasks(data ?? []);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-full p-8 bg-milk-bio">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-12 min-h-screen bg-white/40 p-12 rounded-2xl">
        {/* Page Header */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-moss-shadow">
            Manage <span className="text-future-lime">Tasks & Scheduling</span>
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Stay on top of plant care with tasks, reminders, and a visual
            calendar.
          </p>
        </header>

        {/* Task List */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>

          <div className="relative p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-moss-shadow">
                🗒 Your Tasks
              </h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1 text-sm text-moss-shadow hover:text-future-lime transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Task
              </button>
            </div>

            <TaskList tasks={tasks} onTasksChanged={fetchTasks} />
          </div>
        </section>

        {/* Calendar */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>
          <div className="relative p-8">
            <h2 className="text-2xl font-bold text-moss-shadow mb-6">
              📆 Task Calendar
            </h2>
            <TaskCalendar tasks={tasks} />
          </div>
        </section>

        {/* Slide-over Add Form */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl p-6 transform transition-transform duration-300 ease-in-out z-50
            ${showAddForm ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-moss-shadow">New Task</h2>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <TaskForm
            onTaskAdded={() => {
              fetchTasks();
              setShowAddForm(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
