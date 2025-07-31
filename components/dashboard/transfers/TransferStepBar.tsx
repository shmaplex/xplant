"use client";
import React, { useState } from "react";

interface TransferStepBarProps {
  value: number;
  max?: number;
  baseHeightClassName?: string;
}

export default function TransferStepBar({
  value,
  max = 12,
  baseHeightClassName = "h-5",
}: TransferStepBarProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const segments = Array.from({ length: max }, (_, i) => i + 1);

  const baseHeight = baseHeightClassName; // consistent height for both bar and badge

  const segmentColor = (i: number, forceActive = false) => {
    const active = forceActive || i <= value;
    const late = i > max - 2;
    const mid = i > max - 4;

    if (active) {
      if (late) return "from-[var(--psybeam-purple)] to-purple-500";
      if (mid) return "from-[var(--organic-amber)] to-yellow-500";
      return "from-[var(--future-lime)] to-lime-500";
    }
    return "from-[var(--milk-bio)] to-[var(--milk-bio)]";
  };

  return (
    <div className={`relative flex items-center w-full`}>
      <div className={`relative flex-1 ml-1 ${baseHeight}`}>
        {/* Background bar */}
        <div className="absolute inset-0 rounded-l-full bg-[var(--milk-bio)]" />

        <div
          className={`relative flex ${baseHeight} rounded-l-full overflow-hidden`}
        >
          {segments.map((i) => {
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                className={`
                  relative flex-1 transition-all duration-300 cursor-pointer
                `}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`
                    w-full h-full bg-gradient-to-b transition-all duration-300
                    ${segmentColor(i, isHovered)}
                    ${isHovered ? "brightness-110" : ""}
                  `}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Badge with cycle text */}
      <div
        className={`
          flex items-center justify-center pointer-events-none
          bg-white rounded-r-full border border-milk-bio text-xs font-medium
          text-[var(--moss-shadow)] pl-2 pr-4 whitespace-nowrap shadow-none
          transition-colors duration-300 ${baseHeight}
        `}
      >
        <span className="text-[0.6rem] inline-block px-1.5 uppercase bg-spore-grey/20 rounded-lg h-auto mr-1">
          Cycle
        </span>
        {hovered ? `${hovered}/${max}` : `${value}/${max}`}
      </div>
    </div>
  );
}
