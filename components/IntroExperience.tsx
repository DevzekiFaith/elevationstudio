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
      {/* Delicate background ambient light */}
      <div className="fixed top-[-10%] right-[-5%] w-[450px] h-[450px] bg-[var(--gold)]/[0.04] blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-emerald-500/[0.04] blur-[120px] rounded-full pointer-events-none" />

      {/* Sleek Minimal Header - Frosted Neo-Glass */}
      <header className="relative z-40 w-full px-6 py-4 sm:py-5 bg-[#070709]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-between gap-4">
        <div className="flex items-center">
          <span className="font-bebas text-xl sm:text-2xl text-zinc-300 tracking-widest leading-none">
            ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
          </span>
        </div>

        <button
          type="button"
          onClick={handleSeamlessEnter}
          className="px-5 sm:px-7 py-2.5 sm:py-3 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.2em] rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-105 shadow-[0_4px_24px_rgba(212,168,67,0.4),0_0_15px_rgba(212,168,67,0.2)] hover:shadow-[0_6px_30px_rgba(212,168,67,0.6)]"
        >
          <span>Enter Website</span>
          <span className="text-sm font-black transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </header>

      {/* MAIN VISUAL HERO & SHOWCASE */}
      <main className="relative z-20 flex-1 w-full max-w-[1580px] mx-auto px-6 py-8 sm:py-12 lg:py-16 flex flex-col gap-10 sm:gap-14 lg:gap-16">
        
        {/* PUNCHY HERO MARKETING ONE-LINER */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-3 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/[0.025] backdrop-blur-xl rounded-full text-[9.5px] sm:text-[10px] font-mono text-[var(--gold)] tracking-widest uppercase shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="text-white font-bold">B2C</span> · Elevation Studio · Residential Architecture
          </div>

          <h1 className="font-syne font-semibold text-sm sm:text-base lg:text-xl text-zinc-300 tracking-[0.14em] sm:tracking-[0.16em] uppercase max-w-3xl leading-relaxed">
            Welcome Home to <span className="text-[var(--gold)] font-bold">Peace of Mind</span>
          </h1>
        </div>

        {/* ─── SHOWCASE: GRAND VISUAL ON LEFT, SLEEK COMPACT CARD ON RIGHT ─── */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT: GRAND HIGH-RES VIEWPORT WITH INTERACTIVE FRAME TILT */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between gap-4 sm:gap-5">
            <TiltCard maxTilt={5} glare={true} className="w-full h-full">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-[20px] overflow-hidden bg-[#0a0b10]/40 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8),0_0_35px_rgba(255,255,255,0.03),inset_0_1px_1px_rgba(255,255,255,0.12)] group">
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
                <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-xl rounded-full text-[9px] sm:text-[10px] font-mono text-[var(--gold)] uppercase tracking-wider font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)]">
                    B2C · {currentItem.number} · {currentItem.tag}
                  </span>
                </div>

                {/* Arrows Top Right */}
                <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAutoplay(false);
                      prevSlide();
                    }}
                    aria-label="Previous archetype"
                    className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-xs active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]"
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
                    className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xl text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-xs active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)]"
                  >
                    →
                  </button>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 z-20 p-3 sm:p-4 bg-black/50 backdrop-blur-2xl rounded-[14px] shadow-[0_12px_36px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-between">
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
            <div className="grid grid-cols-5 gap-1.5 sm:gap-3 w-full my-1">
              {HOME_ARCHETYPES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsAutoplay(false);
                    setActiveTab(idx);
                  }}
                  className={`p-2 sm:p-3 rounded-full transition-all text-left flex items-center justify-center md:justify-between cursor-pointer backdrop-blur-2xl ${
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
                className="p-5 sm:p-8 lg:p-9 bg-[#0e0f16]/40 backdrop-blur-2xl rounded-[20px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_25px_60px_rgba(0,0,0,0.7),0_2px_20px_rgba(255,255,255,0.02)] flex flex-col justify-between gap-5 h-full max-w-[460px] w-full mx-auto lg:mx-0"
              >
                <div>
                  <div className="font-mono text-[9.5px] sm:text-[10px] text-[var(--gold)] uppercase tracking-widest mb-1">
                    B2C CONCEPT {currentItem.number} OF 05
                  </div>
                  <h2 className="font-bebas text-xl sm:text-3xl md:text-4xl text-zinc-200 tracking-wide leading-none mb-1.5">
                    {currentItem.title}
                  </h2>
                  <div className="font-serif italic text-xs sm:text-sm text-[var(--gold)] mb-3">
                    &ldquo;{currentItem.subtitle}&rdquo;
                  </div>
                  <p className="font-sans text-[11.5px] sm:text-xs text-zinc-400 leading-relaxed font-light mb-4 max-w-[380px]">
                    {currentItem.shortDesc}
                  </p>

                  {/* Highlights List Box */}
                  <div className="p-4 sm:p-5 bg-white/[0.025] backdrop-blur-xl rounded-[16px] mb-4 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_24px_rgba(255,255,255,0.03)]">
                    <div className="font-mono text-[9px] text-[var(--gold)] uppercase tracking-widest mb-2 font-semibold">
                      KEY DELIVERABLES:
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {currentItem.highlights.map((point, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] sm:text-[11.5px] text-zinc-300">
                          <span className="text-[var(--gold)] text-[9px]">◆</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs Pill Row */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {currentItem.specs.map((sp, i) => (
                      <div key={i} className="p-2.5 sm:p-3 bg-white/[0.025] backdrop-blur-xl rounded-[12px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_6px_20px_rgba(255,255,255,0.03)]">
                        <div className="font-mono text-[8px] text-zinc-500 uppercase">{sp.label}</div>
                        <div className="font-mono text-[10px] sm:text-[10.5px] text-zinc-300 font-semibold">{sp.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={`https://wa.me/2349119059859?text=${encodeURIComponent(currentItem.whatsappPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-[10.5px] font-bold uppercase tracking-wider rounded-full text-center transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-[0_4px_20px_rgba(212,168,67,0.25)]"
                  >
                    <span>Discuss Concept</span>
                    <span>→</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleSeamlessEnter}
                    className="py-3 sm:py-3.5 px-5 sm:px-6 bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-[var(--gold-border)] text-white hover:text-[var(--gold)] backdrop-blur-xl font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-[0_4px_18px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.15)] text-center active:scale-95 hover:scale-[1.02]"
                  >
                    Enter Studio
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ─── 4-STEP CLIENT PROCESS: NEO-GLASS STRIP WITH LIGHT WHITE SHADOW ─── */}
        <div className="p-6 sm:p-10 lg:p-12 bg-[#0e0f16]/40 backdrop-blur-2xl rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.6),0_2px_20px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
            <div>
              <span className="font-mono text-[9px] sm:text-[9.5px] text-[var(--gold)] uppercase tracking-widest font-semibold">
                OUR CLIENT DELIVERY STANDARD
              </span>
              <h3 className="font-bebas text-2xl sm:text-3xl md:text-4xl text-zinc-200 tracking-wide mt-1">
                4-STEP CLIENT SATISFACTION PROCESS
              </h3>
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500">Zero Surprises · 100% Transparency</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {SATISFACTION_PROCESS.map((proc, i) => (
              <div
                key={i}
                className="p-4 sm:p-6 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl rounded-[18px] shadow-[0_8px_25px_rgba(255,255,255,0.04),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_12px_32px_rgba(255,255,255,0.09),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all flex flex-col gap-2 group"
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
        <div className="p-8 sm:p-12 lg:p-14 bg-[#0e0f16]/40 backdrop-blur-2xl rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_30px_70px_rgba(0,0,0,0.7)] text-center flex flex-col items-center gap-6">
          <div>
            <h3 className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-zinc-200 tracking-wider leading-none">
              READY TO BUILD YOUR DREAM HOME?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl mx-auto font-light leading-relaxed">
              See our transparent house packages, view realistic 3D plans, or chat directly with our lead architect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-sm sm:max-w-none">
            <button
              type="button"
              onClick={handleSeamlessEnter}
              className="px-8 sm:px-10 py-4 sm:py-4.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.18em] sm:tracking-[0.22em] rounded-full transition-all duration-300 active:scale-95 hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-2.5 shadow-[0_8px_32px_rgba(212,168,67,0.45)] hover:shadow-[0_12px_45px_rgba(212,168,67,0.65)]"
            >
              <span>Explore Full Website</span>
              <span className="text-base font-black">→</span>
            </button>

            <a
              href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                "Hello Elevation Studio, I reviewed your Intro Showcase and would like to schedule a direct architectural consultation."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-emerald-950/30 hover:bg-emerald-900/50 backdrop-blur-xl text-emerald-400 font-mono text-xs uppercase tracking-wider rounded-full transition-all flex items-center justify-center gap-1.5 shadow-[0_8px_24px_rgba(6,78,59,0.25)]"
            >
              <span>WhatsApp Direct</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full px-6 py-6 bg-[#060608]/80 backdrop-blur-lg flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono text-zinc-500">
        <div>© 2026 Elevation Studio</div>
        <div className="text-[var(--gold)]">www.elevationstudiong.com.ng</div>
      </footer>
    </motion.div>
  );
}
