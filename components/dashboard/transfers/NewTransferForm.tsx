"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import type { PlantBasic, PlantTransfer } from "@/lib/types";

export default function NewTransferForm({
  plants,
  transferId,
}: {
  plants: PlantBasic[];
  transferId?: string;
}) {
  const [plantId, setPlantId] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingTransfer, setEditingTransfer] = useState<PlantTransfer | null>(
    null
  );

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    if (transferId) {
      const fetchTransfer = async () => {
        const { data } = await supabase
          .from("plant_transfers")
          .select("*")
          .eq("id", transferId)
          .single();

        if (data) {
          setEditingTransfer(data);
          setPlantId(data.plant_id);
          setNotes(data.notes ?? "");
        }
      };
      fetchTransfer();
    }
  }, [transferId, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!plantId) {
      toast.error("Please select a plant.");
      setLoading(false);
      return;
    }

    if (editingTransfer) {
      const { error } = await supabase
        .from("plant_transfers")
        .update({ plant_id: plantId, notes })
        .eq("id", editingTransfer.id);

      if (error) {
        toast.error("Error updating transfer.");
      } else {
        toast.success("Transfer updated!");
        router.push("/dashboard/transfers");
      }
    } else {
      const { error } = await supabase.from("plant_transfers").insert({
        plant_id: plantId,
        notes,
        transfer_date: new Date().toISOString(),
      });

      if (error) {
        toast.error("Error saving transfer.");
      } else {
        toast.success("Transfer recorded!");
        setPlantId("");
        setNotes("");
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
      router.push("/dashboard/transfers");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="plant"
          className="block text-[var(--moss-shadow)] font-semibold mb-2"
        >
          Select Plant <span className="text-red-600">*</span>
        </label>
        <select
          id="plant"
          value={plantId}
          onChange={(e) => setPlantId(e.target.value)}
          required
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-[var(--biochar-black)] focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)]"
        >
          <option value="">-- Choose a Plant --</option>
          {plants.map((plant) => (
            <option key={plant.id} value={plant.id}>
              {plant.species}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="notes"
          className="block text-[var(--moss-shadow)] font-semibold mb-2"
        >
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Add any relevant details about the transfer..."
          className="w-full border border-spore-grey rounded-lg px-4 py-3 text-[var(--biochar-black)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--future-lime)]"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-[var(--future-lime)] text-[var(--moss-shadow)] font-bold py-3 rounded-lg shadow hover:bg-lime-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
