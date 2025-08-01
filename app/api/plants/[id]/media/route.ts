import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@/lib/supabase/server";
import { fetchPlantMediaLogs } from "@/lib/api/plant";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: plantId } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const useSignedUrls = searchParams.get("useSignedUrls") === "true";

  console.log("useSignedUrls", useSignedUrls);

  try {
    // 1. Get media logs using shared helper
    const mediaLogs = await fetchPlantMediaLogs(plantId, user.id);

    // 2. Generate URLs (signed or public)
    const mediaUrls: Record<string, string> = {};
    for (const log of mediaLogs) {
      if (useSignedUrls) {
        const { data: signedData } = await supabase.storage
          .from("plant-media")
          .createSignedUrl(log.media_url, 60 * 60); // 1 hour
        mediaUrls[log.id] = signedData?.signedUrl || "";
      } else {
        const {
          data: { publicUrl },
        } = supabase.storage.from("plant-media").getPublicUrl(log.media_url);
        mediaUrls[log.id] = publicUrl;
      }
    }

    return NextResponse.json({ mediaLogs, mediaUrls });
  } catch (error: any) {
    console.error("Error fetching media logs:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: plantId } = await context.params;
  const supabase = await import("@/lib/supabase/server").then((mod) =>
    mod.createClient()
  );

  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const timestamp = Date.now();
      const filePath = `${plantId}/${timestamp}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("plant-media")
        .upload(filePath, buffer, { contentType: file.type });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        continue;
      }

      // Detect media type based on MIME
      let mediaType: "photo" | "video" | "other" = "other";
      if (file.type.startsWith("image/")) mediaType = "photo";
      else if (file.type.startsWith("video/")) mediaType = "video";

      const { error: insertError } = await supabase
        .from("plant_media_logs")
        .insert({
          id: uuidv4(),
          plant_id: plantId,
          contamination_log_id: null,
          type: mediaType,
          media_url: filePath,
          original_name: file.name,
          file_type: file.type,
          description: null,
          captured_at: new Date().toISOString(),
          labels: [],
          annotated: false,
          is_public: false,
          uploaded_by: session.user.id, // This must match the RLS policy
        });

      if (insertError) {
        console.error("Insert error:", insertError);
        continue;
      }

      uploadedFiles.push(filePath);
    }

    return NextResponse.json({ uploaded: uploadedFiles }, { status: 200 });
  } catch (err) {
    console.error("Media upload failed:", err);
    return NextResponse.json(
      { error: "Failed to upload media" },
      { status: 500 }
    );
  }
}
