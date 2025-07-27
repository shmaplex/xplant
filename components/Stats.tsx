"use client";
export default function Stats() {
  const items = [
    { stat: "1,420+", label: "Worms Wrangled" },
    { stat: "37", label: "Compost Experiments" },
    { stat: "2.3kg", label: "Food Waste Diverted" },
    { stat: "830+", label: "Soil Microbes Gained" },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
      {items.map((item, i) => (
        <div key={i} className="p-4 bg-[#ECE7DB] rounded-lg shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold">{item.stat}</h2>
          <p className="text-sm sm:text-base text-[#555] mt-1">{item.label}</p>
        </div>
      ))}
    </section>
  );
}
