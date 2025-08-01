import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string; mediaId: string }> }
) {
  const { id: plantId, mediaId } = await context.params;
  const { mediaUrl } = await req.json();

  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: mediaRecord, error: mediaError } = await supabase
    .from("plant_media_logs")
    .select("plant_id, uploaded_by")
    .eq("id", mediaId)
    .single();

  if (
    mediaError ||
    !mediaRecord ||
    mediaRecord.plant_id !== plantId ||
    mediaRecord.uploaded_by !== user.id
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Delete file from storage
  const { error: storageError } = await supabase.storage
    .from("plant-media")
    .remove([mediaUrl]);

  if (storageError) {
    return NextResponse.json(
      { error: `Failed to delete file: ${storageError.message}` },
      { status: 500 }
    );
  }

  // Delete DB record
  const { error: dbError } = await supabase
    .from("plant_media_logs")
    .delete()
    .eq("id", mediaId)
    .eq("plant_id", plantId)
    .eq("uploaded_by", user.id);

  if (dbError) {
    return NextResponse.json(
      { error: `Failed to delete DB record: ${dbError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
