"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PlantForm from "@/components/dashboard/plants/PlantForm";
import Loader from "@/components/ui/Loader";
import { LuLeaf } from "react-icons/lu";

export default function NewPlantPage() {
  const [form, setForm] = useState({
    species: "",
    source: "",
    initial_n_date: "",
    initial_i_date: "",
    notes: "",

    // New initial stage fields:
    stage: "Mother Block",
    room: "",
    entered_on: new Date().toISOString().split("T")[0], // default to today
    stage_notes: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [plantId, setPlantId] = useState<string | null>(null);
  const supabase = createClient();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not logged in");

      const response = await fetch("/api/plants/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          species: form.species,
          source: form.source,
          initial_n_date: form.initial_n_date,
          initial_i_date: form.initial_i_date,
          notes: form.notes,
          stage: form.stage,
          room: form.room,
          entered_on: form.entered_on,
          stage_notes: form.stage_notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create plant");
      }

      const plant = await response.json();

      // Redirect straight to edit page
      router.push(`/dashboard/plants/${plant.id}/edit`);
    } catch (error: any) {
      console.error("Error adding plant:", error.message || error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Loader
        Icon={LuLeaf}
        iconColor="text-moss-shadow"
        mainBgColor="bg-moss-shadow/10"
        bgColor="bg-future-lime/40"
        textColor="text-moss-shadow"
      />
    );
  }

  return (
    <div className="w-full p-8 bg-future-lime/20">
      <div className="max-w-4xl mx-auto min-h-screen bg-white/90 p-12 rounded-3xl shadow-lg">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Plants", href: "/dashboard/plants" },
            { label: plantId ? "Upload Media" : "Add New" },
          ]}
        />

        <header className="space-y-4 text-center sm:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            {plantId ? (
              <>
                Upload Media for{" "}
                <span className="text-future-lime">{form.species}</span>
              </>
            ) : (
              <>
                Add <span className="text-future-lime">New Plant</span>
              </>
            )}
          </h1>
          {!plantId && (
            <p className="text-base text-moss-shadow max-w-2xl">
              Log a new plant into your inventory and set its starting stage.
            </p>
          )}
        </header>

        <section className="relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-future-lime/50 via-future-lime/10 to-future-lime/40">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>
          <div className="relative p-8">
            <PlantForm
              form={form}
              setForm={setForm}
              onSubmit={handleSubmit}
              updating={loading}
              showStageFields={true}
              userId={userId}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
