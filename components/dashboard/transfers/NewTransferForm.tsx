"use client";

import { useEffect, useState } from "react";
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

  const router = useRouter();

  // Fetch last cycle when plant changes and not editing
  useEffect(() => {
    if (!plantId || editingTransfer) return;

    const fetchLastCycle = async () => {
      try {
        const res = await fetch(`/api/transfers?plantId=${plantId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch last cycle");
        }
        const json = await res.json();

        // json.data is an array of transfers, sorted by your API or unsorted
        const transfers = json.data ?? [];

        if (transfers.length > 0) {
          // find max transfer_cycle among all returned transfers just in case
          const maxCycle = Math.max(
            ...transfers.map((t: any) => t.transfer_cycle ?? 0)
          );
          setCycle(maxCycle + 1);
        } else {
          setCycle(1);
        }
      } catch (error) {
        setCycle(1);
      }
    };

    fetchLastCycle();
  }, [plantId, editingTransfer]);

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
      ...(editingTransfer ? { id: editingTransfer.id } : {}),
    };

    try {
      const res = await fetch("/api/transfers", {
        method: editingTransfer ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Unknown error");
      }

      toast.success(
        editingTransfer ? "Transfer updated!" : "Transfer recorded!"
      );

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/transfers");
      }
    } catch (error: any) {
      toast.error(
        error.message ||
          (editingTransfer
            ? "Error updating transfer."
            : "Error saving transfer.")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!editingTransfer) return;
    const confirmed = confirm("Are you sure you want to delete this transfer?");
    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/transfers?id=${editingTransfer.id}`, {
        method: "DELETE",
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Unknown error");
      }

      toast.success("Transfer deleted.");

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/transfers");
      }
    } catch (error: any) {
      toast.error(error.message || "Error deleting transfer.");
    } finally {
      setLoading(false);
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
