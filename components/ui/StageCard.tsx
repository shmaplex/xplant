import { PlantStage } from "@/lib/types";
import { formatDate } from "@/lib/date";
import clsx from "clsx";

interface StageCardProps {
  stage: PlantStage;
  label?: string; // e.g., "Current Stage" or "Stage"
  colors?: {
    badge?: string | string[];
    header?: string | string[];
    title?: string | string[];
    room?: string | string[];
  };
}

export default function StageCard({
  stage,
  label = "Stage",
  colors,
}: StageCardProps) {
  const defaultColors = {
    badge: "bg-[#6ea420]",
    header: "bg-[#b7ef48]/30",
    title: "text-[#6ea420]",
    room: ["bg-future-lime/50", "text-moss-shadow"], // bg + text
  };

  const mergedColors = { ...defaultColors, ...colors };
  const enteredDate = formatDate(stage.entered_on);

  return (
    <section
      className="
        relative rounded-2xl shadow-md border border-spore-grey/50
        hover:shadow-lg hover:scale-[1.02] transition-transform duration-300
        flex flex-col overflow-hidden
      "
    >
      {/* Top-left badge: Date */}
      <div
        className={clsx(
          mergedColors.badge,
          "absolute top-0 left-0 text-white text-xs font-bold px-3 py-1 rounded-br-lg"
        )}
        title={`Entered on ${enteredDate}`}
      >
        {enteredDate}
      </div>

      {/* Top-right badge: Room */}
      <div
        className={clsx(
          mergedColors.room,
          "absolute top-0 right-0 text-xs font-bold px-6 py-1 rounded-bl-lg"
        )}
        title={`Plant is in ${stage.room || "unknown room"}`}
      >
        {stage.room || "N/A"}
      </div>

      {/* Header */}
      <header
        className={clsx(
          mergedColors.header,
          "px-3 pt-10 pb-4 flex flex-col items-start space-y-1"
        )}
      >
        <p className="uppercase text-[11px] font-medium tracking-wider text-moss-shadow/80">
          {label}
        </p>
        <h2 className={clsx("text-xl font-bold", mergedColors.title)}>
          {stage.stage}
        </h2>
      </header>

      {/* Main content */}
      <div className="bg-white/85 flex-1 flex flex-col justify-between">
        <div className="text-sm leading-relaxed text-black/70 pb-2">
          <p className="uppercase p-2 text-[11px] font-medium tracking-wider text-black/30">
            Notes
          </p>
          <div
            className="
              relative whitespace-pre-wrap rounded
              font-handwriting text-sm text-black/80
              px-4
            "
            style={{
              lineHeight: "180%",
              backgroundColor: "#fafaf9",
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 25px, rgba(0,0,0,0.06) 26px)",
              backgroundSize: "100% 26px",
              backgroundClip: "padding-box",
            }}
          >
            {stage.notes || "No notes available."}
          </div>
        </div>
      </div>
    </section>
  );
}
