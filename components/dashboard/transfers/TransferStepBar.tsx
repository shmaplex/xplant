import React from "react";

interface TransferStepBarProps {
  value: number;
  max?: number;
}

export default function TransferStepBar({
  value,
  max = 12,
}: TransferStepBarProps) {
  const segments = Array.from({ length: max }, (_, i) => i + 1);

  const getSegmentColor = (i: number) => {
    if (i <= value) {
      if (i > max - 2) return "bg-[var(--psybeam-purple)]";
      if (i > max - 4) return "bg-[var(--organic-amber)]";
      return "bg-[var(--future-lime)]";
    }
    return "bg-[var(--milk-bio)]";
  };

  return (
    <div className="relative flex items-center w-full py-1">
      {/* Progress bar takes all space except for the badge */}
      <div className="rounded-l-full ml-1 w-full flex-1 flex h-4 overflow-hidden">
        {segments.map((i) => (
          <div
            key={i}
            className={`${getSegmentColor(
              i
            )} flex-1 transition-colors duration-300`}
          />
        ))}
      </div>

      {/* Badge on the right */}
      <div
        title="Transfer cycle"
        className="bg-white rounded-r-full border mr-1 border-milk-bio text-[9px] text-[var(--moss-shadow)] px-1 py-0 whitespace-nowrap"
      >
        {value}/{max}
      </div>
    </div>
  );
}
