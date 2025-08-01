import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchPlantMediaLogs } from "@/lib/api/plant";

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);
  const plantId = searchParams.get("plantId");
  const useSignedUrls = searchParams.get("useSignedUrls") !== "false";

  if (!plantId) {
    return NextResponse.json({ error: "Missing plantId" }, { status: 400 });
  }

  try {
    const mediaLogs = await fetchPlantMediaLogs(plantId);

    const mediaUrls: Record<string, string> = {};

    if (useSignedUrls) {
      await Promise.all(
        mediaLogs.map(async (media) => {
          const { data: signedData, error } = await supabase.storage
            .from("plant-media")
            .createSignedUrl(media.media_url, 3600);
          mediaUrls[media.id] = error ? "" : signedData.signedUrl;
        })
      );
    } else {
      mediaLogs.forEach((media) => {
        mediaUrls[
          media.id
        ] = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plant-media/${media.media_url}`;
      });
    }

    return NextResponse.json({ mediaLogs, mediaUrls });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
