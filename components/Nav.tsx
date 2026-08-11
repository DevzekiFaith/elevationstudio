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
      {/* Floating Glassmorphic Responsive Nav Bar for All Screen Sizes */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 md:px-8 py-3 transition-all duration-300 pointer-events-none"
      >
        <div
          className={`max-w-[1440px] mx-auto pointer-events-auto flex items-center justify-between px-4 sm:px-6 xl:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-500 border border-white/10 ${
            scrolled || mobileMenuOpen
              ? "bg-[#09090d]/95 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.85)] border-[var(--gold-border)]/40"
              : "bg-[#09090d]/80 backdrop-blur-md shadow-lg"
          }`}
        >
          {/* Logo Branding */}
          <Link
            href="/"
            className="nav-logo flex items-center gap-2 group flex-shrink-0 whitespace-nowrap"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] group-hover:scale-125 transition-transform" />
            <span className="font-bebas text-xl sm:text-2xl tracking-[2px] sm:tracking-[2.5px] text-white">
              ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Center Navigation Links - Responsive Gaps & Typography */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 xl:mx-8">
            <ul className="flex items-center justify-center gap-4 xl:gap-7 2xl:gap-8 font-mono text-[11px] xl:text-xs tracking-widest text-[#f4f0e8]/80 uppercase whitespace-nowrap">
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
          </nav>

          {/* Desktop Right Action Toolbar - Clean Scaling for Laptops & Desktops */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0 whitespace-nowrap">
            {/* Review Us Button */}
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={() => setReviewModalOpen(true)}
                className="px-3 xl:px-4 py-1.5 xl:py-2 bg-[var(--gold)]/15 hover:bg-[var(--gold)] text-[var(--gold)] hover:text-[#060606] rounded-full font-mono text-[11px] xl:text-xs tracking-wider transition-all duration-300 flex items-center shadow-sm border border-[var(--gold)]/20"
                title="Submit a verified client review"
              >
                <span>Review Us</span>
              </button>
            </Magnetic>

            {/* Instagram Pill (Visible on Large Laptops+) */}
            <Magnetic strength={0.2}>
              <a
                href="https://instagram.com/elevationstudio.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex px-3.5 py-2 bg-[#14141a] hover:bg-white/10 text-white/90 rounded-full font-mono text-xs tracking-wider transition-colors items-center border border-white/5"
                title="Follow Elevation Studio on Instagram (@elevationstudio.ng)"
              >
                <span className="text-[11px]">IG</span>
              </a>
            </Magnetic>

            {/* WhatsApp Pill (Visible on Large Laptops+) */}
            <Magnetic strength={0.2}>
              <a
                href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex px-3.5 py-2 bg-[#14141a] hover:bg-emerald-950/80 text-emerald-400 rounded-full font-mono text-xs tracking-wider transition-colors items-center border border-emerald-950"
                title="Direct WhatsApp Consultation (09119059859)"
              >
                <span className="text-[11px]">Chat</span>
              </a>
            </Magnetic>

            {/* Primary CTA Button */}
            <Magnetic strength={0.3}>
              <Link
                href="/contact"
                className="px-4 xl:px-5 py-2 xl:py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-[11px] xl:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md shadow-[var(--gold)]/20 hover:scale-[1.03]"
              >
                Start a Project →
              </Link>
            </Magnetic>
          </div>

          {/* Mobile & Tablet Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-mono text-[var(--gold)] uppercase bg-[#14141a] border border-[var(--gold-border)]/30 hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span>{mobileMenuOpen ? "CLOSE ✕" : "MENU ☰"}</span>
          </button>
        </div>
      </motion.header>

      {/* Full-Screen Responsive Mobile & Tablet Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[64px] sm:top-[76px] z-[99] bg-[#060609]/98 backdrop-blur-2xl flex flex-col justify-between items-center text-center p-6 sm:p-10 lg:hidden overflow-y-auto"
          >
            <div className="w-full max-w-lg flex flex-col items-center gap-6 pt-4 mx-auto">
              <div className="font-mono text-[10px] sm:text-xs tracking-[4px] text-[var(--gold)] uppercase text-center pb-2">
                STUDIO NAVIGATION
              </div>

              <ul className="flex flex-col items-center gap-4 sm:gap-6 w-full">
                {navItems.map((item) => (
                  <li key={item.label} className="w-full text-center">
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white hover:text-[var(--gold)] transition-colors tracking-widest block text-center py-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Action Channels & Review Triggers */}
            <div className="w-full max-w-lg flex flex-col items-center gap-4 pt-6 mt-8 border-t border-white/10 mx-auto">
              <div className="font-mono text-[10px] sm:text-xs tracking-[3px] text-[var(--muted)] uppercase text-center">
                DIRECT STUDIO CHANNELS
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReviewModalOpen(true);
                }}
                className="w-full py-3.5 sm:py-4 bg-[var(--gold)]/15 hover:bg-[var(--gold)]/25 text-[var(--gold)] font-mono text-xs sm:text-sm font-semibold tracking-wider text-center uppercase rounded-full flex items-center justify-center gap-2 border border-[var(--gold)]/30 transition-all"
              >
                WRITE A CLIENT REVIEW
              </button>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 sm:py-4.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold tracking-widest text-center uppercase rounded-full shadow-lg shadow-[var(--gold)]/20 transition-all"
              >
                START A PROJECT →
              </Link>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 sm:py-3.5 px-4 bg-[#121217] hover:bg-[#1a1a22] text-emerald-400 font-mono text-[11px] sm:text-xs text-center rounded-full tracking-wider flex items-center justify-center gap-1 border border-emerald-950 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  WHATSAPP ↗
                </a>

                <a
                  href="https://instagram.com/elevationstudio.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 sm:py-3.5 px-4 bg-[#121217] hover:bg-[#1a1a22] text-[var(--gold)] font-mono text-[11px] sm:text-xs text-center rounded-full tracking-wider flex items-center justify-center gap-1 border border-[var(--gold-border)] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  INSTAGRAM ↗
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
