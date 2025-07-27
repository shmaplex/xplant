"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { mainLinks, navGroups } from "@/data/navigation";
import DropdownMenu from "./DropdownMenu";

export default function DesktopNav() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenGroup(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenGroup(null), 150);
  };

  return (
    <nav
      className="flex space-x-4 text-[#1A1A1A] font-semibold relative items-center"
      aria-label="Primary Navigation"
    >
      {/* Render dropdown nav groups first */}
      {navGroups.length > 0 &&
        navGroups.map(({ label, links }) => {
          const isOpen = openGroup === label;

          return (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-full transition border
                  ${
                    isOpen
                      ? "bg-[#F7F2EC] border-[#DAD7D2] text-[#42594D]"
                      : "border-transparent hover:bg-[#F7F2EC] hover:border-[#DAD7D2] hover:text-[#42594D]"
                  }`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                type="button"
              >
                {label}
                <FaChevronDown className="text-sm" />
              </button>

              {isOpen && <DropdownMenu label={label} links={links} />}
            </div>
          );
        })}

      {/* Then render standalone links */}
      {mainLinks.length > 0 &&
        mainLinks.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-full transition flex items-center border
                ${
                  isActive
                    ? "bg-[#F7F2EC] border-[#DAD7D2] text-[#42594D]"
                    : "border-transparent hover:bg-[#F7F2EC] hover:border-[#DAD7D2] hover:text-[#42594D]"
                }`}
            >
              {label}
            </Link>
          );
        })}
    </nav>
  );
}
