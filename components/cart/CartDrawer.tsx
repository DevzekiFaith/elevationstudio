"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, type CartItem } from "./CartContext";
import { useCurrency } from "@/components/CurrencyContext";

const QUICK_ADDONS: CartItem[] = [
  {
    id: "web-dev",
    title: "Next.js Estate Platform & Website",
    category: "Digital",
    priceNgn: 600000,
    priceUsd: 450,
    deliverables: ["Custom domain setup", "Mobile responsive portal", "Investor deck integration"],
  },
  {
    id: "3d-walkthrough",
    title: "4K Photorealistic Cinema Walkthrough",
    category: "3D Visualization",
    priceNgn: 500000,
    priceUsd: 375,
    deliverables: ["Full HD & 4K cinematic animation", "Social media video cuts", "Drone perspective"],
  },
  {
    id: "branding",
    title: "Complete Brand Identity System",
    category: "Branding",
    priceNgn: 400000,
    priceUsd: 300,
    deliverables: ["Logo suite & typography", "Executive color system", "Signage & print templates"],
  },
];

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, addItem, itemCount, totalNgn, totalUsd, clearCart } =
    useCart();
  const { currency } = useCurrency();

  // Checkout form fields
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [checkoutMode, setCheckoutMode] = useState<"whatsapp" | "invoice">("whatsapp");
  const [invoiceRequested, setInvoiceRequested] = useState(false);
  const [referenceId] = useState("ES-2026-8492");

  const formatPrice = (ngn: number, usd: number) => {
    if (ngn === 0) return "Custom Quote";
    if (currency === "USD") return `$${usd.toLocaleString()}`;
    if (currency === "GBP") return `£${Math.round(usd * 0.75).toLocaleString()}`;
    return `₦${(ngn / 1000000).toFixed(1)}M (${ngn.toLocaleString()} NGN)`;
  };

  const formattedTotal =
    currency === "USD"
      ? `$${totalUsd.toLocaleString()}`
      : currency === "GBP"
      ? `£${Math.round(totalUsd * 0.75).toLocaleString()}`
      : `₦${(totalNgn / 1000000).toFixed(1)}M (${totalNgn.toLocaleString()} NGN)`;

  const handleWhatsAppCheckout = () => {
    const itemLines = items
      .map(
        (it, idx) =>
          `${idx + 1}. ${it.title} [${it.category}] — ${formatPrice(it.priceNgn, it.priceUsd)}`
      )
      .join("\n");

    const message = `*ELEVATION STUDIO — ORDER CHECKOUT & SCOPE TRANSMISSION*
Ref ID: ${referenceId}
---------------------------------------------
*Client Information:*
Name: ${clientName.trim() || "Private Client"}
Contact: ${clientPhone.trim() || "Not specified"}
Project Location: ${projectLocation.trim() || "Nigeria / Diaspora"}

*Selected Service Scope (${itemCount} Item${itemCount === 1 ? "" : "s"}):*
${itemLines}

*Total Estimated Baseline:* ${formattedTotal}
---------------------------------------------
Please review my scope, confirm availability, and issue the formal itemized architectural contract.`;

    const url = `https://wa.me/2349119059859?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            onClick={closeCart}
          />

          {/* Slide-Over Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl h-full bg-[#090a0f] border-l border-white/[0.08] text-white flex flex-col justify-between shadow-[0_25px_100px_rgba(0,0,0,0.98)] overflow-hidden"
          >
            {/* 1. Header */}
            <div className="p-6 sm:p-7 border-b border-white/[0.06] flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
                <h2 className="font-syne text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                  Project Scope Cart
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 bg-white/[0.06] px-2.5 py-0.5 rounded-full">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </span>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-white font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* 2. Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-7">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <span className="text-4xl block mb-2">📐</span>
                  <h3 className="font-syne text-xl font-bold text-white uppercase">
                    Your Scope Cart is Empty
                  </h3>
                  <p className="font-sans text-xs text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                    Select your primary architectural package or digital service to begin building your project quotation.
                  </p>
                  <a
                    href="#build-project"
                    onClick={closeCart}
                    className="inline-block px-6 py-3 rounded-full bg-[var(--gold)] text-black font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-2"
                  >
                    Build Scope Now →
                  </a>
                </div>
              ) : (
                <>
                  {/* Scope Items List */}
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
                      Included Services & Deliverables:
                    </span>

                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-none bg-white/[0.02] border border-white/[0.06] relative group hover:border-white/15 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded-none font-bold inline-block mb-1.5">
                              {item.category}
                            </span>
                            <h4 className="font-syne text-base font-bold text-white leading-snug">
                              {item.title}
                            </h4>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono text-sm font-bold text-white block">
                              {formatPrice(item.priceNgn, item.priceUsd)}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="font-mono text-[10px] text-red-400 hover:text-red-300 underline mt-1 cursor-pointer block ml-auto"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Deliverables tags */}
                        {item.deliverables && item.deliverables.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-white/[0.04] flex flex-wrap gap-1.5">
                            {item.deliverables.map((del, dIdx) => (
                              <span
                                key={dIdx}
                                className="font-sans text-[10px] text-white/70 bg-white/[0.03] px-2 py-0.5 rounded-none"
                              >
                                ✓ {del}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quick-Add Upsell Add-ons */}
                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-3">
                      Add to Scope (+ 1 Tap):
                    </span>

                    <div className="space-y-2.5">
                      {QUICK_ADDONS.filter((qa) => !items.some((i) => i.id === qa.id)).map(
                        (addon) => (
                          <div
                            key={addon.id}
                            className="p-3.5 rounded-none bg-black/40 border border-white/[0.05] flex items-center justify-between gap-3"
                          >
                            <div>
                              <span className="font-syne text-xs font-bold text-white block">
                                {addon.title}
                              </span>
                              <span className="font-mono text-[10px] text-[var(--gold)]">
                                {formatPrice(addon.priceNgn, addon.priceUsd)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => addItem(addon)}
                              className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white text-white hover:text-black font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer border border-white/10 shrink-0"
                            >
                              + Add
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Client Details for Official Order Placement */}
                  <div className="pt-2 space-y-3.5 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
                      Client Contact & Project Location:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-3 rounded-none bg-black/50 border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)]"
                      />
                      <input
                        type="text"
                        placeholder="WhatsApp / Phone Number"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-none bg-black/50 border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Project Location (e.g. Lekki Phase 1, Abuja, UK Diaspora)"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-none bg-black/50 border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  {/* Studio Guarantees */}
                  <div className="p-4 rounded-none bg-white/[0.02] border border-white/[0.05] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-white/60">
                    <span>✦ Registered COREN/ARCON Code</span>
                    <span>✦ Strict Mutual NDA</span>
                    <span>✦ 100% Remote Assured</span>
                  </div>
                </>
              )}
            </div>

            {/* 3. Checkout Footer */}
            {items.length > 0 && (
              <div className="p-6 sm:p-7 border-t border-white/[0.06] bg-black/70 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">
                      Total Estimated Baseline
                    </span>
                    <span className="font-mono text-xs text-white/60">
                      Itemised quotation confirmed upon site brief
                    </span>
                  </div>

                  <span className="font-syne text-2xl sm:text-3xl font-black text-[var(--gold)]">
                    {formattedTotal}
                  </span>
                </div>

                {/* Checkout Mode Toggle */}
                <div className="flex rounded-none bg-black border border-white/[0.08] p-1 text-[11px] font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutMode("whatsapp");
                      setInvoiceRequested(false);
                    }}
                    className={`flex-1 py-2 text-center transition-all cursor-pointer ${
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
                    className={`flex-1 py-2 text-center transition-all cursor-pointer ${
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
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Transmit Scope on WhatsApp</span>
                    <span>→</span>
                  </button>
                ) : invoiceRequested ? (
                  <div className="p-4 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs space-y-1">
                    <div className="font-bold">✓ Invoice Request Registered: {referenceId}</div>
                    <div className="text-[11px] text-white/80">
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
                    className="w-full py-4 px-6 rounded-xl bg-white hover:bg-[var(--gold)] text-black font-syne font-black text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
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
