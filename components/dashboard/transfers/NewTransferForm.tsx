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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h3 className="font-semibold text-moss-shadow text-lg">
        {editingTransfer ? "Edit Transfer" : "Record New Transfer"}
      </h3>

      <select
        value={plantId}
        onChange={(e) => setPlantId(e.target.value)}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Select Plant</option>
        {plants.map((plant) => (
          <option key={plant.id} value={plant.id}>
            {plant.species}
          </option>
        ))}
      </select>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes about the transfer (optional)"
        className="w-full border p-2 rounded"
        rows={3}
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-future-lime text-moss-shadow font-bold px-4 py-2 rounded"
        >
          {editingTransfer ? "Update Transfer" : "Save Transfer"}
        </button>

        {editingTransfer && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
