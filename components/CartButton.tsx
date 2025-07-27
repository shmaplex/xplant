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
        bg-[#4B3F2A] text-[#F9F5EE]
        px-5 py-2.5 rounded-lg shadow-xl cursor-pointer
        transition-all duration-500 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-[#BFAF98] focus:ring-offset-2
        flex items-center space-x-2
        hover:bg-[#665842] hover:text-white
      `}
      aria-label="View cart"
    >
      <span className="font-medium text-[15px]">&#129530; Peek Inside</span>
      <span
        className="
          bg-[#F9F5EE] text-[#4B3F2A] 
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
