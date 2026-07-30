"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";

export type Currency = "NGN" | "USD" | "GBP";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (pkgId: 1 | 2 | 3 | 4) => { min: string; max: string };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const PRICE_DATA = {
  NGN: {
    1: { min: "₦500K", max: "— ₦2,000,000" },
    2: { min: "₦1.5M", max: "— ₦5,000,000" },
    3: { min: "₦5M", max: "— ₦20,000,000" },
    4: { min: "₦15M", max: "— ₦50,000,000+" },
  },
  USD: {
    1: { min: "$650", max: "— $2,600" },
    2: { min: "$2,000", max: "— $6,500" },
    3: { min: "$6,500", max: "— $26,000" },
    4: { min: "$20,000", max: "— $65,000+" },
  },
  GBP: {
    1: { min: "£500", max: "— £2,000" },
    2: { min: "£1,500", max: "— £5,000" },
    3: { min: "£5,000", max: "— £20,000" },
    4: { min: "£15,000", max: "— £50,000+" },
  },
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("NGN");

  const formatPrice = (pkgId: 1 | 2 | 3 | 4) => {
    return PRICE_DATA[currency][pkgId];
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
