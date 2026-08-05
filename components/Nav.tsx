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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
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
      {/* Floating Modern Glassmorphic Nav Header Bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-3 transition-all duration-300 pointer-events-none"
      >
        <div
          className={`max-w-[1400px] mx-auto pointer-events-auto flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 ${
            scrolled || mobileMenuOpen
              ? "bg-[#09090d]/90 border border-[var(--gold-border)]/50 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.8)]"
              : "bg-[#09090d]/60 border border-white/10 backdrop-blur-md shadow-lg"
          }`}
        >
          {/* Logo Branding */}
          <Link
            href="/"
            className="nav-logo flex items-center gap-2 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] group-hover:scale-125 transition-transform" />
            <span className="font-bebas text-xl md:text-2xl tracking-[2.5px] text-white">
              ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Center Navigation Links */}
          <ul className="hidden lg:flex items-center gap-8 font-mono text-xs tracking-widest text-[#f4f0e8]/80 uppercase">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-[var(--gold)] transition-colors duration-200 py-1 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right Action Toolbar */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Review Us Pill Button */}
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={() => setReviewModalOpen(true)}
                className="px-4 py-2 bg-[var(--gold)]/10 hover:bg-[var(--gold)] text-[var(--gold)] hover:text-[#060606] border border-[var(--gold-border)] rounded-full font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-sm"
                title="Submit a verified client review"
              >
                <span>★</span>
                <span>Review Us</span>
              </button>
            </Magnetic>

            {/* Quick Instagram Icon Pill */}
            <Magnetic strength={0.2}>
              <a
                href="https://instagram.com/elevationstudio.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#14141a] hover:bg-white/10 text-white/90 border border-white/15 rounded-full font-mono text-xs tracking-wider transition-colors flex items-center gap-1"
                title="Follow Elevation Studio on Instagram (@elevationstudio.ng)"
              >
                <span>📸</span>
                <span className="text-[11px]">IG</span>
              </a>
            </Magnetic>

            {/* Quick WhatsApp Icon Pill */}
            <Magnetic strength={0.2}>
              <a
                href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-[#14141a] hover:bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded-full font-mono text-xs tracking-wider transition-colors flex items-center gap-1"
                title="Direct WhatsApp Consultation (09119059859)"
              >
                <span>💬</span>
                <span className="text-[11px]">Chat</span>
              </a>
            </Magnetic>

            {/* Primary CTA Button */}
            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md shadow-[var(--gold)]/20 hover:scale-[1.03]"
              >
                Start a Project →
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center gap-2 px-3.5 py-2 border border-[var(--gold-border)] rounded-full text-xs font-mono text-[var(--gold)] uppercase bg-[#060606]/90 backdrop-blur-md"
            aria-label="Toggle Navigation Menu"
          >
            <span>{mobileMenuOpen ? "CLOSE ✕" : "MENU ☰"}</span>
          </button>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[76px] z-[99] bg-[#060606]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-10 border-t border-[var(--gold-border)]/30 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-4">
              <div className="font-mono text-[10px] tracking-[4px] text-[var(--gold)] uppercase border-b border-white/10 pb-3">
                STUDIO NAVIGATION
              </div>

              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bebas text-4xl text-white hover:text-[var(--gold)] transition-colors tracking-wide block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Action Channels & Review Triggers */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-8">
              <div className="font-mono text-[10px] tracking-[3px] text-[var(--muted)] uppercase">
                DIRECT STUDIO CHANNELS
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReviewModalOpen(true);
                }}
                className="w-full py-3.5 bg-[var(--gold)]/15 border border-[var(--gold)] text-[var(--gold)] font-mono text-xs font-semibold tracking-wider text-center uppercase rounded-xl flex items-center justify-center gap-2"
              >
                ★ WRITE A CLIENT REVIEW
              </button>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 bg-[var(--gold)] text-[#060606] font-mono text-xs font-bold tracking-wider text-center uppercase rounded-xl shadow-lg"
              >
                START A PROJECT →
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-[#121217] border border-emerald-500/30 text-emerald-400 font-mono text-[11px] text-center rounded-xl tracking-wider flex items-center justify-center gap-1.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>💬</span> WHATSAPP ↗
                </a>

                <a
                  href="https://instagram.com/elevationstudio.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-[#121217] border border-white/15 text-[var(--gold)] font-mono text-[11px] text-center rounded-xl tracking-wider flex items-center justify-center gap-1.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>📸</span> INSTAGRAM ↗
                </a>
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
