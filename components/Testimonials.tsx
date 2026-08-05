"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
  tag: string;
  rating: number;
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
    tag: "Real Estate & Spatial Architecture",
    rating: 5,
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
    tag: "Luxury Hospitality & Culture",
    rating: 5,
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
    packageUsed: "Package 02 — The Structure (Brand + Digital Systems)",
    tag: "Institutional & Civic Digital",
    rating: 5,
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
    tag: "Commercial Real Estate & Retail",
    rating: 5,
  },
];

export function Testimonials() {
  const [reviewsList, setReviewsList] = useState<UnifiedReview[]>(FEATURED_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<"all" | "featured" | "community">("all");
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
          tag: "Verified Client Review",
          rating: item.rating || 5,
          isUserSubmitted: true,
        }));
        setReviewsList([...mappedUserReviews, ...FEATURED_TESTIMONIALS]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadReviews();

    // Automatically open Review Modal if user scanned Review QR code (?review=true or #review)
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
    if (filter === "featured") return !r.isUserSubmitted;
    if (filter === "community") return r.isUserSubmitted;
    return true;
  });

  const active = displayedReviews[activeIndex] || displayedReviews[0] || FEATURED_TESTIMONIALS[0];

  // Calculate average rating
  const averageRating = (
    reviewsList.reduce((acc, r) => acc + (r.rating || 5), 0) / reviewsList.length
  ).toFixed(1);

  return (
    <Reveal direction="up" duration={0.7}>
      <section className="testimonials-section relative" id="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-top flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <div className="section-tag mb-0">Client Proof & Global Reviews</div>
                <div className="px-2.5 py-1 bg-[var(--gold)]/15 border border-[var(--gold-border)] rounded-full text-[11px] font-mono text-[var(--gold)] flex items-center gap-1">
                  <span>★</span> <span>{averageRating} / 5.0 Rating</span> ({reviewsList.length} Verified Reviews)
                </div>
              </div>

              <div className="testimonials-headline">
                REAL <span style={{ color: "var(--gold)" }}>PARTNERSHIPS</span>,
                <br />
                MEASURABLE IMPACT
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
              {/* Write Review CTA Button */}
              <button
                type="button"
                onClick={() => {
                  setModalTab("form");
                  setIsModalOpen(true);
                }}
                className="px-5 py-3 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-[var(--gold)]/20 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span>★</span> Write a Client Review
              </button>

              {/* Mobile QR Code Review Button */}
              <button
                type="button"
                onClick={() => {
                  setModalTab("qr");
                  setIsModalOpen(true);
                }}
                className="px-4 py-3 bg-[#141419] border border-[var(--gold-border)] hover:border-[var(--gold)] text-[var(--gold)] font-mono text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <span>📱</span> Mobile Review QR
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 border-b border-white/10 pb-4 overflow-x-auto">
            <button
              type="button"
              className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                filter === "all"
                  ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold-border)]"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => {
                setFilter("all");
                setActiveIndex(0);
              }}
            >
              All Reviews ({reviewsList.length})
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                filter === "featured"
                  ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold-border)]"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => {
                setFilter("featured");
                setActiveIndex(0);
              }}
            >
              Featured Masterplans ({FEATURED_TESTIMONIALS.length})
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                filter === "community"
                  ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold-border)]"
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => {
                setFilter("community");
                setActiveIndex(0);
              }}
            >
              Client Feedback ({reviewsList.filter((r) => r.isUserSubmitted).length})
            </button>
          </div>

          <TiltCard glare maxTilt={5} className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="testimonial-card-featured p-6 md:p-10 bg-[#0e0e10] border border-[#333336] rounded-2xl glow-card-border"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
                  {/* Left Column: Side-by-Side Large Portrait Photo or Initial Badge */}
                  <div className="md:col-span-4 flex flex-col items-center text-center">
                    <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-[var(--gold-border)] shadow-[0_15px_35px_rgba(0,0,0,0.7)] group bg-[#16161a] flex items-center justify-center">
                      {active.avatar ? (
                        <Image
                          src={active.avatar}
                          alt={active.author}
                          fill
                          priority
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 180px, 240px"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4">
                          <span className="font-bebas text-5xl text-[var(--gold)] tracking-widest">
                            {active.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-400 mt-2">VERIFIED CLIENT</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent opacity-50 pointer-events-none" />
                    </div>

                    <div className="mt-4 font-mono text-[10px] md:text-[11px] tracking-widest text-[var(--gold)] uppercase flex items-center justify-center gap-1.5 bg-[#060606]/80 px-3 py-1.5 rounded-full border border-white/10">
                      <span>📍</span> {active.location}
                    </div>
                  </div>

                  {/* Right Column: Side-by-Side Remark & Client Details */}
                  <div className="md:col-span-8 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                        <div className="t-card-badge mb-0">{active.tag}</div>

                        {/* Star Rating Badge */}
                        <div className="flex items-center gap-1 text-[var(--gold)] text-sm">
                          {Array.from({ length: active.rating || 5 }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                          <span className="font-mono text-xs text-white/70 ml-1 font-semibold">
                            {active.rating || 5}.0
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-mono text-[var(--gold)] uppercase tracking-wider mb-3">
                        {active.packageUsed}
                      </div>

                      <blockquote className="text-lg md:text-2xl font-serif italic text-white/95 leading-relaxed mb-6">
                        &ldquo;{active.quote}&rdquo;
                      </blockquote>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-col gap-1">
                      <div className="font-bebas text-2xl md:text-3xl text-white tracking-wide flex items-center gap-3">
                        {active.author}
                        {active.isUserSubmitted && (
                          <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded font-mono text-[9px] uppercase tracking-widest font-normal">
                            ✓ Verified Submission
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-sans text-white/70">
                        {active.role} · <span style={{ color: "var(--gold)" }}>{active.company}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TiltCard>

          <div className="testimonial-nav mt-8">
            <div className="t-dots flex flex-wrap gap-3">
              {displayedReviews.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  className={`t-dot flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all ${
                    idx === activeIndex
                      ? "bg-[var(--gold)]/15 border-[var(--gold)] text-white"
                      : "bg-[#0e0e10] border-[#333336] text-[var(--muted)] hover:text-white"
                  }`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View testimonial ${idx + 1}`}
                >
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[var(--gold-border)] flex-shrink-0 bg-[#141418] flex items-center justify-center text-[10px] font-mono text-[var(--gold)]">
                    {t.avatar ? (
                      <Image src={t.avatar} alt={t.author} fill className="object-cover" sizes="28px" />
                    ) : (
                      t.author[0]
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] tracking-wider text-[var(--gold)] uppercase">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-xs font-medium truncate max-w-[120px]">
                      {t.author}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="t-actions mt-6 sm:mt-0 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalTab("form");
                  setIsModalOpen(true);
                }}
                className="px-4 py-3 bg-[#121217] border border-[var(--gold-border)] hover:border-[var(--gold)] text-[var(--gold)] font-mono text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                + Submit Your Review
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalTab("qr");
                  setIsModalOpen(true);
                }}
                className="px-4 py-3 bg-[#121217] border border-white/15 hover:border-[var(--gold)] text-white hover:text-[var(--gold)] font-mono text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                📱 Scan Review QR
              </button>

              <Magnetic strength={0.25}>
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20saw%20your%20client%20case%20studies%20and%20would%20like%20to%20discuss%20a%20similar%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-wa-cta"
                >
                  Discuss Your Scope on WhatsApp (09119059859) →
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
