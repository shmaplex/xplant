"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { FiGrid, FiUsers, FiBox, FiBook, FiSettings } from "react-icons/fi";
// import { FaSignOutAlt } from "react-icons/fa";

export default function AdminQuicklinks() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  // const handleLogout = async () => {
  //   await supabase.auth.signOut();
  //   router.refresh();
  //   router.push("/");
  // };

  const links = [
    {
      href: "/admin",
      label: "Admin Dashboard",
      icon: <FiGrid size={18} />,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <FiUsers size={18} />,
    },
    {
      href: "/admin/plants",
      label: "Plants",
      icon: <FiBox size={18} />,
    },
    {
      href: "/admin/media",
      label: "Recipes",
      icon: <FiBook size={18} />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <FiSettings size={18} />,
    },
  ];

  return (
    <nav
      className="fixed top-[64px] right-18 flex flex-col gap-4 z-50"
      aria-label="Admin Quicklinks"
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
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg text-white transition hover:bg-black/80
                ${
                  isActive
                    ? "bg-black backdrop-blur border border-[var(--moss-shadow)]"
                    : "bg-black/40 backdrop-blur"
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

      {/* <div
        className="relative flex items-center group"
        onMouseEnter={() => setHovered("Logout")}
        onMouseLeave={() => setHovered(null)}
      >
        <button
          onClick={handleLogout}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 backdrop-blur shadow-md hover:shadow-lg text-gray-700 transition hover:bg-white hover:text-red-600"
          aria-label="Logout"
        >
          <FaSignOutAlt />
        </button>
        <div
          className={`absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-black/80 px-3 py-1 text-xs font-medium text-white shadow-lg transition-all duration-300 ease-out
            ${
              hovered === "Logout"
                ? "opacity-100 visible translate-x-0"
                : "opacity-0 invisible translate-x-2"
            }
          `}
        >
          Logout
        </div>
      </div> */}
    </nav>
  );
}
