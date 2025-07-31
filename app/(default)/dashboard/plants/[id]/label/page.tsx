import PrintPlantLabel from "@/components/dashboard/plants/PrintPlantLabel";
import PlantNotFoundClient from "../../PlantNotFoundClient";
import { fetchPlantById, fetchPlantStages } from "@/api/plant";
import { getCurrentUser } from "@/api/user";

export default async function PrintLabelPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const user = await getCurrentUser();
    if (!user) return <PlantNotFoundClient />;

    const plant = await fetchPlantById(params.id, user.id);
    if (!plant) return <PlantNotFoundClient />;

    const stages = await fetchPlantStages(params.id);
    const current_stage = stages?.[0] ?? null;

    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <PrintPlantLabel plant={{ ...plant, current_stage }} />
      </div>
    );
  } catch (err) {
    console.error("Label print page error:", err);
    return <PlantNotFoundClient />;
  }
}
