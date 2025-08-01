"use client";

import { motion } from "framer-motion";
import { ComponentType } from "react";
import { GiPlantSeed } from "react-icons/gi";

interface LoaderProps {
  message?: string;
  Icon?: ComponentType<{ className?: string }>;
  iconColor?: string; // Tailwind classes for icon color
  mainBgColor?: string; // Tailwind classes for main background color
  bgColor?: string; // Tailwind classes for background color of the spinning circle
  textColor?: string; // Tailwind classes for text color
}

export default function Loader({
  message,
  Icon = GiPlantSeed,
  iconColor = "text-psybeam-purple",
  mainBgColor = "bg-milk-bio/10",
  bgColor = "bg-psybeam-purple/40",
  textColor = "text-moss-shadow",
}: LoaderProps) {
  const text = message || "Sterilizing your workspace…";

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${mainBgColor}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`w-20 h-20 flex items-center justify-center rounded-full ${bgColor}`}
      >
        <Icon className={`w-10 h-10 ${iconColor}`} />
      </motion.div>
      <p className={`mt-6 text-lg font-semibold ${textColor}`}>{text}</p>
    </div>
  );
}
