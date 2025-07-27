// hooks/usePersistentCart.ts
"use client";

import { useEffect, useState } from "react";

export type CartLine = {
  variantId: string;
  quantity: number;
  title: string;
  price: string;
};

const STORAGE_KEY = "cart_lines";

export function usePersistentCart() {
  const [cartLines, setCartLines] = useState<CartLine[]>([]);

  // Load from localStorage on first mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCartLines(JSON.parse(stored));
      } catch {
        console.warn("Invalid cart in storage");
      }
    }
  }, []);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartLines));
  }, [cartLines]);

  const addToCart = (
    variantId: string,
    quantity: number,
    title: string,
    price: string
  ) => {
    setCartLines((prev) => {
      const index = prev.findIndex((line) => line.variantId === variantId);
      if (index === -1) {
        return [...prev, { variantId, quantity, title, price }];
      }
      const updated = [...prev];
      updated[index].quantity += quantity;
      return updated;
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setCartLines((prev) =>
      prev.map((line) =>
        line.variantId === variantId ? { ...line, quantity } : line
      )
    );
  };

  const removeLine = (variantId: string) => {
    setCartLines((prev) => prev.filter((line) => line.variantId !== variantId));
  };

  return {
    cartLines,
    setCartLines,
    addToCart,
    updateQuantity,
    removeLine,
  };
}
