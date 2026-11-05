"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, type CartItem } from "./CartContext";
import { useCurrency } from "@/components/CurrencyContext";

function CartBagIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}

const QUICK_ADDONS: CartItem[] = [
  {
    id: "web-dev",
    title: "Estate Platform & Website Development",
    category: "Digital",
    priceNgn: 300000,
    priceUsd: 225,
    deliverables: ["Custom domain setup", "Mobile responsive portal", "Investor deck integration"],
  },
  {
    id: "3d-walkthrough",
    title: "4K Photorealistic Cinema Walkthrough",
    category: "3D Visualization",
    priceNgn: 250000,
    priceUsd: 190,
    deliverables: ["Full HD & 4K cinematic animation", "Social media video cuts", "Drone perspective"],
  },
  {
    id: "branding",
    title: "Complete Brand Identity System",
    category: "Branding",
    priceNgn: 200000,
    priceUsd: 150,
    deliverables: ["Logo suite & typography", "Executive color system", "Signage & print templates"],
  },
];

const CLIENT_PROFILES = [
  "Private Homeowner / Diaspora",
  "Property Developer",
  "Architecture Firm / Contractor",
];

const PLOT_SIZES = [
  "Standard Plot (300 - 600 sqm)",
  "Multi-Plot (1,000+ sqm)",
  "Commercial / Acreage",
  "Not Measured Yet",
];

const TIMELINES = [
  "Immediate (0 - 30 days)",
  "Planning (1 - 3 months)",
  "Feasibility & Budgeting",
];

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, addItem, itemCount, totalNgn, totalUsd, clearCart } =
    useCart();
  const { currency } = useCurrency();

  // Detailed client intake form fields
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [clientProfile, setClientProfile] = useState(CLIENT_PROFILES[0]);
  const [plotSize, setPlotSize] = useState(PLOT_SIZES[0]);
  const [targetTimeline, setTargetTimeline] = useState(TIMELINES[0]);
  const [projectNotes, setProjectNotes] = useState("");

  const [checkoutMode, setCheckoutMode] = useState<"whatsapp" | "invoice">("whatsapp");
  const [invoiceRequested, setInvoiceRequested] = useState(false);
  const [referenceId] = useState("ES-2026-8492");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  const formatPrice = (ngn: number, usd: number) => {
    if (ngn === 0) return "Custom Quote";
    if (currency === "USD") return `$${usd.toLocaleString()}`;
    if (currency === "GBP") return `£${Math.round(usd * 0.75).toLocaleString()}`;
    if (ngn < 1000000) {
      return `₦${Math.round(ngn / 1000)}K (${ngn.toLocaleString()} NGN)`;
    }
    const inM = ngn / 1000000;
    const mStr = inM % 1 === 0 ? inM.toString() : inM.toFixed(2).replace(/0$/, "");
    return `₦${mStr}M (${ngn.toLocaleString()} NGN)`;
  };

  const formattedTotal =
    currency === "USD"
      ? `$${totalUsd.toLocaleString()}`
      : currency === "GBP"
      ? `£${Math.round(totalUsd * 0.75).toLocaleString()}`
      : totalNgn < 1000000
      ? `₦${Math.round(totalNgn / 1000)}K (${totalNgn.toLocaleString()} NGN)`
      : (() => {
          const inM = totalNgn / 1000000;
          const mStr = inM % 1 === 0 ? inM.toString() : inM.toFixed(2).replace(/0$/, "");
          return `₦${mStr}M (${totalNgn.toLocaleString()} NGN)`;
        })();

  const handleWhatsAppCheckout = () => {
    const itemLines = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.title} [${it.category}] — ${formatPrice(it.priceNgn, it.priceUsd)}`
      )
      .join("\n");

    const message = `*ELEVATION STUDIO — OFFICIAL PROJECT SCOPE & ORDER TRANSMISSION*
Ref ID: ${referenceId}
---------------------------------------------
*Client Information & Project Profile:*
• Full Name: ${clientName.trim() || "Private Client"}
• Phone / WhatsApp: ${clientPhone.trim() || "Not specified"}
• Email: ${clientEmail.trim() || "Not specified"}
• Project Location: ${projectLocation.trim() || "Nigeria / Diaspora"}
• Client Category: ${clientProfile}
• Approximate Plot Size: ${plotSize}
• Target Timeline: ${targetTimeline}
${projectNotes.trim() ? `• Project Notes: ${projectNotes.trim()}\n` : ""}
*Selected Scope Deliverables (${itemCount} Item${itemCount === 1 ? "" : "s"}):*
${itemLines}

*Total Estimated Baseline:* ${formattedTotal} (Open to Discussion)
---------------------------------------------
Please review my detailed scope, confirm availability, and prepare the formal itemized contract.`;

    const url = `https://wa.me/2349119059859?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop with Soft Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            onClick={closeCart}
          />

          {/* Slide-Over Drawer Container with Wide Luxury Framing */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative z-10 w-full max-w-[640px] h-full bg-[#08080c] border-l border-white/[0.08] text-white flex flex-col justify-between shadow-[0_25px_100px_rgba(0,0,0,0.98)] overflow-hidden"
          >
            {/* 1. Header with Generous Padding */}
            <div className="px-8 sm:px-12 py-7 sm:py-8 border-b border-white/[0.06] flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center">
                  <CartBagIcon className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[3px] text-[var(--gold)] block mb-0.5 font-bold">
                    Elevation Studio
                  </span>
                  <h2 className="font-syne text-xl sm:text-2xl font-extrabold uppercase tracking-wide text-white leading-none">
                    Project Scope Cart
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 bg-white/[0.06] px-3 py-1 rounded-full">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </span>
                <button
                  type="button"
                  onClick={closeCart}
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-white font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* 2. Scrollable Body with Spacious Padding */}
            <div className="flex-1 overflow-y-auto px-8 sm:px-12 py-8 sm:py-10 space-y-10">
              {items.length === 0 ? (
                <div className="text-center py-24 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto text-[var(--gold)] shadow-lg">
                    <CartBagIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-syne text-2xl font-bold text-white uppercase mb-2">
                      Your Scope Cart is Empty
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                      Select your primary architectural package or digital add-ons to build your customized project invoice.
                    </p>
                  </div>
                  <a
                    href="#build-project"
                    onClick={closeCart}
                    className="inline-block px-8 py-4 rounded-full bg-[var(--gold)] text-black font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-3"
                  >
                    Build Scope Now →
                  </a>
                </div>
              ) : (
                <>
                  {/* Scope Items List with Generous Spacing */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 block font-bold">
                        Collected Project Services:
                      </span>
                      <span className="font-mono text-[10px] text-white/40">
                        {itemCount} active deliverable{itemCount === 1 ? "" : "s"}
                      </span>
                    </div>

                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 sm:p-7 rounded-none bg-[#0d0e15] border border-white/[0.06] relative group hover:border-white/20 transition-all space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--gold)] bg-[var(--gold)]/10 px-2.5 py-0.5 rounded-none font-bold inline-block">
                              {item.category}
                            </span>
                            <h4 className="font-syne text-base sm:text-lg font-bold text-white leading-snug">
                              {item.title}
                            </h4>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono text-sm sm:text-base font-bold text-white block">
                              {formatPrice(item.priceNgn, item.priceUsd)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="font-mono text-[10px] text-red-400 hover:text-red-300 underline mt-1.5 cursor-pointer block ml-auto transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Deliverables tags with comfortable padding */}
                        {item.deliverables && item.deliverables.length > 0 && (
                          <div className="pt-3 border-t border-white/[0.05] flex flex-wrap gap-2">
                            {item.deliverables.map((del, dIdx) => (
                              <span
                                key={dIdx}
                                className="font-sans text-[11px] text-white/75 bg-white/[0.04] px-3 py-1 rounded-none leading-relaxed"
                              >
                                ✓ {del}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quick-Add Upsell Add-ons with Airy Padding */}
                  <div className="pt-2">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 block mb-4 font-bold">
                      Add to Scope (+ 1 Tap):
                    </span>

                    <div className="space-y-3.5">
                      {QUICK_ADDONS.filter((qa) => !items.some((i) => i.id === qa.id)).map(
                        (addon) => (
                          <div
                            key={addon.id}
                            className="p-5 sm:p-5.5 rounded-none bg-[#0a0b12] border border-white/[0.05] hover:border-white/10 transition-colors flex items-center justify-between gap-4"
                          >
                            <div className="space-y-0.5">
                              <span className="font-syne text-sm font-bold text-white block">
                                {addon.title}
                              </span>
                              <span className="font-mono text-[11px] text-[var(--gold)]">
                                {formatPrice(addon.priceNgn, addon.priceUsd)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => addItem(addon)}
                              className="px-4.5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white text-white hover:text-black font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer border border-white/10 shrink-0 flex items-center gap-1.5 shadow-sm"
                            >
                              <CartBagIcon className="w-3.5 h-3.5" />
                              <span>+ Add</span>
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Comprehensive Detailed Client Intake Form */}
                  <div className="pt-4 space-y-6 border-t border-white/[0.06]">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--gold)] block font-bold mb-1">
                        Client Information & Delivery Destination:
                      </span>
                      <p className="font-sans text-xs text-white/60 font-light">
                        Used to prepare your official itemized contract and schedule the architectural consultation.
                      </p>
                    </div>

                    {/* Full Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-bold">
                          Full Name:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Engr. Kunle Adeyemi"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-none bg-[#0a0a10] border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-bold">
                          Phone / WhatsApp:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. +234 803 000 0000 or UK/US"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-none bg-[#0a0a10] border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-bold">
                          Email Address (For PDF Invoice):
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. client@example.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-none bg-[#0a0a10] border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-bold">
                          Site / Project Location:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Lekki Phase 1, Lagos | Ogun Corridor | Abuja"
                          value={projectLocation}
                          onChange={(e) => setProjectLocation(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-none bg-[#0a0a10] border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Client Profile Category */}
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-bold">
                        Client Category:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {CLIENT_PROFILES.map((prof) => (
                          <button
                            key={prof}
                            type="button"
                            onClick={() => setClientProfile(prof)}
                            className={`px-3.5 py-2 rounded-full font-syne text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                              clientProfile === prof
                                ? "bg-white text-black font-bold shadow-sm"
                                : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] text-white/70"
                            }`}
                          >
                            {prof}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Approximate Plot Size */}
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-bold">
                        Approximate Plot Dimensions:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PLOT_SIZES.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setPlotSize(size)}
                            className={`px-3.5 py-2 rounded-full font-syne text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                              plotSize === size
                                ? "bg-white text-black font-bold shadow-sm"
                                : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] text-white/70"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Timeline */}
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-2 font-bold">
                        Target Project Start Timeline:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TIMELINES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTargetTimeline(t)}
                            className={`px-3.5 py-2 rounded-full font-syne text-[11px] uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                              targetTimeline === t
                                ? "bg-white text-black font-bold shadow-sm"
                                : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] text-white/70"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Optional Brief Notes */}
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1.5 font-bold">
                        Brief Project Notes / Architectural Requirements (Optional):
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. 5-bedroom duplex with cantilever terrace, rooftop lounge, and perimeter security lighting..."
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        className="w-full px-4 py-3 rounded-none bg-[#0a0a10] border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Clean Studio Guarantees Badge (COREN removed) */}
                  <div className="p-4 sm:p-5 rounded-none bg-white/[0.02] border border-white/[0.05] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-white/60">
                    <span>✦ Strict Mutual NDA</span>
                    <span>✦ 100% Remote Project Assurance</span>
                    <span>✦ Contractor-Ready Drawing Sets</span>
                  </div>
                </>
              )}
            </div>

            {/* 3. Checkout Footer with Spacious Layout */}
            {items.length > 0 && (
              <div className="px-8 sm:px-12 py-7 sm:py-8 border-t border-white/[0.08] bg-[#06060a]/95 space-y-5">
                <div className="flex items-baseline justify-between pb-1">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-0.5">
                      Total Estimated Baseline
                    </span>
                    <span className="font-mono text-xs text-white/60">
                      Confirmed upon site dimension brief
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="font-syne text-2xl sm:text-3xl font-black text-[var(--gold)] block">
                      {formattedTotal}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider block mt-0.5">
                      Open to Discussion
                    </span>
                  </div>
                </div>

                {/* Checkout Mode Toggle */}
                <div className="flex rounded-none bg-black border border-white/[0.08] p-1 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutMode("whatsapp");
                      setInvoiceRequested(false);
                    }}
                    className={`flex-1 py-2.5 text-center transition-all cursor-pointer ${
                      checkoutMode === "whatsapp"
                        ? "bg-white text-black font-bold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Direct WhatsApp Checkout
                  </button>
                  <button
                    type="button"
                    onClick={() => setCheckoutMode("invoice")}
                    className={`flex-1 py-2.5 text-center transition-all cursor-pointer ${
                      checkoutMode === "invoice"
                        ? "bg-white text-black font-bold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    Official Digital Invoice
                  </button>
                </div>

                {checkoutMode === "whatsapp" ? (
                  <button
                    type="button"
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4.5 px-7 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_4px_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <CartBagIcon className="w-4 h-4" />
                    <span>Transmit Scope on WhatsApp</span>
                    <span>→</span>
                  </button>
                ) : invoiceRequested ? (
                  <div className="p-4 sm:p-5 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs space-y-1.5">
                    <div className="font-bold flex items-center gap-2">
                      <span>✓</span> Invoice Request Registered: {referenceId}
                    </div>
                    <div className="text-[11px] text-white/80 leading-relaxed font-light">
                      Our commercial team has compiled your itemized bill. Transmit to WhatsApp or check your email for the verified PDF invoice.
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setInvoiceRequested(true);
                      handleWhatsAppCheckout();
                    }}
                    className="w-full py-4.5 px-7 rounded-xl bg-white hover:bg-[var(--gold)] text-black font-syne font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <CartBagIcon className="w-4 h-4" />
                    <span>Generate & Transmit Invoice ({referenceId})</span>
                    <span>→</span>
                  </button>
                )}

                <div className="flex justify-between items-center text-[10px] font-mono text-white/40 pt-1">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="hover:text-red-400 underline cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  <span>Ref: {referenceId}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
