import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import { mainLinks, navGroups } from "@/data/navigation";

interface Props {
  open: boolean;
  onClose: (e: React.MouseEvent) => void;
}

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <nav
      id="mobile-menu"
      className={`fixed top-0 right-0 h-full w-64 bg-[#F7F2EC] shadow-lg transform transition-transform duration-300 ease-in-out z-[9999] ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-label="Mobile Navigation"
    >
      <div className="flex flex-col h-full p-6 space-y-6">
        <button
          className="self-end text-2xl text-[#42594D]"
          aria-label="Close menu"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <ul className="flex flex-col space-y-4 font-semibold text-[#1A1A1A]">
          {/* Grouped links */}
          {navGroups.length > 0 &&
            navGroups.map(({ label, links }) => (
              <li key={label}>
                <span className="block px-2 py-1 text-[#42594D] font-bold uppercase tracking-wide">
                  {label}
                </span>
                <ul className="pl-4 mt-2 space-y-2 font-normal">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block px-2 py-2 rounded hover:bg-[#DAD7D2] transition"
                        onClick={onClose}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

          {/* Standalone links */}
          {mainLinks.length > 0 &&
            mainLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block px-2 py-2 rounded hover:bg-[#DAD7D2] transition"
                  onClick={onClose}
                >
                  {label}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
