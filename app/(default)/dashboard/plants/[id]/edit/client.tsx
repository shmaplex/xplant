"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PlantForm from "@/components/dashboard/plants/PlantForm";
import PlantMediaGallery from "@/components/dashboard/plants/PlantMediaGallery";
import PlantMediaUploader from "@/components/dashboard/plants/PlantMediaUploader";
import { createClient } from "@/lib/supabase/client";

interface EditPlantPageProps {
  id: string;
  initialPlant: any;
  initialStages: any[];
  initialMediaLogs: any[];
}

export default function EditPlantPage({
  id,
  initialPlant,
  initialStages,
  initialMediaLogs,
}: EditPlantPageProps) {
  const router = useRouter();
  const supabase = createClient();
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, [supabase]);

  // Pre-fill form using props (server-fetched)
  const latestStage = initialStages[0] || {};
  const [form, setForm] = useState({
    species: initialPlant.species ?? "",
    source: initialPlant.source ?? "",
    initial_n_date: initialPlant.initial_n_date ?? "",
    initial_i_date: initialPlant.initial_i_date ?? "",
    notes: initialPlant.notes ?? "",
    stage: latestStage.stage ?? "Mother Block",
    room: latestStage.room ?? "",
    entered_on:
      latestStage.entered_on ?? new Date().toISOString().split("T")[0],
    stage_notes: latestStage.notes ?? "",
  });

  const [mediaLogs, setMediaLogs] = useState(initialMediaLogs || []);
  const [updating, setUpdating] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`/api/plants/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Update failed");
      }

      router.push(`/dashboard/plants/${id}`);
    } catch (error: any) {
      alert(`Error updating plant: ${error.message || error}`);
      console.error("Update error:", error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="w-full p-8 bg-future-lime/20">
      <div className="max-w-4xl mx-auto min-h-screen bg-white/90 p-12 rounded-3xl shadow-lg">
        <Breadcrumbs
          items={[
            { label: "Plants", href: "/dashboard/plants" },
            {
              label: form.species || "Plant Details",
              href: `/dashboard/plants/${id}`,
            },
            { label: "Edit" },
          ]}
        />

        <header className="space-y-4 text-center sm:text-left mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-biochar-black">
            Edit{" "}
            <span className="text-future-lime">{form.species || "Plant"}</span>
          </h1>
        </header>

        <section className="z-10 relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-br from-future-lime/50 via-future-lime/10 to-future-lime/40">
          <div className="absolute inset-0 bg-[url('/png/asfalt-light.png')] bg-repeat opacity-5 pointer-events-none"></div>
          <div className="relative p-8">
            <PlantForm
              form={form}
              setForm={setForm}
              onSubmit={handleUpdate}
              updating={updating}
              showStageFields={true}
              plantId={id}
              userId={userId}
            />
          </div>
        </section>

        <section className="z-1 relative overflow-hidden rounded-b-3xl shadow-xl bg-future-lime/30 mx-4">
          <div className="relative p-8 flex flex-col space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-biochar-black">
                Uploaded Media
              </h2>
              <p className="text-sm text-moss-shadow mt-2 sm:mt-0">
                Upload new files or manage existing media
              </p>
            </div>

            <div className="bg-white/80 rounded-xl p-6 shadow-inner">
              <PlantMediaUploader
                plantId={id}
                userId={userId}
                onUploaded={() =>
                  window.dispatchEvent(new CustomEvent("refreshGallery"))
                }
              />
            </div>

            <div className="bg-white/70 rounded-xl p-6 shadow-inner">
              <PlantMediaGallery plantId={id} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
