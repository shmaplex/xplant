import { NextResponse } from "next/server";
import { insertPlant } from "@/lib/api/plant";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const body = await req.json();

    const {
      userId,
      species,
      source,
      initial_n_date,
      initial_i_date,
      notes,
      stage = "Mother Block",
      room = null,
      entered_on = new Date().toISOString(),
      stage_notes = "",
    } = body;

    if (!userId || !species) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert plant
    const plant = await insertPlant({
      userId,
      species,
      source,
      initial_n_date,
      initial_i_date,
      notes,
    });

    // Insert initial stage with user data
    const { error: stageError } = await supabase.from("plant_stages").insert([
      {
        plant_id: plant.id,
        stage,
        room,
        entered_on,
        notes: stage_notes,
      },
    ]);

    if (stageError) {
      return NextResponse.json({ error: stageError.message }, { status: 500 });
    }

    return NextResponse.json(plant, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
