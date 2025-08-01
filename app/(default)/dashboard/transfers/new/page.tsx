"use client";

import { useEffect, useState } from "react";
import NewTransferForm from "@/components/dashboard/transfers/NewTransferForm";
import type { PlantBasic } from "@/lib/types";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Loader from "@/components/ui/Loader";
import { GiLeafSkeleton } from "react-icons/gi";

const ACCENT_COLOR = "text-organic-amber";

export default function NewTransferPage() {
  const [plants, setPlants] = useState<PlantBasic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const res = await fetch("/api/plants");
        const json = await res.json();
        const data = json.data ?? json.plants ?? json; // support both shapes

        if (res.ok) {
          setPlants(data || []);
        } else {
          console.error(json.error || "Failed to load plants");
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
      setLoading(false);
    }

    fetchPlants();
  }, []);

  if (loading) {
    return (
      <Loader
        Icon={GiLeafSkeleton}
        iconColor="text-organic-amber"
        mainBgColor="bg-organic-amber/10"
        bgColor="bg-organic-amber-light/40"
        textColor="text-organic-amber"
      />
    );
  }

  return (
    <div className="w-full p-8 bg-organic-amber-light/50">
      <div className="max-w-4xl mx-auto min-h-screen bg-white/40 p-12 rounded-2xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Transfers", href: "/dashboard/transfers" },
            { label: "Add New" },
          ]}
        />

        <header className="space-y-4 text-center sm:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            Record <span className={ACCENT_COLOR}>Transfer</span>
          </h1>
          <p className="text-base text-moss-shadow max-w-2xl">
            Record a new plant transfer cycle and keep track of its progress.
          </p>
        </header>

        <section className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-milk-bio via-spore-grey/10 to-milk-bio">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>
          <div className="relative p-8">
            <NewTransferForm plants={plants} />
          </div>
        </section>
      </div>
    </div>
  );
}
