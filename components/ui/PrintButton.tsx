"use client";

import Link from "next/link";
import { FaPrint } from "react-icons/fa6";
import clsx from "clsx";

type PrintButtonProps = {
  printUrl: string;
  label?: string;
  className?: string;
};

export function PrintButton({
  printUrl,
  label = "Print Label",
  className,
}: PrintButtonProps) {
  return (
    <Link
      href={printUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center gap-2 text-xs border border-biochar-black text-biochar-black px-3 py-1.5 rounded-md transition-colors duration-300 ease-in-out hover:bg-future-lime/10 hover:border-future-lime hover:text-moss-shadow",
        className
      )}
    >
      <FaPrint className="w-3 h-3" />
      {label}
    </Link>
  );
}
