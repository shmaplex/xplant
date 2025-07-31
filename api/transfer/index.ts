import { createClient } from "@/lib/supabase/server";
import type { PlantTransfer } from "@/lib/types";

export async function fetchTransferByIdWithRelations(
  transferId: string,
  userId: string
): Promise<PlantTransfer | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plant_transfers")
    .select(
      `
    *,
    plant:plants(
      *,
      plant_stages!plant_stages_plant_id_fkey(*)
    )
  `
    )
    .eq("id", transferId)
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching transfer by id:", error);
    return null;
  }

  return data ?? null;
}

export async function fetchTransfers(
  plantId?: string
): Promise<{ data?: PlantTransfer[]; error?: any }> {
  const supabase = await createClient();

  let query = supabase.from("plant_transfers").select("*, plant:plants(*)"); // include species, etc.

  if (plantId) {
    query = query.eq("plant_id", plantId);
  }

  const { data, error } = await query;
  return { data: data ?? undefined, error };
}

export async function fetchTransferById(
  id: string
): Promise<PlantTransfer | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plant_transfers")
    .select(
      `
      *,
      plant:plants(
        *,
        plant_stages!plants_current_stage_id_fkey(*)
      )
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data;
}

export async function fetchTransfersWithPlantDetails(
  userId: string
): Promise<PlantTransfer[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plant_transfers")
    .select(
      `
      *,
      plant:plants(
        *,
        plant_stages!plants_current_stage_id_fkey(*)
      )
    `
    )
    .eq("user_id", userId)
    .order("transfer_date", { ascending: false })
    .limit(10);

  if (error) throw error;
  return data as PlantTransfer[];
}

export async function insertTransfer(
  transfer: Partial<PlantTransfer>,
  userId?: string
): Promise<{ data?: PlantTransfer[]; error?: any }> {
  const supabase = await createClient();

  const payload = {
    plant_id: transfer.plant_id,
    transfer_date: transfer.transfer_date,
    transfer_cycle: transfer.transfer_cycle,
    notes: transfer.notes ?? null,
    user_id: userId ?? null,
  };

  const { data, error } = await supabase
    .from("plant_transfers")
    .insert(payload);

  return { data: data ?? undefined, error };
}

export async function updateTransfer(
  id: string,
  transfer: Partial<PlantTransfer>
): Promise<{ data?: PlantTransfer[]; error?: any }> {
  const supabase = await createClient();
  const updatePayload = { ...transfer };
  delete updatePayload.id;

  const { data, error } = await supabase
    .from("plant_transfers")
    .update(updatePayload)
    .eq("id", id);
  return { data: data ?? undefined, error };
}

export async function deleteTransfer(id: string): Promise<{ error?: any }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("plant_transfers")
    .delete()
    .eq("id", id);
  return { error };
}
