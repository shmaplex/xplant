import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode; // optional icon
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
      <ul className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:underline flex items-center space-x-1"
              >
                {item.icon && <span className="inline-flex">{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="text-gray-800 font-semibold border-b border-black/20 hover:border-black transition duration-500 ease-in-out flex items-center space-x-1">
                {item.icon && <span className="inline-flex">{item.icon}</span>}
                <span>{item.label}</span>
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
