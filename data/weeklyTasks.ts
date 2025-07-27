import { IconType } from "react-icons";
import {
  FaTint,
  FaAppleAlt,
  FaThermometerHalf,
  FaBug,
  FaEye,
  FaBoxOpen,
  FaBroom,
  FaRecycle,
  FaLeaf,
  FaRegDotCircle,
} from "react-icons/fa";

export type TaskWithIcon = {
  id: string;
  label: string;
  icon?: IconType;
};

const rawTasks: Record<string, Omit<TaskWithIcon, "id">[]> = {
  Monday: [
    {
      label: "Check moisture levels",
      icon: FaTint,
    },
    { label: "Feed kitchen scraps", icon: FaAppleAlt },
    { label: "Monitor temperature", icon: FaThermometerHalf },
  ],
  Tuesday: [
    { label: "Check moisture levels", icon: FaTint },
    { label: "Lightly turn bedding if compacted", icon: FaRecycle },
  ],
  Wednesday: [
    { label: "Feed kitchen scraps", icon: FaAppleAlt },
    { label: "Check for pests", icon: FaBug },
    { label: "Spot check castings", icon: FaBoxOpen },
  ],
  Thursday: [
    { label: "Check moisture levels", icon: FaTint },
    { label: "Monitor temperature", icon: FaThermometerHalf },
    { label: "Wipe bin lid", icon: FaBroom },
  ],
  Friday: [
    { label: "Feed kitchen scraps", icon: FaAppleAlt },
    { label: "Check for odor", icon: FaEye },
    { label: "Add shredded cardboard if wet", icon: FaBoxOpen },
  ],
  Saturday: [
    { label: "Sift finished castings", icon: FaRecycle },
    { label: "Harvest worms if needed", icon: FaLeaf },
    { label: "Clean bin edges", icon: FaBroom },
  ],
  Sunday: [
    { label: "Let worms rest", icon: FaRegDotCircle },
    { label: "Observe worm activity", icon: FaEye },
    { label: "Prepare food for next week", icon: FaAppleAlt },
  ],
};

export const weeklyTasks: Record<string, TaskWithIcon[]> = Object.fromEntries(
  Object.entries(rawTasks).map(([day, tasks]) => [
    day,
    tasks.map((task, index) => ({
      ...task,
      id: `${day.toLowerCase()}-${index}`, // unique per task per day
    })),
  ])
);
