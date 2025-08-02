"use client";

import React from "react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

type GuideSection = {
  section_id: string;
  title: string;
};

type UserGuideSidebarProps = {
  sections: GuideSection[];
  currentSectionId: string;
  sidebarOpen: boolean;
  onNewSection: () => void;
  onReorder: (newOrder: GuideSection[]) => void | Promise<void>; // Allow async
};

export function UserGuideSidebar({
  sections,
  currentSectionId,
  sidebarOpen,
  onNewSection,
  onReorder,
}: UserGuideSidebarProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updated = Array.from(sections);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    onReorder(updated);
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-0"
      } transition-all duration-300 border-r border-gray-200 overflow-hidden`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Sections</h2>
          <button
            onClick={onNewSection}
            className="p-2 rounded hover:bg-gray-100"
            title="Create New Section"
          >
            <FiPlus size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {sections.length === 0 ? (
            <p className="text-sm text-gray-500">
              No sections yet. Use + to create one.
            </p>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2"
                  >
                    {sections.map((s, index) => (
                      <Draggable
                        key={s.section_id}
                        draggableId={s.section_id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Link
                              href={`/admin/user-guide/edit/${s.section_id}`}
                              className={`block px-2 py-1 rounded hover:bg-gray-100 ${
                                s.section_id === currentSectionId
                                  ? "bg-gray-200 font-semibold"
                                  : ""
                              }`}
                            >
                              {s.title?.trim() || "Untitled"}
                            </Link>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </div>
      </div>
    </div>
  );
}
