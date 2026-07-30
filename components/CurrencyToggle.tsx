"use client";

import { useId } from "react";
import { useCurrency, type Currency } from "./CurrencyContext";
import { motion } from "framer-motion";

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const instanceId = useId();

  const options: { id: Currency; label: string; symbol: string }[] = [
    { id: "NGN", label: "NGN", symbol: "₦" },
    { id: "USD", label: "USD", symbol: "$" },
    { id: "GBP", label: "GBP", symbol: "£" },
  ];

  return (
    <div className="currency-toggle-wrap">
      {options.map((opt) => {
        const active = currency === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            className={`currency-toggle-btn ${active ? "active" : ""}`}
            onClick={() => setCurrency(opt.id)}
            title={`Switch to ${opt.label} (${opt.symbol})`}
          >
            {active && (
              <motion.div
                layoutId={`activeCurrencyBg-${instanceId}`}
                className="currency-toggle-indicator"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 24,
                  mass: 0.6,
                }}
              />
            )}
            <span className="relative z-10 font-mono text-[10px] tracking-wider uppercase">
              {opt.symbol} {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
