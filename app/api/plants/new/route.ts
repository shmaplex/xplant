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
      entered_on = new Date().toISOString().split("T")[0], // date only
      stage_notes = "",
    } = body;

    if (!userId || !species) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert plant (make sure insertPlant returns full inserted row with id)
    const plant = await insertPlant({
      userId,
      species,
      source,
      initial_n_date,
      initial_i_date,
      notes,
    });

    if (!plant || !plant.id) {
      return NextResponse.json(
        { error: "Failed to create plant" },
        { status: 500 }
      );
    }

    // Insert initial stage and get the inserted stage row
    const { data: stageData, error: stageError } = await supabase
      .from("plant_stages")
      .insert([
        {
          plant_id: plant.id,
          stage,
          room,
          entered_on,
          notes: stage_notes,
        },
      ])
      .select()
      .single();

    if (stageError || !stageData) {
      return NextResponse.json(
        { error: stageError?.message || "Failed to create stage" },
        { status: 500 }
      );
    }

    // Update plant with current_stage_id
    const { error: updatePlantError } = await supabase
      .from("plants")
      .update({ current_stage_id: stageData.id })
      .eq("id", plant.id);

    if (updatePlantError) {
      return NextResponse.json(
        { error: updatePlantError.message },
        { status: 500 }
      );
    }

    // Return the plant data, optionally you could merge the stage info if needed
    return NextResponse.json(
      { ...plant, current_stage_id: stageData.id },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
