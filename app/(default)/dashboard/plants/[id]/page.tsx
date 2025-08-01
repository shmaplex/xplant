import PlantDetail from "@/components/dashboard/plants/PlantDetail";
import NotLoggedIn from "@/components/ui/NotLoggedIn";
import {
  fetchPlantById,
  fetchPlantStages,
  fetchPlantRelatedData,
} from "@/lib/api/plant";
import { getCurrentUser } from "@/lib/api/user";
import { notFound } from "next/navigation";

export default async function PlantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return <NotLoggedIn />;
    }

    const plantData = await fetchPlantById(id, user.id);
    if (!plantData) {
      return notFound();
    }

    const stages = await fetchPlantStages(id);
    const current_stage = stages?.[0] ?? null;

    const { transfers, logs, recipes, errors } = await fetchPlantRelatedData(
      id
    );
    if (errors.transfersError)
      console.error("Transfers error:", errors.transfersError);
    if (errors.logsError) console.error("Logs error:", errors.logsError);
    if (errors.recipesError)
      console.error("Recipes error:", errors.recipesError);

    return (
      <PlantDetail
        plant={{ ...plantData, plant_stages: stages ?? [], current_stage }}
        transfers={transfers}
        logs={logs}
        recipes={recipes}
        canEdit={user.id === plantData.user_id}
        editUrl={`/dashboard/plants/${id}/edit`}
        printUrl={`/dashboard/plants/${id}/label`}
      />
    );
  } catch (err) {
    console.error("Unexpected error in PlantsPage:", err);
    return notFound();
  }
}
