"use client";

import ContaminationForm from "@/components/dashboard/contamination/ContaminationForm";
import ContaminationList from "@/components/dashboard/contamination/ContaminationList";
import ContaminationStats from "@/components/dashboard/contamination/ContaminationStats";
import ContaminationActions from "@/components/dashboard/contamination/ContaminationActions";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

const ACCENT_COLOR = "text-[#5b3fa8]"; // darker purple from your palette

export default function ContaminationPage() {
  return (
    <div className="w-full p-8 bg-spore-gray min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto space-y-12 bg-white/40 p-12 rounded-2xl">
        {/* Page Header */}
        <header className="space-y-4 text-center sm:text-left">
          <h1 className={`text-4xl sm:text-5xl font-extrabold ${ACCENT_COLOR}`}>
            Manage <span>Contamination Reports</span>
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Log, review, and analyze contamination reports for your plants.
          </p>
        </header>

        {/* Form Section */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio p-8">
          <ContaminationForm />
        </section>

        {/* List Section */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio p-8">
          <ContaminationList />
        </section>

        {/* Stats Section */}
        <section className="relative overflow-hidden rounded-3xl shadow-xl transition-transform hover:-translate-y-1 hover:shadow-2xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio p-8">
          <ContaminationStats />
        </section>
      </div>

      {/* Floating Add Contamination button */}
      <ContaminationActions />
    </div>
  );
}
