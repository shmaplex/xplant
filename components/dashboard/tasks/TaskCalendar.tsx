"use client";

import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Task } from "@/lib/types";

const localizer = momentLocalizer(moment);

// Define the type for each calendar event
type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};

export default function TaskCalendar() {
  const supabase = createClientComponentClient();
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        console.error("Error fetching tasks:", error.message);
        return;
      }

      if (data) {
        const evs: CalendarEvent[] = data.map((t: Task) => ({
          id: t.id,
          title: `${t.title ?? "Untitled Task"}${t.is_completed ? " ✅" : ""}`,
          start: new Date(t.due_date),
          end: new Date(t.due_date),
          allDay: true,
        }));
        setEvents(evs);
      }
    };

    fetchTasks();
  }, []);

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
        />
      </div>
    </div>
  );
}
