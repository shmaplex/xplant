import { createClient } from "@/lib/supabase/client";
import type {
  ContaminationLog,
  ContaminationLogInput,
  ContaminationLogWithRelations,
} from "@/lib/types";

const supabase = createClient();

export async function insertContaminationLog(data: ContaminationLogInput) {
  const { data: inserted, error } = await supabase
    .from("contamination_logs")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return inserted;
}

export async function updateContaminationLog(
  id: string,
  data: ContaminationLogInput
) {
  const { data: updated, error } = await supabase
    .from("contamination_logs")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return updated;
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "video/mp4",
  "video/quicktime", // .mov
];

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB max

export async function uploadContaminationMedia(
  file: File
): Promise<string | null> {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type");
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error("File size exceeds 50MB limit");
  }

  // Use contamination-media bucket as per your naming
  const { data, error } = await supabase.storage
    .from("contamination-media")
    .upload(`uploads/${Date.now()}-${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) throw error;
  return data?.path ?? null;
}

export async function fetchContaminationLogs(): Promise<
  ContaminationLogWithRelations[]
> {
  const { data, error } = await supabase
    .from("contamination_logs_with_user")
    .select("*")
    .order("log_date", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function fetchContaminationStats(): Promise<any[]> {
  const { data, error } = await supabase.rpc("contamination_by_date");

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function fetchContaminationById(
  id: string
): Promise<ContaminationLogWithRelations | null> {
  const { data, error } = await supabase
    .from("contamination_logs_with_user")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching contamination by ID:", error);
    return null;
  }

  return data;
}
