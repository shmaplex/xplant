import TaskItem from "./TaskItem";
import { IconType } from "react-icons";

export type Task = {
  id: string;
  text: string;
  completed?: boolean;
  icon?: IconType;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
};

export default function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          completed={task.completed ?? false}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
