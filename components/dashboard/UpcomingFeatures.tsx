import { FiCheckCircle, FiCircle } from "react-icons/fi";

const features = [
  {
    name: "Contamination Log",
    desc: "Photo and note tracking.",
    completed: true,
  },
  {
    name: "Transfer Cycle Tracker",
    desc: "Auto reminders & visual progress.",
    completed: false,
  },
  {
    name: "Cold Storage Planner",
    desc: "Track plants moved to cold storage.",
    completed: false,
  },
  {
    name: "Reports & Insights",
    desc: "Growth charts over time.",
    completed: false,
  },
  {
    name: "Community Recipes",
    desc: "Share and explore media blends.",
    completed: false,
  },
];

export default function UpcomingFeatures() {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 border border-spore-grey">
      <h2 className="text-2xl font-bold mb-6 text-moss-shadow">
        Upcoming Features
      </h2>
      <ul className="space-y-4">
        {features.map((feature) => (
          <li
            key={feature.name}
            className={`
              flex items-start gap-3 rounded-lg p-3 border
              ${
                feature.completed
                  ? "bg-future-lime/20 border-future-lime"
                  : "bg-milk-bio border-spore-grey hover:bg-milk-bio/70 transition"
              }
            `}
          >
            <div className="pt-0.5">
              {feature.completed ? (
                <FiCheckCircle className="w-5 h-5 text-future-lime" />
              ) : (
                <FiCircle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  feature.completed ? "text-moss-shadow" : "text-gray-800"
                }`}
              >
                {feature.name}
              </p>
              <p className="text-sm text-moss-shadow">{feature.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
