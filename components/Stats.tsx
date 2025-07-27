"use client";

interface StatsProps {
  variant?: "default" | "hero";
}

export default function Stats({ variant = "default" }: StatsProps) {
  const items = [
    { stat: "10+", label: "Natural Medium Formulas" },
    { stat: "3", label: "Pilot Farms" },
    { stat: "0", label: "Synthetic Chemicals Used" },
    { stat: "100%", label: "Sustainability Focused" },
  ];

  const containerClasses =
    variant === "hero"
      ? "grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto"
      : "max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center";

  const cardClasses =
    variant === "hero"
      ? "p-6 rounded-xl bg-spore-grey/20 shadow-sm hover:shadow-md transition"
      : "p-6 rounded-xl bg-spore-grey/20 shadow-sm";

  return (
    <div className={containerClasses}>
      {items.map((item, i) => (
        <div key={i} className={cardClasses}>
          <h2 className="text-2xl sm:text-3xl font-bold text-biochar-black">
            {item.stat}
          </h2>
          <p className="text-sm sm:text-base text-moss-shadow mt-2">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
