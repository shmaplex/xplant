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
      <label
        htmlFor="email"
        className="block text-sm font-medium text-moss-shadow"
      >
        Get the latest from XPlant
      </label>
      <div className="flex flex-col sm:flex-row items-start gap-2">
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md text-moss-shadow w-full outline-none focus:ring-2 focus:ring-future-lime bg-milk-bio border border-spore-grey"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-future-lime text-moss-shadow font-semibold px-4 py-2 rounded hover:brightness-110 cursor-pointer transition-colors ease-in-out duration-300"
        >
          Subscribe
        </button>
      </div>
      {submitted && (
        <p className="text-green-600 text-sm">Thanks for signing up!</p>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
