"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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

  const handleSeamlessEnter = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("es_intro_seen", "true");
    }
    setIsTransitioningOut(true);
    setTimeout(() => {
      if (onEnterStudio) {
        onEnterStudio();
      } else {
        router.push("/");
        setTimeout(() => {
          if (typeof window !== "undefined" && window.location.pathname.startsWith("/intro")) {
            window.location.href = "/";
          }
        }, 150);
      }
    }, 300);
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
      {/* CAD Blueprint Subtle Watermark Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Ambient Lighting Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[var(--gold)] blur-[150px] rounded-full pointer-events-none z-0" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-emerald-500 blur-[150px] rounded-full pointer-events-none z-0" 
      />

      {/* Sleek Minimal Header - Frosted Neo-Glass */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-40 w-full px-6 sm:px-8 lg:px-10 py-4 sm:py-5 bg-[#070709]/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-center justify-between gap-4"
      >
        <div className="flex items-center">
          <span className="font-bebas text-xl sm:text-2xl lg:text-3xl text-zinc-200 tracking-widest leading-none">
            ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
          </span>
        </div>

        <motion.button
          type="button"
          onClick={handleSeamlessEnter}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.22em] rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_4px_24px_rgba(212,168,67,0.4),0_0_15px_rgba(212,168,67,0.2)] hover:shadow-[0_6px_32px_rgba(212,168,67,0.65)]"
        >
          <span>Enter Website</span>
          <span className="text-sm font-black transition-transform duration-300 group-hover:translate-x-1">→</span>
        </motion.button>
      </motion.header>

      {/* MAIN VISUAL HERO & SHOWCASE CONTAINER - MATCHED TO HOME PAGE CONTAINER (max-w-7xl, px-6) */}
      <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16 flex flex-col gap-12 sm:gap-16 lg:gap-20">
        
        {/* PUNCHY HERO MARKETING ONE-LINER WITH FRAMER REVEAL */}
        <motion.div 
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3.5 px-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-full text-[10px] sm:text-[10.5px] font-mono text-[var(--gold)] tracking-widest uppercase shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-white font-bold">B2C</span> · Elevation Studio · Residential Architecture
          </div>

          <h1 className="font-syne font-bold text-base sm:text-lg lg:text-2xl text-zinc-200 tracking-[0.14em] sm:tracking-[0.16em] uppercase max-w-2xl leading-relaxed">
            Welcome Home to <span className="text-[var(--gold)] font-extrabold">Peace of Mind</span>
          </h1>
        </motion.div>

        {/* ─── SHOWCASE: FLUID & BALANCED 2-COLUMN VIEWPORT & SPEC CARD ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-stretch"
        >
          
          {/* LEFT: GRAND VIEWPORT WITH HARMONIZED ASPECT RATIO & INTERACTIVE FRAME TILT */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4 sm:gap-5 w-full">
            <TiltCard maxTilt={4} glare={true} className="w-full h-full">
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] xl:aspect-[16/11] min-h-[320px] sm:min-h-[420px] lg:min-h-[480px] rounded-3xl overflow-hidden bg-[#0a0b10]/70 backdrop-blur-2xl border border-white/[0.09] shadow-[0_30px_80px_rgba(0,0,0,0.85),0_0_35px_rgba(212,168,67,0.05),inset_0_1px_1px_rgba(255,255,255,0.15)] group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentItem.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={currentItem.image}
                      alt={currentItem.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    {/* Cinematic Gradient Overlays */}
                    <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-black/25 to-black/20 pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Tag Pill */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                  <span className="px-3.5 py-1.5 bg-black/65 backdrop-blur-xl border border-white/10 rounded-full text-[9.5px] sm:text-[10px] font-mono text-[var(--gold)] uppercase tracking-wider font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]">
                    B2C · {currentItem.number} · {currentItem.tag}
                  </span>
                </div>

                {/* Arrows Top Right */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex items-center gap-2">
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoplay(false);
                      prevSlide();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Previous archetype"
                    className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-black/65 hover:bg-black/95 border border-white/10 hover:border-[var(--gold-border)] backdrop-blur-xl text-zinc-200 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-xs shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                  >
                    ←
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoplay(false);
                      nextSlide();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Next archetype"
                    className="w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-black/65 hover:bg-black/95 border border-white/10 hover:border-[var(--gold-border)] backdrop-blur-xl text-zinc-200 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-xs shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
                  >
                    →
                  </motion.button>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 p-4 sm:p-5 bg-black/70 backdrop-blur-2xl border border-white/[0.09] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.12)] flex items-center justify-between">
                  <div className="font-syne font-bold text-xs sm:text-sm text-zinc-200 truncate pr-2">
                    {currentItem.subtitle}
                  </div>
                  <div className="font-mono text-[10.5px] sm:text-xs text-[var(--gold)] font-bold shrink-0">
                    {currentItem.number} / 05
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Thumbnail Pills Strip with Autoplay Progress Bar */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full my-1">
              {HOME_ARCHETYPES.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsAutoplay(false);
                    setActiveTab(idx);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden p-2.5 sm:p-3.5 rounded-full transition-all text-left flex items-center justify-center md:justify-between cursor-pointer backdrop-blur-2xl ${
                    idx === activeTab
                      ? "bg-white/[0.1] text-[var(--gold)] font-bold border border-[var(--gold-border)]/60 shadow-[0_4px_20px_rgba(212,168,67,0.18),inset_0_1px_1px_rgba(255,255,255,0.35)] scale-[1.01]"
                      : "bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.07] border border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_22px_rgba(255,255,255,0.1)]"
                  }`}
                >
                  <span className="font-mono text-[9.5px] sm:text-[10px] relative z-10">{item.number}</span>
                  <span className="font-sans text-[9.5px] sm:text-[10.5px] truncate hidden md:inline relative z-10 font-medium">{item.tag.split(" ")[0]}</span>

                  {/* Animated Autoplay Progress Indicator */}
                  {idx === activeTab && isAutoplay && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--gold)] origin-left shadow-[0_0_8px_rgba(212,168,67,0.8)]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5.5, ease: "linear" }}
                      key={`progress-${activeTab}`}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* RIGHT: HARMONIZED & SPACIOUS SPECIFICATION NEO-GLASS CARD */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id + "-info"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-6 sm:p-8 lg:p-9 bg-[#0e0f16]/60 backdrop-blur-2xl border border-white/[0.09] rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_25px_60px_rgba(0,0,0,0.7),0_2px_20px_rgba(212,168,67,0.03)] flex flex-col justify-between h-full w-full"
              >
                {/* TOP CONTENT BLOCK WITH BALANCED TYPOGRAPHY HIERARCHY */}
                <div className="flex flex-col">
                  {/* Concept Tag */}
                  <div className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-[0.2em] font-bold mb-2.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                    B2C CONCEPT {currentItem.number} OF 05
                  </div>

                  {/* Main Title with Elevated Scale */}
                  <h2 className="font-bebas text-3xl sm:text-4xl lg:text-[40px] text-zinc-100 tracking-wide leading-[1.05] mb-2 sm:mb-2.5">
                    {currentItem.title}
                  </h2>

                  {/* Subtitle Quote */}
                  <div className="font-serif italic text-sm sm:text-[14.5px] text-[var(--gold)] opacity-95 tracking-wide mb-4">
                    &ldquo;{currentItem.subtitle}&rdquo;
                  </div>

                  {/* Short Description */}
                  <p className="font-sans text-xs sm:text-[13px] text-zinc-300/90 leading-[1.7] font-light mb-6">
                    {currentItem.shortDesc}
                  </p>

                  {/* Highlights List Box with Dedicated Top & Bottom Padding */}
                  <div className="p-5 sm:p-6 bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl rounded-2xl mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                    <div className="font-mono text-[9.5px] text-[var(--gold)] uppercase tracking-[0.16em] font-bold flex items-center gap-2 mb-3.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                      KEY DELIVERABLES
                    </div>
                    <ul className="flex flex-col gap-3">
                      {currentItem.highlights.map((point, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.08 }}
                          className="flex items-start gap-2.5 text-xs sm:text-[12.5px] text-zinc-200 leading-relaxed"
                        >
                          <span className="text-[var(--gold)] text-[10px] drop-shadow-[0_0_6px_rgba(212,168,67,0.6)] shrink-0 mt-[2px]">◆</span>
                          <span className="font-normal">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs Pill Row with Generous Spacing */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {currentItem.specs.map((sp, i) => (
                      <div key={i} className="p-3.5 sm:p-4 bg-white/[0.03] border border-white/[0.07] backdrop-blur-xl rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] flex flex-col gap-1">
                        <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">{sp.label}</div>
                        <div className="font-mono text-[11px] sm:text-xs text-zinc-100 font-semibold">{sp.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons with Top Divider & Spacious Padding */}
                <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <motion.a
                    href={`https://wa.me/2349119059859?text=${encodeURIComponent(currentItem.whatsappPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3.5 px-5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-wider rounded-full text-center transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_20px_rgba(212,168,67,0.35)]"
                  >
                    <span>Discuss Concept</span>
                    <span>→</span>
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={handleSeamlessEnter}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="py-3.5 px-6 sm:px-7 bg-white/[0.06] hover:bg-white/[0.14] border border-white/20 hover:border-[var(--gold-border)] text-white hover:text-[var(--gold)] backdrop-blur-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-[0_4px_18px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.15)] text-center"
                  >
                    Enter Studio
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ─── 4-STEP CLIENT PROCESS: CONNECTED WORKFLOW NEO-GLASS RIBBON ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative p-6 sm:p-10 lg:p-12 bg-[#0e0f16]/50 backdrop-blur-2xl border border-white/[0.09] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.6),0_2px_20px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.12)]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10">
            <div>
              <span className="font-mono text-[9.5px] sm:text-[10px] text-[var(--gold)] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                OUR CLIENT DELIVERY STANDARD
              </span>
              <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-zinc-100 tracking-wide mt-1.5">
                4-STEP CLIENT SATISFACTION PROCESS
              </h3>
            </div>
            <span className="font-mono text-[10.5px] sm:text-xs text-zinc-400">Zero Surprises · 100% Transparency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {SATISFACTION_PROCESS.map((proc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-5 sm:p-6 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.07] hover:border-[var(--gold-border)]/50 backdrop-blur-xl rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:shadow-[0_12px_32px_rgba(212,168,67,0.12),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300 flex flex-col gap-2.5 group"
              >
                <div className="font-mono text-base sm:text-lg text-[var(--gold)] font-bold flex items-center justify-between">
                  <span>{proc.step}</span>
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)]/40 group-hover:bg-[var(--gold)] transition-colors shadow-[0_0_8px_rgba(212,168,67,0.5)]" />
                </div>
                <h4 className="font-syne font-bold text-xs sm:text-sm text-zinc-200 group-hover:text-[var(--gold)] transition-colors">
                  {proc.title}
                </h4>
                <p className="font-sans text-[11px] sm:text-xs text-zinc-400 font-light leading-relaxed">
                  {proc.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── BOTTOM MINIMAL GATEWAY: NEO-GLASS CARD ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="p-8 sm:p-12 lg:p-16 bg-[#0e0f16]/50 backdrop-blur-2xl border border-white/[0.09] rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_30px_70px_rgba(0,0,0,0.7)] text-center flex flex-col items-center gap-7"
        >
          <div>
            <h3 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-wider leading-none">
              READY TO BUILD YOUR DREAM HOME?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-300/80 mt-3 max-w-xl mx-auto font-light leading-relaxed">
              See our transparent house packages, view realistic 3D plans, or chat directly with our lead architect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-sm sm:max-w-none">
            <motion.button
              type="button"
              onClick={handleSeamlessEnter}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 sm:px-12 py-4 sm:py-4.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.22em] rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 shadow-[0_8px_32px_rgba(212,168,67,0.45)] hover:shadow-[0_12px_45px_rgba(212,168,67,0.65)]"
            >
              <span>Explore Full Website</span>
              <span className="text-base font-black">→</span>
            </motion.button>

            <motion.a
              href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                "Hello Elevation Studio, I reviewed your Intro Showcase and would like to schedule a direct architectural consultation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 sm:px-8 py-3.5 sm:py-4 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-900/50 backdrop-blur-xl text-emerald-400 font-mono text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(6,78,59,0.25)]"
            >
              <span>WhatsApp Direct</span>
              <span>↗</span>
            </motion.a>
          </div>
        </motion.div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full px-6 sm:px-8 lg:px-10 py-6 bg-[#060608]/90 backdrop-blur-lg border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] font-mono text-zinc-500">
        <div>© 2026 Elevation Studio</div>
        <div className="text-[var(--gold)]">www.elevationstudiong.com.ng</div>
      </footer>
    </motion.div>
  );
}

