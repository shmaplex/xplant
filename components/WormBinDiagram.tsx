"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

const textures = [
  "/inside-bin/tray-1.jpg",
  "/inside-bin/tray-2.jpg",
  "/inside-bin/tray-3.jpg",
  "/inside-bin/tray-4.jpg",
  "",
];

const layers = [
  {
    label: "Tray 5 — Feeding & Breeding Zone",
    description:
      "Active feeding layer where most worms reside. Keep bedding moist and rotate feeding areas.",
    color: "#A07D5E",
  },
  {
    label: "Tray 4 — Expansion Zone",
    description:
      "Light feeding starts here around week 3–4. Encourages worms to spread and expand.",
    color: "#B89B7D",
  },
  {
    label: "Tray 3 — Moisture Buffer",
    description:
      "Just bedding and moisture. No feeding. Helps regulate temperature and humidity.",
    color: "#D4BDA8",
  },
  {
    label: "Tray 2 — Castings Harvest Tray",
    description:
      "Eventually becomes worm-free as worms migrate up. Ready for castings harvest.",
    color: "#E6D9C7",
  },
  {
    label: "Tray 1 — Leachate Tray",
    description:
      "Collects liquid runoff. Do not place food or worms here. Ensure spout drainage works.",
    color: "#000000",
  },
];

export default function WormBinDiagram() {
  const [active, setActive] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={clsx(
        "w-full",
        isMobile ? "flex flex-col gap-0" : "flex flex-col gap-[1px] h-full"
      )}
    >
      {layers.map((layer, i) => {
        const isActive = active === i;
        const handleClick = () => setActive(isActive ? null : i);

        return (
          <div
            key={layer.label}
            onClick={handleClick}
            onMouseEnter={!isMobile ? () => setActive(i) : undefined}
            onMouseLeave={!isMobile ? () => setActive(null) : undefined}
            className={clsx(
              "relative cursor-pointer transition-all duration-300 overflow-hidden",
              isMobile ? "border border-black/10" : "flex-1 group"
            )}
            style={{
              backgroundColor: layer.color,
              backgroundImage: `url(${textures[i]})`,
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }}
          >
            {/* Header always with bg */}
            <div
              className={clsx(
                "p-3 sm:p-4 text-sm font-semibold text-white drop-shadow",
                isMobile && "bg-black/40"
              )}
            >
              {layer.label}
            </div>

            {/* Mobile expanded content */}
            {isMobile && isActive && (
              <div className="p-4 bg-white text-gray-800 text-sm">
                {layer.description}
              </div>
            )}

            {/* Desktop overlay */}
            {!isMobile && (
              <div
                className={clsx(
                  "absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white transition-opacity duration-300 backdrop-blur-md bg-black/50",
                  isActive
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                )}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2">
                  {layer.label}
                </h3>
                <p className="text-sm sm:text-base max-w-xs leading-snug">
                  {layer.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
