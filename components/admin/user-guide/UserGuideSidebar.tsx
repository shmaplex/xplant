"use client";

import React from "react";
import Link from "next/link";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
  onReorder: (newOrder: GuideSection[]) => void | Promise<void>;
  onToggleSidebar: () => void;
};

export function UserGuideSidebar({
  sections,
  currentSectionId,
  sidebarOpen,
  onNewSection,
  onReorder,
  onToggleSidebar,
}: UserGuideSidebarProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updated = Array.from(sections);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    onReorder(updated);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 overflow-hidden
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ zIndex: 50 }}
      >
        <div className="p-4 flex flex-col flex-1 overflow-hidden">
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

      {/* Sidebar toggle tab (always visible) */}
      <button
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        className={`
          fixed top-1/2 left-0 transform -translate-y-1/2
          w-5 h-24 rounded-r-lg
          bg-biochar-black/80 hover:bg-biochar-black
          text-white shadow-lg flex items-center justify-center
          transition-colors duration-300
        `}
        style={{ zIndex: 60 }}
      >
        {sidebarOpen ? (
          <FiChevronLeft size={18} />
        ) : (
          <FiChevronRight size={18} />
        )}
      </button>
    </>
  );
}
