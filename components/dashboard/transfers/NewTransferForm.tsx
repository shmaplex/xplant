"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { PlantBasic, PlantTransfer } from "@/lib/types";

export default function NewTransferForm({
  plants,
  transferId,
  initialData = {},
  onSuccess,
}: {
  plants: PlantBasic[];
  transferId?: string;
  initialData?: Partial<PlantTransfer>;
  onSuccess?: () => void;
}) {
  const [plantId, setPlantId] = useState(initialData.plant_id ?? "");
  const [notes, setNotes] = useState(initialData.notes ?? "");
  const [transferDate, setTransferDate] = useState(
    initialData.transfer_date
      ? new Date(initialData.transfer_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [cycle, setCycle] = useState<number | "">(
    initialData.transfer_cycle ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<PlantTransfer | null>(
    transferId ? (initialData as PlantTransfer) : null
  );

  const supabase = createClient();
  const router = useRouter();

  // When a plant is selected in create mode, fetch last cycle
  useEffect(() => {
    if (!plantId || editingTransfer) return; // don't auto-fetch when editing
    const fetchLastCycle = async () => {
      const { data, error } = await supabase
        .from("plant_transfers")
        .select("transfer_cycle")
        .eq("plant_id", plantId)
        .order("transfer_cycle", { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        setCycle((data[0].transfer_cycle ?? 0) + 1);
      } else {
        setCycle(1);
      }
    };
    fetchLastCycle();
  }, [plantId, editingTransfer, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!plantId) {
      toast.error("Please select a plant.");
      setLoading(false);
      return;
    }
    if (!cycle || isNaN(Number(cycle))) {
      toast.error("Please provide a valid cycle number.");
      setLoading(false);
      return;
    }

    const payload = {
      plant_id: plantId,
      notes,
      transfer_date: transferDate,
      transfer_cycle: Number(cycle),
    };

    if (editingTransfer) {
      const { error } = await supabase
        .from("plant_transfers")
        .update(payload)
        .eq("id", editingTransfer.id);

      if (error) {
        toast.error("Error updating transfer.");
      } else {
        toast.success("Transfer updated!");
        onSuccess ? onSuccess() : router.push("/dashboard/transfers");
      }
    } else {
      const { error } = await supabase.from("plant_transfers").insert(payload);

      if (error) {
        toast.error("Error saving transfer.");
      } else {
        toast.success("Transfer recorded!");
        setPlantId("");
        setNotes("");
        setCycle("");
        setTransferDate(new Date().toISOString().split("T")[0]);
        onSuccess && onSuccess();
      }
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!editingTransfer) return;
    const confirmed = confirm("Are you sure you want to delete this transfer?");
    if (!confirmed) return;

    const { error } = await supabase
      .from("plant_transfers")
      .delete()
      .eq("id", editingTransfer.id);

    if (error) {
      toast.error("Error deleting transfer.");
    } else {
      toast.success("Transfer deleted.");
      onSuccess ? onSuccess() : router.push("/dashboard/transfers");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Plant */}
      <div>
        <label
          htmlFor="plant"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Select Plant <span className="text-red-600">*</span>
        </label>
        <select
          id="plant"
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
          required
          disabled={!!editingTransfer} // lock plant on edit
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)]"
        >
          <option value="">-- Choose a Plant --</option>
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.species}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="transfer_date"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Transfer Date
        </label>
        <input
          type="date"
          id="transfer_date"
          value={transferDate}
          onChange={(e) => setTransferDate(e.target.value)}
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)]"
        />
      </div>

      {/* Cycle */}
      <div>
        <label
          htmlFor="cycle"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Transfer Cycle
        </label>
        <input
          type="number"
          id="cycle"
          value={cycle}
          onChange={(e) => setCycle(Number(e.target.value))}
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)]"
        />
        <p className="mt-2 text-sm text-gray-600">
          This number tracks how many times this plant has been transferred.
          When you select a plant, we try to auto‑suggest the next cycle based
          on its history. You can override this if necessary.
        </p>
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-moss-shadow font-semibold mb-2"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Add any relevant details about the transfer..."
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-biochar-black resize-none focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)]"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-future-lime text-moss-shadow font-bold py-3 rounded-lg shadow hover:bg-lime-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editingTransfer ? "Update Transfer" : "Save Transfer"}
        </button>

        {editingTransfer && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 border border-red-600 text-red-600 font-semibold py-3 rounded-lg hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Transfer
          </button>
        )}
      </div>
    </form>
  );
}
