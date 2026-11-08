"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface CartItem {
  id: string;
  title: string;
  category: "Architecture" | "Digital" | "Branding" | "3D Visualization" | "Training";
  typology?: string;
  priceNgn: number;
  priceUsd: number;
  deliverables: string[];
  isPrimary?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  toggleAddOn: (item: CartItem) => void;
  setPrimaryArchitectureTypology: (
    typology: string,
    priceNgn?: number,
    priceUsd?: number,
    deliverables?: string[]
  ) => void;
  removePrimaryArchitecture: () => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  totalNgn: number;
  totalUsd: number;
}

const CART_STORAGE_KEY = "elevation_studio_cart_v2";

const DEFAULT_PRIMARY_ITEM: CartItem = {
  id: "primary-architecture",
  title: "Complete Architectural Package — Bungalow Villa",
  category: "Architecture",
  typology: "Bungalow Villa",
  priceNgn: 400000,
  priceUsd: 300,
  deliverables: [
    "Working drawing sets & floor plans",
    "Licensed structural & MEP calculations",
    "Photorealistic 4K exterior/interior renders",
    "Municipal planning submission compliance",
  ],
  isPrimary: true,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Start with default empty cart until a product/typology is explicitly picked
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Lazy-load from localStorage after initial render without triggering synchronous cascading renders
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch {
        // Fallback to default empty
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore write errors
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [...prev, item];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleAddOn = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const setPrimaryArchitectureTypology = (
    typology: string,
    priceNgn?: number,
    priceUsd?: number,
    deliverables?: string[]
  ) => {
    setItems((prev) => {
      const hasPrimary = prev.some((i) => i.isPrimary);
      const updatedPriceNgn = priceNgn ?? 400000;
      const updatedPriceUsd = priceUsd ?? 300;
      const updatedDeliverables = deliverables ?? [
        "Working drawing sets & floor plans",
        "Licensed structural & MEP calculations",
        "Photorealistic 4K exterior/interior renders",
        "Municipal planning submission compliance",
      ];

      if (hasPrimary) {
        return prev.map((i) =>
          i.isPrimary
            ? {
                ...i,
                typology,
                title: `Complete Architectural Package — ${typology}`,
                priceNgn: updatedPriceNgn,
                priceUsd: updatedPriceUsd,
                deliverables: updatedDeliverables,
              }
            : i
        );
      }
      return [
        {
          ...DEFAULT_PRIMARY_ITEM,
          typology,
          title: `Complete Architectural Package — ${typology}`,
          priceNgn: updatedPriceNgn,
          priceUsd: updatedPriceUsd,
          deliverables: updatedDeliverables,
        },
        ...prev,
      ];
    });
  };

  const removePrimaryArchitecture = () => {
    setItems((prev) => prev.filter((i) => !i.isPrimary));
  };

  const clearCart = () => {
    setItems([]);
  };

  const itemCount = items.length;

  const totalNgn = items.reduce((sum, item) => sum + (item.priceNgn || 0), 0);
  const totalUsd = items.reduce((sum, item) => sum + (item.priceUsd || 0), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        toggleAddOn,
        setPrimaryArchitectureTypology,
        removePrimaryArchitecture,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        itemCount,
        totalNgn,
        totalUsd,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
