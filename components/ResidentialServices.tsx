"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";

export function ResidentialServices() {
  const [expandedOption, setExpandedOption] = useState<"res-arch" | "res-master" | null>(null);

  const residentialOptions = [
    {
      id: "res-arch",
      code: "01",
      title: "RESIDENTIAL ARCHITECTURE",
      price: "₦1.5M",
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
      price: "₦4.5M",
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
      className="residential-section py-24 sm:py-32 lg:py-40 px-6 md:px-16 lg:px-24 xl:px-32 bg-[#060606] relative overflow-hidden"
      id="residential"
    >
      {/* Subtle Background Lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[var(--gold)]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[var(--bridge-accent)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch">
          
          {/* ── Left Column: Pinterest-Inspired Editorial Image Frame ── */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <Reveal direction="left" duration={0.8}>
              <div className="relative w-full h-[340px] sm:h-[480px] lg:h-[620px] rounded-2xl overflow-hidden border border-white/10 group shadow-[0_30px_80px_rgba(0,0,0,0.9)]">
                {/* 5-Bedroom Bungalow Daytime Image */}
                <Image
                  src="/renders/modern_5bed_bungalow_day.jpg"
                  alt="Modern 5-Bedroom Bungalow Daytime Facade"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Visual Glassmorphic Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 opacity-80" />
                
                {/* Floating Architectural Specifications */}
                <div className="absolute bottom-6 left-6 right-6 p-6 sm:p-7 bg-[#0a0a0c]/85 backdrop-blur-md border border-white/10 rounded-xl flex flex-col gap-2">
                  <div className="font-mono text-[10px] tracking-[3px] text-[var(--gold)] uppercase">
                    FEATURED PROJECT
                  </div>
                  <h4 className="font-bebas text-lg sm:text-2xl text-white tracking-wide leading-tight">
                    Modern 5-Bedroom Luxury Bungalow Villa
                  </h4>
                  <p className="font-mono text-[11px] text-white/60">
                    Ogun-Lagos Corridor / Lekki Phase 1
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Subtle Pricing disclaimer */}
            <div className="hidden lg:block pt-10 font-mono text-[11px] text-[var(--muted)] max-w-md leading-relaxed">
              * “Final professional fees are determined by project size, complexity, site conditions and required deliverables.”
            </div>
          </div>

          {/* ── Right Column: Clean Typographical Information & Accordion ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Header info */}
            <div className="mb-12 lg:mb-16">
              <Reveal direction="down" duration={0.5}>
                <div className="section-tag mb-3">Residential Options</div>
              </Reveal>
              <Reveal direction="up" duration={0.6} delay={0.1}>
                <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl tracking-wide text-white mb-5 leading-[1.15]">
                  RESIDENTIAL & <span style={{ color: "var(--gold)" }}>PRIVATE CLIENT</span> SERVICES
                </h2>
              </Reveal>
              <Reveal direction="up" duration={0.6} delay={0.2}>
                <p className="font-sans text-sm sm:text-base text-[var(--white-dim)] leading-relaxed">
                  Bespoke architectural space planning, floor plans, 3D modeling, and masterplanning optimized for private property owners and residential developers.
                </p>
              </Reveal>
            </div>

            {/* Interactive Clean Service Rows (Collapsible Details to remove text clutter) */}
            <div className="flex flex-col gap-6 sm:gap-8 mb-12">
              {residentialOptions.map((opt, idx) => {
                const isOpen = expandedOption === opt.id;
                return (
                  <Reveal key={opt.id} direction="up" delay={0.2 + idx * 0.1}>
                    <div 
                      className={`border rounded-2xl transition-all duration-300 p-8 pr-10 sm:p-10 sm:pr-14 cursor-pointer ${
                        isOpen 
                          ? "bg-[#0c0c10] border-[var(--gold)]/40 shadow-2xl" 
                          : "bg-[#09090b]/80 border-white/10 hover:border-white/20 hover:bg-[#0a0a0e]"
                      }`}
                      onClick={() => setExpandedOption(isOpen ? null : (opt.id as any))}
                    >
                      {/* Header row of the option */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <span className="font-mono text-base font-bold text-[var(--gold)] mt-0.5">
                            {opt.code}
                          </span>
                          <div>
                            <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wider leading-none">
                              {opt.title}
                            </h3>
                            <span className="font-mono text-[10px] tracking-wider text-white/50 block mt-2">
                              {opt.suitableFor}
                            </span>
                          </div>
                        </div>
                        <div className="text-left sm:text-right flex flex-col sm:items-end mt-2 sm:mt-0">
                          <span className="font-mono text-[9px] text-[var(--muted)] tracking-widest uppercase">STARTING FROM</span>
                          <span className="font-mono text-lg sm:text-xl font-bold text-[var(--gold-bright)]">
                            {opt.price}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-xs sm:text-sm text-white/70 mt-6 leading-relaxed">
                        {opt.description}
                      </p>

                      {/* Expandable / Collapsible Scope Details (Keeps layout clean and elegant) */}
                      <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[var(--gold)] hover:text-white transition-colors">
                        <span>{isOpen ? "HIDE DETAILED SCOPE ▴" : "VIEW DETAILED SCOPE ▾"}</span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 mt-6 pt-6">
                              <div className="font-mono text-[10px] tracking-wider text-white/40 uppercase mb-4">
                                INCLUDED DELIVERABLES:
                              </div>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                {opt.scope.map((item, i) => (
                                  <li key={i} className="flex items-start gap-2.5 font-mono text-[11px] text-white/80 leading-snug">
                                    <span className="text-[var(--gold)] shrink-0 mt-0.5">✦</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-8 flex justify-end">
                                <Link
                                  href={`#contact?pkg=${opt.id}`}
                                  className="px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center shadow-lg"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  START PROJECT
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

            {/* Mobile-only pricing disclaimer */}
            <div className="block lg:hidden font-mono text-[10px] text-[var(--muted)] leading-relaxed mb-10">
              * “Final professional fees are determined by project size, complexity, site conditions and required deliverables.”
            </div>

            {/* Call To Action Block */}
            <Reveal direction="up" duration={0.6} delay={0.4}>
              <div className="border border-white/5 bg-[#09090b]/40 rounded-2xl p-8 sm:p-10 md:p-12 flex flex-col sm:flex-row items-center justify-between gap-8 mt-12 lg:mt-16">
                <div className="flex-1">
                  <span className="font-mono text-xs tracking-[3px] text-[var(--gold)] uppercase block mb-2">
                    START A PROJECT
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed max-w-md">
                    Tell us about your plot, budget and vision. We begin by understanding your space before we design it.
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-auto">
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-center rounded-xl transition-all duration-300 block shadow-lg shadow-[var(--gold)]/15"
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
