"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

export function ResidentialServices() {
  const [expandedOption, setExpandedOption] = useState<"res-arch" | "res-master" | null>(null);

  const residentialOptions = [
    {
      id: "res-arch",
      code: "01",
      title: "RESIDENTIAL ARCHITECTURE",
      price: "Starting from ₦1.5M",
      priceShort: "₦1.5M",
      description: "For clients planning modern bungalows, duplexes and private homes.",
      suitableFor: "Modern Bungalows · Duplexes · Private Homes",
      scope: [
        "Discovery and client brief",
        "Space planning",
        "Floor plan development",
        "Architectural concept and building massing",
        "Façade design",
        "Material and finish direction",
        "Key elevations and sections",
        "Detailed 3D architectural model",
        "3–5 high-quality exterior visualizations",
        "Up to 2 design revision rounds",
        "Final design presentation package",
      ],
    },
    {
      id: "res-master",
      code: "02",
      title: "RESIDENTIAL MASTERPLAN",
      price: "Starting from ₦4.5M",
      priceShort: "₦4.5M",
      description: "For luxury homes, villas, private compounds and complex residential developments.",
      suitableFor: "Luxury Bungalows · Villas · Private Compounds · Multiple Residential Buildings",
      scope: [
        "Everything in Residential Architecture",
        "Advanced architectural design development",
        "Site and compound planning",
        "Entrance and gate architectural concept",
        "Landscape concept",
        "Exterior lighting direction",
        "Premium material and finish direction",
        "Expanded 3D design development",
        "6–10 high-quality visualizations",
        "Selected interior concept direction",
        "Up to 3 design revision rounds",
        "Premium final presentation package",
      ],
    },
  ];

  return (
    <section
      className="residential-section py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16 bg-[#060606] relative overflow-hidden"
      id="residential"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[var(--bridge-accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Balanced 6:6 Editorial Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* ── Left Column (6 cols): Extra Large Visual Image Frame ── */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <Reveal direction="left" duration={0.8}>
              <div className="relative w-full h-[400px] sm:h-[560px] lg:h-[680px] xl:h-[760px] rounded-2xl overflow-hidden border border-white/10 group shadow-[0_30px_80px_rgba(0,0,0,0.95)]">
                {/* 5-Bedroom Bungalow Daytime Image */}
                <Image
                  src="/renders/modern_5bed_bungalow_day.jpg"
                  alt="Modern 5-Bedroom Bungalow Daytime Facade"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                
                {/* Floating Architectural Specifications */}
                <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 bg-[#0a0a0c]/90 backdrop-blur-md border border-white/10 rounded-xl flex flex-col gap-1.5">
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-[3px] text-[var(--gold)] uppercase font-semibold">
                    FEATURED 3D SPATIAL CONCEPT
                  </div>
                  <h4 className="font-bebas text-xl sm:text-2xl text-white tracking-wide leading-tight">
                    Modern 5-Bedroom Luxury Bungalow Villa
                  </h4>
                  <p className="font-mono text-[9px] sm:text-[10px] text-white/60">
                    Ogun-Lagos Corridor / Lekki Phase 1
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Pricing disclaimer note */}
            <div className="hidden lg:block pt-6 font-mono text-[10px] text-[var(--muted)] leading-relaxed">
              * “Final professional fees are determined by project size, complexity, site conditions and required deliverables.”
            </div>
          </div>

          {/* ── Right Column (6 cols): Clean Typographical Content & Options ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Header info */}
            <div className="mb-6 lg:mb-8">
              <Reveal direction="down" duration={0.5}>
                <div className="section-tag text-xs tracking-[3px] mb-2 uppercase">RESIDENTIAL OPTIONS</div>
              </Reveal>
              <Reveal direction="up" duration={0.6} delay={0.1}>
                {/* Subject Headline */}
                <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-wide text-white mb-3 leading-[1.05]">
                  RESIDENTIAL & <span style={{ color: "var(--gold)" }}>PRIVATE CLIENT</span> SERVICES
                </h2>
              </Reveal>
              <Reveal direction="up" duration={0.6} delay={0.2}>
                <p className="font-sans text-xs sm:text-sm lg:text-base text-[var(--white-dim)] leading-relaxed max-w-xl">
                  Bespoke architectural space planning, floor plans, 3D modeling, and masterplanning optimized for private property owners and residential developers.
                </p>
              </Reveal>
            </div>

            {/* Service Options List */}
            <div className="flex flex-col gap-6 mb-8">
              {residentialOptions.map((opt, idx) => {
                const isOpen = expandedOption === opt.id;
                return (
                  <Reveal key={opt.id} direction="up" delay={0.15 + idx * 0.1}>
                    <div 
                      className={`border rounded-2xl transition-all duration-300 p-6 sm:p-8 cursor-pointer ${
                        isOpen 
                          ? "bg-[#0d0d12] border-[var(--gold)]/60 shadow-2xl" 
                          : "bg-[#09090c] border-white/12 hover:border-white/25 hover:bg-[#0b0b10]"
                      }`}
                      onClick={() => setExpandedOption(isOpen ? null : (opt.id as any))}
                    >
                      {/* Top Meta Line: Option Code + Price Tag */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span className="font-mono text-xs font-bold text-[var(--gold)] tracking-widest uppercase">
                          OPTION {opt.code}
                        </span>
                        <span className="px-3.5 py-1 bg-[var(--gold)]/15 border border-[var(--gold-border)] text-[var(--gold-bright)] font-mono text-xs sm:text-sm font-bold rounded-full whitespace-nowrap shadow-sm">
                          {opt.price}
                        </span>
                      </div>

                      {/* Main Title (Subject Text - Large & Prominent) */}
                      <div className="mb-3">
                        <h3 className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider leading-tight">
                          {opt.title}
                        </h3>
                        <span className="font-mono text-xs sm:text-sm tracking-wider text-white/70 font-medium block mt-1.5">
                          {opt.suitableFor}
                        </span>
                      </div>

                      {/* Supporting Description (Clear & Comfortable Font Size) */}
                      <p className="font-sans text-sm sm:text-base text-white/85 leading-relaxed font-normal mt-2">
                        {opt.description}
                      </p>

                      {/* Toggle Scope Button */}
                      <div className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[var(--gold)] hover:text-white transition-colors">
                        <span>{isOpen ? "HIDE DETAILED SCOPE ▴" : "VIEW DETAILED SCOPE ▾"}</span>
                      </div>

                      {/* Expandable Accordion Content */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/12 mt-5 pt-5">
                              <div className="font-mono text-xs tracking-wider text-white/50 font-semibold uppercase mb-3">
                                INCLUDED DELIVERABLES:
                              </div>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                {opt.scope.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 font-mono text-xs sm:text-sm text-white/90 leading-snug">
                                    <span className="text-[var(--gold)] shrink-0 mt-0.5 font-bold">✦</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-6 flex justify-end">
                                <Link
                                  href={`#contact?pkg=${opt.id}`}
                                  className="px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors text-center shadow-md"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  START PROJECT →
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Mobile pricing disclaimer */}
            <div className="block lg:hidden font-mono text-xs text-[var(--muted)] leading-relaxed mb-6">
              * “Final professional fees are determined by project size, complexity, site conditions and required deliverables.”
            </div>

            {/* Call To Action Block */}
            <Reveal direction="up" duration={0.6} delay={0.3}>
              <div className="border border-white/12 bg-[#09090d] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <span className="font-mono text-xs tracking-[3px] text-[var(--gold)] uppercase block mb-1 font-bold">
                    START A PROJECT
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
                    Tell us about your plot, budget and vision. We begin by understanding your space before we design it.
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto px-6 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-center rounded-xl transition-all duration-300 block shadow-lg shadow-[var(--gold)]/15 hover:scale-[1.02]"
                  >
                    START YOUR PROJECT →
                  </Link>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
