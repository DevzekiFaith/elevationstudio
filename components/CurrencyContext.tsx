"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Currency = "NGN" | "USD" | "GBP";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (pkgId: 1 | 2 | 3 | 4) => { min: string; max: string };
  formatResidentialPrice: (resPkgId: "architecture" | "masterplan" | "concept") => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Original static strings for Naira to guarantee no visual changes for NGN
const NGN_STATIC_DATA = {
  1: { min: "₦500K", max: "— ₦2,000,000" },
  2: { min: "₦1.5M", max: "— ₦5,000,000" },
  3: { min: "₦5M", max: "— ₦20,000,000" },
  4: { min: "₦15M", max: "— ₦50,000,000+" },
};

// Base prices in NGN for dynamic USD/GBP conversion calculations
const BASE_PRICES_NGN = {
  1: { min: 500000, max: 2000000, hasPlus: false },
  2: { min: 1500000, max: 5000000, hasPlus: false },
  3: { min: 5000000, max: 20000000, hasPlus: false },
  4: { min: 15000000, max: 50000000, hasPlus: true },
};

// Original static strings for Naira Residential Services
const RESIDENTIAL_STATIC_DATA = {
  architecture: "Starting from ₦1.5M",
  masterplan: "Starting from ₦4.5M",
  concept: "Starting from ₦600,000",
};

// Base prices in NGN for dynamic USD/GBP Residential calculations
const RESIDENTIAL_BASE_PRICES = {
  architecture: 1500000,
  masterplan: 4500000,
  concept: 600000,
};

// Premium visual rounding based on price tiers
function roundSmart(value: number): number {
  if (value < 1000) {
    // Round to the nearest $50 / £50
    return Math.round(value / 50) * 50;
  } else if (value < 10000) {
    // Round to the nearest $100 / £100
    return Math.round(value / 100) * 100;
  } else {
    // Round to the nearest $500 / £500
    return Math.round(value / 500) * 500;
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [rates, setRates] = useState({
    USD: 1354.84, // Offline fallback (August 2026 official rate)
    GBP: 1836.00, // Offline fallback (August 2026 interbank rate)
  });

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/NGN");
        if (!res.ok) throw new Error("Failed to fetch NGN base rates");
        const data = await res.json();
        
        if (data && data.result === "success" && data.rates) {
          const usdToNgn = 1 / data.rates.USD;
          const gbpToNgn = 1 / data.rates.GBP;
          
          // Apply basic sanity checks to protect the UX from anomalies
          if (usdToNgn > 500 && usdToNgn < 3000 && gbpToNgn > 800 && gbpToNgn < 4000) {
            setRates({
              USD: usdToNgn,
              GBP: gbpToNgn,
            });
          }
        }
      } catch (err) {
        console.warn("Failed to sync exchange rates from API. Using fallback defaults:", err);
      }
    };

    fetchRates();
  }, []);

  const formatPrice = (pkgId: 1 | 2 | 3 | 4) => {
    if (currency === "NGN") {
      return NGN_STATIC_DATA[pkgId];
    }

    const base = BASE_PRICES_NGN[pkgId];
    const rate = rates[currency];

    const rawMin = base.min / rate;
    const rawMax = base.max / rate;

    const roundedMin = roundSmart(rawMin);
    const roundedMax = roundSmart(rawMax);

    const symbol = currency === "USD" ? "$" : "£";

    const formattedMin = symbol + roundedMin.toLocaleString("en-US");
    const formattedMax = `— ${symbol}${roundedMax.toLocaleString("en-US")}${base.hasPlus ? "+" : ""}`;

    return { min: formattedMin, max: formattedMax };
  };

  const formatResidentialPrice = (resPkgId: "architecture" | "masterplan" | "concept") => {
    if (currency === "NGN") {
      return RESIDENTIAL_STATIC_DATA[resPkgId];
    }

    const base = RESIDENTIAL_BASE_PRICES[resPkgId];
    const rate = rates[currency];
    const converted = base / rate;
    const rounded = roundSmart(converted);

    const symbol = currency === "USD" ? "$" : "£";
    const formatted = symbol + rounded.toLocaleString("en-US");

    return `Starting from ${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, formatResidentialPrice }}>
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
