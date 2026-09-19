"use client";

import { useCurrency } from "./CurrencyContext";

interface PackagePriceBadgeProps {
  pkgId: string;
  fallback: string;
}

export function PackagePriceBadge({ pkgId, fallback }: PackagePriceBadgeProps) {
  const { formatPrice } = useCurrency();
  const numId = parseInt(pkgId, 10);

  if (numId >= 1 && numId <= 4) {
    const p = formatPrice(numId as 1 | 2 | 3 | 4);
    return <span>{p.min}</span>;
  }

  return <span>{fallback}</span>;
}
