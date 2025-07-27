"use client";

import { ReactElement } from "react";

const leafSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6 text-future-lime"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22s8-4 8-10V5S16 2 12 7 4 5 4 5v7c0 6 8 10 8 10z"
    />
  </svg>
);

export default function HowItWorks() {
  const steps = [
    {
      title: "Organic Ingredients",
      desc: "Banana powders, willow extracts, and other natural sources power our medium.",
      icon: leafSvg,
    },
    {
      title: "Simple, Scalable Process",
      desc: "Accessible kits and training so anyone can start plant tissue culture.",
      icon: leafSvg,
    },
    {
      title: "Growth Without Chemicals",
      desc: "Healthy, strong plantlets ready for farms and reforestation.",
      icon: leafSvg,
    },
  ];

  return (
    <section className="bg-gradient-to-tr from-milk-bio via-psybeam-purple/10 to-spore-grey/10 py-20 rounded-lg">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-14 text-moss-shadow">
          How It Works
        </h2>
        <div className="grid gap-10 sm:grid-cols-3">
          {steps.map(({ title, desc, icon }, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-8 bg-psybeam-purple/15 border border-psybeam-purple/30 shadow-sm hover:shadow-md transition flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-full border-2 border-psybeam-purple/50 bg-white text-future-lime">
                {icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-biochar-black">
                {title}
              </h3>
              <p className="text-moss-shadow leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
