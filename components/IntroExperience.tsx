"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    id: "minimalist-villa",
    number: "01",
    tag: "MINIMALIST VILLA",
    title: "MONOLITHIC MINIMALIST VILLA",
    subtitle: "Pure Geometry & Tranquil Simplicity",
    image: "/images/intro/intro-minimalist-villa.jpg",
    shortDesc: "Crisp dual-tone volumetric blocks, vertical slit fenestration, and zen stepping lawn paths. Engineered for effortless maintenance and serene family living.",
    highlights: ["Privacy-First Street Elevation", "Low-Maintenance Mineral Stucco", "Linear Garden Stepping Paths"],
    specs: [
      { label: "Aesthetic", value: "Scandinavian Minimalist" },
      { label: "Layout", value: "Single-Floor / Split-Level" },
      { label: "Footprint", value: "Optimized 4-Bed Layout" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I would like to discuss designing a Monolithic Minimalist Villa.",
  },
  {
    id: "luxury-duplex",
    number: "02",
    tag: "MODERN DUPLEX",
    title: "CONTEMPORARY LUXURY DUPLEX",
    subtitle: "Cantilevered Living & Rooftop Sky Lounge",
    image: "/images/intro/intro-luxury-duplex.jpg",
    shortDesc: "Sun-shaded pergola sky deck, floor-to-ceiling panoramic glass, and seamless indoor-outdoor entertaining spaces tailored for prime residential plots.",
    highlights: ["Rooftop Sky Lounge Terrace", "Solar-Treated Panoramic Glass", "Maximized Usable Plot Footprint"],
    specs: [
      { label: "Typology", value: "4–6 Bed Multi-Level" },
      { label: "Feature", value: "Pergola Sky Lounge" },
      { label: "Lifestyle", value: "Indoor-Outdoor Terrace" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I am interested in designing a Contemporary Luxury Duplex.",
  },
  {
    id: "tropical-modern",
    number: "03",
    tag: "BIOPHILIC CONCRETE",
    title: "BRUTALIST CONCRETE RETREAT",
    subtitle: "Raw Concrete Softened by Exotic Greenery",
    image: "/images/intro/intro-tropical-modern.jpg",
    shortDesc: "Board-formed architectural concrete shielding interiors from heat, framed in lush tropical Monstera foliage with secluded courtyard lightwells.",
    highlights: ["Natural Thermal Mass Cooling", "Integrated Bedroom Garden Pockets", "Timeless Organic Character"],
    specs: [
      { label: "Materiality", value: "Board-Formed Concrete" },
      { label: "Atmosphere", value: "Biophilic Serenity" },
      { label: "Climate", value: "Passive Solar Shading" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I want to build a Brutalist Concrete & Biophilic Retreat.",
  },
  {
    id: "contemporary-horizontal",
    number: "04",
    tag: "EXECUTIVE HOME",
    title: "HORIZONTAL CONTEMPORARY VILLA",
    subtitle: "Covered Portico & Panoramic Sightlines",
    image: "/images/intro/intro-contemporary-residence.jpg",
    shortDesc: "Floating upper volume over a sheltered 2-car gallery, horizontal ribbon windows, and distinct zoning for executive entertaining and family privacy.",
    highlights: ["Integrated 2-Car Portico Gallery", "Ribbon Glass Privacy Sightlines", "Seamless Backyard Lounge Flow"],
    specs: [
      { label: "Form", value: "Cantilevered Horizontal" },
      { label: "Parking", value: "Covered 2-Car Portico" },
      { label: "Zoning", value: "Executive Dual-Wing" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I want to design an Executive Horizontal Contemporary Home.",
  },
  {
    id: "blueprint-masterplan",
    number: "05",
    tag: "SPATIAL PRECISION",
    title: "3D MASTERPLAN BLUEPRINT",
    subtitle: "We Design Your Comfort and Peace of Mind",
    image: "/images/intro/intro-blueprint-spatial.jpg",
    shortDesc: "Every millimeter coordinated in hyper-detailed 3D before construction starts. Complete civil blueprints, permit documentation, and exact bill of quantities.",
    highlights: ["Frictionless Living & Kitchen Flows", "Private Master Dress & Spa Lounges", "Complete Municipality Working Drawings"],
    specs: [
      { label: "Format", value: "3D Spatial Blueprint" },
      { label: "Outcome", value: "Budget & Spatial Certainty" },
      { label: "Permits", value: "Full M&E & Civil Drawing Set" },
    ],
    whatsappPrompt: "Hello Elevation Studio, I want to discuss 3D Spatial Masterplanning for my home.",
  },
];

const SATISFACTION_PROCESS = [
  {
    step: "01",
    title: "Discovery & Site Study",
    desc: "We analyze your plot, solar angles, lifestyle flow, and budget parameters to establish a crystal-clear brief.",
  },
  {
    step: "02",
    title: "3D Photorealistic Modeling",
    desc: "Walk through your home in hyper-detailed 3D before a single brick is laid, experiencing lighting and finishes.",
  },
  {
    step: "03",
    title: "Permit Blueprints & M&E",
    desc: "Receive complete structural, electrical, and regulatory working drawing sets ready for statutory approval.",
  },
  {
    step: "04",
    title: "Construction Advisory",
    desc: "Material schedules and builder support to guarantee zero contractor deviations or costly site surprises.",
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

  // Autoplay cycle every 6s
  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
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
      className={`min-h-screen w-full bg-[#000000] text-[#f5f5f7] flex flex-col justify-between relative overflow-x-hidden selection:bg-[var(--gold)] selection:text-black transition-opacity duration-500 font-sans ${
        isTransitioningOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* ─── APPLE-STYLE ULTRA-THIN FROSTED NAV BAR ─── */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 h-12 sm:h-14 bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] flex items-center justify-between px-4 sm:px-8 lg:px-12"
      >
        <div className="flex items-center gap-3">
          <span className="font-bebas text-lg sm:text-xl text-white tracking-[0.2em] leading-none">
            ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-500 uppercase tracking-widest pl-2 border-l border-white/10">
            Residential Architecture
          </span>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={handleSeamlessEnter}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-sans text-xs sm:text-[13px] font-semibold rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-[0_4px_20px_rgba(212,168,67,0.35)]"
          >
            <span>Enter Studio</span>
            <span className="text-xs">→</span>
          </motion.button>
        </div>
      </motion.nav>

      {/* ─── MAIN EXPANSIVE CONTENT CONTAINER (APPLE FLUID SCROLL) ─── */}
      <main className="relative z-10 flex-1 w-full pt-16 sm:pt-20 pb-16 flex flex-col gap-12 sm:gap-20 lg:gap-24">

        {/* ─── HERO SECTION: APPLE FLAGSHIP PRODUCT CANVAS ─── */}
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col items-center">
          
          {/* Eyebrow & Punchy Apple Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-4xl mx-auto flex flex-col items-center gap-2.5 sm:gap-3 pt-6 sm:pt-10 pb-6 sm:pb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.06] backdrop-blur-xl rounded-full text-[10px] sm:text-[11px] font-mono text-[var(--gold)] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              <span>B2C · Private Residential Collection</span>
            </div>

            <h1 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] max-w-4xl">
              {currentItem.title}
            </h1>

            <p className="font-sans text-base sm:text-xl lg:text-2xl text-zinc-300 font-light max-w-2xl leading-snug">
              {currentItem.subtitle}
            </p>

            {/* Apple-style Action Pill Group */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
              <motion.a
                href={`https://wa.me/2349119059859?text=${encodeURIComponent(currentItem.whatsappPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-sans text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-[0_4px_24px_rgba(212,168,67,0.3)] flex items-center gap-2 cursor-pointer"
              >
                <span>Discuss Concept</span>
                <span className="text-sm">→</span>
              </motion.a>

              <motion.button
                type="button"
                onClick={handleSeamlessEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 sm:px-7 py-2.5 sm:py-3 bg-white/[0.08] hover:bg-white/[0.14] text-white font-sans text-xs sm:text-sm font-medium rounded-full transition-all duration-300 backdrop-blur-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Full Website</span>
                <span className="text-zinc-400">›</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Apple-style Panoramic Visual Canvas */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] lg:aspect-[2.3/1] min-h-[340px] sm:min-h-[460px] lg:min-h-[540px] rounded-[24px] sm:rounded-[36px] overflow-hidden bg-[#0a0a0e] shadow-[0_30px_90px_rgba(0,0,0,0.85)] group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1440px) 100vw, 1440px"
                />
                {/* Atmospheric gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
              </motion.div>
            </AnimatePresence>

            {/* Top Left Archetype Badge */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
              <span className="px-3.5 py-1.5 bg-black/70 backdrop-blur-xl rounded-full text-[10px] sm:text-xs font-mono text-[var(--gold)] uppercase tracking-wider font-semibold shadow-lg">
                Archetype {currentItem.number} · {currentItem.tag}
              </span>
            </div>

            {/* Top Right Navigation Arrows */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 flex items-center gap-2">
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoplay(false);
                  prevSlide();
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Previous home archetype"
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-sm shadow-lg backdrop-blur-xl"
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
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Next home archetype"
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer text-sm shadow-lg backdrop-blur-xl"
              >
                →
              </motion.button>
            </div>

            {/* Bottom Floating Information Overlay (Apple Specs Capsule) */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 p-4 sm:p-5 bg-black/75 backdrop-blur-2xl rounded-[18px] sm:rounded-[22px] flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <div className="flex flex-col gap-1 max-w-xl">
                <span className="font-sans text-xs sm:text-sm text-zinc-300 line-clamp-2 font-light">
                  {currentItem.shortDesc}
                </span>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                  {currentItem.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-white/[0.08] rounded-full text-[10px] sm:text-[11px] text-zinc-300 font-sans"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specs Pills */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {currentItem.specs.map((sp, i) => (
                  <div key={i} className="px-3 py-1.5 bg-white/[0.06] rounded-xl text-left">
                    <div className="text-[9px] font-mono text-zinc-400 uppercase">{sp.label}</div>
                    <div className="text-[11px] sm:text-xs font-sans text-white font-medium">{sp.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Apple-style Interactive Segmented Controller Bar */}
          <div className="mt-4 sm:mt-6 w-full flex justify-center">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-white/[0.06] backdrop-blur-2xl rounded-full border border-white/[0.08] shadow-2xl overflow-x-auto max-w-full">
              {HOME_ARCHETYPES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsAutoplay(false);
                    setActiveTab(idx);
                  }}
                  className={`relative px-3 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 text-xs sm:text-[13px] font-sans flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    idx === activeTab
                      ? "bg-white text-black font-semibold shadow-lg"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-70">{item.number}</span>
                  <span>{item.tag.split(" ")[0]}</span>

                  {/* Autoplay Progress Line on Active Button */}
                  {idx === activeTab && isAutoplay && (
                    <motion.span
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-[var(--gold)] origin-left rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      key={`progress-pill-${activeTab}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: APPLE-STYLE 2-COLUMN BENTO SHOWCASE GRID ─── */}
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h2 className="font-sans font-bold text-2xl sm:text-4xl text-white tracking-tight">
              Architectural Typologies.
            </h2>
            <p className="font-sans text-sm sm:text-lg text-zinc-400 font-light mt-2">
              Explore our distinctive residential formats crafted for discerning property owners and diaspora builders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {HOME_ARCHETYPES.slice(1, 5).map((archetype, i) => (
              <motion.div
                key={archetype.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#0c0d12] shadow-2xl group flex flex-col justify-between p-6 sm:p-8"
              >
                {/* Background Photography */}
                <Image
                  src={archetype.image}
                  alt={archetype.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 pointer-events-none" />

                {/* Top Card Text */}
                <div className="relative z-10 flex flex-col items-start gap-1">
                  <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider font-semibold">
                    {archetype.tag}
                  </span>
                  <h3 className="font-sans font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight">
                    {archetype.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 font-light max-w-md">
                    {archetype.subtitle}
                  </p>
                </div>

                {/* Bottom Card Action Links */}
                <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[11px] font-mono text-zinc-400">
                    {archetype.specs[0].label}: {archetype.specs[0].value}
                  </span>

                  <motion.a
                    href={`https://wa.me/2349119059859?text=${encodeURIComponent(archetype.whatsappPrompt)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white text-black hover:bg-[var(--gold)] hover:text-black font-sans text-xs font-semibold rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Discuss</span>
                    <span>→</span>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 3: APPLE-STYLE 4-STEP CLIENT PROCESS ─── */}
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="font-mono text-[10px] sm:text-xs text-[var(--gold)] uppercase tracking-widest font-semibold">
              OUR CLIENT DELIVERY STANDARD
            </span>
            <h2 className="font-sans font-bold text-2xl sm:text-4xl text-white tracking-tight mt-1">
              From First Sketch to Complete Handover.
            </h2>
            <p className="font-sans text-sm sm:text-lg text-zinc-400 font-light mt-2">
              Zero surprises. 100% spatial transparency before construction begins.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SATISFACTION_PROCESS.map((proc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 sm:p-8 bg-white/[0.04] hover:bg-white/[0.07] rounded-[22px] sm:rounded-[26px] backdrop-blur-xl transition-all duration-300 flex flex-col justify-between gap-4 border border-white/[0.04]"
              >
                <div>
                  <div className="font-mono text-xl sm:text-2xl text-[var(--gold)] font-bold mb-2">
                    {proc.step}
                  </div>
                  <h3 className="font-sans font-semibold text-base sm:text-lg text-white">
                    {proc.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mt-2">
                    {proc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── SECTION 4: APPLE-STYLE GRAND FINALE CTA BANNER ─── */}
        <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 sm:p-16 lg:p-20 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#12131c] to-[#07070a] border border-white/[0.08] text-center flex flex-col items-center gap-6 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
          >
            <div className="max-w-2xl mx-auto">
              <h2 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
                Ready to build your dream home?
              </h2>
              <p className="font-sans text-sm sm:text-lg text-zinc-300 font-light mt-3 max-w-xl mx-auto leading-relaxed">
                Explore our full architectural portfolio, transparent house packages, and 3D spatial renders.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none">
              <motion.button
                type="button"
                onClick={handleSeamlessEnter}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-sans text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 shadow-[0_4px_30px_rgba(212,168,67,0.4)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enter Full Website</span>
                <span className="text-sm">→</span>
              </motion.button>

              <motion.a
                href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                  "Hello Elevation Studio, I reviewed your Intro Showcase and would like to schedule a direct architectural consultation."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 bg-white/[0.08] hover:bg-white/[0.14] text-white font-sans text-xs sm:text-sm font-medium rounded-full transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
              >
                <span>Chat On WhatsApp</span>
                <span className="text-zinc-400">↗</span>
              </motion.a>
            </div>
          </motion.div>
        </section>
      </main>

      {/* ─── MINIMAL APPLE-STYLE FOOTER ─── */}
      <footer className="relative z-10 w-full px-6 py-6 bg-black border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 font-sans max-w-[1440px] mx-auto">
        <div>© 2026 Elevation Studio. All rights reserved.</div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span>Lagos, Nigeria</span>
          <span>·</span>
          <span className="text-[var(--gold)]">www.elevationstudiong.com.ng</span>
        </div>
      </footer>
    </motion.div>
  );
}
