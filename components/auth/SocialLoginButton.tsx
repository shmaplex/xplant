"use client";

import { createClient } from "@/lib/supabase/client";
import { FcGoogle } from "react-icons/fc";
import { ReactNode } from "react";

interface SocialLoginButtonProps {
  provider: "google"; // extend this union for more providers
  label?: string;
  redirectPath?: string;
}

const icons: Record<string, ReactNode> = {
  google: <FcGoogle className="w-5 h-5" />,
  // Add others later (Apple, GitHub, etc.)
};

export default function SocialLoginButton({
  provider,
  label,
  redirectPath = "/auth/callback",
}: SocialLoginButtonProps) {
  const supabase = createClient();

  const handleSocialLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}${redirectPath}`,
      },
    });

    if (error) {
      console.error(`${provider} sign-in error:`, error);
      alert(`Error signing in with ${provider}: ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleSocialLogin}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white py-2 rounded hover:bg-gray-100 transition-colors shadow-sm"
    >
      {icons[provider]}
      <span className="font-medium text-gray-700">
        {label ||
          `Sign in with ${
            provider.charAt(0).toUpperCase() + provider.slice(1)
          }`}
      </span>
    </button>
  );
}
