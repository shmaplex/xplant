"use client";

import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
  FaSignOutAlt,
  FaLeaf,
  FaFlask,
  FaCalendarAlt,
  FaUserCircle,
  FaMicroscope,
} from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { useAutoCollapse } from "@/hooks/useAutoCollapse";
import QuicklinkToggle from "@/components/ui/QuicklinkToggle";
import QuicklinkButton from "@/components/ui/QuicklinkButton";

export default function UserQuicklinks() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const { folded, setFolded, handleInteraction } = useAutoCollapse(3000);

  // Track user state here
  const [user, setUser] = useState<any>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // clear user on logout
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
      href: "/dashboard/media/new",
      label: "Add New Media Recipe",
      icon: <FaFlask size={18} />,
    },
    {
      href: "/dashboard/stages",
      label: "Stage & Room Tracking",
      icon: <FaMicroscope size={18} />,
    },
  ];

  useEffect(() => {
    // Check session on mount
    async function getUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      setUser(currentUser);
    }
    getUser();

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (!session) {
          router.push("/");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Only show if logged in
  if (!user) return null;

  return (
    <nav
      className="fixed top-[64px] right-0 flex flex-col items-end gap-4 z-50 print:hidden"
      aria-label="User Quicklinks"
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
        onMouseMove={handleInteraction}
        onMouseEnter={handleInteraction}
        className={`
          transition-all duration-500 ease-in-out pr-2
          ${
            folded
              ? "opacity-0 max-h-0 pointer-events-none"
              : "opacity-100 max-h-[600px]"
          }
        `}
        style={{
          overflow: folded ? "hidden" : "visible",
        }}
      >
        <div className="flex flex-col items-end gap-4">
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
              activeClassName="bg-future-lime/70 backdrop-blur border-future-lime border"
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
            activeClassName="bg-future-lime/20 backdrop-blur border-future-lime border"
            inactiveClassName="bg-white/60 backdrop-blur hover:bg-white"
            textColor="text-gray-700 hover:text-red-600"
            tooltipBg="bg-black/80"
          />
        </div>
      </div>
    </nav>
  );
}
