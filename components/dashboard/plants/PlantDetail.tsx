import {
  Plant,
  PlantTransfer,
  ContaminationLog,
  MediaRecipe,
} from "@/lib/types";

export default function PlantDetail({
  plant,
  transfers,
  logs,
  recipes,
}: {
  plant: Plant;
  transfers: PlantTransfer[];
  logs: ContaminationLog[];
  recipes: MediaRecipe[];
}) {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{plant.species}</h1>
      <p className="text-gray-600">Stage: {plant.current_stage?.stage}</p>

      <section>
        <h2 className="font-semibold mt-4">Transfer History</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          {transfers.map((t) => (
            <li key={t.id}>
              {t.transfer_date} — {t.stage} ({t.notes || "No notes"})
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mt-4">Contamination Logs</h2>
        <ul className="text-sm text-red-600 space-y-1">
          {logs.map((l) => (
            <li key={l.id}>
              {l.logged_at}: {l.issue}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mt-4">Linked Media Recipes</h2>
        <ul className="text-sm text-gray-700 space-y-1">
          {recipes.map((r) => (
            <li key={r.id}>{r.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
