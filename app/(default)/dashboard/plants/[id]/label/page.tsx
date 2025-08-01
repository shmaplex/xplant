import PrintPlantLabel from "@/components/dashboard/plants/PrintPlantLabel";
import { fetchPlantById, fetchPlantStages } from "@/lib/api/plant";
import { getCurrentUser } from "@/lib/api/user";
import { notFound } from "next/navigation";

export default async function PrintLabelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const user = await getCurrentUser();
    const { id } = await params;
    if (!user) {
      return (
        <div className="max-w-lg mx-auto text-center p-8">
          <h2 className="text-2xl font-bold text-red-600">Not logged in</h2>
          <p>Please log in to view your profile.</p>
        </div>
      );
    }

    const plant = await fetchPlantById(id, user.id);
    if (!plant) return notFound();

    const stages = await fetchPlantStages(id);
    const current_stage = stages?.[0] ?? null;

    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <PrintPlantLabel plant={{ ...plant, current_stage }} />
      </div>
    );
  } catch (err) {
    console.error("Label print page error:", err);
    return notFound();
  }
}
