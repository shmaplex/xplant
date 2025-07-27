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
      className="flex space-x-4 text-[#5C5138] font-semibold relative items-center"
      aria-label="Primary Navigation"
    >
      {/* Dropdown nav groups */}
      {navGroups.map(({ label, links }) => {
        const isOpen = openGroup === label;

        return (
          <div
            key={label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(label)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 rounded-full transition
                border
                ${
                  isOpen
                    ? "bg-[#F8F6F2] border-[#D6D1C4] text-[#403a2b]"
                    : "border-transparent hover:bg-[#F8F6F2] hover:border-[#D6D1C4] hover:text-[#403a2b]"
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

      {/* Standalone nav links */}
      {mainLinks.map(({ href, label }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-full transition flex items-center border
              ${
                isActive
                  ? "bg-[#F8F6F2] border-[#D6D1C4] text-[#403a2b]"
                  : "border-transparent hover:bg-[#F8F6F2] hover:border-[#D6D1C4] hover:text-[#403a2b]"
              }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
