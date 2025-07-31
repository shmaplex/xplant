import PlantNotFoundClient from "../PlantNotFoundClient";
import PlantDetail from "@/components/dashboard/plants/PlantDetail";
import {
  fetchPlantById,
  fetchPlantStages,
  fetchPlantRelatedData,
} from "@/api/plant";
import { getCurrentUser } from "@/api/user";

export default async function PlantsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) return <PlantNotFoundClient />;

    const plantData = await fetchPlantById(id, user.id);
    if (!plantData) return <PlantNotFoundClient />;

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
    return <PlantNotFoundClient />;
  }
}
