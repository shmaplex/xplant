"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import {
  FiGrid,
  FiUsers,
  FiBox,
  FiBook,
  FiSettings,
  FiChevronLeft,
} from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";

export default function AdminQuicklinks() {
  const supabase = createClient();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [folded, setFolded] = useState(false);

  const links = [
    { href: "/admin", label: "Admin Dashboard", icon: <FiGrid size={18} /> },
    { href: "/admin/users", label: "Users", icon: <FiUsers size={18} /> },
    { href: "/admin/plants", label: "Plants", icon: <FiBox size={18} /> },
    { href: "/admin/media", label: "Recipes", icon: <FiBook size={18} /> },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <FiSettings size={18} />,
    },
  ];

  return (
    <nav
      className="fixed bottom-32 right-0 flex flex-col items-end gap-4 z-50"
      aria-label="Admin Quicklinks"
    >
      {/* Fold/Expand Button */}
      <div
        className="relative flex items-center group"
        onMouseEnter={() => setHovered("Toggle")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="relative">
          {/* Pulsing glow when folded */}
          {folded && (
            <div
              className="
                absolute inset-0 rounded-full
                bg-blue-500/40 blur-xl
                animate-pulse
              "
            />
          )}

          <button
            onClick={() => setFolded((prev) => !prev)}
            className={`
              relative flex items-center justify-center
              w-14 h-14 rounded-full
              bg-black/70 backdrop-blur shadow-md hover:shadow-lg
              hover:bg-black transition-all duration-500
              ${folded ? "translate-x-[60%] group-hover:translate-x-0" : ""}
            `}
            aria-label={folded ? "Expand" : "Collapse"}
          >
            {/* Main admin icon */}
            <FaUserShield size={28} className="text-white" />

            {/* Small circular badge with rotating arrow */}
            <span
              className={`
                absolute -top-1 -right-1 flex items-center justify-center
                w-5 h-5 rounded-full
                bg-blue-500 text-white shadow
                transition-transform duration-500
                ${folded ? "rotate-90" : "-rotate-90"}
              `}
            >
              <FiChevronLeft size={14} />
            </span>
          </button>
        </div>

        {/* Tooltip */}
        <div
          className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg
            transition-all duration-300 ease-out
            ${
              hovered === "Toggle"
                ? "opacity-100 visible translate-x-0"
                : "opacity-0 invisible translate-x-2"
            }
          `}
        >
          {folded ? "Expand" : "Collapse"}
        </div>
      </div>

      {/* Links */}
      <div
        className={`
          flex flex-col items-end gap-4 transition-all duration-500 ease-in-out
          ${
            folded
              ? "opacity-0 translate-y-[-20px] pointer-events-none pr-2"
              : "opacity-100 translate-y-0 pr-2"
          }
        `}
      >
        {links.map(({ href, label, icon }) => {
          const isActive = pathname?.startsWith(href);

          return (
            <div
              key={href}
              className="relative flex items-center group"
              onMouseEnter={() => setHovered(label)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                href={href}
                className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg text-white transition
                  ${
                    isActive
                      ? "bg-blue-600 backdrop-blur border border-white/30"
                      : "bg-black/50 backdrop-blur hover:bg-black/70"
                  }
                `}
                aria-label={label}
              >
                {icon}
              </Link>

              <div
                className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 ease-out
                  ${
                    hovered === label
                      ? "opacity-100 visible translate-x-0"
                      : "opacity-0 invisible translate-x-2"
                  }
                `}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
