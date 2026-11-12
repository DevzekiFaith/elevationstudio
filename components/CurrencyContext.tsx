"use client";

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Currency = "NGN" | "USD" | "GBP";

export const PRICING_NOTE =
  "All prices are discussable. Final project fees are determined through consultation and agreement on project scope.";

export interface FormattedTierPrice {
  standard: string;
  discounted: string;
  discountRate: string;
  isDiscussable: boolean;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  pricingNote: string;
  formatPrice: (pkgId: 1 | 2 | 3 | 4) => {
    min: string;
    max: string;
    standard: string;
    discounted: string;
  };
  formatResidentialPrice: (resPkgId: "architecture" | "masterplan" | "concept") => string;
  formatResidentialTier: (resPkgId: "architecture" | "masterplan" | "concept") => FormattedTierPrice;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// USD Anchor Base Prices (Global Standard)
// Calibrated to align with ₦500K, ₦1.5M, ₦5M, and ₦15M at standard baseline rate
// and float upwards smoothly as the Dollar climbs.
const BASE_PRICES_USD = {
  1: { min: 190, isInvestment: false },
  2: { min: 565, isInvestment: false },
  3: { min: 1880, isInvestment: true },
  4: { min: 5650, isInvestment: true },
};

const RESIDENTIAL_BASE_USD = {
  concept: 225,
  architecture: 300, // Bungalow Villa baseline: ₦400K ($300 / £225)
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
    let timer: NodeJS.Timeout | undefined;
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          if (parsed.rates && parsed.rates.NGN && parsed.rates.GBP) {
            timer = setTimeout(() => {
              setRates(parsed.rates);
            }, 0);
            return () => {
              if (timer) clearTimeout(timer);
            };
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
    const prefix = base.isInvestment ? "Investment from " : "From ";

    if (currency === "NGN") {
      const standardNgn = base.min * rates.NGN;
      const standardStr = `${prefix}${formatNaira(standardNgn)}`;
      return {
        min: standardStr,
        max: "",
        standard: standardStr,
        discounted: standardStr,
      };
    }

    if (currency === "USD") {
      const standardStr = `${prefix}$${roundForeign(base.min).toLocaleString("en-US")}`;
      return {
        min: standardStr,
        max: "",
        standard: standardStr,
        discounted: standardStr,
      };
    }

    // GBP
    const standardGbp = roundForeign(base.min * rates.GBP);
    const standardStr = `${prefix}£${standardGbp.toLocaleString("en-US")}`;
    return {
      min: standardStr,
      max: "",
      standard: standardStr,
      discounted: standardStr,
    };
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

  const formatResidentialTier = (resPkgId: "architecture" | "masterplan" | "concept"): FormattedTierPrice => {
    const baseUsd = RESIDENTIAL_BASE_USD[resPkgId];

    if (currency === "NGN") {
      const standardNgn = baseUsd * rates.NGN;
      const formatted = `From ${formatNaira(standardNgn)}`;
      return {
        standard: formatted,
        discounted: formatted,
        discountRate: "",
        isDiscussable: true,
      };
    }

    if (currency === "USD") {
      const formatted = `From $${roundForeign(baseUsd).toLocaleString("en-US")}`;
      return {
        standard: formatted,
        discounted: formatted,
        discountRate: "",
        isDiscussable: true,
      };
    }

    // GBP
    const standardGbp = roundForeign(baseUsd * rates.GBP);
    const formatted = `From £${standardGbp.toLocaleString("en-US")}`;
    return {
      standard: formatted,
      discounted: formatted,
      discountRate: "",
      isDiscussable: true,
    };
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        pricingNote: PRICING_NOTE,
        formatPrice,
        formatResidentialPrice,
        formatResidentialTier,
      }}
    >
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
