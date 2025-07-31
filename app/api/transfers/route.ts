import { NextResponse } from "next/server";
import {
  fetchTransfers,
  insertTransfer,
  updateTransfer,
  deleteTransfer,
} from "@/api/transfer";
import type { PlantTransfer } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const plantId = searchParams.get("plantId") ?? undefined;

  const { data, error } = await fetchTransfers(plantId);

  if (error) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: Request) {
  const supabase = await import("@/lib/supabase/server").then((mod) =>
    mod.createClient()
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Partial<PlantTransfer>;

  if (!body.plant_id || !body.transfer_date || !body.transfer_cycle) {
    return NextResponse.json(
      {
        error:
          "Missing required fields: plant_id, transfer_date, transfer_cycle",
      },
      { status: 400 }
    );
  }

  const { error } = await insertTransfer(body, session.user.id);

  if (error) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

export async function PUT(req: Request) {
  const supabase = await import("@/lib/supabase/server").then((mod) =>
    mod.createClient()
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as Partial<PlantTransfer>;

  if (!body.id) {
    return NextResponse.json(
      { error: "Missing transfer ID for update" },
      { status: 400 }
    );
  }

  const { error } = await updateTransfer(body.id, body);

  if (error) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(req: Request) {
  const supabase = await import("@/lib/supabase/server").then((mod) =>
    mod.createClient()
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing transfer ID for delete" },
      { status: 400 }
    );
  }

  const { error } = await deleteTransfer(id);

  if (error) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
