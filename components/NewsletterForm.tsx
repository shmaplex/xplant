"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter a valid email");
      return;
    }

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setSubmitted(true);
      setEmail("");
    } else {
      setError("Failed to subscribe, please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label htmlFor="email" className="block text-sm font-medium text-black">
        Sign up for Dirtman Diaries
      </label>
      <div className="flex flex-col sm:flex-row items-start gap-2">
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md text-black w-5/8 outline-[#2F2F2F] outline-1 focus:ring-2 focus:ring-[#2F2F2F] bg-white"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-[#E2D9C4] text-black font-semibold px-4 py-2 rounded hover:bg-[#2F2F2F] hover:text-white cursor-pointer transition-colors ease-in-out duration-300"
        >
          Subscribe
        </button>
      </div>
      {submitted && (
        <p className="text-green-400 text-sm">Thanks for signing up!</p>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
}
