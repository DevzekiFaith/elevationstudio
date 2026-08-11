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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
      {/* ─── Modern Floating Navigation Header ─── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 lg:px-8 py-4 pointer-events-none"
      >
        {/* Using a grid with auto-1fr-auto to ensure mathematical centering of navigation links */}
        <div
          className={`
            max-w-[1440px] mx-auto pointer-events-auto
            grid grid-cols-[auto_1fr_auto] items-center
            px-5 sm:px-6 lg:px-8 py-3 lg:py-3.5
            rounded-full transition-all duration-500 border
            ${
              scrolled || mobileMenuOpen
                ? "bg-[#09090d]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] border-[var(--gold-border)]/40"
                : "bg-[#060608]/75 backdrop-blur-md shadow-lg border-white/5"
            }
          `}
        >
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-bebas text-lg sm:text-xl lg:text-2xl tracking-[2.5px] text-white leading-none">
              ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
            </span>
          </Link>

          {/* Navigation Links with sliding background highlight */}
          {/* Using a div instead of a nav tag to avoid conflicting with the global `nav` selector in globals.css */}
          <div className="hidden lg:flex items-center justify-center">
            <ul 
              className="relative flex items-center gap-1 p-1 bg-white/[0.03] rounded-full border border-white/5"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, idx) => (
                <li key={item.label} className="relative">
                  <a
                    href={item.href}
                    className="relative z-10 block px-4 py-2 font-mono text-[11px] xl:text-xs tracking-wider uppercase transition-colors duration-300 rounded-full"
                    style={{
                      color: hoveredIndex === idx ? "var(--white)" : "var(--white-dim)"
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                  >
                    {item.label}
                  </a>

                  {/* Animated sliding background pill */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30
                        }}
                      />
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions / CTA Section */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Magnetic strength={0.15}>
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="px-4 py-2 bg-white/5 hover:bg-[var(--gold)]/10 text-white hover:text-[var(--gold)] rounded-full font-mono text-[11px] xl:text-xs tracking-wider transition-all duration-300 border border-white/10 hover:border-[var(--gold-border)]"
                  title="Submit a verified client review"
                >
                  Review Us
                </button>
              </Magnetic>

              <Magnetic strength={0.15}>
                <a
                  href="https://instagram.com/elevationstudio.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#0d0d11] hover:bg-white/10 text-white/80 rounded-full font-mono text-[11px] xl:text-xs tracking-wider transition-colors border border-white/5"
                  title="Follow on Instagram"
                >
                  IG
                </a>
              </Magnetic>

              <Magnetic strength={0.15}>
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#0d0d11] hover:bg-emerald-950/50 text-emerald-400 rounded-full font-mono text-[11px] xl:text-xs tracking-wider transition-colors border border-emerald-950/40"
                  title="WhatsApp Chat"
                >
                  Chat
                </a>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-[11px] xl:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md shadow-[var(--gold)]/10 hover:scale-[1.02]"
                >
                  Start a Project →
                </Link>
              </Magnetic>
            </div>

            {/* Mobile / Tablet Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white hover:text-[var(--gold)] hover:border-[var(--gold-border)] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between items-center">
                <span className={`w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`w-4 h-[1.5px] bg-current rounded-full transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Modern Mobile Navigation Full-Screen Overlay ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] lg:hidden bg-[#060609]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto"
            style={{ paddingTop: "88px" }}
          >
            {/* Nav links block */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
              <span className="font-mono text-[10px] tracking-[5px] text-[var(--gold)] uppercase mb-8 opacity-75">
                STUDIO NAVIGATION
              </span>
              <ul className="flex flex-col items-center gap-2 w-full max-w-md">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="w-full text-center"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bebas block py-2 text-4xl sm:text-5xl md:text-6xl text-white hover:text-[var(--gold)] transition-colors tracking-widest"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Actions Section */}
            <div className="shrink-0 px-6 sm:px-10 pb-12 pt-6 border-t border-white/5 bg-[#08080c]/50">
              <div className="max-w-md mx-auto flex flex-col gap-4">
                <span className="font-mono text-[9px] tracking-[4px] text-[var(--muted)] uppercase text-center mb-2">
                  DIRECT STUDIO CHANNELS
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setReviewModalOpen(true);
                  }}
                  className="w-full py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase border border-white/10 transition-all duration-300"
                >
                  Write a Client Review
                </button>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 rounded-full bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs font-bold tracking-widest uppercase text-center shadow-lg shadow-[var(--gold)]/10 transition-all duration-300"
                >
                  Start a Project →
                </Link>

                <div className="grid grid-cols-2 gap-3 w-full">
                  <a
                    href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-full bg-[#121217] text-emerald-400 font-mono text-xs tracking-wider text-center border border-emerald-950 transition-colors flex items-center justify-center"
                  >
                    WHATSAPP
                  </a>
                  <a
                    href="https://instagram.com/elevationstudio.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 rounded-full bg-[#121217] text-[var(--gold)] font-mono text-xs tracking-wider text-center border border-[var(--gold-border)]/20 transition-colors flex items-center justify-center"
                  >
                    INSTAGRAM
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Review Modal */}
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
