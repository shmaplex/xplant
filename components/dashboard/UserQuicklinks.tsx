"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import {
  FaSignOutAlt,
  FaLeaf,
  FaFlask,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";

export default function UserQuicklinks() {
  const supabase = createClient();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [folded, setFolded] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <FaLeaf size={18} /> },
    {
      href: "/dashboard/plants/new",
      label: "Add New Plant",
      icon: <MdAddCircleOutline size={18} />,
    },
    {
      href: "/dashboard/transfers/new",
      label: "Record Transfer",
      icon: <FaCalendarAlt size={18} />,
    },
    {
      href: "/dashboard/media",
      label: "Media Recipes",
      icon: <FaFlask size={18} />,
    },
  ];

  return (
    <nav
      className={`fixed top-[64px] right-0 flex flex-col items-end gap-4 z-50`}
      aria-label="User Quicklinks"
    >
      {/* Fold/Expand Button */}
      <div
        className="relative flex items-center group"
        onMouseEnter={() => setHovered("Toggle")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="relative">
          {/* Pulsing glow behind when folded */}
          {folded && (
            <div
              className="
          absolute inset-0 rounded-full
          bg-psybeam-purple/40 blur-xl
          animate-pulse
        "
            />
          )}

          <button
            onClick={() => setFolded((prev) => !prev)}
            className={`
        relative flex items-center justify-center
        w-14 h-14 rounded-full
        bg-white/80 backdrop-blur shadow-md hover:shadow-lg
        hover:bg-white transition-all duration-500
        ${folded ? "translate-x-[60%] group-hover:translate-x-0" : ""}
      `}
            aria-label={folded ? "Expand" : "Collapse"}
          >
            {/* Main user icon */}
            <FaUserCircle size={28} className="text-gray-800" />

            {/* Small circular badge with rotating arrow */}
            <span
              className={`
          absolute -top-1 -right-1 flex items-center justify-center
          w-5 h-5 rounded-full
          bg-psybeam-purple text-white shadow
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
        {links.map(({ href, label, icon }) => (
          <div
            key={href}
            className="relative flex items-center group"
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
          >
            <Link
              href={href}
              className="
                w-10 h-10 flex items-center justify-center 
                rounded-full 
                bg-white/60 backdrop-blur 
                shadow-md hover:shadow-lg 
                text-[#333] transition 
                hover:bg-white
              "
              aria-label={label}
            >
              {icon}
            </Link>

            {/* Tooltip */}
            <div
              className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg
                transition-all duration-300 ease-out
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
        ))}

        {/* Logout */}
        <div
          className="relative flex items-center group"
          onMouseEnter={() => setHovered("Logout")}
          onMouseLeave={() => setHovered(null)}
        >
          <button
            onClick={handleLogout}
            className="
              w-10 h-10 flex items-center justify-center 
              rounded-full 
              bg-white/60 backdrop-blur 
              shadow-md hover:shadow-lg 
              text-gray-700 transition 
              hover:bg-white hover:text-red-600
            "
            aria-label="Logout"
          >
            <FaSignOutAlt />
          </button>
          <div
            className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg
              transition-all duration-300 ease-out
              ${
                hovered === "Logout"
                  ? "opacity-100 visible translate-x-0"
                  : "opacity-0 invisible translate-x-2"
              }
            `}
          >
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
}
