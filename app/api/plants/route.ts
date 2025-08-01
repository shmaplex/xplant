import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("plants")
    .select("species, source, initial_n_date, initial_i_date, notes")
    .eq("id", params.id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();
  const body = await req.json();

  const { error } = await supabase
    .from("plants")
    .update(body)
    .eq("id", params.id);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ message: "Plant updated" });
}
