"use client";

export default function Impact() {
  const points = [
    {
      code: "X1",
      label: "Reduces reliance on synthetic growth hormones",
    },
    {
      code: "X2",
      label: "Makes tissue culture safer and more accessible for small farms",
    },
    {
      code: "X3",
      label: "Helps reforest degraded land with sustainable methods",
    },
  ];

  return (
    <section className="relative overflow-hidden py-28">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-future-lime/10 via-psybeam-purple/10 to-spore-grey/20"></div>

      <div className="relative w-full mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-biochar-black mb-6 tracking-tight">
          Why It Matters
        </h2>
        <p className="text-lg sm:text-xl text-moss-shadow max-w-2xl mx-auto leading-relaxed mb-16">
          <span className="font-semibold">XPlant</span> is changing how plants
          are grown and ecosystems restored—through sustainable, organic tissue
          culture methods that benefit farmers and the planet.
        </p>

        <div className="grid gap-10 sm:grid-cols-3">
          {points.map(({ code, label }, idx) => (
            <div
              key={idx}
              className="bg-milk-bio/80 backdrop-blur-sm rounded-3xl shadow-md border border-spore-grey/30 p-10 flex flex-col items-center text-center transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex justify-center items-center w-20 h-20 mb-6 rounded-full border border-psybeam-purple/40 text-psybeam-purple font-bold text-xl tracking-wider transition-transform duration-300 group-hover:scale-105">
                {code}
              </div>
              <p className="text-biochar-black text-lg leading-relaxed font-medium">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
