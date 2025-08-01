"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import type { Task } from "@/lib/types";

const localizer = momentLocalizer(moment);

export default function TaskCalendar({ tasks }: { tasks: Task[] }) {
  const events = tasks.map((t) => ({
    id: t.id,
    title: t.title ?? "Untitled Task",
    start: new Date(t.due_date),
    end: new Date(t.due_date),
    allDay: true,
    isCompleted: t.is_completed,
  }));

  const eventStyleGetter = (event: any) => {
    const style = {
      backgroundColor: event.isCompleted ? "#dad7d2" : "#b7ef48", // gray if done, green if not
      color: "#42594d",
      borderRadius: "4px",
      border: "none",
      padding: "2px 6px",
      fontWeight: "600",
    };
    return {
      style,
    };
  };

  // Custom event component to add strikethrough on title if completed
  const Event = ({ event }: { event: any }) => (
    <span
      style={{ textDecoration: event.isCompleted ? "line-through" : "none" }}
    >
      {event.title} {event.isCompleted ? "✅" : ""}
    </span>
  );

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-2">Calendar View</h2>
      <div className="overflow-x-auto">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="rounded-md"
          eventPropGetter={eventStyleGetter}
          components={{ event: Event }}
        />
      </div>
    </div>
  );
}
