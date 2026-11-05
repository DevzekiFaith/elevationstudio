"use client";

import React, { useState } from "react";
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
    if (ngn < 1000000) {
      return `₦${Math.round(ngn / 1000)}K (${ngn.toLocaleString()} NGN)`;
    }
    return `₦${(ngn / 1000000).toFixed(1)}M (${ngn.toLocaleString()} NGN)`;
  };

  const formattedTotal =
    currency === "USD"
      ? `$${totalUsd.toLocaleString()}`
      : currency === "GBP"
      ? `£${Math.round(totalUsd * 0.75).toLocaleString()}`
      : totalNgn < 1000000
      ? `₦${Math.round(totalNgn / 1000)}K (${totalNgn.toLocaleString()} NGN)`
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

          {/* Slide-Over Drawer Container with Generous Padding */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl h-full bg-[#090a0f] border-l border-white/[0.08] text-white flex flex-col justify-between shadow-[0_25px_100px_rgba(0,0,0,0.98)] overflow-hidden"
          >
            {/* 1. Header with Cart Bag Icon & Generous Padding */}
            <div className="px-7 sm:px-10 py-6 border-b border-white/[0.06] flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 flex items-center justify-center">
                  <CartBagIcon className="w-4 h-4 text-[var(--gold)]" />
                </div>
                <div>
                  <h2 className="font-syne text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                    Project Scope Cart
                  </h2>
                  <span className="font-mono text-[10px] text-white/50 tracking-wider">
                    {itemCount} {itemCount === 1 ? "Service Collected" : "Services Collected"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/[0.08] text-white font-mono text-[11px] uppercase tracking-wider transition-all cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* 2. Scrollable Body with Extra Padding */}
            <div className="flex-1 overflow-y-auto px-7 sm:px-10 py-8 space-y-8">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-5">
                  <div className="w-14 h-14 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto text-[var(--gold)]">
                    <CartBagIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-syne text-xl font-bold text-white uppercase mb-1">
                      Your Scope Cart is Empty
                    </h3>
                    <p className="font-sans text-xs text-white/60 max-w-sm mx-auto font-light leading-relaxed">
                      Select your primary architectural package or digital service to begin building your project quotation.
                    </p>
                  </div>
                  <a
                    href="#build-project"
                    onClick={closeCart}
                    className="inline-block px-7 py-3.5 rounded-full bg-[var(--gold)] text-black font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-md mt-2"
                  >
                    Build Scope Now →
                  </a>
                </div>
              ) : (
                <>
                  {/* Scope Items List with Generous Spacing */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 block font-bold">
                        Collected Services:
                      </span>
                      <span className="font-mono text-[10px] text-white/40">
                        {itemCount} item{itemCount === 1 ? "" : "s"}
                      </span>
                    </div>

                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 rounded-none bg-white/[0.02] border border-white/[0.06] relative group hover:border-white/15 transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--gold)] bg-[var(--gold)]/10 px-2.5 py-0.5 rounded-none font-bold inline-block mb-2">
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
                          <div className="pt-3 border-t border-white/[0.04] flex flex-wrap gap-2">
                            {item.deliverables.map((del, dIdx) => (
                              <span
                                key={dIdx}
                                className="font-sans text-[11px] text-white/70 bg-white/[0.03] px-2.5 py-1 rounded-none leading-tight"
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
                  <div className="pt-3">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 block mb-3.5 font-bold">
                      Add to Scope (+ 1 Tap):
                    </span>

                    <div className="space-y-3">
                      {QUICK_ADDONS.filter((qa) => !items.some((i) => i.id === qa.id)).map(
                        (addon) => (
                          <div
                            key={addon.id}
                            className="p-4 sm:p-4.5 rounded-none bg-black/40 border border-white/[0.05] flex items-center justify-between gap-4"
                          >
                            <div>
                              <span className="font-syne text-xs sm:text-sm font-bold text-white block mb-0.5">
                                {addon.title}
                              </span>
                              <span className="font-mono text-[11px] text-[var(--gold)]">
                                {formatPrice(addon.priceNgn, addon.priceUsd)}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => addItem(addon)}
                              className="px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white text-white hover:text-black font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer border border-white/10 shrink-0 flex items-center gap-1.5 shadow-sm"
                            >
                              <CartBagIcon className="w-3.5 h-3.5" />
                              <span>+ Add</span>
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Client Details for Official Order Placement */}
                  <div className="pt-3 space-y-4 border-t border-white/[0.06]">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 block font-bold">
                      Client Contact & Project Location:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-none bg-black/50 border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)]"
                      />
                      <input
                        type="text"
                        placeholder="WhatsApp / Phone Number"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-none bg-black/50 border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Project Location (e.g. Lekki Phase 1, Abuja, UK Diaspora)"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-none bg-black/50 border border-white/[0.08] text-white font-sans text-xs focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  {/* Studio Guarantees with Padding */}
                  <div className="p-4 sm:p-4.5 rounded-none bg-white/[0.02] border border-white/[0.05] flex flex-wrap items-center justify-between gap-2.5 text-[10px] font-mono text-white/60">
                    <span>✦ Registered COREN/ARCON Code</span>
                    <span>✦ Strict Mutual NDA</span>
                    <span>✦ 100% Remote Assured</span>
                  </div>
                </>
              )}
            </div>

            {/* 3. Checkout Footer with Extra Padding */}
            {items.length > 0 && (
              <div className="px-7 sm:px-10 py-7 border-t border-white/[0.06] bg-black/75 space-y-4">
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
                    <CartBagIcon className="w-4 h-4" />
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
