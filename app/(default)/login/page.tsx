"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const allowedMagicEmails = [
  "team@shmaplex.com",
  "rob@shmaplex.com",
  "daene@shmaplex.com",
];

export default function LoginPage() {
  const supabase = createClient();
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMessage(error.message);
    else {
      setMessage("Login successful! Redirecting...");
      window.location.href = "/admin";
    }

    setLoading(false);
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!allowedMagicEmails.includes(email)) {
      setMessage("This email is not allowed for magic link login.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email for a magic link!");

    setLoading(false);
  }

  return (
    <main className="flex-1 flex items-center justify-center px-6 py-12 relative">
      <div className="w-full max-w-2xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-[var(--spore-grey)]/40">
        {/* Left side with form */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6 md:items-start">
            <h1 className="mt-2 text-3xl font-bold">Welcome back</h1>
            <p className="text-moss-shadow/70 text-center md:text-left">
              Sign in to manage your plant culture workspace.
            </p>
          </div>

          {/* Mode switch */}
          <div className="flex justify-center md:justify-start mb-8">
            <div className="inline-flex bg-spore-grey/20 p-1 rounded-full">
              <button
                type="button"
                onClick={() => setMode("password")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === "password"
                    ? "bg-future-lime text-moss-shadow shadow-sm"
                    : "text-moss-shadow/70 hover:text-moss-shadow"
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => setMode("magic")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  mode === "magic"
                    ? "bg-future-lime text-moss-shadow shadow-sm"
                    : "text-moss-shadow/70 hover:text-moss-shadow"
                }`}
              >
                Magic Link
              </button>
            </div>
          </div>

          {message && (
            <div className="mb-4 text-center md:text-left text-red-600 font-semibold">
              {message}
            </div>
          )}

          {mode === "password" ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-spore-grey/50 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-future-lime"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-spore-grey/50 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-future-lime"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-future-lime text-moss-shadow font-semibold py-2 rounded hover:bg-moss-shadow hover:text-white transition-colors"
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-spore-grey/50 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-future-lime"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-future-lime text-moss-shadow font-semibold py-2 rounded hover:bg-moss-shadow hover:text-white transition-colors"
              >
                {loading ? "Loading..." : "Send Magic Link"}
              </button>
            </form>
          )}
          <div className="mt-6 text-center text-sm text-moss-shadow/70">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-future-lime hover:text-lime-500 transition-colors"
            >
              Sign up
            </a>
          </div>
        </div>

        {/* Right side with logo */}
        <div className="relative hidden md:flex md:w-1/3 bg-milk-bio items-center justify-center p-8">
          <Image
            src="/svg/x-logo.svg"
            alt="XPlant Logo"
            width={130}
            height={130}
            className="opacity-90 drop-shadow-lg"
            priority
          />
        </div>
      </div>
    </main>
  );
}
