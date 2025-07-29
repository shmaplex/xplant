"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setMessage(error.message);
    else setMessage("Account created! Check your email to verify.");

    setLoading(false);

    if (!error) {
      router.push("/login");
    }
  }

  return (
    <div className="font-sans bg-milk-bio text-moss-shadow min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden border border-spore-grey/40">
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2 text-center md:text-left">
              Create Your Account
            </h1>
            <p className="text-sm text-moss-shadow/70 mb-6 text-center md:text-left">
              Sign up to begin logging your plant cultures.
            </p>

            {message && (
              <div className="mb-4 text-center text-red-600 font-semibold">
                {message}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="border border-spore-grey/50 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-future-lime"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border border-spore-grey/50 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-future-lime"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-future-lime text-moss-shadow font-semibold py-2 rounded hover:bg-moss-shadow hover:text-white transition-colors"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>
          </div>

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

      <Footer />
    </div>
  );
}
