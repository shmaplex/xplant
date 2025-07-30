"use client";

type QuicklinkToggleProps = {
  folded: boolean;
  setFolded: (fn: (prev: boolean) => boolean) => void;
  hovered: string | null;
  setHovered: (s: string | null) => void;
  handleInteraction: () => void;
  icon?: React.ReactNode;
  mainBg?: string;
  pulseBg?: string;
  badgeBg?: string;
};

export default function QuicklinkToggle({
  folded,
  setFolded,
  hovered,
  setHovered,
  handleInteraction,
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-7 h-7 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  mainBg = "bg-black/70",
  pulseBg = "bg-blue-500/40",
  badgeBg = "bg-blue-500",
}: QuicklinkToggleProps) {
  return (
    <div
      className="relative flex items-center group"
      onMouseEnter={() => {
        setHovered("Toggle");
        handleInteraction();
      }}
      onMouseLeave={() => setHovered(null)}
    >
      <div className="relative">
        {folded && (
          <div
            className={`absolute inset-0 rounded-full ${pulseBg} blur-xl animate-pulse`}
          />
        )}

        <button
          onClick={() => {
            setFolded((prev) => !prev);
            handleInteraction();
          }}
          className={`
            relative flex items-center justify-center
            w-14 h-14 rounded-full
            ${mainBg} backdrop-blur shadow-md hover:shadow-lg
            transition-all duration-500
            ${folded ? "translate-x-[60%] group-hover:translate-x-0" : ""}
          `}
          aria-label={folded ? "Expand" : "Collapse"}
        >
          {icon}
          <span
            className={`
              absolute -top-1 -right-1 flex items-center justify-center
              w-5 h-5 rounded-full
              ${badgeBg} text-white shadow
              transition-transform duration-500
              ${folded ? "rotate-90" : "-rotate-90"}
            `}
          >
            {/* Arrow icon (kept inline SVG for easy styling) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </span>
        </button>
      </div>

      <div
        className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 ease-out
          ${
            hovered === "Toggle"
              ? "opacity-100 visible translate-x-0"
              : "opacity-0 invisible translate-x-2"
          }
        `}
      >
        {folded ? "Expand" : "Collapse"}
      </div>
    </div>
  );
}
