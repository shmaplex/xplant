"use client";

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
import { MdAddCircleOutline } from "react-icons/md";
import { useAutoCollapse } from "@/hooks/useAutoCollapse";
import QuicklinkToggle from "@/components/ui/QuicklinkToggle";
import QuicklinkButton from "@/components/ui/QuicklinkButton";

export default function UserQuicklinks() {
  const supabase = createClient();
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const { folded, setFolded, handleInteraction } = useAutoCollapse(3000);

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
      className="fixed top-[64px] right-0 flex flex-col items-end gap-4 z-50"
      aria-label="User Quicklinks"
      onMouseMove={handleInteraction}
      onMouseEnter={handleInteraction}
    >
      <QuicklinkToggle
        folded={folded}
        setFolded={setFolded}
        hovered={hovered}
        setHovered={setHovered}
        handleInteraction={handleInteraction}
        icon={<FaUserCircle size={28} className="text-gray-800" />}
        mainBg="bg-white/80 hover:bg-white"
        pulseBg="bg-psybeam-purple/40"
        badgeBg="bg-psybeam-purple"
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
            hovered={hovered}
            setHovered={setHovered}
            handleInteraction={handleInteraction}
            activeClassName="bg-white backdrop-blur"
            inactiveClassName="bg-white/20 backdrop-blur hover:bg-white"
            textColor="text-[#333]"
            tooltipBg="bg-black/80"
          />
        ))}

        <QuicklinkButton
          label="Logout"
          icon={<FaSignOutAlt />}
          hovered={hovered}
          setHovered={setHovered}
          handleInteraction={handleInteraction}
          onClick={handleLogout}
          activeClassName="bg-white backdrop-blur"
          inactiveClassName="bg-white/60 backdrop-blur hover:bg-white"
          textColor="text-gray-700 hover:text-red-600"
          tooltipBg="bg-black/80"
        />
      </div>
    </nav>
  );
}
