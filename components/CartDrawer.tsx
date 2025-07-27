"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import type { CartLine } from "@/contexts/CartContext";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartLines: CartLine[];
  onCheckout: (
    lines: { variantId: string; quantity: number }[]
  ) => Promise<void>;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveLine: (variantId: string) => void;
};

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const [loading, setLoading] = useState(false);
  const { cartLines, setCartLines, isOpen, closeCart } = useCart();

  function updateQuantity(variantId: string, quantity: number) {
    setCartLines((lines) =>
      lines.map((line) =>
        line.variantId === variantId ? { ...line, quantity } : line
      )
    );
  }

  function removeLine(variantId: string) {
    setCartLines((lines) =>
      lines.filter((line) => line.variantId !== variantId)
    );
  }

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: cartLines.map(({ variantId, quantity }) => ({
            merchandiseId: variantId,
            quantity,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.checkoutUrl && data.cartId) {
        localStorage.setItem("shopify_cart_id", data.cartId);
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to create checkout. Please try again later.");
        console.error(data.error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out
    ${
      isOpen
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
    bg-white/10 backdrop-blur-sm`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <aside
        className={`fixed top-0 right-0 w-96 max-w-full h-full z-50 bg-[#f9f5ee]
    transform transition-transform duration-500 ease-in-out will-change-transform shadow-2xl
    ${isOpen ? "translate-x-0" : "translate-x-full"}
    flex flex-col p-6`}
        aria-label="Shopping cart"
      >
        {/* Close Button */}
        <button
          className="self-end text-3xl text-[#4B3F2A] hover:text-[#7A6B53] transition mb-4"
          onClick={closeCart}
          aria-label="Close cart"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#4B3F2A] tracking-tight mb-6">
          Your Bag
        </h2>

        {/* Cart Content */}
        {cartLines.length === 0 ? (
          <div className="text-[#7A6B53] text-base italic">
            Your bag is feeling a little empty...
            <br />
            Let&rsquo;s fill it with something good 🪱
          </div>
        ) : (
          <ul className="flex-grow overflow-y-auto divide-y divide-[#eae5da]">
            {cartLines.map(
              ({ variantId, quantity, title, price, variantTitle }) => (
                <li
                  key={variantId}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#3A3123]">
                      {title}
                    </span>
                    {variantTitle && (
                      <span className="text-xs text-[#7A6B53]">
                        {variantTitle}
                      </span>
                    )}
                    <span className="text-xs text-[#7A6B53]">{price}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        updateQuantity(
                          variantId,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      className="w-14 border border-[#D6C9B4] rounded px-2 py-1 text-sm text-center text-[#3A3123] bg-[#fffaf3]"
                    />
                    <button
                      className="text-[#B44C4C] text-xl font-semibold hover:text-red-700 transition"
                      onClick={() => removeLine(variantId)}
                      aria-label="Remove item"
                    >
                      &times;
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        )}

        {/* Checkout Button */}
        <div className="mt-6">
          <button
            onClick={handleCheckout}
            disabled={cartLines.length === 0 || loading}
            className={`w-full py-3 rounded text-base font-semibold transition-all
          ${
            cartLines.length === 0 || loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#4B3F2A] text-[#F9F5EE] hover:bg-[#3b3220]"
          }`}
          >
            {loading ? "Processing..." : "Checkout Securely"}
          </button>
          {cartLines.length > 0 && (
            <p className="mt-2 text-sm text-[#7A6B53] text-center">
              All live worms are 100% guaranteed* 🪱
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
