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
          <Link href="/#services">Services</Link>
        </li>
        <li>
          <Link href="/#packages">Packages</Link>
        </li>
        <li>
          <Link href="/#markets">Who We Serve</Link>
        </li>
        <li>
          <Link href="/#process">Process</Link>
        </li>
        <li>
          <Link href="/#testimonials">Client Stories</Link>
        </li>
        <li>
          <Link href="/#bridge">The Master Plan</Link>
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
