"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const allowedMagicEmails = [
  "dirtmandiaries@gmail.com",
  "team@shmaplex.com",
  "rob@shmaplex.com",
  "daene@shmaplex.com",
];

export default function LoginPage() {
  const supabase = createClientComponentClient();
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
    <div className="font-sans bg-[#F8F4EC] text-[#2F2F2F] min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="w-full max-w-2xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left side with form */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <div className="flex flex-col items-center mb-6 md:items-start">
              <h1 className="mt-2 text-3xl font-bold">Welcome back!</h1>
              <p className="text-gray-600 text-center md:text-left">
                Sign in to manage your worm farm schedule.
              </p>
            </div>

            {/* Mode switch */}
            <div className="flex justify-center md:justify-start mb-6">
              <button
                onClick={() => setMode("password")}
                className={`px-4 py-2 rounded-l-lg ${
                  mode === "password"
                    ? "bg-[#5C5138] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Password
              </button>
              <button
                onClick={() => setMode("magic")}
                className={`px-4 py-2 rounded-r-lg ${
                  mode === "magic"
                    ? "bg-[#5C5138] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Magic Link
              </button>
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
                  className="border p-2 w-full rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 w-full rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#5C5138] text-white py-2 rounded hover:bg-[#403a2b] transition-colors"
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleMagicLink} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="border p-2 w-full rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#5C5138] text-white py-2 rounded hover:bg-[#403a2b] transition-colors"
                >
                  {loading ? "Loading..." : "Send Magic Link"}
                </button>
              </form>
            )}
          </div>

          {/* Right side with worm */}
          <div className="relative hidden md:flex md:w-1/4 bg-[#F8F4EC] items-center justify-center p-8">
            <Image
              src="/svg/worm.svg"
              alt="Friendly worm"
              width={130}
              height={130}
              className="opacity-90 drop-shadow-lg animate-float"
              priority
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
