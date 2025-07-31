// app/api/plants/media/route.ts (Next.js 13)
import { NextRequest, NextResponse } from "next/server";
import { insertPlantMediaRecord, getCurrentUser } from "@/api/plant";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { plantId, mediaUrl, originalName, fileType, type } = body;

    if (!plantId || !mediaUrl || !originalName || !fileType || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await insertPlantMediaRecord({
      plantId,
      mediaUrl,
      originalName,
      fileType,
      uploadedBy: user.id,
      type,
    });

    return NextResponse.json(
      { message: "Media record inserted" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error inserting media record:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
