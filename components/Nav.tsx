"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { ReviewModal } from "@/components/ReviewModal";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "3D Renders", href: "#renders" },
    { label: "Packages", href: "#packages" },
    { label: "Process", href: "#process" },
    { label: "Client Stories", href: "#testimonials" },
  ];

  return (
    <>
      {/* ─── Floating Nav Bar ─── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-5 lg:px-8 py-3 pointer-events-none"
      >
        {/*
          3-column grid so the centre nav links are ALWAYS mathematically centred:
          [logo · · · · ][nav links][· · · · actions]
          Each outer column takes equal "auto" space; the centre column takes 1fr.
        */}
        <div
          className={`
            max-w-[1600px] mx-auto pointer-events-auto
            grid grid-cols-[auto_1fr_auto] items-center
            px-4 sm:px-5 lg:px-7 py-2.5 sm:py-3 lg:py-3.5
            rounded-full transition-all duration-500 border
            ${
              scrolled || mobileMenuOpen
                ? "bg-[#09090d]/95 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] border-[var(--gold-border)]/35"
                : "bg-[#09090d]/80 backdrop-blur-md shadow-lg border-white/8"
            }
          `}
        >
          {/* ── Column 1: Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--gold)] group-hover:scale-125 transition-transform" />
            <span className="font-bebas text-lg sm:text-xl lg:text-2xl tracking-[2px] lg:tracking-[2.5px] text-white leading-none">
              ELEVATION&nbsp;<span className="text-[var(--gold)]">STUDIO</span>
            </span>
          </Link>

          {/* ── Column 2: Centre Nav Links (desktop only) ── */}
          <nav className="hidden lg:flex items-center justify-center">
            <ul className="flex items-center gap-5 xl:gap-8 font-mono text-[10px] xl:text-xs tracking-[2px] xl:tracking-widest text-[#f4f0e8]/75 uppercase">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="relative group py-1 hover:text-[var(--gold)] transition-colors duration-200"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── Column 3: Right Actions (desktop) + Hamburger (mobile) ── */}
          <div className="flex items-center justify-end gap-2 lg:gap-2.5 xl:gap-3 shrink-0">
            {/* Desktop-only actions */}
            <div className="hidden lg:flex items-center flex-row gap-2 xl:gap-2.5">
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="px-3 xl:px-4 py-1.5 xl:py-2 bg-[var(--gold)]/15 hover:bg-[var(--gold)] text-[var(--gold)] hover:text-[#060606] rounded-full font-mono text-[10px] xl:text-xs tracking-wider transition-all duration-300 border border-[var(--gold)]/25"
                  title="Submit a verified client review"
                >
                  Review Us
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="https://instagram.com/elevationstudio.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 xl:px-3.5 py-1.5 xl:py-2 bg-[#14141a] hover:bg-white/10 text-white/80 rounded-full font-mono text-[10px] xl:text-xs tracking-wider transition-colors border border-white/6"
                  title="@elevationstudio.ng"
                >
                  IG
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 xl:px-3.5 py-1.5 xl:py-2 bg-[#14141a] hover:bg-emerald-950/80 text-emerald-400 rounded-full font-mono text-[10px] xl:text-xs tracking-wider transition-colors border border-emerald-900/40"
                  title="WhatsApp Consultation"
                >
                  Chat
                </a>
              </Magnetic>

              <Magnetic strength={0.3}>
                <Link
                  href="/contact"
                  className="px-4 xl:px-5 py-2 xl:py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-[10px] xl:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md shadow-[var(--gold)]/20 hover:scale-[1.03] whitespace-nowrap"
                >
                  Start a Project →
                </Link>
              </Magnetic>
            </div>

            {/* Mobile / Tablet hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs text-[var(--gold)] uppercase bg-[#14141a] border border-[var(--gold-border)]/30 hover:bg-white/8 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? "CLOSE ✕" : "MENU ☰"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Mobile / Tablet Full-Screen Overlay ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[99] lg:hidden flex flex-col bg-[#06060a]/98 backdrop-blur-2xl overflow-y-auto"
            style={{ paddingTop: "76px" }}
          >
            {/* Nav links – centred */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6 py-10">
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[5px] text-[var(--gold)] uppercase mb-6">
                STUDIO NAVIGATION
              </p>
              <ul className="flex flex-col items-center gap-1 w-full">
                {navItems.map((item) => (
                  <li key={item.label} className="w-full text-center">
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bebas block py-2 text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] text-white hover:text-[var(--gold)] transition-colors tracking-wide"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom action strip */}
            <div className="shrink-0 px-6 sm:px-10 pb-10 pt-6 border-t border-white/10">
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[4px] text-[var(--muted)] uppercase text-center mb-5">
                DIRECT STUDIO CHANNELS
              </p>

              <div className="flex flex-col gap-3 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); setReviewModalOpen(true); }}
                  className="w-full py-3.5 rounded-full bg-[var(--gold)]/12 hover:bg-[var(--gold)]/20 text-[var(--gold)] font-mono text-xs tracking-widest uppercase border border-[var(--gold)]/30 transition-all"
                >
                  WRITE A CLIENT REVIEW
                </button>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs font-bold tracking-widest uppercase text-center shadow-lg shadow-[var(--gold)]/25 transition-all"
                >
                  START A PROJECT →
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-full bg-[#121217] hover:bg-[#1a1a22] text-emerald-400 font-mono text-[11px] tracking-wider text-center border border-emerald-900/40 transition-colors flex items-center justify-center"
                  >
                    WHATSAPP ↗
                  </a>
                  <a
                    href="https://instagram.com/elevationstudio.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-full bg-[#121217] hover:bg-[#1a1a22] text-[var(--gold)] font-mono text-[11px] tracking-wider text-center border border-[var(--gold-border)]/40 transition-colors flex items-center justify-center"
                  >
                    INSTAGRAM ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Review Modal ─── */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onReviewSubmitted={() => {
          window.dispatchEvent(new Event("elevation_review_submitted"));
        }}
      />
    </>
  );
}
