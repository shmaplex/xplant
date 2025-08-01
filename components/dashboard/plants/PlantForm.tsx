"use client";

import { FiSave, FiLoader } from "react-icons/fi";

export interface PlantFormProps {
  form: {
    species: string;
    source: string;
    initial_n_date: string;
    initial_i_date: string;
    notes: string;
    stage: string;
    room: string;
    entered_on: string;
    stage_notes: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      species: string;
      source: string;
      initial_n_date: string;
      initial_i_date: string;
      notes: string;
      stage: string;
      room: string;
      entered_on: string;
      stage_notes: string;
    }>
  >;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  updating: boolean;
  showStageFields?: boolean;
  plantId?: string;
  userId: string;
}

export default function PlantForm({
  form,
  setForm,
  onSubmit,
  updating,
  showStageFields = false,
}: PlantFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Species */}
      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Species <span className="text-red-500">*</span>
        </label>
        <input
          id="species"
          name="species"
          type="text"
          required
          value={form.species}
          onChange={(e) => setForm({ ...form, species: e.target.value })}
          placeholder="e.g. Musa acuminata"
          className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
        />
      </div>

      {/* Source */}
      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Source
        </label>
        <input
          id="source"
          name="source"
          type="text"
          value={form.source}
          onChange={(e) => setForm({ ...form, source: e.target.value })}
          placeholder="e.g. Greenhouse A, TC Vendor"
          className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
        />
      </div>

      {/* Dates */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-moss-shadow mb-2">
          Dates
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-moss-shadow/80 mb-1">
              Initial N Date
            </label>
            <input
              id="initial_n_date"
              name="initial_n_date"
              type="date"
              value={form.initial_n_date}
              onChange={(e) =>
                setForm({ ...form, initial_n_date: e.target.value })
              }
              className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-moss-shadow/80 mb-1">
              Initial I Date
            </label>
            <input
              id="initial_i_date"
              name="initial_i_date"
              type="date"
              value={form.initial_i_date}
              onChange={(e) =>
                setForm({ ...form, initial_i_date: e.target.value })
              }
              className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime"
            />
          </div>
        </div>
      </fieldset>

      {/* Stage fields (optional) */}
      {showStageFields && (
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-moss-shadow mb-2">
            Stage Details
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-moss-shadow/80 mb-1">
                Stage
              </label>
              <select
                value={form.stage || "Mother Block"}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
                className="w-full rounded-lg border border-spore-grey p-3 text-base"
              >
                <option value="Mother Block">Mother Block</option>
                <option value="Acclimation">Acclimation</option>
                <option value="Production">Production</option>
                <option value="Cold Storage">Cold Storage</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-moss-shadow/80 mb-1">
                Room
              </label>
              <input
                type="text"
                value={form.room || ""}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full rounded-lg border border-spore-grey p-3 text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-moss-shadow/80 mb-1">
                Stage Entered On
              </label>
              <input
                type="date"
                value={form.entered_on || ""}
                onChange={(e) =>
                  setForm({ ...form, entered_on: e.target.value })
                }
                className="w-full rounded-lg border border-spore-grey p-3 text-base"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-moss-shadow/80 mb-1">
                Stage Notes
              </label>
              <textarea
                value={form.stage_notes || ""}
                onChange={(e) =>
                  setForm({ ...form, stage_notes: e.target.value })
                }
                className="w-full rounded-lg border border-spore-grey p-3 text-base"
              />
            </div>
          </div>
        </fieldset>
      )}

      {/* Notes */}
      <div>
        <label className="block text-sm font-semibold text-moss-shadow mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={5}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Any relevant notes about this plant..."
          className="w-full rounded-lg border border-spore-grey p-3 text-base focus:outline-none focus:ring-2 focus:ring-future-lime resize-none"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          disabled={updating}
          className="w-full bg-future-lime text-biochar-black font-semibold py-2 rounded hover:bg-lime-400 transition disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {updating ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FiSave className="w-5 h-5" />
              Save Plant
            </>
          )}
        </button>
      </div>
    </form>
  );
}
