import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditPlantPage from "./client";
import { fetchFullPlantData } from "@/lib/api/plant";

export default async function PlantEditServerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();

  const { plant, stages, mediaLogs } = await fetchFullPlantData(id, user.id);

  if (!plant) notFound();

  return (
    <EditPlantPage
      id={id}
      initialPlant={plant}
      initialStages={stages}
      initialMediaLogs={mediaLogs}
    />
  );
}
