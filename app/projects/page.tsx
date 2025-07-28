"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaFlask, FaSeedling, FaUsers, FaLeaf } from "react-icons/fa";

const projects = [
  {
    title: "Clean Plant Network",
    description:
      "Collaborative research into pathogen-free, elite plant lines for sustainable agriculture and horticulture.",
    icon: <FaFlask className="w-12 h-12" />,
    gradient: "from-[rgba(183,239,72,0.15)] to-[rgba(66,89,77,0.1)]",
  },
  {
    title: "Organic Tissue Culture Inputs",
    description:
      "Replacing synthetic media components with organic, bio-derived alternatives for home and commercial propagation.",
    icon: <FaSeedling className="w-12 h-12" />,
    gradient: "from-[rgba(247,242,236,0.6)] to-[rgba(218,215,210,0.4)]",
  },
  {
    title: "Micropropagation at Scale",
    description:
      "Developing scalable protocols to bring rare and resilient cultivars to growers around the world.",
    icon: <FaLeaf className="w-12 h-12" />,
    gradient: "from-[rgba(211,168,249,0.15)] to-[rgba(218,215,210,0.1)]",
  },
  {
    title: "Community Lab Initiatives",
    description:
      "Hands-on workshops and open-access lab programs to empower growers with propagation techniques.",
    icon: <FaUsers className="w-12 h-12" />,
    gradient: "from-[rgba(218,215,210,0.3)] to-[rgba(183,239,72,0.15)]",
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-[var(--milk-bio)] text-[var(--biochar-black)] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-6 sm:px-10 py-16">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase">
            Research Projects
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[var(--moss-shadow)] max-w-3xl mx-auto">
            Exploring plant science, sustainable propagation, and
            community-driven innovation.
          </p>
        </section>

        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((proj) => (
            <div
              key={proj.title}
              className={`rounded-3xl p-10 flex flex-col items-center text-center 
              shadow-md bg-gradient-to-br ${proj.gradient}
              transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg`}
            >
              <div className="mb-5 text-[var(--biochar-black)]">
                {proj.icon}
              </div>
              <h2 className="text-2xl font-bold mb-3">{proj.title}</h2>
              <p className="text-base text-[var(--biochar-black)]/80 leading-relaxed">
                {proj.description}
              </p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
