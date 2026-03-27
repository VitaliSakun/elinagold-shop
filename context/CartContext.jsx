"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  createCart,
  addCartLines,
  updateCartLine,
  removeCartLines,
} from "@/lib/shopify";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const addToCart = useCallback(
    async (variantId, quantity = 1) => {
      setLoading(true);
      try {
        let updated;
        if (!cart) {
          updated = await createCart([{ merchandiseId: variantId, quantity }]);
        } else {
          updated = await addCartLines(cart.id, [
            { merchandiseId: variantId, quantity },
          ]);
        }
        if (updated) {
          setCart(updated);
          setCartOpen(true);
        }
      } catch (err) {
        console.error("addToCart error", err);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const updateLine = useCallback(
    async (lineId, quantity) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await updateCartLine(cart.id, lineId, quantity);
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const removeLine = useCallback(
    async (lineId) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await removeCartLines(cart.id, [lineId]);
        if (updated) setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        updateLine,
        removeLine,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
