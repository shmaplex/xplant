import { NextResponse } from "next/server";

// A small map for IP-based geolocation fallback if needed.
async function getCountryFromIP(ip: string): Promise<string | null> {
  // You can integrate a geolocation API here if you want.
  // For now, just return null as a fallback.
  return null;
}

export async function GET(req: Request) {
  const headers = Object.fromEntries(req.headers.entries());

  let country: string | null = headers["x-vercel-ip-country"] || null;

  if (!country) {
    country = headers["cf-ipcountry"] || null;
  }

  if (!country) {
    const forwardedFor = headers["x-forwarded-for"];
    const ip = forwardedFor?.split(",")[0]?.trim();
    // Optional: do IP lookup here
    country = null;
  }

  // Always ensure a string when returning
  return NextResponse.json({
    country: country ?? "KR",
  });
}
