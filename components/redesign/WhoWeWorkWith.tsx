"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export function WhoWeWorkWith() {
  const [activeSegment, setActiveSegment] = useState<"b2c" | "b2b">("b2c");

  const b2cCards = [
    {
      title: "Private Homeowners",
      sub: "Bungalows & Luxury Duplexes",
      price: "From ₦1.5M ($1,130)",
      headline: "Complete working drawings & 4K renders before ground-breaking.",
      cta: "Build Private Home",
      href: "#build-project",
    },
    {
      title: "Diaspora Property Owners",
      sub: "Remote Project Oversight",
      price: "Full Remote Pack",
      headline: "Build back home with 100% verified digital documentation and remote transparency.",
      cta: "Claim Diaspora Package",
      href: "#build-project",
    },
    {
      title: "Commercial & Retail",
      sub: "Plazas, Cafes & Offices",
      price: "From ₦600K ($450)",
      headline: "High-yield spatial layout, interior architecture, and brand identity.",
      cta: "Configure Space",
      href: "#build-project",
    },
  ];

  const b2bCards = [
    {
      title: "Property Developers",
      sub: "Estates & Terraces",
      price: "Phased Retainers",
      headline: "Cinematic 4K marketing animations that pre-sell off-plan estate phases.",
      cta: "Developer Inquiries",
      href: "#partnerships",
    },
    {
      title: "Architects & Engineers",
      sub: "Outsourced Detailing",
      price: "Strict Mutual NDA",
      headline: "Scale your studio’s capacity with white-label 3D rendering and MEP working drawings.",
      cta: "Discuss Outsourcing",
      href: "#partnerships",
    },
    {
      title: "Churches & Institutions",
      sub: "Auditoriums & Masterplans",
      price: "Turnkey SLA",
      headline: "Large-span auditorium acoustics, campus masterplanning, and civic approvals.",
      cta: "Institutional Brief",
      href: "#partnerships",
    },
  ];

  return (
    <section
      id="solutions"
      className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#08080c] text-white border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Header: Bold & Focused */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-4">
              <span>✦</span> Client Portals
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-3xl sm:text-5xl lg:text-6xl font-black uppercase text-white leading-tight">
              Tailored For <span className="text-[var(--gold)]">B2C & B2B</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-sm sm:text-base text-white/70 font-light mt-3 max-w-xl mx-auto">
              Select your client profile for a clear, direct path to pricing and project execution.
            </p>
          </Reveal>
        </div>

        {/* Dual Pathway Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-black/80 border border-white/10 rounded-full shadow-2xl">
            <button
              onClick={() => setActiveSegment("b2c")}
              className={`px-6 sm:px-8 py-3 rounded-full font-syne text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSegment === "b2c"
                  ? "bg-white text-black shadow-[0_4px_25px_rgba(255,255,255,0.25)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              B2C · Private Clients
            </button>
            <button
              onClick={() => setActiveSegment("b2b")}
              className={`px-6 sm:px-8 py-3 rounded-full font-syne text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSegment === "b2b"
                  ? "bg-white text-black shadow-[0_4px_25px_rgba(255,255,255,0.25)]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              B2B · Developers & Firms
            </button>
          </div>
        </div>

        {/* 3 Bold Cards (No Text Bloat, Sharp Corners, Soft Shadows) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {(activeSegment === "b2c" ? b2cCards : b2bCards).map((c, idx) => (
            <Reveal key={c.title} direction="up" delay={0.1 * idx}>
              <TiltCard maxTilt={6} glare className="h-full">
                <div className="p-7 sm:p-8 rounded-none bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group h-full shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
                  <div>
                    {/* Header Tag & Price */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
                      <span className="font-mono text-[9px] text-white/70 bg-white/[0.06] font-bold px-2 py-0.5 rounded-none uppercase tracking-wider">
                        {activeSegment.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs text-[var(--gold)] font-bold">
                        {c.price}
                      </span>
                    </div>

                    <h3 className="font-syne text-xl sm:text-2xl font-bold uppercase text-white mb-1 group-hover:text-[var(--gold)] transition-colors">
                      {c.title}
                    </h3>
                    <span className="font-mono text-[11px] text-white/50 uppercase block mb-4">
                      {c.sub}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-white/75 leading-relaxed font-light mb-8">
                      {c.headline}
                    </p>
                  </div>

                  <a
                    href={c.href}
                    className="w-full py-3.5 px-5 rounded-full bg-white/[0.04] hover:bg-[var(--gold)] text-white hover:text-black border border-white/[0.08] hover:border-transparent font-syne font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 cursor-pointer shadow-md flex items-center justify-center gap-2 group-hover:shadow-[0_6px_20px_rgba(212,168,67,0.3)]"
                  >
                    <span>{c.cta}</span>
                    <span>→</span>
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Clear Direction: 3-Step Simple Engagement (Fewer words, instant clarity) */}
        <div className="p-6 sm:p-8 rounded-none bg-white/[0.02] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/[0.06]">
            <div>
              <span className="font-mono text-[10px] text-[var(--gold)] uppercase font-bold tracking-widest block">
                How It Works · 3 Direct Steps
              </span>
              <h4 className="font-syne text-base sm:text-lg font-bold uppercase text-white mt-1">
                From First Contact to Complete Approved Drawings
              </h4>
            </div>
            <a
              href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio!%20I%20would%20like%20to%20discuss%20my%20project%20scope."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] shrink-0 w-fit"
            >
              <span>Discuss on WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-none bg-black/40 border border-white/5">
              <span className="font-mono text-xs text-[var(--gold)] font-bold block mb-1">
                01 · Share Scope
              </span>
              <span className="font-syne text-xs text-white/80 font-medium">
                Send your plot dimensions, sketches, or brief via WhatsApp or portal.
              </span>
            </div>
            <div className="p-4 rounded-none bg-black/40 border border-white/5">
              <span className="font-mono text-xs text-[var(--gold)] font-bold block mb-1">
                02 · Direct Consultation
              </span>
              <span className="font-syne text-xs text-white/80 font-medium">
                Review tailored 3D spatial concepts and itemized quotation.
              </span>
            </div>
            <div className="p-4 rounded-none bg-black/40 border border-white/5">
              <span className="font-mono text-xs text-[var(--gold)] font-bold block mb-1">
                03 · Delivery & Approval
              </span>
              <span className="font-syne text-xs text-white/80 font-medium">
                Receive certified architectural & engineering sets plus 4K renders.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
