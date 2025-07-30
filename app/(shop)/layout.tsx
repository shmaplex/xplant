"use client";

import React from "react";
import Header from "@/components/Header";
import ShopLayoutContext from "@/contexts/ShopLayoutContext";
import CartButton from "@/components/CartButton";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/contexts/CartContext";

type ShopLayoutProps = {
  children: React.ReactNode;
};

export default function ShopLayout({ children }: ShopLayoutProps) {
  const { cartLines, updateQuantity, removeLine, isOpen, openCart, closeCart } =
    useCart();

  async function handleCheckout() {
    const res = await fetch("/api/cart/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lines: cartLines.map((line) => ({
          merchandiseId: line.variantId,
          quantity: line.quantity,
        })),
      }),
    });

    const data = await res.json();
    if (res.ok && data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Failed to create checkout. Please try again later.");
      console.error(data.error);
    }
  }

  return (
    <ShopLayoutContext.Provider value={{ isShopPage: true }}>
      <Header showUserQuicklinks showAdminQuicklinks />
      <CartButton />
      {children}
      <CartDrawer
        isOpen={isOpen}
        onClose={closeCart}
        cartLines={cartLines}
        onCheckout={handleCheckout}
        onUpdateQuantity={updateQuantity}
        onRemoveLine={removeLine}
      />
    </ShopLayoutContext.Provider>
  );
}
