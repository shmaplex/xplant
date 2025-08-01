"use client";

import ContaminationForm from "@/components/dashboard/contamination/ContaminationForm";
import ContaminationList from "@/components/dashboard/contamination/ContaminationList";
import ContaminationStats from "@/components/dashboard/contamination/ContaminationStats";
import ContaminationActions from "@/components/dashboard/contamination/ContaminationActions";

const ACCENT_COLOR = "text-psybeam-purple-dark";

export default function ContaminationPage() {
  return (
    <div className="w-full min-h-screen bg-spore-gray">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Page Header */}
        <header className="space-y-3 text-center sm:text-left">
          <h1 className={`text-4xl sm:text-5xl font-extrabold ${ACCENT_COLOR}`}>
            Contamination Reports
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Log new contamination, review reports, and analyze trends over time.
          </p>
        </header>

        {/* Form */}
        <section className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition">
          <ContaminationForm />
        </section>

        {/* List */}
        <section className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition">
          <ContaminationList />
        </section>

        {/* Stats */}
        <section className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition">
          <ContaminationStats />
        </section>
      </div>

      {/* Floating Action Button */}
      <ContaminationActions />
    </div>
  );
}
