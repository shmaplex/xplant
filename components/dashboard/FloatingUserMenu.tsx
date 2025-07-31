"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { floatingUserMenuLinks } from "@/data/floatingUserMenuLinks";

export default function FloatingUserMenu() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserId(data.user.id);
      }
    });
  }, [supabase]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/");
  };

  if (!userId) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="w-12 h-12 rounded-full overflow-hidden border border-spore-grey shadow-lg bg-white hover:shadow-xl transition-all"
          aria-label="Open user menu"
        >
          <Image
            src={`https://api.dicebear.com/7.x/lorelei/png?seed=${userId}`}
            alt="User Avatar"
            width={48}
            height={48}
            className="object-cover"
          />
        </button>

        <div
          className={`absolute bottom-14 right-0 bg-white border border-gray-200 rounded-xl shadow-xl w-52 transition-all duration-300 overflow-hidden ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          <ul className="text-sm text-moss-shadow divide-y divide-spore-grey/30">
            {floatingUserMenuLinks.map((item, index) => (
              <li key={index}>
                {item.action === "logout" ? (
                  <button
                    onClick={async () => {
                      await handleLogout();
                      handleLinkClick();
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-red-100 text-red-600"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className="block px-4 py-3 hover:bg-spore-grey/30"
                    onClick={handleLinkClick} // <-- close menu on link click
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
