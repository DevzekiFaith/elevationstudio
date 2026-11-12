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

  let standardPrice = "";
  let discountedPrice = fallback;

  if (numId >= 1 && numId <= 4) {
    const p = formatPrice(numId as 1 | 2 | 3 | 4);
    standardPrice = p.standard;
    discountedPrice = p.discounted;
  } else if (pkgId === "res-concept" || pkgId === "concept") {
    const tier = formatResidentialTier("concept");
    standardPrice = tier.standard;
    discountedPrice = tier.discounted;
  } else if (pkgId === "res-arch" || pkgId === "architecture") {
    const tier = formatResidentialTier("architecture");
    standardPrice = tier.standard;
    discountedPrice = tier.discounted;
  } else if (pkgId === "res-master" || pkgId === "masterplan") {
    const tier = formatResidentialTier("masterplan");
    standardPrice = tier.standard;
    discountedPrice = tier.discounted;
  }

  // Strip duplicate suffix from fallback if present
  const displayStandard = standardPrice.replace(/\s*·\s*Open to Discussion/gi, "").trim();
  const displayDiscounted = discountedPrice.replace(/\s*·\s*Open to Discussion/gi, "").trim();

  return (
    <div className="inline-flex flex-col sm:flex-row sm:items-baseline flex-wrap gap-2">
      {displayStandard && (
        <span className="font-mono text-xs text-zinc-400 line-through">
          Std: {displayStandard}
        </span>
      )}
      <span className="font-bold text-[var(--gold)]">{displayDiscounted}</span>
      {showBadge && (
        <span className="inline-flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] tracking-wider uppercase font-semibold">
            10% Disc. Available
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] font-mono text-[9px] tracking-wider uppercase font-semibold">
            Discussable
          </span>
        </span>
      )}
    </div>
  );
}
