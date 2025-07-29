// app/dashboard/components/QuickActions.tsx
import React from "react";

const quickActions = [
  {
    label: "Add New Plant",
    desc: "Log a new culture line",
    href: "/dashboard/plants/new",
  },
  {
    label: "Record Transfer",
    desc: "Update transfer cycle",
    href: "/dashboard/transfers/new",
  },
  {
    label: "Media Recipes",
    desc: "Create & manage recipes",
    href: "/dashboard/media",
  },
  { label: "View Schedule", desc: "Upcoming tasks", href: "/dashboard/tasks" },
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-moss-shadow">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map(({ label, desc, href }) => (
          <a
            key={label}
            href={href}
            className="group relative overflow-hidden rounded-2xl p-6 shadow-md bg-gradient-to-br from-white via-milk-bio to-spore-grey/10 border border-spore-grey/50 hover:-translate-y-1 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-moss-shadow mb-2">{label}</h3>
            <p className="text-gray-700 text-sm">{desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
