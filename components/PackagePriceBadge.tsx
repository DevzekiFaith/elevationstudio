"use client";

import { useCurrency } from "./CurrencyContext";

interface PackagePriceBadgeProps {
  pkgId: string;
  fallback: string;
}

export function PackagePriceBadge({ pkgId, fallback }: PackagePriceBadgeProps) {
  const { formatPrice, formatResidentialPrice } = useCurrency();
  const numId = parseInt(pkgId, 10);

  if (numId >= 1 && numId <= 4) {
    const p = formatPrice(numId as 1 | 2 | 3 | 4);
    return <span>{p.min}</span>;
  }

  if (pkgId === "res-concept" || pkgId === "concept") {
    return <span>{formatResidentialPrice("concept")}</span>;
  }
  if (pkgId === "res-arch" || pkgId === "architecture") {
    return <span>{formatResidentialPrice("architecture")}</span>;
  }
  if (pkgId === "res-master" || pkgId === "masterplan") {
    return <span>{formatResidentialPrice("masterplan")}</span>;
  }

  return <span>{fallback}</span>;
}
