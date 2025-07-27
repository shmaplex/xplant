"use client";

import { useState } from "react";

export default function AddTaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New task:", task);
    setTask("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-[#e0d8c4] hover:bg-[#d1c7aa] text-black px-4 py-2 rounded mt-4"
      >
        ➕ Add Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Add New Task</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="e.g. Harvest worm castings"
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:underline text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#97bb6e] text-white px-3 py-1.5 rounded text-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
