"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Elevation Studio × HomeCare™ — 10% Executive Privilege Card
   Header Image · Label Tag · Generous Left/Right Padding
   Official Partner Link: www.homecare.com.ng
───────────────────────────────────────────────────────────── */

const PROMO_CODE = "HOMECARE10";
const HOMECARE_URL = "https://www.homecare.com.ng";

export function HomecareSmartPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto trigger smoothly after a polite 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const dismissed = typeof window !== "undefined" ? sessionStorage.getItem("homecare_10_dismissed") : null;
      if (!dismissed) {
        setIsOpen(true);
      } else {
        setIsMinimized(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(PROMO_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
    sessionStorage.setItem("homecare_10_dismissed", "true");
  };

  const whatsappMessage = `Hello Elevation Studio! I would like to claim the 10% discount using code [${PROMO_CODE}] via www.homecare.com.ng for my upcoming architectural design / HomeCare smart project.`;
  const whatsappUrl = `https://wa.me/2349119059859?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          ELEGANT FLOATING BADGE (Bottom-Left)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMinimized && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-6 z-[9990] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0d0e14]/95 backdrop-blur-md border border-[var(--gold)]/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[var(--gold)] hover:shadow-[0_4px_25px_rgba(212,168,67,0.25)] transition-all">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="font-syne text-xs font-semibold text-white tracking-wide">
                10% OFF ALL DESIGNS
              </span>
              <span className="font-mono text-[10px] text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 rounded border border-[var(--gold)]/30 font-bold">
                {PROMO_CODE}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          MODAL POPUP WITH HEADER IMAGE & PADDED CARD BODY
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Card Chassis */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-[520px] bg-[#0c0d14] border border-[var(--gold)]/40 rounded-none shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 text-white my-auto overflow-hidden"
            >
              {/* ─────────────────────────────────────────────────────────────
                  HEADER IMAGE & LABEL TAG
              ───────────────────────────────────────────────────────────── */}
              <div className="relative w-full h-44 sm:h-52 overflow-hidden bg-black">
                <Image
                  src="/renders/modern_duplex_residence.jpg"
                  alt="Elevation Studio Modern Residential Architecture & HomeCare Smart Store"
                  fill
                  priority
                  loading="eager"
                  className="object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 600px) 100vw, 520px"
                />

                {/* Subtle dark gradient fade into card body */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/30 to-black/25" />

                {/* Top Gold Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

                {/* LABEL TAG (Prominent Badge on Header) */}
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[var(--gold)]/50 text-[var(--gold)] font-mono text-[10px] tracking-widest uppercase font-bold shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                  HOMECARE PRIVILEGE OFFER
                </div>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white/70 hover:text-white flex items-center justify-center text-xs transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  CARD BODY CONTENT WITH GENEROUS LEFT & RIGHT PADDING
              ───────────────────────────────────────────────────────────── */}
              <div className="px-6 sm:px-10 pb-7 sm:pb-9 pt-2">
                {/* Official HomeCare Link Row */}
                <div className="flex items-center justify-between text-xs font-mono py-1.5 px-3 rounded-none bg-white/[0.03] border border-white/10 mb-4">
                  <span className="text-white/60 flex items-center gap-1.5">
                    <span className="text-[var(--gold)]">✦</span>
                    <span>HomeCare Smart Store:</span>
                  </span>
                  <a
                    href={HOMECARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gold)] hover:text-white font-semibold underline underline-offset-4 flex items-center gap-1 transition-colors"
                  >
                    <span>www.homecare.com.ng</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>

                {/* Headline */}
                <h3 className="font-syne text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase leading-tight mb-2">
                  10% OFF ALL OUR <span className="text-[var(--gold)]">DESIGNS</span>
                </h3>

                {/* Subtitle */}
                <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed mb-5">
                  Planning a modern bungalow, luxury duplex, or smart residential build? Enjoy a flat 10% discount applied to all architectural packages and HomeCare smart integrations.
                </p>

                {/* 4 Clear Design Inclusions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-none bg-white/[0.03] border border-white/5 text-xs text-white/80">
                    <span className="text-[var(--gold)] font-bold">✓</span>
                    <span>Bungalow & Duplex Designs</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-none bg-white/[0.03] border border-white/5 text-xs text-white/80">
                    <span className="text-[var(--gold)] font-bold">✓</span>
                    <span>3D Realistic Renders & Walkthroughs</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-none bg-white/[0.03] border border-white/5 text-xs text-white/80">
                    <span className="text-[var(--gold)] font-bold">✓</span>
                    <span>Complete Architectural Working Drawings</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-none bg-white/[0.03] border border-white/5 text-xs text-white/80">
                    <span className="text-[var(--gold)] font-bold">✓</span>
                    <span>HomeCare Smart Home Integration</span>
                  </div>
                </div>

                {/* Promo Code Box */}
                <div className="flex items-center justify-between p-3.5 rounded-none bg-black/70 border border-[var(--gold)]/35 mb-5">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 block">
                      Use Promo Code
                    </span>
                    <span className="font-mono text-lg font-bold text-[var(--gold)] tracking-widest">
                      {PROMO_CODE}
                    </span>
                  </div>

                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-lg bg-[var(--gold)]/15 hover:bg-[var(--gold)]/25 text-[var(--gold)] border border-[var(--gold)]/40 font-mono text-xs font-semibold tracking-wider transition-colors cursor-pointer"
                  >
                    {copied ? "COPIED ✓" : "COPY CODE"}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5">
                  {/* Primary: WhatsApp Instant Claim */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-[var(--gold)] hover:bg-[#e0b753] text-black font-syne font-bold text-xs sm:text-sm tracking-wider uppercase text-center transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,168,67,0.3)] cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                    </svg>
                    CLAIM 10% ON WHATSAPP
                  </a>

                  {/* Secondary: Start Design Brief */}
                  <a
                    href={`/contact?promo=${PROMO_CODE}&service=residential-architecture`}
                    onClick={handleClose}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white/80 hover:text-white font-syne font-semibold text-xs tracking-wider uppercase text-center transition-colors block cursor-pointer"
                  >
                    Start Project Brief with Code
                  </a>
                </div>

                {/* Footer Link & Verification */}
                <div className="mt-4 pt-3 border-t border-white/5 text-center text-[10px] font-mono text-white/40">
                  <span>Valid for private homeowners & diaspora builds across Nigeria · </span>
                  <a
                    href={HOMECARE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gold)]/80 hover:text-[var(--gold)] underline"
                  >
                    www.homecare.com.ng
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
