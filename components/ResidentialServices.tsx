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
      price: "Starting from ₦1.5M",
      priceShort: "₦1.5M",
      description: "For clients planning modern bungalows, duplexes and private homes.",
      suitableFor: "Modern Bungalows · Duplexes · Private Homes",
      highlights: ["3–5 HD Renders", "Floor Plan Engineering", "2 Revision Rounds"],
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
      highlights: ["6–10 HD Renders", "Compound Masterplanning", "3 Revision Rounds"],
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
      className="residential-section py-24 sm:py-36 lg:py-44 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#040406] relative overflow-hidden"
      id="residential"
    >
      {/* ── High-Contrast Glassmorphic Ambient Lighting Orbs ── */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[var(--gold)]/15 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[550px] h-[550px] bg-gradient-to-tr from-[var(--bridge-accent)]/15 via-emerald-600/10 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* Decorative Floating Mesh Grid & Rings */}
      <div className="absolute top-16 right-16 w-96 h-96 border border-white/10 rounded-full pointer-events-none hidden lg:block backdrop-blur-[2px]" />
      <div className="absolute top-32 right-32 w-64 h-64 border border-[var(--gold)]/20 rounded-full pointer-events-none hidden lg:block" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ── Section Header ── */}
        <div className="mb-16 sm:mb-24">
          <Reveal direction="down" duration={0.6}>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 font-mono text-xs text-[var(--gold)] tracking-[4px] uppercase mb-4 shadow-lg">
              <span>[ RESIDENTIAL OPTIONS ]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-ping" />
              <span className="text-white/60">[ SINCE 2026 ]</span>
            </div>
          </Reveal>

          <Reveal direction="up" duration={0.8} delay={0.1}>
            <h2 className="font-bebas text-5xl sm:text-7xl lg:text-8xl xl:text-[7.5rem] tracking-wide leading-[0.88] text-white uppercase mb-6 drop-shadow-2xl">
              RESIDENTIAL &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold)] via-[var(--gold-bright)] to-amber-200">PRIVATE CLIENT</span> SERVICES
            </h2>
          </Reveal>

          <Reveal direction="up" duration={0.8} delay={0.2}>
            <p className="font-sans text-sm sm:text-base lg:text-lg text-[#a0a0a8] max-w-3xl leading-relaxed font-normal">
              Bespoke architectural space planning, floor plans, 3D modeling, and masterplanning optimized for private property owners and residential developers.
            </p>
          </Reveal>
        </div>

        {/* ── Main Architectural Feature Showcase & Options Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 sm:mb-28">
          
          {/* Left Column: Architectural Render with Authentic U-Verge Glass Overlap Card */}
          <div className="lg:col-span-6">
            <Reveal direction="left" duration={0.9}>
              <div className="relative w-full h-[450px] sm:h-[600px] lg:h-[720px] xl:h-[800px] rounded-3xl overflow-hidden border border-white/20 shadow-[0_35px_90px_rgba(0,0,0,0.95)] group">
                <Image
                  src="/renders/modern_5bed_bungalow_day.jpg"
                  alt="Modern 5-Bedroom Bungalow Daytime Facade"
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* ── Authentic Frosted Glassmorphism Floating Badge (U-Verge Style) ── */}
                <div className="absolute bottom-6 left-6 right-6 p-6 sm:p-8 bg-gradient-to-br from-white/15 via-white/[0.05] to-black/80 backdrop-blur-3xl border border-white/25 rounded-2xl flex flex-col gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[3px] text-[var(--gold)] uppercase font-semibold">
                      FEATURED ARCHITECTURAL MASTERPIECE
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" />
                  </div>
                  <h3 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide leading-none drop-shadow-md">
                    Modern 5-Bedroom Luxury Bungalow Villa
                  </h3>
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/15 mt-1">
                    <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <span className="font-mono text-[10px] text-white/60 block uppercase tracking-wider">STRUCTURE</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-white">5 En-Suite Master Suites</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md p-3 rounded-xl border border-white/10">
                      <span className="font-mono text-[10px] text-white/60 block uppercase tracking-wider">LOCATION</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-[var(--gold-bright)]">Lekki Phase 1 / Ogun</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Authentic Translucent Glassmorphic Service Option Cards */}
          <div className="lg:col-span-6 flex flex-col gap-8 sm:gap-10">
            {residentialOptions.map((opt, idx) => {
              const isOpen = expandedOption === opt.id;
              return (
                <Reveal key={opt.id} direction="up" delay={0.2 + idx * 0.15}>
                  {/* ── Glassmorphic Frosted Glass Panel ── */}
                  <div
                    className={`rounded-3xl transition-all duration-500 p-8 sm:p-12 relative overflow-hidden cursor-pointer ${
                      isOpen
                        ? "bg-gradient-to-br from-white/15 via-[#10101a]/90 to-black/95 backdrop-blur-3xl border-2 border-[var(--gold)]/70 shadow-[0_30px_90px_rgba(212,168,67,0.2)]"
                        : "bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-white/[0.04] backdrop-blur-2xl border border-white/20 hover:border-white/40 hover:bg-white/[0.1] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                    }`}
                    style={{
                      boxShadow: isOpen 
                        ? "0 30px 90px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.3)" 
                        : "0 20px 60px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
                    }}
                    onClick={() => setExpandedOption(isOpen ? null : (opt.id as any))}
                  >
                    {/* Glass Sheen Top Specular Line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                    {/* Top Header Row: Code Badge + Frosted Glass Price Pill */}
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <span className="font-mono text-sm font-bold text-[var(--gold)] tracking-widest px-3.5 py-1 bg-[var(--gold)]/15 border border-[var(--gold-border)] rounded-lg uppercase shadow-inner">
                        [ OPTION {opt.code} ]
                      </span>
                      <span className="font-mono text-base sm:text-lg font-bold text-[var(--gold-bright)] bg-white/10 backdrop-blur-xl px-5 py-1.5 rounded-full border border-white/20 shadow-md">
                        {opt.price}
                      </span>
                    </div>

                    {/* Main Title & Target Subtitle */}
                    <div className="mb-5">
                      <h3 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-white tracking-wider leading-none mb-2 drop-shadow-md">
                        {opt.title}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-white/70 tracking-wider font-medium">
                        {opt.suitableFor}
                      </p>
                    </div>

                    {/* Feature Highlights Pills (Frosted Glass Style) */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {opt.highlights.map((h, i) => (
                        <span key={i} className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full font-mono text-[11px] text-white/90 shadow-sm">
                          ✦ {h}
                        </span>
                      ))}
                    </div>

                    {/* Description Paragraph */}
                    <p className="font-sans text-sm sm:text-base text-white/85 leading-relaxed mb-6 font-normal">
                      {opt.description}
                    </p>

                    {/* Scope Toggle Trigger */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/15">
                      <span className="font-mono text-xs sm:text-sm font-bold text-[var(--gold)] hover:text-white transition-colors flex items-center gap-1.5">
                        {isOpen ? "HIDE DETAILED DELIVERABLES ▴" : "VIEW DETAILED DELIVERABLES ▾"}
                      </span>
                      <span className="text-white/50 text-xs font-mono">
                        {isOpen ? "Collapse" : "Expand Scope"}
                      </span>
                    </div>

                    {/* Accordion Expandable Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-4 border-t border-white/15">
                            <span className="font-mono text-xs text-white/60 font-bold uppercase tracking-wider block mb-4">
                              FULL DELIVERABLE INCLUSIONS:
                            </span>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                              {opt.scope.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 font-mono text-xs sm:text-sm text-white/90 leading-relaxed bg-white/[0.03] backdrop-blur-sm p-2.5 rounded-xl border border-white/5">
                                  <span className="text-[var(--gold)] shrink-0 font-bold mt-0.5">✦</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex justify-end">
                              <Link
                                href={`#contact?pkg=${opt.id}`}
                                className="px-7 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-[var(--gold)]/25 hover:scale-105"
                                onClick={(e) => e.stopPropagation()}
                              >
                                START THIS PROJECT →
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

            {/* Disclaimer */}
            <div className="font-mono text-xs text-[var(--muted)] leading-relaxed pt-2">
              * “Final professional fees are determined by project size, complexity, site conditions and required deliverables.”
            </div>
          </div>
        </div>

        {/* ── Frosted Glass Bottom Action Callout Section ── */}
        <Reveal direction="up" duration={0.8}>
          <div className="relative rounded-3xl p-10 sm:p-16 lg:p-20 bg-gradient-to-br from-white/10 via-white/[0.03] to-black/90 backdrop-blur-3xl border border-white/20 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/15 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

            <div className="max-w-3xl relative z-10">
              <span className="font-mono text-xs sm:text-sm tracking-[4px] text-[var(--gold)] uppercase font-semibold block mb-4">
                START YOUR RESIDENTIAL PROJECT
              </span>
              <h3 className="font-bebas text-4xl sm:text-6xl text-white tracking-wide uppercase leading-none mb-6 drop-shadow-md">
                TELL US ABOUT YOUR PLOT, BUDGET &amp; VISION
              </h3>
              <p className="font-sans text-base sm:text-lg text-white/85 leading-relaxed mb-10 font-normal">
                “Tell us about your project, your plot and the kind of home you want to create. We begin by understanding your vision before we begin designing it.”
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Magnetic strength={0.3}>
                  <Link
                    href="#contact"
                    className="px-9 py-4 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-[var(--gold)]/30 hover:scale-105 inline-block"
                  >
                    START YOUR PROJECT →
                  </Link>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <a
                    href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20interested%20in%20discussing%20a%20residential%20architecture%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white font-mono text-xs sm:text-sm tracking-wider uppercase rounded-full border border-white/20 transition-colors inline-block shadow-md"
                  >
                    DIRECT WHATSAPP CONSULTATION ↗
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
