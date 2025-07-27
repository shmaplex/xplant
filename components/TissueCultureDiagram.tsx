"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

const coreStages = [
  {
    key: "clean",
    label: "Clean Workspace",
    description:
      "Wipe all tools and surfaces with alcohol or vinegar to minimize contamination risk.",
    color: "from-green-100/70 to-green-50/50",
    additivesBgColor: "bg-green-100/50",
    additives: [],
  },
  {
    key: "medium",
    label: "Prepare Medium",
    description:
      "Use PhytoBase™ as your base medium. Sterilize in jars. Add optional nutrients or boosters depending on plant species.",
    color: "from-lime-100/70 to-lime-50/50",
    additivesBgColor: "bg-lime-100/70 blur-sm",
    additives: [
      {
        label: "XBoost™",
        description: "Accelerates rooting and shoot multiplication.",
        status: "available",
      },
      {
        label: "BioTone™",
        description: "Balances pH and adds organic micronutrients.",
        status: "available",
      },
      {
        label: "MycoLift™",
        description: "Fungal/mycorrhizal booster for advanced users.",
        status: "available",
      },
      {
        label: "PureShield™",
        description: "Anti-contamination additive (coming soon).",
        status: "coming",
      },
    ],
  },
  {
    key: "explants",
    label: "Collect Explants",
    description:
      "Cut a small shoot or leaf tip from a healthy mother plant using sterilized tools.",
    color: "from-yellow-100/70 to-yellow-50/50",
    additivesBgColor: "bg-yellow-100/50",
    additives: [],
  },
  {
    key: "transfer",
    label: "Transfer to Container",
    description:
      "Place plant tissue on the medium in a clean jar or vessel. Seal tightly to maintain sterility.",
    color: "from-sky-100/70 to-sky-50/50",
    additivesBgColor: "bg-sky-100/50",
    additives: [],
  },
  {
    key: "growth",
    label: "Growth & Observation",
    description:
      "Keep jars at stable room temperature with indirect light. Some species may require an optional callus induction phase.",
    color: "from-blue-100/70 to-blue-50/50",
    additivesBgColor: "bg-blue-100/50",
    additives: [],
  },
  {
    key: "acclimate",
    label: "Acclimate Plantlets",
    description:
      "Gradually open jars to let plantlets adapt before moving to soil. Timing may vary by plant species.",
    color: "from-purple-100/70 to-purple-50/50",
    additivesBgColor: "bg-purple-100/50",
    additives: [],
  },
];

function AdditivesBackgroundCircle({ bgColor }: { bgColor: string }) {
  return (
    <div
      className={clsx(
        "absolute w-64 h-64 rounded-full -z-10 -top-1/4 animate-pulse",
        bgColor
      )}
    />
  );
}

export default function TissueCultureDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Helper: check if active is an additive label
  const isActiveAdditive = coreStages.some((stage) =>
    stage.additives.some((add) => add.label === active)
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-16 relative">
      <div className="relative flex flex-col items-center">
        {coreStages.map((stage, i) => {
          const isActive = active === stage.key;

          // Determine if this core stage should be faded & non-interactive
          const shouldFadeAndDisable =
            isActiveAdditive &&
            !(
              stage.key ===
              coreStages.find((s) =>
                s.additives.some((add) => add.label === active)
              )?.key
            );

          // dynamic z-index so later stages are visually on top
          const stageZ = isActive ? 1000 : 100 + i;

          // Get previous stage colors for gradient connector
          const prevStage = coreStages[i - 1];

          // Helper to get from/to colors from the color string (like "from-green-100/70 to-green-50/50")
          // We'll convert these Tailwind classes into CSS colors (manually map or extract CSS vars)
          // For simplicity, hardcode a small map for your used colors:
          const tailwindColorMap: Record<string, string> = {
            "green-100/70": "rgba(187, 247, 208, 0.7)",
            "green-50/50": "rgba(220, 252, 231, 0.5)",
            "lime-100/70": "rgba(220, 252, 231, 0.7)",
            "lime-50/50": "rgba(236, 252, 203, 0.5)",
            "yellow-100/70": "rgba(254, 240, 138, 0.7)",
            "yellow-50/50": "rgba(254, 243, 199, 0.5)",
            "sky-100/70": "rgba(186, 230, 253, 0.7)",
            "sky-50/50": "rgba(219, 246, 254, 0.5)",
            "blue-100/70": "rgba(191, 219, 254, 0.7)",
            "blue-50/50": "rgba(219, 234, 254, 0.5)",
            "purple-100/70": "rgba(196, 181, 253, 0.7)",
            "purple-50/50": "rgba(221, 214, 254, 0.5)",
          };

          // Extract from/to classes from a string like "from-green-100/70 to-green-50/50"
          const parseColors = (colorString: string) => {
            const fromMatch = colorString.match(/from-([\w-\/]+)/);
            const toMatch = colorString.match(/to-([\w-\/]+)/);
            const fromColor = fromMatch
              ? tailwindColorMap[fromMatch[1]] || "#ccc"
              : "#ccc";
            const toColor = toMatch
              ? tailwindColorMap[toMatch[1]] || "#eee"
              : "#eee";
            return { fromColor, toColor };
          };

          // Previous stage gradient colors
          const prevColors = prevStage ? parseColors(prevStage.color) : null;
          // Current stage gradient colors
          const currColors = parseColors(stage.color);

          // Connector gradient CSS: from prevStage's toColor to current stage's fromColor
          const connectorGradient = prevColors
            ? `linear-gradient(to bottom, ${prevColors.toColor}, ${currColors.fromColor})`
            : `linear-gradient(to bottom, ${currColors.fromColor}, ${currColors.toColor})`;

          const ringColorMap: Record<string, string> = {
            "from-green-100/70": "rgba(187, 247, 208, 0.7)",
            "from-lime-100/70": "rgba(217, 249, 157, 0.7)",
            "from-yellow-100/70": "rgba(254, 240, 138, 0.7)",
            "from-sky-100/70": "rgba(186, 230, 253, 0.7)",
            "from-blue-100/70": "rgba(191, 219, 254, 0.7)",
            "from-purple-100/70": "rgba(196, 181, 253, 0.7)",
          };

          function getRingColor(stageColor: string) {
            const match = stageColor.match(/from-[\w-\/]+/);
            return match
              ? ringColorMap[match[0]] ?? "rgba(0,0,0,0.3)"
              : "rgba(0,0,0,0.3)";
          }

          return (
            <div
              key={stage.key}
              className={clsx(
                "relative flex flex-col items-center w-full transition-opacity duration-300",
                shouldFadeAndDisable
                  ? "opacity-40 pointer-events-none !z-0"
                  : "opacity-100 pointer-events-auto"
              )}
              style={{ zIndex: stageZ }}
            >
              {/* Connector line between core stages */}
              {i > 0 && !isMobile && (
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-3 h-10"
                    style={{ background: connectorGradient }}
                  />
                </div>
              )}

              <div
                className="relative flex flex-col items-center text-center mb-0 w-full h-full"
                onMouseEnter={
                  !isMobile ? () => setActive(stage.key) : undefined
                }
                onMouseLeave={!isMobile ? () => setActive(null) : undefined}
                onClick={() =>
                  isMobile && setActive(isActive ? null : stage.key)
                }
              >
                {/* Additives pulsing circle background */}
                {!isMobile && stage.additives.length > 0 && (
                  <AdditivesBackgroundCircle bgColor={stage.additivesBgColor} />
                )}

                {/* Core stage node */}
                <div
                  className={clsx(
                    "relative rounded-full w-40 h-40 flex items-center justify-center shadow-lg border border-white/40 bg-gradient-to-br transition-all duration-300",
                    stage.color,
                    "hover:scale-105 hover:shadow-xl hover:ring-4 hover:ring-offset-2 cursor-pointer"
                  )}
                  style={
                    {
                      // Set ring color on hover using CSS variable
                      "--tw-ring-color": getRingColor(stage.color),
                    } as React.CSSProperties
                  }
                >
                  <span className="text-sm font-semibold text-black/80 px-4">
                    {stage.label}
                  </span>
                </div>

                {/* Tooltip for stages (desktop) */}
                {!isMobile && (
                  <div
                    className={clsx(
                      "absolute top-full mt-4 w-64 p-4 rounded-xl bg-white shadow-2xl text-gray-800 text-sm transition-all duration-300",
                      isActive
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    )}
                    style={{ zIndex: stageZ + 5 }}
                  >
                    {stage.description}
                  </div>
                )}

                {/* Mobile expanded text */}
                {isMobile && isActive && (
                  <div className="mt-4 bg-white rounded-xl p-4 shadow-md max-w-xs text-sm text-black/50">
                    {stage.description}
                  </div>
                )}
              </div>
              {/* Additives section for desktop */}
              {!isMobile && stage.additives.length > 0 && (
                <div className="absolute left-1/2 top-1/2 translate-x-30 -translate-y-48 w-auto h-auto z-[2000]">
                  {stage.additives.map((add, idx) => {
                    const addActive = active === add.label;
                    const baseZ = 500 + idx;
                    const zIndex = addActive ? 2000 : baseZ;
                    const isLast = idx === stage.additives.length - 1;

                    const topPosition = idx > 0 ? idx * 100 : -5;
                    const tooltipPositionClasses = isLast
                      ? "bottom-0 -mb-12"
                      : "top-0 -mt-12";

                    // Different pulse durations per additive (e.g., 1.5s, 1.75s, 2s, etc.)
                    const pulseDurations = [
                      "1500ms",
                      "1750ms",
                      "2000ms",
                      "2250ms",
                    ];
                    const pulseDuration =
                      pulseDurations[idx % pulseDurations.length];

                    return (
                      <div
                        key={add.label}
                        className="group absolute flex flex-col items-center justify-center cursor-pointer"
                        style={{ zIndex, top: `${topPosition}px` }}
                        onMouseEnter={() => setActive(add.label)}
                        onMouseLeave={() => setActive(null)}
                      >
                        <div className="flex justify-center items-center relative">
                          {/* Pulsing background circle with varied animation duration */}
                          <div
                            className={clsx(
                              "absolute w-26 h-26 animate-pulse rounded-full -z-10",
                              stage.additivesBgColor
                            )}
                            style={{ animationDuration: pulseDuration }}
                          ></div>

                          {/* Additive node */}
                          <div
                            className={clsx(
                              "w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 shadow-md border border-gray-200 flex items-center justify-center text-[10px] font-semibold transition-all duration-300",
                              "hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-lime-300"
                            )}
                          >
                            {add.label}
                          </div>
                        </div>

                        {/* Tooltip */}
                        <div
                          className={clsx(
                            "absolute w-56 p-4 rounded-xl bg-white shadow-2xl text-gray-800 text-sm transition-all duration-300",
                            tooltipPositionClasses,
                            addActive
                              ? "opacity-100 translate-y-0 pointer-events-auto"
                              : "opacity-0 translate-y-2 pointer-events-none"
                          )}
                          style={{ zIndex: zIndex + 10 }}
                        >
                          {add.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
