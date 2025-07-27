"use client";

import React from "react";
import { useCart } from "@/contexts/CartContext";

export default function CartButton() {
  const { cartLines, openCart } = useCart();
  const itemCount = cartLines.reduce((acc, line) => acc + line.quantity, 0);

  return (
    <button
      onClick={openCart}
      className={`
        fixed top-6 right-4 z-40
        bg-[var(--future-lime)] text-[var(--biochar-black)]
        px-5 py-2.5 rounded-xl shadow-lg cursor-pointer
        transition-all duration-500 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-[var(--psybeam-purple)] focus:ring-offset-2
        flex items-center space-x-2
        hover:bg-[var(--psybeam-purple)] hover:text-white
      `}
      aria-label="View cart"
    >
      <span className="font-medium text-[15px]">🧫 Peek Inside</span>
      <span
        className="
          bg-[var(--milk-bio)] text-[var(--biochar-black)]
          font-semibold text-xs 
          px-2 py-0.5 rounded-full 
          leading-none tracking-wide 
          shadow-inner
        "
      >
        {itemCount}
      </span>
    </button>
  );
}
