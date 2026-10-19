"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface HomeArchetype {
  id: string;
  number: string;
  category: string;
  title: string;
  tagline: string;
  image: string;
  tags: string[];
  whatsappPrompt: string;
}

const HOME_ARCHETYPES: HomeArchetype[] = [
  {
    id: "blueprint-masterplan",
    number: "01",
    category: "Spatial Masterplan",
    title: "3D MASTERPLAN BLUEPRINT",
    tagline: "Every millimeter coordinated in 3D before construction begins.",
    image: "/images/intro/intro-blueprint-spatial.jpg",
    tags: ["Spatial Accuracy", "Permit Blueprints", "Zero Guesswork"],
    whatsappPrompt: "Hello Elevation Studio, I want to discuss 3D Spatial Masterplanning for my home.",
  },
  {
    id: "luxury-duplex",
    number: "02",
    category: "Modern Duplex",
    title: "CONTEMPORARY LUXURY DUPLEX",
    tagline: "Cantilevered multi-level living with a private rooftop sky lounge.",
    image: "/images/intro/intro-luxury-duplex.jpg",
    tags: ["Rooftop Sky Lounge", "Panoramic Glass", "4–6 Bedrooms"],
    whatsappPrompt: "Hello Elevation Studio, I am interested in designing a Contemporary Luxury Duplex.",
  },
  {
    id: "minimalist-villa",
    number: "03",
    category: "Minimalist Villa",
    title: "MONOLITHIC MINIMALIST VILLA",
    tagline: "Pure geometry, travertine stone textures, and tranquil water reflections.",
    image: "/images/intro/intro-minimalist-villa.jpg",
    tags: ["Zen Reflection Pool", "Travertine Stone", "Minimalist Flow"],
    whatsappPrompt: "Hello Elevation Studio, I would like to design a Minimalist Villa.",
  },
  {
    id: "tropical-modern",
    number: "04",
    category: "Biophilic Concrete",
    title: "BRUTALIST CONCRETE RETREAT",
    tagline: "Board-formed architectural concrete softened by lush tropical gardens.",
    image: "/images/intro/intro-tropical-modern.jpg",
    tags: ["Thermal Mass", "Monstera Courtyard", "Private Pool"],
    whatsappPrompt: "Hello Elevation Studio, I want to build a Brutalist Concrete & Biophilic Retreat.",
  },
  {
    id: "contemporary-horizontal",
    number: "05",
    category: "Executive Residence",
    title: "HORIZONTAL CONTEMPORARY VILLA",
    tagline: "Floating rooflines, covered portico gallery, and panoramic ribbon glass.",
    image: "/images/intro/intro-contemporary-residence.jpg",
    tags: ["2-Car Portico", "Ribbon Glass", "Indoor-Outdoor Flow"],
    whatsappPrompt: "Hello Elevation Studio, I want to design an Executive Horizontal Contemporary Home.",
  },
];

export function IntroExperience({ onEnterStudio }: { onEnterStudio?: () => void }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isEntering, setIsEntering] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveTab((prev) => (prev + 1) % HOME_ARCHETYPES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveTab((prev) => (prev - 1 + HOME_ARCHETYPES.length) % HOME_ARCHETYPES.length);
  }, []);

  // Safe Autoplay timer
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

  // Instant navigation
  const handleSeamlessEnter = useCallback(() => {
    if (isEntering) return;
    setIsEntering(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("es_intro_seen", "true");
    }

    if (onEnterStudio) {
      onEnterStudio();
    } else {
      router.push("/");
    }
  }, [isEntering, onEnterStudio, router]);

  const currentItem = HOME_ARCHETYPES[activeTab];

  return (
    <div
      className={`min-h-screen w-full bg-[#060608] text-[#f4f0e8] flex flex-col justify-between relative overflow-x-hidden selection:bg-[var(--gold)] selection:text-black transition-opacity duration-300 ${
        isEntering ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      {/* High-performance CSS ambient glows */}
      <div
        className="fixed top-0 right-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at top right, rgba(212,168,67,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed bottom-0 left-0 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle at bottom left, rgba(16,185,129,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Minimal Top Header - Mobile Responsive */}
      <header className="relative z-40 w-full px-4 sm:px-8 py-3.5 sm:py-5 bg-[#070709]/85 backdrop-blur-xl border-b border-white/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="font-bebas text-lg sm:text-2xl text-zinc-200 tracking-widest leading-none">
            ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
          </span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-[var(--gold)]/60" />
          <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
            Residential Architecture
          </span>
        </div>

        <button
          type="button"
          onClick={handleSeamlessEnter}
          className="group px-4 sm:px-6 py-2 sm:py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em] sm:tracking-[0.16em] rounded-full transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-[0_4px_18px_rgba(212,168,67,0.3)] hover:shadow-[0_6px_24px_rgba(212,168,67,0.5)] active:scale-95 shrink-0"
        >
          <span>Enter Website</span>
          <span className="text-xs font-black transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </header>

      {/* Main Showcase (Visual-First, Fluid Mobile Layout) */}
      <main className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10 flex flex-col justify-center gap-5 sm:gap-8">
        {/* Minimal Hero Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-1.5 sm:gap-2 px-2">
          <span className="font-mono text-[9px] sm:text-[10px] text-[var(--gold)] uppercase tracking-widest font-semibold">
            Signature Archetypes
          </span>
          <h1 className="font-bebas text-2xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-wider leading-none">
            ARCHITECTURAL <span className="text-[var(--gold)]">PRECISION</span>
          </h1>
          <p className="font-sans text-[11px] sm:text-sm text-zinc-400 font-light">
            Crafted in 3D photorealism before a single brick is laid.
          </p>
        </div>

        {/* Flexible 2-Column Showcase */}
        <div className="w-full flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-stretch">
          {/* LEFT: 8K CINEMATIC VIEWPORT */}
          <div className="w-full lg:w-7/12 flex flex-col gap-2.5 sm:gap-3">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] min-h-[220px] sm:min-h-[300px] lg:min-h-[360px] rounded-2xl overflow-hidden bg-[#0c0d14] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={currentItem.image}
                    alt={currentItem.title}
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-transparent to-black/30 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Tag Pill */}
              <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-20">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[8.5px] sm:text-[10px] font-mono text-[var(--gold)] uppercase tracking-wider font-semibold shadow-md">
                  {currentItem.number} · {currentItem.category}
                </span>
              </div>

              {/* Arrows */}
              <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-20 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAutoplay(false);
                    prevSlide();
                  }}
                  aria-label="Previous"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-black text-zinc-300 hover:text-[var(--gold)] border border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs active:scale-95 shadow-md"
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
                  aria-label="Next"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/80 hover:bg-black text-zinc-300 hover:text-[var(--gold)] border border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs active:scale-95 shadow-md"
                >
                  →
                </button>
              </div>

              {/* Minimal Bottom Bar */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 z-20 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-black/85 backdrop-blur-md border border-white/10 rounded-xl shadow-lg flex items-center justify-between text-[11px] sm:text-xs">
                <span className="font-mono text-zinc-300 truncate font-medium pr-2">
                  {currentItem.title}
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] text-[var(--gold)] font-bold shrink-0">
                  {currentItem.number} / 05
                </span>
              </div>
            </div>

            {/* Thumbnail Selector Rail - Touch Friendly */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full">
              {HOME_ARCHETYPES.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setIsAutoplay(false);
                    setActiveTab(idx);
                  }}
                  className={`relative overflow-hidden py-2 px-1 sm:px-2 rounded-xl transition-all text-center flex flex-col items-center justify-center cursor-pointer border min-h-[40px] sm:min-h-[44px] ${
                    idx === activeTab
                      ? "bg-zinc-800/90 border-[var(--gold)] text-[var(--gold)] font-bold shadow-[0_4px_16px_rgba(212,168,67,0.2)]"
                      : "bg-[#0c0d14]/80 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
                  }`}
                >
                  <span className="font-mono text-[9px] sm:text-[10px]">{item.number}</span>
                  <span className="font-sans text-[8px] sm:text-[9.5px] truncate max-w-full hidden sm:inline">
                    {item.category.split(" ")[0]}
                  </span>

                  {idx === activeTab && isAutoplay && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--gold)]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                      key={`progress-${activeTab}`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: COMPACT, ELEGANT DETAIL CARD - RESPONSIVE */}
          <div className="w-full lg:w-5/12 flex flex-col">
            <div className="flex-1 p-4.5 sm:p-6 lg:p-7 bg-[#0c0d14] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col justify-between gap-4 sm:gap-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                  <span className="font-mono text-[9px] sm:text-[9.5px] text-[var(--gold)] uppercase tracking-widest font-semibold">
                    {currentItem.category}
                  </span>
                  <span className="font-mono text-[9px] sm:text-[9.5px] text-zinc-500">
                    {currentItem.number} of 05
                  </span>
                </div>

                <h2 className="font-bebas text-2xl sm:text-3xl lg:text-4xl text-zinc-100 tracking-wide leading-none mb-2 sm:mb-3">
                  {currentItem.title}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-4 sm:mb-6">
                  {currentItem.tagline}
                </p>

                {/* Minimalist Feature Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                  {currentItem.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-[#12131c] border border-white/5 rounded-lg font-mono text-[9.5px] sm:text-[10px] text-zinc-300 flex items-center gap-1.5"
                    >
                      <span className="text-[var(--gold)] text-[7px] sm:text-[8px]">◆</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Actions - Touch Accessible */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSeamlessEnter}
                  className="w-full sm:flex-1 min-h-[46px] py-3 px-5 sm:px-6 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_4px_18px_rgba(212,168,67,0.35)] active:scale-95"
                >
                  <span>Enter Studio</span>
                  <span>→</span>
                </button>

                <a
                  href={`https://wa.me/2349119059859?text=${encodeURIComponent(currentItem.whatsappPrompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[46px] py-3 px-5 bg-[#161724] hover:bg-[#1f2133] text-zinc-300 hover:text-[var(--gold)] border border-white/10 font-mono text-xs font-semibold uppercase tracking-wider rounded-xl transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>Consult</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="relative z-20 w-full px-4 sm:px-6 py-3.5 sm:py-4 bg-[#060608]/90 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-[10px] font-mono text-zinc-500 text-center sm:text-left">
        <div>© 2026 Elevation Studio</div>
        <div className="text-[var(--gold)]">Residential & Commercial Architecture</div>
      </footer>
    </div>
  );
}
