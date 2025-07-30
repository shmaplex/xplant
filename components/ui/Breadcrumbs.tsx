import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
      <ul className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 font-semibold border-b border-black/20 hover:border-black transition duration-500 ease-in-out">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && (
              <span className="text-gray-400">
                <FiArrowRight className="mt-[1px] transition-transform group-hover:translate-x-1 inline-block -translate-y-[2px]" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
