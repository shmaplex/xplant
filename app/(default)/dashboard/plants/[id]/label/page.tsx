import PrintPlantLabel from "@/components/dashboard/plants/PrintPlantLabel";
import PlantNotFoundClient from "../../PlantNotFoundClient";
import { fetchPlantById, fetchPlantStages } from "@/lib/api/plant";
import { getCurrentUser } from "@/lib/api/user";

export default async function PrintLabelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const user = await getCurrentUser();
    const { id } = await params;
    if (!user) return <PlantNotFoundClient />;

    const plant = await fetchPlantById(id, user.id);
    if (!plant) return <PlantNotFoundClient />;

    const stages = await fetchPlantStages(id);
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
