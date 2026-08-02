"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/Magnetic";
import { CurrencyToggle } from "@/components/CurrencyToggle";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="nav transition-all duration-300"
      style={
        scrolled
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
      <Link href="/" className="nav-logo">
        ELEVATION <span>STUDIO</span>
      </Link>
      <ul className="nav-links">
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#renders">3D Renders</a>
        </li>
        <li>
          <a href="#packages">Packages</a>
        </li>
        <li>
          <a href="#markets">Who We Serve</a>
        </li>
        <li>
          <a href="#process">Process</a>
        </li>
        <li>
          <a href="#testimonials">Client Stories</a>
        </li>
        <li>
          <a href="#bridge">The Master Plan</a>
        </li>
      </ul>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
    </motion.nav>
  );
}
