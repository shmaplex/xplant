"use client";

import ContaminationForm from "@/components/dashboard/contamination/ContaminationForm";
import ContaminationList from "@/components/dashboard/contamination/ContaminationList";
import ContaminationStats from "@/components/dashboard/contamination/ContaminationStats";
import ContaminationActions from "@/components/dashboard/contamination/ContaminationActions";

export default function ContaminationPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,var(--color-bio-red-light)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Page Header */}
        <header className="space-y-3 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-bio-red-dark">
            Contamination Reports
          </h1>
          <p className="text-base text-bio-red max-w-2xl">
            Log new contamination, review reports, and analyze trends over time.
          </p>
        </header>

        {/* Form */}
        <section className="rounded-2xl bg-white/70 backdrop-blur p-8 shadow-lg hover:shadow-xl transition">
          <ContaminationForm />
        </section>

        {/* List */}
        <section className="rounded-2xl bg-white/70 backdrop-blur p-8 shadow-lg hover:shadow-xl transition">
          <ContaminationList />
        </section>

        {/* Stats */}
        <section className="rounded-2xl bg-white/70 backdrop-blur p-8 shadow-lg hover:shadow-xl transition">
          <ContaminationStats />
        </section>
      </div>

      {/* Floating Action Button */}
      <ContaminationActions />
    </div>
  );
}
