"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type QuicklinkButtonProps = {
  href?: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  hovered: string | null;
  setHovered: (s: string | null) => void;
  handleInteraction: () => void;
  onClick?: () => void; // For logout button
  /** Optional overrides */
  activeClassName?: string;
  inactiveClassName?: string;
  textColor?: string; // default text color
  tooltipBg?: string; // default tooltip bg color
};

export default function QuicklinkButton({
  href,
  label,
  icon,
  isActive,
  hovered,
  setHovered,
  handleInteraction,
  onClick,
  activeClassName = "bg-blue-600 backdrop-blur border border-white/30",
  inactiveClassName = "bg-black/50 backdrop-blur hover:bg-black/70",
  textColor = "text-white",
  tooltipBg = "bg-black/80",
}: QuicklinkButtonProps) {
  const Wrapper: any = href ? Link : "button";
  const wrapperProps: ComponentProps<any> = href
    ? { href }
    : { type: "button", onClick: onClick };

  return (
    <div
      className="relative flex items-center group"
      onMouseEnter={() => {
        setHovered(label);
        handleInteraction();
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <Wrapper
        {...wrapperProps}
        className={`
          w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transition
          ${textColor}
          ${isActive ? activeClassName : inactiveClassName}
        `}
        aria-label={label}
        onClick={handleInteraction}
      >
        {icon}
      </Wrapper>

      <div
        className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded ${tooltipBg} px-3 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 ease-out
          ${
            hovered === label
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-2"
          }
        `}
      >
        {label}
      </div>
    </div>
  );
}
