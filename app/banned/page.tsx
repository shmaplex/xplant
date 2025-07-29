"use client";

import Link from "next/link";
import { Frown } from "lucide-react";

export default function BannedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-6">
      <Frown className="w-20 h-20 text-red-600 mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold text-red-700 mb-4">Access Denied!</h1>
      <p className="text-gray-700 max-w-md mb-8">
        Oops! Your account has been banned. If you think this is a mistake,
        please contact our support team.
      </p>
      <Link
        href="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
