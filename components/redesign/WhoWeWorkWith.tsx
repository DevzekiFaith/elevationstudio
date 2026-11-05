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
      benefit: "100% remote diaspora transparency, 3D exterior & interior renders before digging, and verified contractor-ready working drawings.",
      cta: "Build Private Home",
      href: "#build-project",
    },
    {
      title: "Diaspora Property Owners",
      sub: "Remote Project Assurance",
      price: "Full 8-Discipline Pack",
      benefit: "Live in the UK, US, or Canada? Review your Nigerian project in photorealistic 4K before committing millions to construction.",
      cta: "Claim Diaspora Package",
      href: "#build-project",
    },
    {
      title: "Small Business Owners",
      sub: "Retail, Cafes & Commercial",
      price: "From ₦600K ($450)",
      benefit: "Independent spatial interior architecture, brand identity, and fast business website design without forced service bundling.",
      cta: "Configure Business Space",
      href: "#build-project",
    },
  ];

  const b2bCards = [
    {
      title: "Property Developers",
      sub: "Estates & Multi-Unit Terraces",
      price: "Phased Retainers",
      benefit: "Photorealistic 4K cinematic animations and marketing visualization that sell out estate off-plan phases ahead of ground-breaking.",
      cta: "Developer Inquiries",
      href: "#partnerships",
    },
    {
      title: "Architects & Contractors",
      sub: "Outsourced 3D & Detailing",
      price: "White-Label NDA",
      benefit: "Scale your firm's output without payroll bloat. White-label 3D rendering, walkthrough animations, and MEP drawings under strict NDA.",
      cta: "Discuss Outsourcing",
      href: "#partnerships",
    },
    {
      title: "Churches & Institutions",
      sub: "Auditoriums & Campuses",
      price: "Turnkey Commercial SLA",
      benefit: "Large-span auditorium acoustics, campus masterplanning, site drainage coordination, and Mindvest corporate workforce training.",
      cta: "Institutional Brief",
      href: "#partnerships",
    },
  ];

  const b2cJourney = [
    "01. Select Required Service",
    "02. Choose Project Category",
    "03. Submit Site & Plot Dimensions",
    "04. Review 8 In-House Disciplines",
    "05. Direct WhatsApp Scope Claim",
    "06. Receive Itemised Quotation",
  ];

  const b2bJourney = [
    "01. Select Commercial Service Wing",
    "02. Submit Drawings Under Mutual NDA",
    "03. Lead Architect & Principal Review",
    "04. Phased Milestones & Delivery",
    "05. Turnkey Engineering Coordination",
    "06. Formal Corporate Proposal & SLA",
  ];

  return (
    <section id="solutions" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#090a0f] text-white border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal direction="down" delay={0.1}>
            <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-3">
              Customer Pathways · Dedicated Portals
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
              Tailored For <span className="text-[var(--gold)]">B2C & B2B</span> Clients.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-sm sm:text-base text-white/70 font-light mt-4">
              Whether you are an individual building your private family residence or a corporate property developer scaling multi-unit estates, our engagement model is tailored to your commercial reality.
            </p>
          </Reveal>
        </div>

        {/* Dual Pathway Switcher Buttons */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 bg-black/80 border border-white/10 rounded-full shadow-2xl">
            <button
              onClick={() => setActiveSegment("b2c")}
              className={`px-7 py-3 rounded-full font-syne text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSegment === "b2c"
                  ? "bg-[var(--gold)] text-black shadow-[0_4px_25px_rgba(212,168,67,0.4)] scale-102"
                  : "text-white/60 hover:text-white"
              }`}
            >
              B2C · Individual & Private Clients
            </button>
            <button
              onClick={() => setActiveSegment("b2b")}
              className={`px-7 py-3 rounded-full font-syne text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeSegment === "b2b"
                  ? "bg-[var(--gold)] text-black shadow-[0_4px_25px_rgba(212,168,67,0.4)] scale-102"
                  : "text-white/60 hover:text-white"
              }`}
            >
              B2B · Corporate & Professional Clients
            </button>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-14">
          {(activeSegment === "b2c" ? b2cCards : b2bCards).map((c, idx) => (
            <Reveal key={c.title} direction="up" delay={0.1 * idx}>
              <TiltCard maxTilt={8} glare className="h-full">
                <div className="p-8 rounded-none bg-white/[0.02] border border-white/10 hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between group shadow-xl h-full glow-card-border">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[10px] text-black bg-[var(--gold)] font-bold px-2 py-0.5 rounded-none uppercase">
                        {activeSegment.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs text-[var(--gold)] font-bold">
                        {c.price}
                      </span>
                    </div>

                    <h3 className="font-syne text-2xl font-bold uppercase text-white mb-1.5 group-hover:text-[var(--gold)] transition-colors">
                      {c.title}
                    </h3>
                    <span className="font-mono text-xs text-white/50 uppercase block mb-4">
                      {c.sub}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8">
                      {c.benefit}
                    </p>
                  </div>

                  <a
                    href={c.href}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/[0.04] hover:bg-[var(--gold)] text-white hover:text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer shadow-md group-hover:shadow-[0_4px_20px_rgba(212,168,67,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>{c.cta}</span>
                    <span>→</span>
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* 6-Step Journey Visualizer */}
        <div className="p-8 sm:p-10 rounded-none bg-black/60 border border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="font-mono text-[10px] text-[var(--gold)] uppercase font-bold tracking-widest block">
                {activeSegment === "b2c" ? "B2C Typical Customer Journey" : "B2B Corporate Engagement Journey"}
              </span>
              <h4 className="font-syne text-lg font-bold uppercase text-white mt-1">
                {activeSegment === "b2c"
                  ? "From Initial Vision to Construction-Ready Working Drawings"
                  : "From Confidential Brief to High-Throughput Delivery & Retainer"}
              </h4>
            </div>
            <a
              href="#build-project"
              className="font-mono text-xs text-[var(--gold)] hover:underline flex items-center gap-1.5"
            >
              <span>Start This Journey on WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {(activeSegment === "b2c" ? b2cJourney : b2bJourney).map((step, idx) => (
              <div
                key={step}
                className="p-3.5 rounded-none bg-white/[0.02] border border-white/5 text-center flex flex-col justify-center min-h-[70px]"
              >
                <span className="font-mono text-[10px] text-[var(--gold)] font-bold block mb-1">
                  STAGE 0{idx + 1}
                </span>
                <span className="font-syne text-[11px] text-white/80 font-semibold leading-tight">
                  {step.split(". ")[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
