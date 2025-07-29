import { BsQuestionCircle } from "react-icons/bs";

interface TooltipItemProps {
  label: string;
  tooltip: string;
  value: React.ReactNode;
  tooltipWidth?: string; // e.g., "w-52", "w-64"
}

export default function TooltipItem({
  label,
  tooltip,
  value,
  tooltipWidth = "w-52",
}: TooltipItemProps) {
  return (
    <div>
      <div className="flex items-center space-x-1">
        <div className="relative inline-flex">
          <dt className="text-sm font-medium text-gray-500">{label}</dt>
          <div className="absolute top-0 -right-4 group">
            <BsQuestionCircle className="text-gray-400 w-3 h-3 cursor-pointer hover:text-biochar-black duration-300 ease-in-out transition-colors" />
            <div
              className={`absolute left-4 top-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 bg-black text-white text-xs rounded px-2 py-1 shadow-lg transition-all duration-300 ease-in-out ${tooltipWidth} z-10 pointer-events-none`}
            >
              {tooltip}
            </div>
          </div>
        </div>
      </div>
      <dd className="mt-1 text-lg text-gray-900">{value}</dd>
    </div>
  );
}
