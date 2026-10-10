"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/TiltCard";

interface HomeArchetype {
  id: string;
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  shortDesc: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  whatsappPrompt: string;
}

const HOME_ARCHETYPES: HomeArchetype[] = [
  {
    id: "blueprint-masterplan",
    number: "01",
    tag: "SPATIAL PRECISION",
    title: "3D MASTERPLAN BLUEPRINT",
    subtitle: "We Design Your Comfort and Peace of Mind",
    image: "/images/intro/intro-blueprint-spatial.jpg",
    shortDesc: "Every millimeter coordinated in 3D before building starts. Zero guesswork, perfect flow.",
    highlights: ["Frictionless Living & Kitchen Flows", "Private Master Dress & Spa Lounges", "Complete Municipality Working Drawings"],
    specs: [
      { label: "Format", value: "3D Spatial Blueprint" },
      { label: "Outcome", value: "Budget & Spatial Certainty" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I want to discuss 3D Spatial Masterplanning for my home.",
  },
  {
    id: "luxury-duplex",
    number: "02",
    tag: "MODERN DUPLEX",
    title: "CONTEMPORARY LUXURY DUPLEX",
    subtitle: "Cantilevered Living & Rooftop Sky Lounge",
    image: "/images/intro/intro-luxury-duplex.jpg",
    shortDesc: "Sun-shaded pergola sky deck, floor-to-ceiling glass, and seamless indoor-outdoor entertaining.",
    highlights: ["Rooftop Sky Lounge Terrace", "Solar-Treated Panoramic Glass", "Maximized Usable Plot Footprint"],
    specs: [
      { label: "Typology", value: "4–6 Bed Multi-Level" },
      { label: "Feature", value: "Pergola Sky Lounge" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I am interested in designing a Contemporary Luxury Duplex.",
  },
  {
    id: "minimalist-villa",
    number: "03",
    tag: "MINIMALIST VILLA",
    title: "MONOLITHIC MINIMALIST VILLA",
    subtitle: "Pure Geometry & Tranquil Simplicity",
    image: "/images/intro/intro-minimalist-villa.jpg",
    shortDesc: "Crisp dual-tone volumetric blocks, vertical slit fenestration, and zen stepping lawn paths.",
    highlights: ["Privacy-First Street Elevation", "Low-Maintenance Mineral Stucco", "Linear Garden Stepping Paths"],
    specs: [
      { label: "Aesthetic", value: "Scandinavian Minimalist" },
      { label: "Layout", value: "Single-Floor / Split-Level" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I would like to design a Minimalist Villa / Bungalow.",
  },
  {
    id: "tropical-modern",
    number: "04",
    tag: "BIOPHILIC CONCRETE",
    title: "BRUTALIST CONCRETE RETREAT",
    subtitle: "Raw Concrete Softened by Exotic Greenery",
    image: "/images/intro/intro-tropical-modern.jpg",
    shortDesc: "Board-formed architectural concrete shielding interiors from heat, framed in rich Monstera foliage.",
    highlights: ["Natural Thermal Mass Cooling", "Integrated Bedroom Garden Pockets", "Timeless Organic Character"],
    specs: [
      { label: "Materiality", value: "Board-Formed Concrete" },
      { label: "Atmosphere", value: "Biophilic Serenity" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I want to build a Brutalist Concrete & Biophilic Retreat.",
  },
  {
    id: "contemporary-horizontal",
    number: "05",
    tag: "EXECUTIVE HOME",
    title: "HORIZONTAL CONTEMPORARY VILLA",
    subtitle: "Covered Portico & Panoramic Sightlines",
    image: "/images/intro/intro-contemporary-residence.jpg",
    shortDesc: "Floating upper volume over a sheltered 2-car gallery, horizontal ribbon windows, and distinct zoning.",
    highlights: ["Integrated 2-Car Portico Gallery", "Ribbon Glass Privacy Sightlines", "Seamless Backyard Lounge Flow"],
    specs: [
      { label: "Form", value: "Cantilevered Horizontal" },
      { label: "Parking", value: "Covered 2-Car Portico" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I want to design an Executive Horizontal Contemporary Home.",
  },
];

const SATISFACTION_PROCESS = [
  {
    step: "01",
    title: "Discovery & Site Study",
    desc: "We analyze your plot, solar angles, lifestyle flow, and budget parameters.",
  },
  {
    step: "02",
    title: "3D Photorealistic Modeling",
    desc: "Walk through your home in hyper-detailed 3D before a single brick is laid.",
  },
  {
    step: "03",
    title: "Permit Blueprints & M&E",
    desc: "Complete structural, electrical, and regulatory working drawing sets.",
  },
  {
    step: "04",
    title: "Construction Advisory",
    desc: "Material schedules and builder support to guarantee zero surprises.",
  },
];

export function IntroExperience({ onEnterStudio }: { onEnterStudio?: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isTransitioningOut, setIsTransitioningOut] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % HOME_ARCHETYPES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveTab((prev) => (prev - 1 + HOME_ARCHETYPES.length) % HOME_ARCHETYPES.length);
  }, []);

  // Autoplay cycle every 5.5s
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoplay, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIsAutoplay(false);
        nextSlide();
      }
      if (e.key === "ArrowLeft") {
        setIsAutoplay(false);
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handleSeamlessEnter = () => {
    setIsTransitioningOut(true);
    setTimeout(() => {
      if (onEnterStudio) {
        onEnterStudio();
      }
    }, 500);
  };

  const currentItem = HOME_ARCHETYPES[activeTab];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-screen w-full bg-[#060608] text-[#f4f0e8] flex flex-col justify-between relative overflow-x-hidden selection:bg-[var(--gold)] selection:text-black transition-opacity duration-500 ${
        isTransitioningOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* Delicate background ambient light */}
      <div className="fixed top-[-10%] right-[-5%] w-[450px] h-[450px] bg-[var(--gold)]/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-emerald-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Sleek Minimal Header - Frosted Neo-Glass */}
      <header className="relative z-40 w-full px-5 sm:px-10 lg:px-16 xl:px-20 py-4 bg-[#070709]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="font-bebas text-xl sm:text-2xl text-zinc-300 tracking-widest leading-none">
            ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleSeamlessEnter}
          className="px-3.5 sm:px-5 py-2 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-[0_4px_20px_rgba(212,168,67,0.25)]"
        >
          <span>Enter Website</span>
          <span>→</span>
        </button>
      </header>

      {/* MAIN VISUAL HERO & SHOWCASE */}
      <main className="relative z-20 flex-1 w-full max-w-[1580px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-6 sm:py-10 flex flex-col gap-8 sm:gap-12">
        
        {/* PUNCHY HERO MARKETING ONE-LINER */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.025] backdrop-blur-xl rounded-full text-[9.5px] sm:text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-white font-bold">B2C</span> · Elevation Studio · Residential Architecture
          </div>

          <h1 className="font-syne font-semibold text-sm sm:text-base lg:text-xl text-zinc-300 tracking-[0.14em] sm:tracking-[0.16em] uppercase max-w-3xl leading-relaxed">
            Beautiful Homes Designed for <span className="text-[var(--gold)] font-bold">Total Peace of Mind</span>
          </h1>
        </div>

        {/* ─── SHOWCASE: GRAND VISUAL ON LEFT, SLEEK COMPACT CARD ON RIGHT ─── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: GRAND HIGH-RES VIEWPORT WITH INTERACTIVE FRAME TILT */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between gap-3 sm:gap-4">
            <TiltCard maxTilt={5} glare={true} className="w-full h-full">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[6px] overflow-hidden bg-[#0a0b10]/40 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_35px_rgba(255,255,255,0.03),inset_0_1px_1px_rgba(255,255,255,0.12)] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                    />
                    {/* Reduced opacity cinematic overlay */}
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/85 via-black/20 to-black/20 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Tag Pill */}
                <div className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 z-20">
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-black/50 backdrop-blur-xl rounded-full text-[9px] sm:text-[10px] font-mono text-[var(--gold)] uppercase tracking-wider font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]">
                    B2C · {currentItem.number} · {currentItem.tag}
                  </span>
                </div>

                {/* Arrows Top Right */}
                <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-20 flex items-center gap-1 sm:gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoplay(false);
                      prevSlide();
                    }}
                    aria-label="Previous archetype"
                    className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-xs active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoplay(false);
                      nextSlide();
                    }}
                    aria-label="Next archetype"
                    className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-xs active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]"
                  >
                    →
                  </button>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 z-20 p-2.5 sm:p-3 bg-black/50 backdrop-blur-2xl rounded-[4px] shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-between">
                  <div className="font-syne font-bold text-[11px] sm:text-xs md:text-sm text-zinc-300 truncate pr-2">
                    {currentItem.subtitle}
                  </div>
                  <div className="font-mono text-[10px] sm:text-[11px] text-[var(--gold)] font-bold shrink-0">
                    {currentItem.number} / 05
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Thumbnail Pills Strip with Neuglassmorphism and Light White Shadow */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full">
              {HOME_ARCHETYPES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsAutoplay(false);
                    setActiveTab(idx);
                  }}
                  className={`p-1.5 sm:p-2.5 rounded-full transition-all text-left flex items-center justify-between cursor-pointer backdrop-blur-2xl ${
                    idx === activeTab
                      ? "bg-white/[0.08] text-[var(--gold)] font-bold shadow-[0_4px_20px_rgba(255,255,255,0.14),inset_0_1px_1px_rgba(255,255,255,0.35)] scale-[1.01]"
                      : "bg-white/[0.025] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06] shadow-[0_4px_16px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_6px_22px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  <span className="font-mono text-[9px] sm:text-[10px]">{item.number}</span>
                  <span className="font-sans text-[9px] sm:text-[10px] truncate hidden md:inline">{item.tag.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: MINIMALIST COMPACT NEO-GLASS SPECIFICATION CARD */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id + "-info"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="p-4 sm:p-6 bg-[#0e0f16]/30 backdrop-blur-2xl rounded-[6px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_25px_60px_rgba(0,0,0,0.7),0_2px_20px_rgba(255,255,255,0.02)] flex flex-col justify-between gap-4 h-full max-w-[420px] w-full mx-auto lg:mx-0"
              >
                <div>
                  <div className="font-mono text-[9.5px] sm:text-[10px] text-[var(--gold)] uppercase tracking-widest mb-1">
                    B2C CONCEPT {currentItem.number} OF 05
                  </div>
                  <h2 className="font-bebas text-xl sm:text-2xl md:text-3xl text-zinc-200 tracking-wide leading-none mb-1">
                    {currentItem.title}
                  </h2>
                  <div className="font-serif italic text-xs sm:text-sm text-[var(--gold)] mb-2.5">
                    &ldquo;{currentItem.subtitle}&rdquo;
                  </div>
                  <p className="font-sans text-[11.5px] sm:text-xs text-zinc-400 leading-relaxed font-light mb-3.5 max-w-[360px]">
                    {currentItem.shortDesc}
                  </p>

                  {/* Highlights List Box */}
                  <div className="p-3 bg-white/[0.02] backdrop-blur-xl rounded-[4px] mb-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_24px_rgba(255,255,255,0.03)]">
                    <div className="font-mono text-[9px] text-[var(--gold)] uppercase tracking-widest mb-1.5 font-semibold">
                      KEY DELIVERABLES:
                    </div>
                    <ul className="flex flex-col gap-1">
                      {currentItem.highlights.map((point, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] sm:text-[11.5px] text-zinc-300">
                          <span className="text-[var(--gold)] text-[9px]">◆</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs Pill Row */}
                  <div className="grid grid-cols-2 gap-2">
                    {currentItem.specs.map((sp, i) => (
                      <div key={i} className="p-2 bg-white/[0.02] backdrop-blur-xl rounded-[4px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_6px_20px_rgba(255,255,255,0.03)]">
                        <div className="font-mono text-[8px] text-zinc-500 uppercase">{sp.label}</div>
                        <div className="font-mono text-[10px] sm:text-[10.5px] text-zinc-300 font-semibold">{sp.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href={`https://wa.me/2349119059859?text=${encodeURIComponent(currentItem.whatsappPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-[10.5px] font-bold uppercase tracking-wider rounded-full text-center transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-[0_4px_20px_rgba(212,168,67,0.25)]"
                  >
                    <span>Discuss Concept</span>
                    <span>→</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleSeamlessEnter}
                    className="py-2.5 px-3.5 bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl text-zinc-300 hover:text-white font-mono text-[10.5px] uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-[0_4px_16px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.08)] text-center"
                  >
                    Enter Studio
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── 4-STEP CLIENT PROCESS: NEO-GLASS STRIP WITH LIGHT WHITE SHADOW ─── */}
        <div className="p-5 sm:p-8 bg-[#0e0f16]/30 backdrop-blur-2xl rounded-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_2px_20px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="font-mono text-[9px] sm:text-[9.5px] text-[var(--gold)] uppercase tracking-widest font-semibold">
                OUR CLIENT DELIVERY STANDARD
              </span>
              <h3 className="font-bebas text-xl sm:text-2xl md:text-3xl text-zinc-200 tracking-wide">
                4-STEP CLIENT SATISFACTION PROCESS
              </h3>
            </div>
            <span className="font-mono text-[10px] text-zinc-500">Zero Surprises · 100% Transparency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
            {SATISFACTION_PROCESS.map((proc, i) => (
              <div
                key={i}
                className="p-3.5 sm:p-4 bg-white/[0.025] hover:bg-white/[0.055] backdrop-blur-xl rounded-[4px] shadow-[0_8px_25px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.09),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all flex flex-col gap-1.5 group"
              >
                <div className="font-mono text-base sm:text-lg text-[var(--gold)] font-bold">
                  {proc.step}
                </div>
                <h4 className="font-syne font-bold text-xs sm:text-sm text-zinc-300 group-hover:text-[var(--gold)] transition-colors">
                  {proc.title}
                </h4>
                <p className="font-sans text-[10.5px] sm:text-[11px] text-zinc-400 font-light leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BOTTOM MINIMAL GATEWAY: NEO-GLASS CARD ─── */}
        <div className="p-6 sm:p-8 bg-[#0e0f16]/30 backdrop-blur-2xl rounded-[6px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_30px_70px_rgba(0,0,0,0.7)] text-center flex flex-col items-center gap-4">
          <div>
            <h3 className="font-bebas text-xl sm:text-2xl lg:text-3xl text-zinc-200 tracking-wider leading-none">
              READY TO BUILD YOUR DREAM HOME?
            </h3>
            <p className="font-sans text-xs text-zinc-400 mt-1 max-w-xl mx-auto font-light">
              See our transparent house packages, view realistic 3D plans, or chat directly with our lead architect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-sm sm:max-w-none">
            <button
              type="button"
              onClick={handleSeamlessEnter}
              className="px-6 sm:px-7 py-3 sm:py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-xs font-bold uppercase tracking-widest rounded-full transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(212,168,67,0.3)]"
            >
              <span>Explore Full Website</span>
              <span>→</span>
            </button>

            <a
              href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                "Hello Elevation Studio, I reviewed your Intro Showcase and would like to schedule a direct architectural consultation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 sm:py-3.5 bg-emerald-950/30 hover:bg-emerald-900/50 backdrop-blur-xl text-emerald-400 font-mono text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1.5 shadow-[0_8px_24px_rgba(6,78,59,0.25)]"
            >
              <span>WhatsApp Direct</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full px-5 sm:px-10 lg:px-16 xl:px-20 py-4 bg-[#060608]/80 backdrop-blur-lg flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-zinc-500">
        <div>© 2026 Elevation Studio</div>
        <div className="text-[var(--gold)]">www.elevationstudiong.com.ng</div>
      </footer>
    </motion.div>
  );
}
