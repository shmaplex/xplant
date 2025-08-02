import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // const protectedPaths = ["/dashboard", "/admin"];

  // // Only protect specific paths
  // if (
  //   !protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  // ) {
  //   return response;
  // }

  const supabase = await createClient();

  // Get authenticated user instead of just session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Fetch profile details
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, is_banned")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if banned
  if (profile.is_banned) {
    return NextResponse.redirect(new URL("/banned", request.url));
  }

  const pathname = request.nextUrl.pathname;

  // Admin route strict check
  if (pathname.startsWith("/admin") && profile.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Dashboard route check
  if (pathname.startsWith("/dashboard")) {
    const allowed = ["admin", "manager", "editor", "user"];
    if (!allowed.includes(profile.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
