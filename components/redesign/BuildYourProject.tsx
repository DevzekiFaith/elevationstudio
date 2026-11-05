"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useCurrency } from "@/components/CurrencyContext";
import { useCart } from "@/components/cart/CartContext";

interface AddOn {
  id: string;
  name: string;
  category: "Digital" | "Branding" | "3D Visualization" | "Training";
  priceNgn: number;
  priceUsd: number;
  priceFormatted: string;
  desc: string;
}

const TYPOLOGIES = [
  "Duplex / Luxury Residence",
  "Bungalow Villa",
  "Commercial Plaza",
  "Church Auditorium",
  "Estate Masterplan",
];

const ADD_ONS: AddOn[] = [
  {
    id: "web-dev",
    name: "Website Development",
    category: "Digital",
    priceNgn: 600000,
    priceUsd: 450,
    priceFormatted: "+ ₦600K ($450)",
    desc: "Next.js estate portal, sales landing page & fast digital presence.",
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

  const [selectedTypology, setSelectedTypology] = useState(TYPOLOGIES[0]);

  // Base Architecture Price: ₦1.5M / $1,130
  const baseArchNgn = 1500000;
  const baseArchUsd = 1130;

  const handleSelectTypology = (typ: string) => {
    setSelectedTypology(typ);
    setPrimaryArchitectureTypology(typ);
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

  // Calculate live total cart baseline
  const addOnsTotalNgn = selectedAddOns.reduce((acc, item) => acc + item.priceNgn, 0);
  const addOnsTotalUsd = selectedAddOns.reduce((acc, item) => acc + item.priceUsd, 0);

  const totalNgn = baseArchNgn + addOnsTotalNgn;
  const totalUsd = baseArchUsd + addOnsTotalUsd;

  const formattedTotal =
    currency === "USD"
      ? `$${totalUsd.toLocaleString()}`
      : currency === "GBP"
      ? `£${Math.round(totalUsd * 0.75).toLocaleString()}`
      : `₦${(totalNgn / 1000000).toFixed(1)}M (${totalNgn.toLocaleString()} NGN)`;

  const whatsappMessage = `Hello Elevation Studio! I tailored a project scope on your website:
- Primary Architecture: Complete Architecture Package (${selectedTypology})
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
              Architecture is your primary foundation. Select optional add-ons below to add directly to your cart.
            </p>
          </Reveal>
        </div>

        {/* Outer Container (Hairline Border & Deep Soft Shadow) */}
        <div className="rounded-none bg-[#0a0a0f] border border-white/[0.06] p-6 sm:p-10 lg:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-10">
          {/* 01. PRIMARY FOUNDATION: Architecture */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.05]">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--gold)] font-bold">
                  01 · Primary Scope
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-black bg-[var(--gold)] font-bold px-2 py-0.5 rounded-full">
                  Included in Cart
                </span>
              </div>
              <span className="font-mono text-xs text-white/60">
                Baseline: <strong className="text-white font-semibold">From ₦1.5M ($1,130)</strong>
              </span>
            </div>

            <div className="p-6 rounded-none bg-white/[0.02] border border-white/[0.05] mb-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-syne text-lg sm:text-xl font-bold uppercase text-white">
                    Complete Architectural & Engineering Package
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-white/65 font-light mt-1">
                    Contractor-ready working drawings, structural/MEP calculations, and 4K photorealistic 3D renders.
                  </p>
                </div>
              </div>

              {/* Typology Pills */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2.5">
                  Select Project Typology:
                </span>
                <div className="flex flex-wrap gap-2">
                  {TYPOLOGIES.map((typ) => {
                    const isSelected = selectedTypology === typ;
                    return (
                      <button
                        key={typ}
                        type="button"
                        onClick={() => handleSelectTypology(typ)}
                        className={`px-4 py-2 rounded-full font-syne text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-white text-black font-bold shadow-md"
                            : "bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white/70 hover:text-white"
                        }`}
                      >
                        {typ}
                      </button>
                    );
                  })}
                </div>
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
                  ✓ Architecture: {selectedTypology}
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
