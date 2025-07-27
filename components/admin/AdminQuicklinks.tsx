"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { FiGrid } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";

export default function AdminQuicklinks() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  const links = [
    { href: "/admin", label: "Dashboard", icon: <FiGrid size={18} /> },
    {
      href: "/admin/worm-checkins",
      label: "Worm Check-ins",
      icon: (
        <Image
          src="/svg/worm.svg"
          alt="Worm"
          width={20}
          height={20}
          className="opacity-80"
        />
      ),
    },
  ];

  return (
    <nav
      className="fixed top-[64px] right-4 flex flex-col gap-4 z-50"
      aria-label="Admin Quicklinks"
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
