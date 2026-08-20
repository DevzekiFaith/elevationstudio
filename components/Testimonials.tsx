"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { Magnetic } from "./Magnetic";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewModal, ReviewData } from "./ReviewModal";

export interface UnifiedReview {
  id: string | number;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  avatar?: string;
  packageUsed: string;
  packageHref?: string;
  tag: string;
  category: "real-estate" | "hospitality" | "corporate" | "community";
  rating: number;
  highlightMetric?: string;
  keyDeliverables?: string[];
  isUserSubmitted?: boolean;
}

const FEATURED_TESTIMONIALS: UnifiedReview[] = [
  {
    id: 1,
    quote:
      "When launching our masterplan along the Ogun–Lagos corridor, we needed spatial architecture renders that matched real civil blueprints and an interactive plot selector. Elevation Studio delivered both flawlessly without us needing three different agencies.",
    author: "Engr. Rotimi Adebayo",
    role: "Managing Director",
    company: "Crestview Eco-Properties & Masterplans",
    location: "Lagos / Ogun Corridor, Nigeria",
    avatar: "/testimonials/rotimi_adebayo.png",
    packageUsed: "Package 03 — The Elevation (Brand + Digital + Space)",
    packageHref: "/packages/3",
    tag: "Real Estate Masterplan",
    category: "real-estate",
    rating: 5,
    highlightMetric: "Zero Agency Disconnect · 100% Blueprint Accuracy",
    keyDeliverables: ["3D Spatial Architecture Renders", "Interactive Masterplan Website", "Marketing Brand Collateral"],
  },
  {
    id: 2,
    quote:
      "Most agencies give you a PDF brand guide and disappear. Elevation Studio designed our luxury identity system, engineered our custom Next.js booking engine, and then conducted 6 months of Mindvest culture training for our hospitality staff. Our guest satisfaction jumped immediately.",
    author: "Toluwanimi Alabi",
    role: "Operations Director",
    company: "Volta Luxury Boutique Hotel Group",
    location: "Victoria Island, Lagos, Nigeria",
    avatar: "/testimonials/toluwanimi_alabi.png",
    packageUsed: "Package 04 — The Master Plan (Brand + Digital + Space + Culture)",
    packageHref: "/packages/4",
    tag: "Luxury Hospitality & Culture",
    category: "hospitality",
    rating: 5,
    highlightMetric: "6-Month Culture Transformation · Custom Booking Engine",
    keyDeliverables: ["Complete Brand Identity System", "Next.js Reservation Platform", "Staff Culture Alignment Programme"],
  },
  {
    id: 3,
    quote:
      "The integration between visual identity, digital portals, and organizational transformation is unmatched. Zeki's dual background in architectural design thinking and engineering meant zero disconnect between strategy and actual execution.",
    author: "Dr. Kenneth Nnamdi",
    role: "Head of Digital Transformation",
    company: "Meridian Public Service & Civic Solutions",
    location: "Ikoyi, Lagos, Nigeria",
    avatar: "/testimonials/kenneth_nnamdi.png",
    packageUsed: "Package 02 — The Structure (Brand + Digital + Presence)",
    packageHref: "/packages/2",
    tag: "Institutional & Civic Digital",
    category: "corporate",
    rating: 5,
    highlightMetric: "Seamless Strategy-to-Code Engineering",
    keyDeliverables: ["Institutional Design System", "High-Performance Web Portal", "Staff Workflow Systems"],
  },
  {
    id: 4,
    quote:
      "Elevation Studio delivered our entire commercial plaza 3D facade visualization, brand identity, and tenant portal. The 3D spatial concepts allowed us to pre-lease 80% of our lettable office suites before construction was completed.",
    author: "Chief Mrs. Folake Ogundele",
    role: "Founder & Managing Director",
    company: "Ogundele Commercial Assets & Retail Parks",
    location: "Lekki Phase 1, Lagos, Nigeria",
    avatar: "/testimonials/folake_ogundele.png",
    packageUsed: "Package 03 — The Elevation (Brand + Digital + Space)",
    packageHref: "/packages/3",
    tag: "Commercial Real Estate & Retail",
    category: "real-estate",
    rating: 5,
    highlightMetric: "80% Pre-Lease Rate Prior to Construction",
    keyDeliverables: ["4-Story Commercial 3D Facade", "Tenant Leasing Portal", "Retail Brand Guidelines"],
  },
];

export function Testimonials() {
  const [reviewsList, setReviewsList] = useState<UnifiedReview[]>(FEATURED_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "real-estate" | "hospitality" | "corporate" | "community">("all");
  const [viewMode, setViewMode] = useState<"spotlight" | "grid">("spotlight");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"form" | "qr">("form");

  // Load reviews from localStorage on mount and sync
  const loadReviews = () => {
    try {
      const storedRaw = localStorage.getItem("elevation_global_reviews");
      if (storedRaw) {
        const parsed: ReviewData[] = JSON.parse(storedRaw);
        const mappedUserReviews: UnifiedReview[] = parsed.map((item) => ({
          id: item.id,
          quote: item.quote,
          author: item.author,
          role: item.role,
          company: item.company,
          location: item.location,
          packageUsed: item.packageUsed,
          packageHref: "/#packages",
          tag: "Verified Client Review",
          category: "community",
          rating: item.rating || 5,
          highlightMetric: "Direct Client Submission",
          keyDeliverables: ["Verified Studio Engagement"],
          isUserSubmitted: true,
        }));
        setReviewsList([...mappedUserReviews, ...FEATURED_TESTIMONIALS]);
      }
    } catch (e) {
      console.error("Failed to load local reviews:", e);
    }
  };

  useEffect(() => {
    loadReviews();

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("review") === "true" || window.location.hash === "#review") {
        setModalTab("form");
        setIsModalOpen(true);
      }
    }

    const handleStorageChange = () => loadReviews();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("elevation_review_submitted", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("elevation_review_submitted", handleStorageChange);
    };
  }, []);

  const handleReviewSubmitted = () => {
    loadReviews();
    setActiveIndex(0);
    window.dispatchEvent(new Event("elevation_review_submitted"));
  };

  // Filter reviews
  const displayedReviews = reviewsList.filter((r) => {
    if (filter === "all") return true;
    if (filter === "community") return r.isUserSubmitted;
    return r.category === filter;
  });

  const active = displayedReviews[activeIndex] || displayedReviews[0] || FEATURED_TESTIMONIALS[0];

  const averageRating = (
    reviewsList.reduce((acc, r) => acc + (r.rating || 5), 0) / reviewsList.length
  ).toFixed(1);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % displayedReviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + displayedReviews.length) % displayedReviews.length);
  };

  return (
    <Reveal direction="up" duration={0.7}>
      <section
        className="testimonials-section relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-b border-[#232630] bg-[#070709] overflow-hidden"
        id="testimonials"
      >
        {/* Subtle Ambient Golden Glow in Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

        <div className="testimonials-inner max-w-[1360px] mx-auto relative z-10">
          
          {/* TOP SECTION HEADER & TRUST METRICS */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="font-mono text-[10px] sm:text-xs tracking-[4px] text-[var(--gold)] uppercase font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                  CLIENT PROOF & GLOBAL ENDORSEMENTS
                </span>
              </div>

              <h2 className="font-bebas text-4xl sm:text-6xl md:text-7xl text-white tracking-wide leading-[0.92] mb-4">
                REAL <span className="text-[var(--gold)]">PARTNERSHIPS</span>,
                <br />
                MEASURABLE IMPACT.
              </h2>

              <p className="font-cormorant italic text-lg sm:text-xl text-[#b8b4aa] leading-relaxed">
                From multi-billion Naira real estate masterplans along the Ogun–Lagos corridor to luxury boutique hotels in Victoria Island — hear how founders, engineers, and developers experienced our integrated architecture.
              </p>
            </div>

            {/* LIVE TRUST MATRIX BADGE & ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
              
              {/* Trust Score Pill Card */}
              <div className="p-3 sm:p-4 rounded-xl bg-[#0e1017] border border-[#262a36] flex items-center gap-3.5 shadow-xl">
                <div className="flex -space-x-2.5 overflow-hidden">
                  {FEATURED_TESTIMONIALS.map((t, idx) => (
                    <div
                      key={idx}
                      className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[var(--gold)] bg-[#171922] flex-shrink-0"
                    >
                      {t.avatar && (
                        <Image src={t.avatar} alt={t.author} fill className="object-cover" sizes="32px" />
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[var(--gold)] text-xs">
                    {"★★★★★"}
                    <span className="font-mono text-white text-xs font-bold ml-1">{averageRating} / 5.0</span>
                  </div>
                  <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                    {reviewsList.length} Verified Partner Reviews
                  </div>
                </div>
              </div>

              {/* Action Buttons: Write Review & Scan QR */}
              <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setModalTab("form");
                    setIsModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial px-4 sm:px-5 py-3 bg-[var(--gold)] hover:bg-[#e2bd47] text-[#08080a] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-[0_4px_20px_rgba(212,168,67,0.25)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  <span>★</span>
                  <span>Write Review</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModalTab("qr");
                    setIsModalOpen(true);
                  }}
                  className="flex-1 sm:flex-initial px-4 py-3 bg-[#11131a] hover:bg-[#181a24] border border-[#2d3140] hover:border-[var(--gold-border)] text-zinc-200 hover:text-[var(--gold)] font-mono text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
                  title="Scan Review QR Code on Smartphone"
                >
                  <span>📱</span>
                  <span>Review QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* CONTROLS BAR: CATEGORY FILTER TABS + VIEW MODE TOGGLE */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-[#20232e]">
            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
              {[
                { id: "all", label: `All Reviews (${reviewsList.length})` },
                { id: "real-estate", label: "Real Estate & Masterplans" },
                { id: "hospitality", label: "Luxury Hospitality" },
                { id: "corporate", label: "Corporate & Civic" },
                ...(reviewsList.some((r) => r.isUserSubmitted)
                  ? [{ id: "community", label: `Client Feedback (${reviewsList.filter((r) => r.isUserSubmitted).length})` }]
                  : []),
              ].map((tab) => {
                const isActive = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setFilter(tab.id as typeof filter);
                      setActiveIndex(0);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono tracking-wider uppercase transition-all whitespace-nowrap flex-shrink-0 ${
                      isActive
                        ? "bg-[var(--gold)] text-black font-bold shadow-md"
                        : "bg-[#101218] hover:bg-[#181a24] text-zinc-400 hover:text-white border border-[#232733]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Layout Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#0e1017] border border-[#232733] self-end sm:self-auto flex-shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("spotlight")}
                className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  viewMode === "spotlight"
                    ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Cinematic Spotlight View"
              >
                <span>✦</span>
                <span className="hidden sm:inline">Spotlight</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                  viewMode === "grid"
                    ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30 font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
                title="Grid Cards View"
              >
                <span>▦</span>
                <span className="hidden sm:inline">All Cards</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: CINEMATIC SPOTLIGHT VIEW */}
          {viewMode === "spotlight" && active && (
            <div>
              <TiltCard glare maxTilt={3} className="w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="p-6 sm:p-10 md:p-12 bg-gradient-to-br from-[#0e1017] via-[#0b0c11] to-[#07070a] border border-[#2b3040] hover:border-[var(--gold-border)] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden transition-all duration-300"
                  >
                    {/* Decorative Corner Watermark Quote Mark */}
                    <div className="absolute top-6 right-8 font-serif text-8xl md:text-9xl text-white/[0.03] select-none pointer-events-none leading-none">
                      &rdquo;
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
                      
                      {/* Left Column: Portrait, Company & Verified Status */}
                      <div className="lg:col-span-4 flex flex-col items-center text-center">
                        <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-2xl overflow-hidden border-2 border-[var(--gold-border)] shadow-[0_15px_40px_rgba(0,0,0,0.85)] group bg-[#161822] flex items-center justify-center">
                          {active.avatar ? (
                            <Image
                              src={active.avatar}
                              alt={active.author}
                              fill
                              priority
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 200px, 260px"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-4">
                              <span className="font-bebas text-6xl text-[var(--gold)] tracking-widest">
                                {active.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </span>
                              <span className="font-mono text-[10px] text-zinc-400 mt-2">VERIFIED CLIENT</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent opacity-60 pointer-events-none" />
                        </div>

                        {/* Location Tag */}
                        <div className="mt-4 font-mono text-[11px] tracking-wider text-[var(--gold)] uppercase flex items-center justify-center gap-1.5 bg-[#12141d] px-3.5 py-1.5 rounded-full border border-white/10">
                          <span>📍</span> {active.location}
                        </div>

                        {/* Highlight Outcome Badge */}
                        {active.highlightMetric && (
                          <div className="mt-3 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 rounded-md font-mono text-[10px] tracking-wider uppercase">
                            ✓ {active.highlightMetric}
                          </div>
                        )}
                      </div>

                      {/* Right Column: Quote, Package Link & Author Credibility */}
                      <div className="lg:col-span-8 flex flex-col justify-between h-full">
                        <div>
                          {/* Top Badges Row */}
                          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded bg-[#171924] border border-[#2b3042] text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-300">
                              {active.tag}
                            </span>

                            {/* Star Rating Badge */}
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--gold)]/10 border border-[var(--gold)]/20 rounded-full">
                              <div className="text-[var(--gold)] text-sm tracking-widest">
                                {"★".repeat(active.rating || 5)}
                              </div>
                              <span className="font-mono text-xs text-[var(--gold)] font-bold">
                                {active.rating || 5}.0
                              </span>
                            </div>
                          </div>

                          {/* Package Used Link */}
                          <div className="mb-4">
                            {active.packageHref ? (
                              <Link
                                href={active.packageHref}
                                className="inline-flex items-center gap-2 font-mono text-xs text-[var(--gold)] hover:text-[#e2bd47] uppercase tracking-wider transition-colors border-b border-[var(--gold-border)] pb-0.5"
                              >
                                <span>SCOPE:</span>
                                <span className="font-semibold">{active.packageUsed}</span>
                                <span>↗</span>
                              </Link>
                            ) : (
                              <span className="font-mono text-xs text-[var(--gold)] uppercase tracking-wider">
                                {active.packageUsed}
                              </span>
                            )}
                          </div>

                          {/* Big Quote */}
                          <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-white/95 leading-relaxed mb-6">
                            &ldquo;{active.quote}&rdquo;
                          </blockquote>

                          {/* Key Deliverables Pills */}
                          {active.keyDeliverables && active.keyDeliverables.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 self-center mr-1">
                                DELIVERABLES:
                              </span>
                              {active.keyDeliverables.map((item, i) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 bg-[#151722] border border-[#262b3a] rounded text-[11px] font-mono text-zinc-300"
                                >
                                  ◆ {item}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Author Profile Footer */}
                        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <div className="font-bebas text-2xl sm:text-3xl text-white tracking-wide flex items-center gap-3">
                              {active.author}
                              {active.isUserSubmitted && (
                                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded font-mono text-[9px] uppercase tracking-widest font-normal">
                                  ✓ Verified Submission
                                </span>
                              )}
                            </div>
                            <div className="text-sm font-sans text-zinc-400 mt-0.5">
                              {active.role} · <span className="text-[var(--gold)] font-medium">{active.company}</span>
                            </div>
                          </div>

                          {/* Navigation Buttons for Spotlight */}
                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button
                              type="button"
                              onClick={handlePrev}
                              aria-label="Previous review"
                              className="w-10 h-10 rounded-lg bg-[#141620] hover:bg-[#1c2030] border border-[#2b3040] hover:border-[var(--gold)] text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all"
                            >
                              ←
                            </button>
                            <span className="font-mono text-xs text-zinc-400 px-2">
                              {activeIndex + 1} / {displayedReviews.length}
                            </span>
                            <button
                              type="button"
                              onClick={handleNext}
                              aria-label="Next review"
                              className="w-10 h-10 rounded-lg bg-[#141620] hover:bg-[#1c2030] border border-[#2b3040] hover:border-[var(--gold)] text-zinc-300 hover:text-[var(--gold)] flex items-center justify-center transition-all"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TiltCard>

              {/* THUMBNAIL SELECTOR STRIP */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {displayedReviews.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      idx === activeIndex
                        ? "bg-[#151824] border-[var(--gold)] shadow-lg shadow-[var(--gold)]/10"
                        : "bg-[#0b0c10] border-[#20232e] hover:bg-[#101218] hover:border-[#33384a]"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[var(--gold-border)] flex-shrink-0 bg-[#161822] flex items-center justify-center text-xs font-mono text-[var(--gold)]">
                      {t.avatar ? (
                        <Image src={t.avatar} alt={t.author} fill className="object-cover" sizes="40px" />
                      ) : (
                        t.author[0]
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-sans text-xs font-bold text-white truncate">
                        {t.author}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400 truncate">
                        {t.company}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: MODERN GALLERY CARDS GRID */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedReviews.map((item) => (
                <TiltCard key={item.id} glare maxTilt={4} className="h-full">
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0e1017] to-[#08080c] border border-[#242836] hover:border-[var(--gold-border)] flex flex-col justify-between transition-all duration-300 shadow-lg group">
                    <div>
                      {/* Card Top: Avatar, Author, Rating */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[var(--gold-border)] bg-[#161822] flex-shrink-0 flex items-center justify-center font-mono text-sm text-[var(--gold)]">
                            {item.avatar ? (
                              <Image src={item.avatar} alt={item.author} fill className="object-cover" sizes="48px" />
                            ) : (
                              item.author[0]
                            )}
                          </div>
                          <div>
                            <div className="font-bebas text-2xl text-white tracking-wide">
                              {item.author}
                            </div>
                            <div className="text-xs font-sans text-zinc-400">
                              {item.role} · <span className="text-[var(--gold)]">{item.company}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-[var(--gold)] text-sm tracking-wider flex-shrink-0">
                          {"★".repeat(item.rating || 5)}
                        </div>
                      </div>

                      {/* Package Pill */}
                      <div className="mb-4">
                        <span className="inline-block px-2.5 py-1 rounded bg-[#141620] border border-[#252a3a] text-[10px] font-mono uppercase tracking-wider text-[var(--gold)]">
                          {item.packageUsed}
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="font-serif italic text-base sm:text-lg text-zinc-200 leading-relaxed mb-6">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Card Footer: Location & Metric */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-2 text-xs font-mono text-zinc-400">
                      <span>📍 {item.location}</span>
                      {item.highlightMetric && (
                        <span className="text-emerald-400 text-[11px]">
                          ✓ {item.highlightMetric}
                        </span>
                      )}
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          )}

          {/* BOTTOM DIRECT ACTION DECK */}
          <div className="mt-14 pt-8 border-t border-[#20232e] flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-mono text-xs text-zinc-300">
                Ready to transform your brand, digital presence, or spatial blueprints?
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <Magnetic strength={0.25} className="w-full sm:w-auto">
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20saw%20your%20client%20case%20studies%20and%20would%20like%20to%20discuss%20a%20similar%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-[#171922] to-[#202433] hover:from-[#202433] hover:to-[#282d40] border border-[var(--gold-border)] hover:border-[var(--gold)] text-white font-mono text-xs uppercase tracking-wider rounded-lg transition-all shadow-lg hover:shadow-[0_4px_25px_rgba(212,168,67,0.2)]"
                >
                  <span>Discuss Your Project on WhatsApp (09119059859)</span>
                  <span className="text-[var(--gold)]">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Global Review Modal */}
        <ReviewModal
          isOpen={isModalOpen}
          initialTab={modalTab}
          onClose={() => setIsModalOpen(false)}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </section>
    </Reveal>
  );
}
