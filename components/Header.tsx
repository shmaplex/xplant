"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import HeaderLogo from "@/components/HeaderLogo";
import DesktopNav from "@/components/nav/DesktopNav";
import MobileMenu from "@/components/nav/MobileMenu";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AdminQuicklinks from "@/components/admin/AdminQuicklinks";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
    });
  }, [supabase]);

  const closeNav = () => setNavOpen(false);
  const isShopPage = pathname?.startsWith("/shop");

  return (
    <>
      <header className="w-full shadow-md relative flex flex-col">
        {/* Main header row */}
        <div className="w-full py-4 px-6 sm:px-10 bg-milk-bio flex items-center justify-between border-b border-spore-grey">
          <HeaderLogo />

          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className={`sm:hidden text-2xl text-moss-shadow ${
                isShopPage && !navOpen ? "mr-48" : "mr-0"
              }`}
              aria-label={navOpen ? "Close menu" : "Open menu"}
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <div
            className={`hidden sm:block transition-all duration-300 ${
              isShopPage ? "mr-48" : "mr-0"
            }`}
          >
            <DesktopNav />
          </div>
        </div>

        {/* Show admin links when logged in */}
        {isLoggedIn && <AdminQuicklinks />}
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-50 transition-opacity duration-300 ease-in-out ${
          navOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeNav}
        aria-hidden={!navOpen}
      />

      <MobileMenu open={navOpen} onClose={closeNav} />
    </>
  );
}
