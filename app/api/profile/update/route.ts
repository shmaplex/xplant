import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, updateAuthUser, updateUserProfile } from "@/api/user";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let updates: any;
  try {
    updates = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    await updateAuthUser(updates);

    const updatedProfile = await updateUserProfile(user.id, updates);

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
