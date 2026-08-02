"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
    { label: "Who We Serve", href: "#markets" },
    { label: "Process", href: "#process" },
    { label: "Client Stories", href: "#testimonials" },
    { label: "The Master Plan", href: "#bridge" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="nav transition-all duration-300"
        style={
          scrolled || mobileMenuOpen
            ? {
                background: "rgba(6,6,6,0.95)",
                borderBottom: "1px solid rgba(212,168,67,0.2)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }
            : {
                background: "linear-gradient(to bottom, rgba(6,6,6,0.95), transparent)",
                borderBottom: "1px solid transparent",
              }
        }
      >
        <Link
          href="/"
          className="nav-logo"
          onClick={() => setMobileMenuOpen(false)}
        >
          ELEVATION <span>STUDIO</span>
        </Link>

        {/* Desktop Links (Hidden on Mobile) */}
        <ul className="nav-links hidden lg:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop Action Buttons (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-3">
          <Magnetic strength={0.25}>
            <a
              href="https://instagram.com/elevationstudio.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-wa-btn"
              title="Instagram (@elevationstudio.ng)"
            >
              Instagram
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="nav-wa-btn"
              title="Direct WhatsApp (09119059859)"
            >
              WhatsApp
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <Link href="/contact" className="nav-cta">
              Start a Project
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Hamburger Toggle Button (Visible on Mobile) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center gap-2 px-3 py-2 border border-[var(--gold-border)] rounded text-xs font-mono text-[var(--gold)] uppercase bg-[#060606]/80 backdrop-blur-md"
          aria-label="Toggle Mobile Navigation Menu"
        >
          <span>{mobileMenuOpen ? "CLOSE ✕" : "MENU ☰"}</span>
        </button>
      </motion.nav>

      {/* Full-Screen Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-[99] bg-[#060606]/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:p-10 border-t border-[var(--gold-border)]/30 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-4">
              <div className="font-mono text-[10px] tracking-[4px] text-[var(--gold)] uppercase border-b border-white/10 pb-3">
                NAVIGATION MENU
              </div>

              <ul className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-bebas text-3xl text-white hover:text-[var(--gold)] transition-colors tracking-wide block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Action Buttons & Channels */}
            <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-8">
              <div className="font-mono text-[10px] tracking-[3px] text-[var(--muted)] uppercase">
                DIRECT STUDIO CHANNELS
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 bg-[var(--gold)] text-[#060606] font-mono text-xs font-semibold tracking-wider text-center uppercase rounded shadow-lg"
              >
                START A PROJECT →
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-[#0e0e10] border border-white/10 text-white font-mono text-[11px] text-center rounded tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  WHATSAPP ↗
                </a>

                <a
                  href="https://instagram.com/elevationstudio.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-3 bg-[#0e0e10] border border-white/10 text-[var(--gold)] font-mono text-[11px] text-center rounded tracking-wider"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  INSTAGRAM ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
