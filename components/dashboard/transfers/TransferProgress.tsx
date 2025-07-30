import React from "react";

interface TransferProgressProps {
  value: number;
  max?: number;
}

export default function TransferProgress({
  value,
  max = 12,
}: TransferProgressProps) {
  const pct = Math.min(value / max, 1);
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - pct * circumference;

  const getColor = () => {
    if (value >= max) return "#ef4444"; // red
    if (value >= max - 2) return "#f59e0b"; // amber
    return "#22c55e"; // green
  };

  const color = getColor();

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <svg
        className="w-full h-full -rotate-90 drop-shadow-sm"
        viewBox="0 0 28 28"
      >
        {/* background ring */}
        <circle
          className="text-gray-200"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="14"
          cy="14"
        />
        {/* progress ring */}
        <circle
          strokeWidth="3"
          stroke={color}
          fill="transparent"
          r={radius}
          cx="14"
          cy="14"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease",
          }}
        />
      </svg>

      <span className="absolute text-[10px] font-semibold text-gray-700 leading-none">
        {value}/{max}
      </span>
    </div>
  );
}
