import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getUserProfile } from "@/api/user";

export async function GET(request: NextRequest) {
  const countryCode = request.headers.get("x-vercel-ip-country") || "KR";

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await getUserProfile(user.id);
    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
