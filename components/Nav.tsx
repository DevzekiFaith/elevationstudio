"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { ReviewModal } from "@/components/ReviewModal";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { useCart } from "@/components/cart/CartContext";
import { CartTrolleyIcon } from "@/components/cart/CartTrolleyIcon";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { openCart, itemCount } = useCart();

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
    { label: "Divisions", href: "#divisions" },
    { label: "Portfolio", href: "#renders" },
    { label: "Flagship Pack", href: "#flagship" },
    { label: "Build Scope", href: "#build-project" },
    { label: "B2B & B2C", href: "#solutions" },
    { label: "Client Stories", href: "#testimonials" },
    { label: "Location", href: "#location" },
  ];

  return (
    <>
      {/* ─── Modern Floating Navigation Header ─── */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[100] px-3.5 sm:px-6 lg:px-6 xl:px-10 py-3.5 sm:py-4 pointer-events-none"
      >
        <div
          className={`
            w-full max-w-[1560px] mx-auto pointer-events-auto
            grid grid-cols-[auto_1fr_auto] items-center
            px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-3.5
            rounded-none transition-all duration-500
            ${
              scrolled || mobileMenuOpen
                ? "bg-[#09090d]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                : "bg-[#060608]/80 backdrop-blur-md shadow-lg"
            }
          `}
        >
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[var(--gold)] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-bebas text-base sm:text-xl lg:text-2xl tracking-[2px] sm:tracking-[2.5px] text-white leading-none">
              ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
            </span>
          </Link>

          {/* Navigation Links with sliding background highlight */}
          <div className="hidden lg:flex items-center justify-center">
            <ul 
              className="relative flex items-center gap-1 p-1 bg-white/[0.03] rounded-none"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, idx) => (
                <li key={item.label} className="relative">
                  <a
                    href={item.href}
                    className="relative z-10 block px-3.5 py-2 font-mono text-[11px] xl:text-xs tracking-wider uppercase transition-colors duration-300 rounded-[3px]"
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
                        className="absolute inset-0 bg-white/5 rounded-none z-0"
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
          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
            {/* Desktop Currency Toggle */}
            <div className="hidden sm:block">
              <CurrencyToggle />
            </div>

            {/* Interactive Scope Cart Trigger Button */}
            <Magnetic strength={0.15}>
              <button
                type="button"
                onClick={openCart}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-white/[0.04] hover:bg-[var(--gold)] text-white hover:text-black rounded-none font-mono text-[11px] sm:text-xs tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer group shadow-sm"
                title="Open Project Scope Cart"
              >
                <CartTrolleyIcon className={`w-3.5 h-3.5 transition-colors ${itemCount > 0 ? "text-emerald-400 group-hover:text-black" : "text-[var(--gold)] group-hover:text-black"}`} />
                <span className="hidden min-[400px]:inline">Cart</span>
                <span className={`w-5 h-5 rounded-none text-[10px] flex items-center justify-center transition-all ${
                  itemCount > 0
                    ? "bg-emerald-500 text-black font-black shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                    : "bg-[var(--gold)] group-hover:bg-black text-black group-hover:text-[var(--gold)] font-bold"
                }`}>
                  {itemCount}
                </span>
              </button>
            </Magnetic>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Magnetic strength={0.15}>
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(true)}
                  className="px-4 py-2 bg-white/5 hover:bg-[var(--gold)]/10 text-white hover:text-[var(--gold)] rounded-none font-mono text-[11px] xl:text-xs tracking-wider transition-all duration-300"
                  title="Submit a verified client review"
                >
                  Review Us
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <a
                  href="#build-project"
                  className="px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-[11px] xl:text-xs font-bold uppercase tracking-wider rounded-none transition-all duration-300 shadow-md shadow-[var(--gold)]/10 hover:scale-[1.02]"
                >
                  Build Scope →
                </a>
              </Magnetic>
            </div>

            {/* Mobile / Tablet Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center p-2 sm:p-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white hover:text-[var(--gold)] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-4 sm:w-5 h-3.5 sm:h-4 relative flex flex-col justify-between items-center">
                <span className={`w-4 sm:w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-[6px] sm:translate-y-[7px]" : ""}`} />
                <span className={`w-3 sm:w-4 h-[1.5px] bg-current rounded-full transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-4 sm:w-5 h-[1.5px] bg-current rounded-full transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-[6px] sm:-translate-y-[7px]" : ""}`} />
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
            style={{ paddingTop: "84px" }}
          >
            {/* Nav links block */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
              <span className="font-mono text-[10px] tracking-[4px] text-[var(--gold)] uppercase mb-6 opacity-75">
                STUDIO NAVIGATION
              </span>
              <ul className="flex flex-col items-center gap-3 sm:gap-5 w-full max-w-md">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.35 }}
                    className="w-full text-center"
                  >
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bebas block py-2 sm:py-3 text-2xl sm:text-3xl text-white hover:text-[var(--gold)] transition-colors tracking-widest"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Actions Section */}
            <div className="shrink-0 px-6 sm:px-10 pb-10 pt-5 border-t border-white/5 bg-[#08080c]/60">
              <div className="max-w-md mx-auto flex flex-col gap-3.5">
                {/* Mobile Currency Switcher */}
                <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
                  <span className="font-mono text-[10px] tracking-widest text-white/50 uppercase">
                    Currency
                  </span>
                  <CurrencyToggle />
                </div>

                {/* Mobile View Cart CTA Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="w-full py-3.5 rounded-full bg-white text-black font-syne font-bold text-xs uppercase tracking-wider text-center shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Open Scope Cart ({itemCount})</span>
                  <span>→</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setReviewModalOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-wider uppercase border border-white/10 transition-all duration-300"
                >
                  Write Client Review
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        initialTab="form"
      />
    </>
  );
}
