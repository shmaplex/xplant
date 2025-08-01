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
    // If plant wasn't found, return a 404
    if (!plant) {
      return NextResponse.json({ error: "Plant not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...plant,
        stages,
        mediaLogs,
      },
      { status: 200 }
    );
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
  try {
    const { id } = await context.params;
    const body = await req.json();
    const supabase = await createClient();

    const {
      species,
      source,
      initial_n_date,
      initial_i_date,
      notes,
      stage,
      room,
      entered_on,
      stage_notes,
    } = body;

    // Default entered_on to today if not provided or invalid
    const enteredDate =
      entered_on && !isNaN(Date.parse(entered_on))
        ? entered_on
        : new Date().toISOString().split("T")[0];

    // Update plant main fields first
    const { error: plantError } = await supabase
      .from("plants")
      .update({ species, source, initial_n_date, initial_i_date, notes })
      .eq("id", id);

    if (plantError) {
      return NextResponse.json({ error: plantError.message }, { status: 500 });
    }

    // Fetch current_stage_id for plant
    const { data: plantData, error: plantFetchError } = await supabase
      .from("plants")
      .select("current_stage_id")
      .eq("id", id)
      .single();

    if (plantFetchError) {
      return NextResponse.json(
        { error: plantFetchError.message || "Failed to fetch plant data" },
        { status: 500 }
      );
    }

    let currentStageId = plantData?.current_stage_id;

    if (!currentStageId) {
      // Try to find the most recent stage for the plant
      const { data: stages, error: stagesError } = await supabase
        .from("plant_stages")
        .select("id")
        .eq("plant_id", id)
        .order("entered_on", { ascending: false })
        .limit(1);

      if (stagesError) {
        return NextResponse.json(
          { error: stagesError.message || "Failed to fetch plant stages" },
          { status: 500 }
        );
      }

      if (stages && stages.length > 0) {
        currentStageId = stages[0].id;

        // Update plant to set current_stage_id
        const { error: plantUpdateError } = await supabase
          .from("plants")
          .update({ current_stage_id: currentStageId })
          .eq("id", id);

        if (plantUpdateError) {
          return NextResponse.json(
            { error: plantUpdateError.message },
            { status: 500 }
          );
        }
      } else {
        // No stages exist at all, create one
        const { data: newStage, error: stageInsertError } = await supabase
          .from("plant_stages")
          .insert([
            {
              plant_id: id,
              stage,
              room,
              entered_on: enteredDate,
              notes: stage_notes,
            },
          ])
          .select()
          .single();

        if (stageInsertError) {
          return NextResponse.json(
            { error: stageInsertError.message },
            { status: 500 }
          );
        }

        currentStageId = newStage.id;

        // Update plant to set current_stage_id
        const { error: plantUpdateError } = await supabase
          .from("plants")
          .update({ current_stage_id: currentStageId })
          .eq("id", id);

        if (plantUpdateError) {
          return NextResponse.json(
            { error: plantUpdateError.message },
            { status: 500 }
          );
        }
      }
    }

    // Now update the stage record
    const { error: stageUpdateError } = await supabase
      .from("plant_stages")
      .update({
        stage,
        room,
        entered_on: enteredDate,
        notes: stage_notes,
      })
      .eq("id", currentStageId);

    if (stageUpdateError) {
      return NextResponse.json(
        { error: stageUpdateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Plant updated" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
