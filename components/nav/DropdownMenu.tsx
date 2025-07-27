import Link from "next/link";

interface Props {
  label: string;
  links: { href: string; label: string }[];
}

export default function DropdownMenu({ label, links }: Props) {
  return (
    <ul
      className="absolute top-full left-0 mt-2 w-56 bg-[#F7F2EC] rounded-xl shadow-lg border border-[#DAD7D2] text-[#1A1A1A] font-normal z-50 overflow-hidden"
      role="menu"
      aria-label={`${label} submenu`}
    >
      {links.map(({ href, label }, index) => {
        const isFirst = index === 0;
        const isLast = index === links.length - 1;

        return (
          <li key={href}>
            <Link
              href={href}
              className={`block px-4 py-2 hover:bg-[#E9E5DE] focus:bg-[#E9E5DE] transition
                ${isFirst ? "rounded-t-xl" : ""}
                ${isLast ? "rounded-b-xl" : ""}
              `}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
