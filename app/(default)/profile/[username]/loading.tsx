// app/profile/[username]/loading.tsx
"use client";

import { motion } from "framer-motion";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-milk-bio">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-psybeam-purple border-t-transparent rounded-full"
      />
      <p className="mt-6 text-lg font-semibold text-moss-shadow">
        Growing your profile garden...
      </p>
    </div>
  );
}
