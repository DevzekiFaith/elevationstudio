"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useCurrency } from "@/components/CurrencyContext";
import { useCart } from "@/components/cart/CartContext";
import { CartTrolleyIcon } from "@/components/cart/CartTrolleyIcon";

interface TypologyOption {
  id: string;
  name: string;
  priceNgn: number;
  priceUsd: number;
}

interface AddOn {
  id: string;
  name: string;
  category: "Digital" | "Branding" | "3D Visualization";
  priceNgn: number;
  priceUsd: number;
  priceFormatted: string;
  desc: string;
}

const TYPOLOGIES: TypologyOption[] = [
  {
    id: "bungalow",
    name: "Bungalow Villa",
    priceNgn: 400000,
    priceUsd: 300,
  },
  {
    id: "duplex",
    name: "Duplex / Luxury Residence",
    priceNgn: 750000,
    priceUsd: 565,
  },
  {
    id: "commercial",
    name: "Commercial Plaza",
    priceNgn: 1250000,
    priceUsd: 940,
  },
  {
    id: "church",
    name: "Church Auditorium",
    priceNgn: 1750000,
    priceUsd: 1315,
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
    priceNgn: 300000,
    priceUsd: 225,
    priceFormatted: "+ ₦300K ($225)",
    desc: "Estate portal, sales landing page & fast digital presence.",
  },
  {
    id: "branding",
    name: "Brand Identity System",
    category: "Branding",
    priceNgn: 200000,
    priceUsd: 150,
    priceFormatted: "+ ₦200K ($150)",
    desc: "Logo mark, typography, investor pitch deck & visual collateral.",
  },
  {
    id: "3d-walkthrough",
    name: "4K Cinema Walkthrough",
    category: "3D Visualization",
    priceNgn: 250000,
    priceUsd: 190,
    priceFormatted: "+ ₦250K ($190)",
    desc: "Photorealistic 4K flythrough video for marketing and off-plan sales.",
  },
];

export function BuildYourProject() {
  const { currency } = useCurrency();
  const {
    items: cartItems,
    toggleAddOn: cartToggleAddOn,
    setPrimaryArchitectureTypology,
    removePrimaryArchitecture,
    openCart,
    itemCount,
  } = useCart();

  // Find selected typology from cart (null on default until a typology is explicitly picked)
  const selectedTypology =
    TYPOLOGIES.find((t) =>
      cartItems.some((i) => i.isPrimary && i.typology === t.name)
    ) || null;

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const handleSelectTypology = (typ: TypologyOption) => {
    if (selectedTypology?.id === typ.id) {
      // Tapping the active typology deselects it back to default
      removePrimaryArchitecture();
      showNotification(`Removed "${typ.name}" from cart`);
    } else {
      setPrimaryArchitectureTypology(typ.name, typ.priceNgn, typ.priceUsd);
      showNotification(`✓ Added "${typ.name}" to cart`);
    }
  };

  const handleToggleAddOn = (addon: AddOn) => {
    const isAdding = !isAddOnInCart(addon.id);
    cartToggleAddOn({
      id: addon.id,
      title: addon.name,
      category: addon.category,
      priceNgn: addon.priceNgn,
      priceUsd: addon.priceUsd,
      deliverables: [addon.desc],
    });
    if (isAdding) {
      showNotification(`✓ Added "${addon.name}" to cart`);
    } else {
      showNotification(`Removed "${addon.name}" from cart`);
    }
  };

  const isAddOnInCart = (id: string) => cartItems.some((i) => i.id === id);

  const selectedAddOns = ADD_ONS.filter((a) => isAddOnInCart(a.id));

  // Dynamic baseline calculation
  const addOnsTotalNgn = selectedAddOns.reduce((acc, item) => acc + item.priceNgn, 0);
  const addOnsTotalUsd = selectedAddOns.reduce((acc, item) => acc + item.priceUsd, 0);

  const primaryNgn = selectedTypology ? selectedTypology.priceNgn : 0;
  const primaryUsd = selectedTypology ? selectedTypology.priceUsd : 0;

  const totalNgn = primaryNgn + addOnsTotalNgn;
  const totalUsd = primaryUsd + addOnsTotalUsd;
  const totalServicesCount = (selectedTypology ? 1 : 0) + selectedAddOns.length;

  const discountNgn = Math.round(totalNgn * 0.1);
  const discountUsd = Math.round(totalUsd * 0.1);
  const discountedTotalNgn = totalNgn - discountNgn;
  const discountedTotalUsd = totalUsd - discountUsd;

  const formatPrice = (ngn: number, usd: number) => {
    if (ngn === 0 && usd === 0) return "₦0 ($0)";
    if (currency === "USD") return `$${usd.toLocaleString()}`;
    if (currency === "GBP") return `£${Math.round(usd * 0.75).toLocaleString()}`;
    if (ngn < 1000000) {
      return `₦${Math.round(ngn / 1000)}K (${ngn.toLocaleString()} NGN)`;
    }
    const inM = ngn / 1000000;
    const mStr = inM % 1 === 0 ? inM.toString() : inM.toFixed(2).replace(/0$/, "");
    return `₦${mStr}M (${ngn.toLocaleString()} NGN)`;
  };

  const formatCompactPrice = (ngn: number, usd: number) => {
    if (ngn === 0 && usd === 0) return "₦0 ($0)";
    if (currency === "USD") return `$${usd.toLocaleString()}`;
    if (currency === "GBP") return `£${Math.round(usd * 0.75).toLocaleString()}`;
    if (ngn < 1000000) {
      return `₦${Math.round(ngn / 1000)}K ($${usd})`;
    }
    const inM = ngn / 1000000;
    const mStr = inM % 1 === 0 ? inM.toString() : inM.toFixed(2).replace(/0$/, "");
    return `₦${mStr}M ($${usd.toLocaleString()})`;
  };

  const formattedStandardTotal = formatPrice(totalNgn, totalUsd);
  const formattedDiscountedTotal = formatPrice(discountedTotalNgn, discountedTotalUsd);
  const formattedDiscountAmount = formatPrice(discountNgn, discountUsd);

  const whatsappMessage = totalServicesCount > 0
    ? `Hello Elevation Studio! I tailored a project scope on your website:
${
  selectedTypology
    ? `- Primary Architecture: Complete Architectural Design Package (${selectedTypology.name})\n  • Standard: ${formatPrice(selectedTypology.priceNgn, selectedTypology.priceUsd)}\n  • Available 10% Discount: ${formatPrice(Math.round(selectedTypology.priceNgn * 0.9), Math.round(selectedTypology.priceUsd * 0.9))}`
    : "- Primary Architecture: None selected"
}
- Selected Add-ons: ${
        selectedAddOns.length > 0
          ? selectedAddOns
              .map(
                (a) =>
                  `${a.name} (Std: ${formatPrice(a.priceNgn, a.priceUsd)} → Disc: ${formatPrice(
                    Math.round(a.priceNgn * 0.9),
                    Math.round(a.priceUsd * 0.9)
                  )})`
              )
              .join(", ")
          : "None (Core Architecture Only)"
      }
- Standard Total: ${formattedStandardTotal}
- Available 10% Discount: -${formattedDiscountAmount}
- Estimated Discussable Total: ${formattedDiscountedTotal}

*Commercial Note:* All prices are discussable. Enjoy up to 10% discount on applicable services. Final project fees are determined through consultation and agreement on project scope.

Please let me know your consultation schedule and formal quotation.`
    : `Hello Elevation Studio! I am exploring your project packages and would like to discuss my project needs.`;

  const whatsappUrl = `https://wa.me/2349119059859?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      id="build-project"
      className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-22 bg-[#060608] text-white relative overflow-hidden w-full"
    >
      {/* Subtle Ambient Lighting */}
      <div className="ambient-orb ambient-orb-gold w-[600px] h-[600px] -top-32 -left-32 opacity-15 pointer-events-none" />

      <div className="w-full max-w-[1560px] mx-auto relative z-10">
        {/* Section Header (Centered across all screen sizes) */}
        <div className="w-full max-w-2xl mx-auto mb-10 sm:mb-14 flex flex-col items-center justify-center text-center">
          <Reveal direction="down" delay={0.1} className="w-full flex justify-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/[0.03] font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-3 mx-auto">
              <span>✦</span> Custom Scope & Add-Ons
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2} className="w-full flex justify-center text-center">
            <h2 className="font-syne text-2xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-tight text-center mx-auto w-full">
              Build Your <span className="text-[var(--gold)]">Project Scope</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3} className="w-full flex justify-center text-center">
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-2 max-w-lg mx-auto text-center w-full">
              Select your project category below to check baseline investment, then add optional services to your cart.
            </p>
          </Reveal>
        </div>

        {/* Outer Container (Straight Corners, Seamless Line-Free Luxury Shell) */}
        <div className="rounded-none bg-[#0a0a0f] p-4 sm:p-7 md:p-10 lg:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)] w-full">
          {/* 01. PRIMARY FOUNDATION: Complete Architectural Design Package */}
          <div className="w-full mb-[1.5rem]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)] font-bold">
                  01 · Primary Foundation
                </span>
                <span
                  className={`font-mono text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-none transition-all ${
                    selectedTypology ? "text-black bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "text-white/60 bg-white/10"
                  }`}
                >
                  {selectedTypology ? "✓ Included in Cart" : "Choose Below"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-white/70">
                  {selectedTypology ? (
                    <span className="flex items-baseline gap-2">
                      <span className="line-through text-white/40 text-[10px]">
                        Std: {formatCompactPrice(selectedTypology.priceNgn, selectedTypology.priceUsd)}
                      </span>
                      <strong className="text-white font-bold text-sm">
                        From {formatCompactPrice(Math.round(selectedTypology.priceNgn * 0.9), Math.round(selectedTypology.priceUsd * 0.9))}
                      </strong>
                    </span>
                  ) : (
                    "Tap a typology below"
                  )}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider uppercase font-semibold">
                  10% Disc. Available
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-none bg-[var(--gold)]/10 text-[var(--gold)] font-mono text-[10px] tracking-wider uppercase font-semibold">
                  <span>✦</span> Discussable
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 rounded-none bg-white/[0.02] w-full">
              <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
                <h3 className="font-syne text-lg sm:text-2xl lg:text-3xl font-black uppercase text-white tracking-wide">
                  Complete Architectural Design Package
                </h3>
                <span className="font-mono text-[10px] sm:text-[11px] text-white/50 uppercase tracking-wider">
                  Select Project Typology below:
                </span>
              </div>

              {/* Second Layer: Interactive Typology Buttons with Direct Pricing (Full-Width on Mobile) */}
              <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 sm:gap-3 w-full">
                {TYPOLOGIES.map((typ) => {
                  const isSelected = selectedTypology?.id === typ.id;
                  return (
                    <button
                      key={typ.id}
                      type="button"
                      onClick={() => handleSelectTypology(typ)}
                      className={`w-full sm:w-auto px-4 sm:px-5 py-3 sm:py-3 rounded-none font-syne text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center justify-between sm:justify-start gap-2.5 ${
                        isSelected
                          ? "bg-emerald-500 text-black font-black shadow-[0_4px_20px_rgba(16,185,129,0.35)]"
                          : "bg-white/[0.03] hover:bg-white/[0.08] text-white/75 hover:text-white"
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected ? "text-black" : "text-white/40"}`}>
                        {isSelected ? "✓" : "○"}
                      </span>
                      <span>{typ.name}</span>
                      <div className="flex flex-col items-end text-right">
                        <span className={`text-[9.5px] line-through ${isSelected ? "text-neutral-800" : "text-white/40"}`}>
                          Std: {formatCompactPrice(typ.priceNgn, typ.priceUsd)}
                        </span>
                        <span
                          className={`font-mono text-[11px] font-bold ${
                            isSelected ? "text-neutral-900" : "text-[var(--gold)]"
                          }`}
                        >
                          From {formatCompactPrice(Math.round(typ.priceNgn * 0.9), Math.round(typ.priceUsd * 0.9))}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Micro Scope Benchmark Note (Compact & Subtle) */}
              <div className="pt-3 mt-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-white/45">
                <span>* Standard footprint (up to 4–5 beds / standard plot)</span>
                <span className="text-[var(--gold)]/80">✦ Custom compounds quoted upon brief</span>
              </div>
            </div>
          </div>

          {/* 02. OPTIONAL ADD-ONS: Digital, Branding, 3D Video, Training */}
          <div className="w-full pt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)] font-bold">
                  02 · Optional Add-Ons (Tap to Add to Cart)
                </span>
                <span className="text-[10px] font-mono text-[var(--gold)] uppercase font-semibold">
                  · Open to Discussion
                </span>
              </div>
              <button
                type="button"
                onClick={openCart}
                className="font-mono text-[11px] text-[var(--gold)] hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <CartTrolleyIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Scope Cart ({itemCount})</span>
                <span>↗</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 w-full">
              {ADD_ONS.map((addon) => {
                const isAdded = isAddOnInCart(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => handleToggleAddOn(addon)}
                    className={`p-4 sm:p-5 rounded-none text-left transition-all duration-300 cursor-pointer flex flex-col justify-between w-full ${
                      isAdded
                        ? "bg-emerald-500/[0.08] shadow-[0_10px_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                        : "bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 px-2 py-0.5 bg-white/[0.04] rounded-none">
                          {addon.category}
                        </span>
                        {addon.priceNgn > 0 ? (
                          <div className="flex flex-col items-end text-right">
                            <span className="font-mono text-[9px] text-white/40 line-through">
                              Std: {addon.priceFormatted}
                            </span>
                            <span
                              className={`font-mono text-xs font-bold ${
                                isAdded ? "text-emerald-400" : "text-[var(--gold)]"
                              }`}
                            >
                              + {formatCompactPrice(Math.round(addon.priceNgn * 0.9), Math.round(addon.priceUsd * 0.9))}
                            </span>
                            <span className="text-[8.5px] uppercase font-mono text-emerald-400 font-semibold">
                              10% Disc. · Discussable
                            </span>
                          </div>
                        ) : (
                          <span className="font-mono text-xs font-bold text-[var(--gold)]">
                            Discuss Your Project
                          </span>
                        )}
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
                      className={`w-full py-2.5 px-3 rounded-none font-mono text-[10px] uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? "bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_4px_20px_rgba(16,185,129,0.35)]"
                          : "bg-white/[0.04] text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{isAdded ? "✓ Added to Cart" : "+ Add to Cart"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 03. LIVE CART SUMMARY & DIRECT CLOSING BAR (Straight Corners, Seamless Line-Free Bar) */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 lg:p-8 rounded-none bg-black/80 backdrop-blur-md flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)] w-full">
            <div className="space-y-2 w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold">
                  Cart Scope Breakdown:
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  ({totalServicesCount} Service{totalServicesCount === 1 ? "" : "s"})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                {selectedTypology && (
                  <span className="px-2.5 py-1 bg-emerald-500/15 ring-1 ring-emerald-500/30 rounded-none font-syne font-semibold text-emerald-400 flex items-center gap-1">
                    ✓ {selectedTypology.name} (
                    {formatCompactPrice(selectedTypology.priceNgn, selectedTypology.priceUsd)})
                  </span>
                )}
                {selectedAddOns.map((addon) => (
                  <span
                    key={addon.id}
                    className="px-2.5 py-1 bg-emerald-500/15 ring-1 ring-emerald-500/30 rounded-none font-syne text-emerald-400 font-semibold flex items-center gap-1"
                  >
                    <span>✓</span> {addon.name}
                  </span>
                ))}
                {totalServicesCount === 0 && (
                  <span className="font-sans text-xs text-white/40 italic">
                    (Cart is on default — tap any typology or add-on above to begin calculation)
                  </span>
                )}
                {selectedTypology && selectedAddOns.length === 0 && (
                  <span className="font-sans text-xs text-white/40 italic">
                    (No add-ons selected — tap any card above to include)
                  </span>
                )}
              </div>

              <div className="font-mono text-xs text-white/60 pt-1 flex flex-col gap-1.5">
                {totalServicesCount > 0 ? (
                  <>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-white/45 line-through text-[11px]">
                        Standard Total: {formattedStandardTotal}
                      </span>
                      <span className="text-emerald-400 font-semibold text-[11px]">
                        Available 10% Discount: -{formattedDiscountAmount}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span>Estimated Discussable Total:</span>
                      <strong className="text-white font-bold text-base sm:text-lg text-[var(--gold)]">
                        {formattedDiscountedTotal}
                      </strong>
                      <span className="px-2.5 py-0.5 rounded-none bg-emerald-500/10 text-emerald-400 font-mono text-[10px] tracking-wider uppercase font-semibold">
                        All Prices Discussable
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Estimated Cart Total:</span>
                    <strong className="text-white font-bold text-sm">₦0 ($0)</strong>
                  </div>
                )}
                <p className="font-sans text-[11px] text-white/50 italic mt-1 max-w-xl leading-relaxed">
                  &ldquo;All prices are discussable. Enjoy up to 10% discount on applicable services. Final project fees are determined through consultation and agreement on project scope.&rdquo;
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                type="button"
                onClick={openCart}
                className="w-full sm:w-auto px-6 py-4 rounded-none bg-white/5 hover:bg-white/10 text-white font-syne font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CartTrolleyIcon className="w-4 h-4 text-emerald-400" />
                <span>Review Cart & Invoice Details</span>
                <span>↗</span>
              </button>

              <Magnetic strength={0.2} className="w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-none bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:scale-105 flex items-center justify-center gap-2 cursor-pointer inline-flex"
                >
                  <span>Claim Scope on WhatsApp</span>
                  <span>→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Green Cart Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[150] flex items-center gap-2.5 px-4 py-2.5 rounded-none bg-[#09150f]/95 border border-emerald-500/40 text-emerald-400 font-mono text-xs shadow-[0_10px_35px_rgba(16,185,129,0.35)] backdrop-blur-md pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <CartTrolleyIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}