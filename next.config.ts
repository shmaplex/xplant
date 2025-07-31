import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/7.x/**",
      },
    ],
    dangerouslyAllowSVG: true, // ⚠ Only use if you trust the image source
    contentSecurityPolicy: "default-src 'self'; img-src *; media-src *",
    domains: ["hszzfxhmyzsjoawlqsdo.supabase.co"],
  },
};

export default nextConfig;
