"use client";

import { useRouter } from "next/navigation";
import ContaminationForm from "@/components/dashboard/contamination/ContaminationForm";

export default function NewContaminationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-milk-bio py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-12">
        <h1 className="text-3xl font-semibold text-moss-shadow mb-6">
          Log Contamination
        </h1>
        <p className="mb-10 text-base text-moss-shadow max-w-lg leading-relaxed">
          Record a contamination event for a plant, including notes and optional
          photos.
        </p>
        <ContaminationForm
          onSuccess={() => router.push("/dashboard/contamination")}
        />
      </div>
    </div>
  );
}
