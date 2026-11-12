"use client";

import { useCurrency } from "./CurrencyContext";

interface PackagePriceBadgeProps {
  pkgId: string;
  fallback: string;
  showBadge?: boolean;
}

export function PackagePriceBadge({ pkgId, fallback, showBadge = true }: PackagePriceBadgeProps) {
  const { formatPrice, formatResidentialTier } = useCurrency();
  const numId = parseInt(pkgId, 10);

  let displayPrice = fallback;

  if (numId >= 1 && numId <= 4) {
    const p = formatPrice(numId as 1 | 2 | 3 | 4);
    displayPrice = p.standard;
  } else if (pkgId === "res-concept" || pkgId === "concept") {
    const tier = formatResidentialTier("concept");
    displayPrice = tier.standard;
  } else if (pkgId === "res-arch" || pkgId === "architecture") {
    const tier = formatResidentialTier("architecture");
    displayPrice = tier.standard;
  } else if (pkgId === "res-master" || pkgId === "masterplan") {
    const tier = formatResidentialTier("masterplan");
    displayPrice = tier.standard;
  }

  const cleanPrice = displayPrice.replace(/\s*·\s*Open to Discussion/gi, "").trim();

  return (
    <div className="inline-flex items-baseline flex-wrap gap-2">
      <span className="font-bold text-[var(--gold)]">{cleanPrice}</span>
      {showBadge && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] font-mono text-[9px] tracking-wider uppercase font-semibold">
          Discussable
        </span>
      )}
    </div>
  );
}
