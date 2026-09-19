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

// USD Anchor Base Prices (Global Standard)
// Calibrated to align with ₦500K, ₦1.5M, ₦5M, and ₦15M at standard baseline rate
// and float upwards smoothly as the Dollar climbs.
const BASE_PRICES_USD = {
  1: { min: 375, isInvestment: false },
  2: { min: 1130, isInvestment: false },
  3: { min: 3760, isInvestment: true },
  4: { min: 11300, isInvestment: true },
};

const RESIDENTIAL_BASE_USD = {
  concept: 450,
  architecture: 1130,
  masterplan: 3380,
};

// Executive Smart Rounding for Naira
// Keeps the pricing looking prestigious, clean, and architectural without awkward decimals
function formatNaira(value: number): string {
  if (value < 1000000) {
    // Round to nearest ₦50K
    const rounded = Math.round(value / 50000) * 50000;
    const inK = Math.round(rounded / 1000);
    return `₦${inK}K`;
  } else if (value < 10000000) {
    // Round to nearest ₦100K
    const rounded = Math.round(value / 100000) * 100000;
    const inM = rounded / 1000000;
    const mStr = Number.isInteger(inM) ? inM.toString() : inM.toFixed(1);
    return `₦${mStr}M`;
  } else {
    // Round to nearest ₦500K for high-tier investments
    const rounded = Math.round(value / 500000) * 500000;
    const inM = rounded / 1000000;
    const mStr = Number.isInteger(inM) ? inM.toString() : inM.toFixed(1);
    return `₦${mStr}M`;
  }
}

// Visual smart rounding for USD & GBP
function roundForeign(value: number): number {
  if (value < 1000) {
    return Math.round(value / 50) * 50;
  } else if (value < 10000) {
    return Math.round(value / 100) * 100;
  } else {
    return Math.round(value / 500) * 500;
  }
}

const CACHE_KEY = "elevation_fx_rates_usd_v1";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Default to NGN so Nigerian clients immediately see clean domestic pricing
  const [currency, setCurrency] = useState<Currency>("NGN");
  const [rates, setRates] = useState({
    NGN: 1330, // Calibrated fallback baseline
    GBP: 0.75, // USD to GBP fallback
  });

  useEffect(() => {
    // Check cached rates first for zero-latency load
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          if (parsed.rates && parsed.rates.NGN && parsed.rates.GBP) {
            setRates(parsed.rates);
            return;
          }
        }
      }
    } catch {
      // Ignore localStorage errors (e.g. incognito/SSR)
    }

    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error("Failed to fetch USD exchange rates");
        const data = await res.json();

        if (data && data.result === "success" && data.rates) {
          const liveNGN = data.rates.NGN;
          const liveGBP = data.rates.GBP;

          // Sanity check to prevent anomalous data from breaking visuals
          if (liveNGN >= 800 && liveNGN <= 4000 && liveGBP >= 0.4 && liveGBP <= 1.5) {
            const newRates = { NGN: liveNGN, GBP: liveGBP };
            setRates(newRates);

            try {
              localStorage.setItem(
                CACHE_KEY,
                JSON.stringify({
                  timestamp: Date.now(),
                  rates: newRates,
                })
              );
            } catch {
              // Ignore localStorage quota/private mode errors
            }
          }
        }
      } catch (err) {
        console.warn("Using offline fallback exchange rates for Elevation Studio:", err);
      }
    };

    fetchRates();
  }, []);

  const formatPrice = (pkgId: 1 | 2 | 3 | 4) => {
    const base = BASE_PRICES_USD[pkgId];

    if (currency === "NGN") {
      const ngnValue = base.min * rates.NGN;
      const formattedNaira = formatNaira(ngnValue);
      const prefix = base.isInvestment ? "Investment from " : "From ";
      return { min: `${prefix}${formattedNaira}`, max: "" };
    }

    if (currency === "USD") {
      const formattedAmount = `$${roundForeign(base.min).toLocaleString("en-US")}`;
      const prefix = base.isInvestment ? "Investment from " : "From ";
      return { min: `${prefix}${formattedAmount}`, max: "" };
    }

    // GBP
    const gbpValue = base.min * rates.GBP;
    const roundedGBP = roundForeign(gbpValue);
    const formattedAmount = `£${roundedGBP.toLocaleString("en-US")}`;
    const prefix = base.isInvestment ? "Investment from " : "From ";
    return { min: `${prefix}${formattedAmount}`, max: "" };
  };

  const formatResidentialPrice = (resPkgId: "architecture" | "masterplan" | "concept") => {
    const baseUsd = RESIDENTIAL_BASE_USD[resPkgId];

    if (currency === "NGN") {
      const ngnValue = baseUsd * rates.NGN;
      return `From ${formatNaira(ngnValue)}`;
    }

    if (currency === "USD") {
      return `From $${roundForeign(baseUsd).toLocaleString("en-US")}`;
    }

    // GBP
    const gbpValue = baseUsd * rates.GBP;
    return `From £${roundForeign(gbpValue).toLocaleString("en-US")}`;
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
