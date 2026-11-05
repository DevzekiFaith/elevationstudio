"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useCurrency } from "@/components/CurrencyContext";
import { useCart } from "@/components/cart/CartContext";

interface TypologyOption {
  id: string;
  name: string;
  priceNgn: number;
  priceUsd: number;
}

interface AddOn {
  id: string;
  name: string;
  category: "Digital" | "Branding" | "3D Visualization" | "Training";
  priceNgn: number;
  priceUsd: number;
  priceFormatted: string;
  desc: string;
}

const TYPOLOGIES: TypologyOption[] = [
  {
    id: "bungalow",
    name: "Bungalow Villa",
    priceNgn: 1200000,
    priceUsd: 900,
  },
  {
    id: "duplex",
    name: "Duplex / Luxury Residence",
    priceNgn: 1500000,
    priceUsd: 1130,
  },
  {
    id: "commercial",
    name: "Commercial Plaza",
    priceNgn: 2500000,
    priceUsd: 1880,
  },
  {
    id: "church",
    name: "Church Auditorium",
    priceNgn: 3500000,
    priceUsd: 2630,
  },
  {
    id: "masterplan",
    name: "Estate Masterplan",
    priceNgn: 4500000,
    priceUsd: 3380,
  },
];

const ADD_ONS: AddOn[] = [
  {
    id: "web-dev",
    name: "Website Development",
    category: "Digital",
    priceNgn: 600000,
    priceUsd: 450,
    priceFormatted: "+ ₦600K ($450)",
    desc: "Estate portal, sales landing page & fast digital presence.",
  },
  {
    id: "branding",
    name: "Brand Identity System",
    category: "Branding",
    priceNgn: 400000,
    priceUsd: 300,
    priceFormatted: "+ ₦400K ($300)",
    desc: "Logo mark, typography, investor pitch deck & visual collateral.",
  },
  {
    id: "3d-walkthrough",
    name: "4K Cinema Walkthrough",
    category: "3D Visualization",
    priceNgn: 500000,
    priceUsd: 375,
    priceFormatted: "+ ₦500K ($375)",
    desc: "Photorealistic 4K flythrough video for marketing and off-plan sales.",
  },
  {
    id: "training",
    name: "Corporate Training",
    category: "Training",
    priceNgn: 0,
    priceUsd: 0,
    priceFormatted: "Custom Quote",
    desc: "Executive capacity building & CAD/BIM technical team upskilling.",
  },
];

export function BuildYourProject() {
  const { currency } = useCurrency();
  const {
    items: cartItems,
    toggleAddOn: cartToggleAddOn,
    setPrimaryArchitectureTypology,
    openCart,
    itemCount,
  } = useCart();

  // Find initial typology from cart or fallback to Duplex
  const initialTypology =
    TYPOLOGIES.find((t) =>
      cartItems.some((i) => i.isPrimary && i.typology === t.name)
    ) || TYPOLOGIES[1];

  const [selectedTypology, setSelectedTypology] = useState<TypologyOption>(initialTypology);

  const handleSelectTypology = (typ: TypologyOption) => {
    setSelectedTypology(typ);
    setPrimaryArchitectureTypology(typ.name, typ.priceNgn, typ.priceUsd);
  };

  const handleToggleAddOn = (addon: AddOn) => {
    cartToggleAddOn({
      id: addon.id,
      title: addon.name,
      category: addon.category,
      priceNgn: addon.priceNgn,
      priceUsd: addon.priceUsd,
      deliverables: [addon.desc],
    });
  };

  const isAddOnInCart = (id: string) => cartItems.some((i) => i.id === id);

  const selectedAddOns = ADD_ONS.filter((a) => isAddOnInCart(a.id));

  // Dynamic baseline calculation
  const addOnsTotalNgn = selectedAddOns.reduce((acc, item) => acc + item.priceNgn, 0);
  const addOnsTotalUsd = selectedAddOns.reduce((acc, item) => acc + item.priceUsd, 0);

  const totalNgn = selectedTypology.priceNgn + addOnsTotalNgn;
  const totalUsd = selectedTypology.priceUsd + addOnsTotalUsd;

  const formatPrice = (ngn: number, usd: number) => {
    if (currency === "USD") return `$${usd.toLocaleString()}`;
    if (currency === "GBP") return `£${Math.round(usd * 0.75).toLocaleString()}`;
    if (ngn < 1000000) {
      return `₦${Math.round(ngn / 1000)}K (${ngn.toLocaleString()} NGN)`;
    }
    return `₦${(ngn / 1000000).toFixed(1)}M (${ngn.toLocaleString()} NGN)`;
  };

  const formatCompactPrice = (ngn: number, usd: number) => {
    if (currency === "USD") return `$${usd.toLocaleString()}`;
    if (currency === "GBP") return `£${Math.round(usd * 0.75).toLocaleString()}`;
    if (ngn < 1000000) {
      return `₦${Math.round(ngn / 1000)}K ($${usd})`;
    }
    return `₦${(ngn / 1000000).toFixed(1)}M ($${usd.toLocaleString()})`;
  };

  const formattedTotal = formatPrice(totalNgn, totalUsd);

  const whatsappMessage = `Hello Elevation Studio! I tailored a project scope on your website:
- Primary Architecture: Complete Architectural Design Package (${selectedTypology.name}) — ${formatPrice(selectedTypology.priceNgn, selectedTypology.priceUsd)}
- Selected Add-ons: ${selectedAddOns.length > 0 ? selectedAddOns.map((a) => a.name).join(", ") : "None (Core Architecture Only)"}
- Estimated Baseline Investment: ${formattedTotal}
Please let me know your consultation schedule and formal quotation.`;

  const whatsappUrl = `https://wa.me/2349119059859?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      id="build-project"
      className="py-20 sm:py-28 px-5 sm:px-10 lg:px-16 xl:px-20 bg-[#060608] text-white border-t border-white/[0.04] relative"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-3">
              <span>✦</span> Custom Scope & Add-Ons
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
              Build Your <span className="text-[var(--gold)]">Project Scope</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-2 max-w-lg mx-auto">
              Select your project category below to check baseline investment, then add optional services to your cart.
            </p>
          </Reveal>
        </div>

        {/* Outer Container (Hairline Border & Deep Soft Shadow) */}
        <div className="rounded-none bg-[#0a0a0f] border border-white/[0.06] p-6 sm:p-10 lg:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-10">
          {/* 01. PRIMARY FOUNDATION: Complete Architectural Design Package */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)] font-bold">
                  01 · Primary Foundation
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-black bg-[var(--gold)] font-bold px-2 py-0.5 rounded-full">
                  Included in Cart
                </span>
              </div>
              <span className="font-mono text-xs text-white/70">
                Baseline:{" "}
                <strong className="text-white font-bold ml-1 text-sm">
                  {formatPrice(selectedTypology.priceNgn, selectedTypology.priceUsd)}
                </strong>
              </span>
            </div>

            <div className="p-6 sm:p-8 rounded-none bg-white/[0.02] border border-white/[0.05]">
              <div className="mb-5">
                <h3 className="font-syne text-xl sm:text-3xl font-black uppercase text-white tracking-wide">
                  Complete Architectural Design Package
                </h3>
              </div>

              {/* Second Layer: Interactive Typology Buttons with Direct Pricing */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {TYPOLOGIES.map((typ) => {
                  const isSelected = selectedTypology.id === typ.id;
                  return (
                    <button
                      key={typ.id}
                      type="button"
                      onClick={() => handleSelectTypology(typ)}
                      className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-syne text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? "bg-white text-black font-black shadow-lg"
                          : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] text-white/75 hover:text-white"
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected ? "text-black" : "text-white/40"}`}>
                        {isSelected ? "✓" : "○"}
                      </span>
                      <span>{typ.name}</span>
                      <span
                        className={`font-mono text-[11px] font-bold ${
                          isSelected ? "text-neutral-900" : "text-[var(--gold)]"
                        }`}
                      >
                        {formatCompactPrice(typ.priceNgn, typ.priceUsd)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 02. OPTIONAL ADD-ONS: Digital, Branding, 3D Video, Training */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.05]">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)] font-bold">
                02 · Optional Add-Ons (Tap to Add to Cart)
              </span>
              <button
                type="button"
                onClick={openCart}
                className="font-mono text-[11px] text-[var(--gold)] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Scope Cart ({itemCount})</span>
                <span>↗</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {ADD_ONS.map((addon) => {
                const isAdded = isAddOnInCart(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => handleToggleAddOn(addon)}
                    className={`p-5 rounded-none text-left transition-all duration-200 cursor-pointer flex flex-col justify-between border ${
                      isAdded
                        ? "bg-white/[0.06] border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                        : "bg-white/[0.02] hover:bg-white/[0.04] border-white/[0.05]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 px-2 py-0.5 bg-white/[0.04]">
                          {addon.category}
                        </span>
                        <span
                          className={`font-mono text-xs font-bold ${
                            isAdded ? "text-[var(--gold)]" : "text-white/60"
                          }`}
                        >
                          {addon.priceFormatted}
                        </span>
                      </div>

                      <h4 className="font-syne text-sm sm:text-base font-bold text-white mb-1.5 leading-snug">
                        {addon.name}
                      </h4>

                      <p className="font-sans text-[11px] text-white/60 leading-relaxed font-light mb-4">
                        {addon.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`w-full py-2 px-3 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isAdded
                          ? "bg-white text-black font-bold shadow-sm"
                          : "bg-white/[0.04] text-white/70 hover:text-white border border-white/[0.06]"
                      }`}
                    >
                      <span>{isAdded ? "✓ Added to Cart" : "+ Add to Cart"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 03. LIVE CART SUMMARY & DIRECT CLOSING BAR */}
          <div className="p-6 sm:p-8 rounded-none bg-black/60 border border-white/[0.06] flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold">
                  Cart Scope Breakdown:
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  ({1 + selectedAddOns.length} Service{1 + selectedAddOns.length === 1 ? "" : "s"})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-white/[0.06] border border-white/[0.06] font-syne font-semibold text-white">
                  ✓ {selectedTypology.name} (
                  {formatCompactPrice(selectedTypology.priceNgn, selectedTypology.priceUsd)})
                </span>
                {selectedAddOns.map((addon) => (
                  <span
                    key={addon.id}
                    className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.06] font-syne text-[var(--gold)] font-semibold flex items-center gap-1"
                  >
                    <span>+</span> {addon.name}
                  </span>
                ))}
                {selectedAddOns.length === 0 && (
                  <span className="font-sans text-xs text-white/40 italic">
                    (No add-ons selected — tap any card above to include)
                  </span>
                )}
              </div>

              <div className="font-mono text-xs text-white/60 pt-1">
                Estimated Cart Total:{" "}
                <strong className="text-white font-bold text-sm sm:text-base ml-1">
                  {formattedTotal}
                </strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={openCart}
                className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-syne font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-[var(--gold)]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Review Cart & Invoice Details</span>
                <span>↗</span>
              </button>

              <Magnetic strength={0.2}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:scale-105 flex items-center justify-center gap-2 cursor-pointer inline-flex"
                >
                  <span>Claim Scope on WhatsApp</span>
                  <span>→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}