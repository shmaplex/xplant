"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartLine = {
  variantId: string;
  quantity: number;
  title: string;
  variantTitle?: string;
  price: string;
};

type CartContextType = {
  cartLines: CartLine[];
  setCartLines: React.Dispatch<React.SetStateAction<CartLine[]>>;
  addToCart: (item: CartLine) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeLine: (variantId: string) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart_lines");
    if (stored) {
      setCartLines(JSON.parse(stored));
    }
  }, []);

  // Persist cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart_lines", JSON.stringify(cartLines));
  }, [cartLines]);

  const addToCart = (item: CartLine) => {
    setCartLines((prev) => {
      const existing = prev.find((line) => line.variantId === item.variantId);
      if (existing) {
        return prev.map((line) =>
          line.variantId === item.variantId
            ? { ...line, quantity: line.quantity + item.quantity }
            : line
        );
      } else {
        return [...prev, item];
      }
    });
    setIsOpen(true); // Open cart when item added
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

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <CartContext.Provider
      value={{
        cartLines,
        setCartLines,
        addToCart,
        updateQuantity,
        removeLine,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
