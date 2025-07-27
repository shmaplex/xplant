import { IconType } from "react-icons";

type TaskItemProps = {
  id: string;
  text: string;
  completed?: boolean;
  icon?: IconType;
  onToggle: (id: string) => void;
};

export default function TaskItem({
  id,
  text,
  completed,
  icon: Icon,
  onToggle,
}: TaskItemProps) {
  return (
    <li
      onClick={() => onToggle(id)}
      className={`cursor-pointer flex items-center gap-2 text-sm rounded-md px-2 py-1.5 transition select-none ${
        completed
          ? "bg-green-100 text-green-800 line-through"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      {Icon && <Icon className="w-5 h-5 text-[#5C5138] flex-shrink-0" />}
      <span>{text}</span>
    </li>
  );
}
