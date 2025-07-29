import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const protectedPaths = ["/dashboard", "/admin"];

  // Only protect specific paths
  if (
    !protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return response;
  }

  const supabase = await createClient();

  // Get current session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Fetch profile details
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, is_banned")
    .eq("id", session.user.id)
    .single();

  if (profileError || !profile) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if banned
  if (profile.is_banned) {
    return NextResponse.redirect(new URL("/banned", request.url));
  }

  // Role-based permissions
  const rolePermissions: Record<string, string[]> = {
    "/admin": ["admin"],
    "/dashboard": ["admin", "manager", "editor", "user"],
  };

  const currentPath = protectedPaths.find((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (currentPath && !rolePermissions[currentPath].includes(profile.role)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
