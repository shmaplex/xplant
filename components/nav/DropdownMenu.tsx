import Link from "next/link";

interface Props {
  label: string;
  links: { href: string; label: string }[];
}

export default function DropdownMenu({ label, links }: Props) {
  return (
    <ul
      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-md border border-gray-200 text-[#2F2F2F] font-normal z-50 overflow-hidden"
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
              className={`block px-4 py-2 hover:bg-[#ECE7DB] focus:bg-[#ECE7DB] transition
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
