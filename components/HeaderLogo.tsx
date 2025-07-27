"use client";

import Link from "next/link";
import { useState } from "react";

export default function HeaderLogo() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/"
      aria-label="Home"
      className="flex items-center gap-4 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={
          hovered
            ? "/svg/shmaplexplant-logo.svg"
            : "/svg/shmaplexplant-logo.svg"
        }
        alt="Shmaplex Plant Logo"
        width={132} // 1057 / 8
        height={72} // 580 / 8
      />
    </Link>
  );
}
