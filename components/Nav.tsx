"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="nav"
      style={
        scrolled
          ? {
              background: "rgba(6,6,6,0.97)",
              borderBottom: "1px solid #333336",
            }
          : {
              background: "linear-gradient(to bottom, rgba(6,6,6,0.95), transparent)",
              borderBottom: "none",
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
        <a
          href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="nav-wa-btn"
          title="Direct WhatsApp (09119059859)"
        >
          WhatsApp
        </a>
        <Link href="/contact" className="nav-cta">
          Start a Project
        </Link>
      </div>
    </nav>
  );
}
