"use client";

import { useCurrency } from "./CurrencyContext";

interface PackagePriceBadgeProps {
  pkgId: string;
  fallback: string;
  showBadge?: boolean;
}

export function PackagePriceBadge({ pkgId, fallback, showBadge = true }: PackagePriceBadgeProps) {
  const { formatPrice, formatResidentialPrice } = useCurrency();
  const numId = parseInt(pkgId, 10);

  let rawPrice = fallback;

  if (numId >= 1 && numId <= 4) {
    const p = formatPrice(numId as 1 | 2 | 3 | 4);
    rawPrice = p.min;
  } else if (pkgId === "res-concept" || pkgId === "concept") {
    rawPrice = formatResidentialPrice("concept");
  } else if (pkgId === "res-arch" || pkgId === "architecture") {
    rawPrice = formatResidentialPrice("architecture");
  } else if (pkgId === "res-master" || pkgId === "masterplan") {
    rawPrice = formatResidentialPrice("masterplan");
  }

  // Strip duplicate suffix from fallback if present
  const displayPrice = rawPrice.replace(/\s*·\s*Open to Discussion/gi, "").trim();

  return (
    <span className="inline-flex items-center flex-wrap gap-2.5">
      <span>{displayPrice}</span>
      {showBadge && (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] font-mono text-[10px] tracking-wider uppercase font-semibold">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Open to Discussion
        </span>
      )}
    </span>
  );
}
