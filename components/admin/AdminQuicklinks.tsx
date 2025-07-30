"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiGrid, FiUsers, FiBox, FiBook, FiSettings } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { useAutoCollapse } from "@/hooks/useAutoCollapse";
import QuicklinkToggle from "@/components/ui/QuicklinkToggle";
import QuicklinkButton from "@/components/ui/QuicklinkButton";

export default function AdminQuicklinks() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const { folded, setFolded, handleInteraction } = useAutoCollapse(3000);

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
      onMouseMove={handleInteraction}
      onMouseEnter={handleInteraction}
    >
      <QuicklinkToggle
        folded={folded}
        setFolded={setFolded}
        hovered={hovered}
        setHovered={setHovered}
        handleInteraction={handleInteraction}
        icon={<FaUserShield size={28} className="text-white" />}
        mainBg="bg-black/70 hover:bg-black"
        pulseBg="bg-blue-500/40"
        badgeBg="bg-blue-500"
      />

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
          <QuicklinkButton
            key={href}
            href={href}
            label={label}
            icon={icon}
            isActive={pathname?.startsWith(href) ?? false}
            hovered={hovered}
            setHovered={setHovered}
            handleInteraction={handleInteraction}
            buttonClassName={`
              w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:shadow-lg text-white transition
              ${
                pathname?.startsWith(href)
                  ? "bg-blue-600 backdrop-blur border border-white/30"
                  : "bg-black/50 backdrop-blur hover:bg-black/70"
              }
            `}
          />
        ))}
      </div>
    </nav>
  );
}
