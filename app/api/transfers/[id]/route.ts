import { NextResponse } from "next/server";
import {
  fetchTransferById,
  updateTransfer,
  deleteTransfer,
} from "@/lib/api/transfer";
import type { PlantTransfer } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: any // <-- use `any` or omit type
) {
  const id = params.id;

  try {
    const transfer = await fetchTransferById(id);

    if (!transfer) {
      return NextResponse.json(
        { error: "Transfer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: transfer }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error fetching transfer" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: any) {
  const supabase = await import("@/lib/supabase/server").then((mod) =>
    mod.createClient()
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const body = (await request.json()) as Partial<PlantTransfer>;

  const { error } = await updateTransfer(id, body);

  if (error) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function DELETE(request: Request, { params }: any) {
  const supabase = await import("@/lib/supabase/server").then((mod) =>
    mod.createClient()
  );
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;

  const { error } = await deleteTransfer(id);

  if (error) {
    return NextResponse.json(
      { error: error.message || error },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
