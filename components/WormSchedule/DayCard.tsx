import { useState, useEffect, useMemo } from "react";
import { getCurrentMonday } from "@/lib/week";
import { weeklyTasks as rawWeeklyTasks } from "@/data/weeklyTasks";
import DayCardFront from "./DayCardFront";
import DayCardBack from "./DayCardBack";
import { Task } from "./TaskList";
import type { Checkin } from "./WeekOverview";

function formatDateToKSTISO(date: Date) {
  const KST_OFFSET = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + KST_OFFSET);

  const year = kstDate.getUTCFullYear();
  const month = String(kstDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(kstDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DayCardProps = {
  day: string;
  checkins: Record<string, Checkin>; // new prop
};

export default function DayCard({ day, checkins }: DayCardProps) {
  // Calculate the date for the given day based on current week's Monday
  const date = useMemo(() => {
    const monday = getCurrentMonday();
    const index = daysOfWeek.indexOf(day);
    if (index < 0) return new Date(); // fallback
    const thisDay = new Date(monday);
    thisDay.setDate(monday.getDate() + index);
    return thisDay;
  }, [day]);

  const [todayIndex, setTodayIndex] = useState<number>(-1);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFlipped, setIsFlipped] = useState(true);

  useEffect(() => {
    const dayTasks = (rawWeeklyTasks[day] || []).map((task, i) => ({
      id: `${day.toLowerCase()}-${i}`,
      text: task.label,
      completed: false,
      icon: task.icon,
    }));
    setTasks(dayTasks);

    const now = new Date();
    const today = daysOfWeek.indexOf(
      now.toLocaleDateString("en-US", { weekday: "long" })
    );
    setTodayIndex(today);

    setIsFlipped(today !== daysOfWeek.indexOf(day));
  }, [day]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completed = tasks.filter((t) => t.completed).length;

  const daysDifference = daysOfWeek.indexOf(day) - todayIndex;
  const backMessage =
    daysDifference < 0
      ? `This day (${day}) has passed. Hope you completed your tasks.`
      : daysDifference === 0
      ? `Today is ${day}! Let's get things done.`
      : `This day (${day}) is coming up. Plan ahead and stay ready!`;

  // Lookup check-in for this date
  const isoDate = formatDateToKSTISO(date);
  const checkin = checkins[isoDate];

  // Prefer checkin.video_url over dailyVideosByDate
  const videoUrl = checkin?.video_url || null;

  return (
    <div className="w-full h-[300px] perspective">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <DayCardFront
          day={day}
          date={date}
          tasks={tasks}
          onToggleTask={toggleTask}
          completedCount={completed}
          onFlip={() => setIsFlipped(true)}
          videoUrl={videoUrl}
        />
        <DayCardBack
          backMessage={backMessage}
          onFlip={() => setIsFlipped(false)}
          videoUrl={videoUrl}
        />
      </div>
    </div>
  );
}
