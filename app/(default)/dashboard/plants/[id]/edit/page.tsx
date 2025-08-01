"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PlantForm from "@/components/dashboard/plants/PlantForm";
import PlantMediaGallery from "@/components/dashboard/plants/PlantMediaGallery";
import { createClient } from "@/lib/supabase/client";

export default function EditPlantPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const user = supabase.auth.getUser();

  const [form, setForm] = useState({
    species: "",
    source: "",
    initial_n_date: "",
    initial_i_date: "",
    notes: "",
    stage: "Mother Block",
    room: "",
    entered_on: new Date().toISOString().split("T")[0],
    stage_notes: "",
  });

  // Store media logs separately (optional)
  const [mediaLogs, setMediaLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchPlant() {
      try {
        const res = await fetch(`/api/plants/${id}`);
        if (!res.ok) throw new Error("Failed to fetch plant data");
        const data = await res.json();

        // Extract main plant info
        const {
          species,
          source,
          initial_n_date,
          initial_i_date,
          notes,
          stages = [],
          mediaLogs = [],
        } = data;

        // Use the most recent stage (first in array) to fill stage fields
        const latestStage = stages[0] || {};

        setForm({
          species: species ?? "",
          source: source ?? "",
          initial_n_date: initial_n_date ?? "",
          initial_i_date: initial_i_date ?? "",
          notes: notes ?? "",
          stage: latestStage.stage ?? "Mother Block",
          room: latestStage.room ?? "",
          entered_on:
            latestStage.entered_on ?? new Date().toISOString().split("T")[0],
          stage_notes: latestStage.notes ?? "",
        });

        setMediaLogs(mediaLogs || []);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlant();
  }, [id]);

  async function fetchMediaLogs() {
    try {
      const res = await fetch(`/api/plants/${id}/media`);
      if (!res.ok) throw new Error("Failed to fetch media");
      const data = await res.json();
      setMediaLogs(data.mediaLogs || []);
    } catch (e) {
      console.error(e);
    }
  }

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

  if (loading)
    return <p className="p-6 text-center text-spore-grey">Loading...</p>;

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
              showMediaUpload={true}
              showStageFields={true}
              plantId={id}
              userId={user.id}
              // mediaLogs={mediaLogs}
            />
          </div>
          {/* Media Gallery */}
        </section>
        <section className="z-1 relative overflow-hidden rounded-b-3xl shadow-xl bg-future-lime/30 mx-4">
          <div className="relative p-8">
            <h2 className="text-2xl font-bold mb-4">Uploaded Media</h2>
            <PlantMediaGallery plantId={id} onRefresh={fetchMediaLogs} />
          </div>
        </section>
      </div>
    </div>
  );
}
