"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { FaSignOutAlt, FaLeaf, FaFlask, FaCalendarAlt } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";

export default function UserQuicklinks() {
  const supabase = createClient();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const links = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <FaLeaf size={18} />,
    },
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
      className="fixed top-[64px] right-4 flex flex-col gap-4 z-50"
      aria-label="User Quicklinks"
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
    </nav>
  );
}
