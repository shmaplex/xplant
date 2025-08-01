import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditPlantPage from "./client";
import { fetchFullPlantData } from "@/lib/api/plant";

export default async function PlantEditServerPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound(); // or redirect("/login")
  }

  const { plant, stages, mediaLogs } = await fetchFullPlantData(
    params.id,
    user.id
  );

  if (!plant) {
    notFound();
  }

  return (
    <EditPlantPage
      id={params.id}
      initialPlant={plant}
      initialStages={stages}
      initialMediaLogs={mediaLogs}
    />
  );
}
