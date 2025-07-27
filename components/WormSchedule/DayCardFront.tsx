import TaskList, { Task } from "./TaskList";
import { FaSyncAlt, FaYoutube } from "react-icons/fa";
import ProgressBar from "./ProgressBar";

type DayCardFrontProps = {
  day: string;
  date: Date;
  tasks: Task[];
  onToggleTask: (id: string) => void;
  completedCount: number;
  onFlip: () => void;
  videoUrl?: string | null; // Optional video URL for the day
};

export default function DayCardFront({
  day,
  date,
  tasks,
  onToggleTask,
  completedCount,
  onFlip,
  videoUrl,
}: DayCardFrontProps) {
  return (
    <div className="absolute w-full h-full backface-hidden bg-white shadow-lg rounded-xl p-4 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-row items-center space-x-2">
          <h3 className="text-lg font-bold">{day}</h3>
          <p className="text-sm text-gray-500">
            {date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={onFlip}
          className="text-gray-400 hover:text-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
          title="Flip card"
        >
          <FaSyncAlt />
        </button>
      </div>

      {/* Scrollable Tasks */}
      <div className="flex-grow min-h-0 overflow-y-auto mt-2">
        <TaskList tasks={tasks} onToggle={onToggleTask} />
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 pt-1 mt-1 border-t border-gray-200">
        <ProgressBar completed={completedCount} total={tasks.length} />

        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-50 rounded-md px-3 py-2 hover:bg-red-100 transition-colors"
          >
            <FaYoutube className="text-red-600 w-5 h-5" />
            <span className="text-red-700 font-semibold">Watch Video</span>
          </a>
        )}
      </div>
    </div>
  );
}
