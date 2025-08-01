import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { fetchFullPlantData } from "@/lib/api/plant";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { plant, stages, mediaLogs } = await fetchFullPlantData(id, user.id);

    if (!plant) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...plant,
      stages,
      mediaLogs,
    });
  } catch (error: any) {
    console.error("Error fetching plant:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch plant" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // Await here
  const body = await req.json();
  const supabase = await createClient();

  const { error } = await supabase.from("plants").update(body).eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Plant updated" });
}
