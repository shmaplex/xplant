"use client";

import React, { useState } from "react";
import type { CartLine } from "@/contexts/CartContext";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartLines: CartLine[];
  onCheckout: () => Promise<void>;
  onUpdateQuantity: (variantId: string, quantity: number) => void;
  onRemoveLine: (variantId: string) => void;
};

export default function CartDrawer({
  isOpen,
  onClose,
  cartLines,
  onCheckout,
  onUpdateQuantity,
  onRemoveLine,
}: CartDrawerProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckoutClick() {
    setLoading(true);
    try {
      await onCheckout();
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
          bg-black/10 backdrop-blur-sm`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <aside
        className={`fixed top-0 right-0 w-96 max-w-full h-full z-50 bg-[var(--milk-bio)]
          transform transition-transform duration-500 ease-in-out will-change-transform shadow-2xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col p-6`}
        aria-label="Shopping cart"
      >
        {/* Close Button */}
        <button
          className="self-end text-3xl text-[var(--moss-shadow)] hover:text-[var(--biochar-black)] transition mb-4"
          onClick={onClose}
          aria-label="Close cart"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[var(--biochar-black)] tracking-tight mb-6">
          Your Lab Bench
        </h2>

        {/* Cart Content */}
        {cartLines.length === 0 ? (
          <div className="text-[var(--moss-shadow)] text-base italic">
            Your bench is empty…
            <br />
            🧪 Explore our lab&apos;s early culture mediums, explants, and
            tools.
          </div>
        ) : (
          <ul className="flex-grow overflow-y-auto divide-y divide-[var(--spore-grey)]">
            {cartLines.map(
              ({ variantId, quantity, title, price, variantTitle }) => (
                <li
                  key={variantId}
                  className="py-4 flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[var(--biochar-black)]">
                      {title}
                    </span>
                    {variantTitle && (
                      <span className="text-xs text-[var(--moss-shadow)]">
                        {variantTitle}
                      </span>
                    )}
                    <span className="text-xs text-[var(--moss-shadow)]">
                      {price}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        onUpdateQuantity(
                          variantId,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      className="w-14 border border-[var(--spore-grey)] rounded px-2 py-1 text-sm text-center text-[var(--biochar-black)] bg-white"
                    />
                    <button
                      className="text-red-500 text-xl font-semibold hover:text-red-700 transition"
                      onClick={() => onRemoveLine(variantId)}
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
            onClick={handleCheckoutClick}
            disabled={cartLines.length === 0 || loading}
            className={`w-full py-3 rounded text-base font-semibold transition-all
              ${
                cartLines.length === 0 || loading
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[var(--moss-shadow)] text-[var(--milk-bio)] hover:bg-[var(--biochar-black)]"
              }`}
          >
            {loading ? "Processing..." : "Checkout Securely"}
          </button>
          {cartLines.length > 0 && (
            <p className="mt-2 text-sm text-[var(--moss-shadow)] text-center">
              🧪 All orders are currently <strong>pre-orders</strong> as our lab
              finalizes development.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
