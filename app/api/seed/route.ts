// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { runPlantSeed } from "@/lib/seed";

export async function POST() {
  try {
    await runPlantSeed();
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Seed error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
