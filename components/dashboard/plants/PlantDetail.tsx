import {
  Plant,
  PlantStage,
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
  plant: Plant & { plant_stages?: PlantStage[] };
  transfers: PlantTransfer[];
  logs: ContaminationLog[];
  recipes: MediaRecipe[];
}) {
  const currentStage = plant.plant_stages?.[0];

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{plant.species}</h1>

      <div className="text-gray-600">
        <p>
          <strong>Source:</strong> {plant.source || "N/A"}
        </p>
        <p>
          <strong>Initial N Date:</strong> {plant.initial_n_date || "N/A"}
        </p>
        <p>
          <strong>Initial I Date:</strong> {plant.initial_i_date || "N/A"}
        </p>
        <p>
          <strong>Transfer Cycle:</strong> {plant.transfer_cycle}
        </p>
        {plant.media && plant.media.length > 0 && (
          <p>
            <strong>Media:</strong> {plant.media.join(", ")}
          </p>
        )}
        {plant.notes && (
          <p>
            <strong>Notes:</strong> {plant.notes}
          </p>
        )}
      </div>

      {currentStage && (
        <div>
          <h2 className="text-xl font-semibold">Current Stage</h2>
          <p>
            <strong>Stage:</strong> {currentStage.stage} <br />
            <strong>Room:</strong> {currentStage.room || "N/A"} <br />
            <strong>Entered On:</strong> {currentStage.entered_on} <br />
            {currentStage.notes && (
              <span>
                <strong>Notes:</strong> {currentStage.notes}
              </span>
            )}
          </p>
        </div>
      )}

      {plant.plant_stages && plant.plant_stages.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mt-6">Stage History</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            {plant.plant_stages.map((stage) => (
              <li key={stage.id} className="border rounded p-2">
                <p>
                  <strong>Stage:</strong> {stage.stage}
                </p>
                <p>
                  <strong>Room:</strong> {stage.room || "N/A"}
                </p>
                <p>
                  <strong>Entered On:</strong> {stage.entered_on}
                </p>
                {stage.notes && (
                  <p>
                    <strong>Notes:</strong> {stage.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mt-6">Transfer History</h2>
        {transfers.length === 0 ? (
          <p className="text-gray-600">No transfer records found.</p>
        ) : (
          <ul className="text-sm text-gray-700 space-y-1">
            {transfers.map((t) => (
              <li key={t.id} className="border rounded p-2">
                <p>
                  <strong>Date:</strong> {t.transfer_date}
                </p>
                <p>
                  <strong>Stage:</strong> {t.stage}
                </p>
                {t.notes && (
                  <p>
                    <strong>Notes:</strong> {t.notes}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6">Contamination Logs</h2>
        {logs.length === 0 ? (
          <p className="text-gray-600">No contamination logs.</p>
        ) : (
          <ul className="text-sm text-red-600 space-y-1">
            {logs.map((log) => (
              <li key={log.id} className="border rounded p-2">
                <p>
                  <strong>Date:</strong> {log.log_date}
                </p>
                <p>
                  <strong>Issue:</strong> {log.issue}
                </p>
                {log.description && (
                  <p>
                    <strong>Description:</strong> {log.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-6">Linked Media Recipes</h2>
        {recipes.length === 0 ? (
          <p className="text-gray-600">No linked media recipes.</p>
        ) : (
          <ul className="text-sm text-gray-700 space-y-1">
            {recipes.map((r) => (
              <li key={r.id} className="border rounded p-2">
                {r.title}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
