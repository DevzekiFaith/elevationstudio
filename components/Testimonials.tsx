"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewModal, ReviewData } from "./ReviewModal";

export interface ReviewItem {
  id: string | number;
  author: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  headline: string;
  quote: string;
  statValue: string;
  statLabel: string;
  tag: string;
  packageUsed: string;
  packageHref: string;
  pills: { icon: string; label: string }[];
  isUserSubmitted?: boolean;
}

const FEATURED_REVIEWS: ReviewItem[] = [
  {
    id: 1,
    author: "Engr. Rotimi Adebayo",
    role: "Managing Director",
    company: "Crestview Eco-Properties & Masterplans",
    location: "Lagos / Ogun Corridor, Nigeria",
    avatar: "/testimonials/rotimi_adebayo.png",
    headline: "Spatial fidelity that converts land into off-plan capital",
    quote:
      "When launching our masterplan along the Ogun–Lagos corridor, we needed spatial architecture renders that matched real civil blueprints and an interactive plot selector. Elevation Studio delivered both flawlessly without us needing three different agencies.",
    statValue: "100%",
    statLabel: "Blueprint & Civil Engineering Fidelity",
    tag: "Flagship Fit",
    packageUsed: "Package 03 — The Elevation",
    packageHref: "/packages/3",
    pills: [
      { icon: "✦", label: "3D Spatial Renders" },
      { icon: "🏢", label: "Masterplan Portal" },
      { icon: "🛡", label: "Real Estate" },
    ],
  },
  {
    id: 2,
    author: "Toluwanimi Alabi",
    role: "Operations Director",
    company: "Volta Luxury Boutique Hotel Group",
    location: "Victoria Island, Lagos, Nigeria",
    avatar: "/testimonials/toluwanimi_alabi.png",
    headline: "Hospitality transformation from architecture to staff culture",
    quote:
      "Most agencies give you a PDF brand guide and disappear. Elevation Studio designed our luxury identity system, engineered our custom Next.js booking engine, and then conducted 6 months of Mindvest culture training for our staff. Guest satisfaction jumped immediately.",
    statValue: "6-Mo",
    statLabel: "Integrated Staff Culture Transformation",
    tag: "Hospitality Fit",
    packageUsed: "Package 04 — The Master Plan",
    packageHref: "/packages/4",
    pills: [
      { icon: "⚡", label: "Next.js Engine" },
      { icon: "👥", label: "Mindvest Culture" },
      { icon: "🏨", label: "Luxury VI Hotel" },
    ],
  },
  {
    id: 3,
    author: "Dr. Kenneth Nnamdi",
    role: "Head of Digital Transformation",
    company: "Meridian Public Service & Civic Solutions",
    location: "Ikoyi, Lagos, Nigeria",
    avatar: "/testimonials/kenneth_nnamdi.png",
    headline: "Zero disconnect between strategic vision and code execution",
    quote:
      "The integration between visual identity, digital portals, and organizational transformation is unmatched. Zeki's dual background in architectural design thinking and engineering meant zero disconnect between strategy and actual execution.",
    statValue: "0%",
    statLabel: "Strategy-to-Code Execution Disconnect",
    tag: "Enterprise Fit",
    packageUsed: "Package 02 — The Structure",
    packageHref: "/packages/2",
    pills: [
      { icon: "🏛", label: "Civic Portal" },
      { icon: "🎨", label: "Brand System" },
      { icon: "⚙", label: "Enterprise Web" },
    ],
  },
  {
    id: 4,
    author: "Chief Mrs. Folake Ogundele",
    role: "Founder & Managing Director",
    company: "Ogundele Commercial Assets & Retail Parks",
    location: "Lekki Phase 1, Lagos, Nigeria",
    avatar: "/testimonials/folake_ogundele.png",
    headline: "Commercial visualization that pre-leases before construction finishes",
    quote:
      "Elevation Studio delivered our entire commercial plaza 3D facade visualization, brand identity, and tenant portal. The 3D spatial concepts allowed us to pre-lease 80% of our lettable office suites before construction was completed.",
    statValue: "80%",
    statLabel: "Pre-Leased Prior to Building Completion",
    tag: "Commercial Fit",
    packageUsed: "Package 03 — The Elevation",
    packageHref: "/packages/3",
    pills: [
      { icon: "🏢", label: "4-Story Plaza 3D" },
      { icon: "📈", label: "Tenant Portal" },
      { icon: "📍", label: "Lekki Phase 1" },
    ],
  },
];

export function Testimonials() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(FEATURED_REVIEWS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"form" | "qr">("form");

  const loadReviews = () => {
    try {
      const storedRaw = localStorage.getItem("elevation_global_reviews");
      if (storedRaw) {
        const parsed: ReviewData[] = JSON.parse(storedRaw);
        const mappedUserReviews: ReviewItem[] = parsed.map((item) => ({
          id: item.id,
          author: item.author,
          role: item.role,
          company: item.company,
          location: item.location,
          avatar: "/testimonials/rotimi_adebayo.png", // fallback image container
          headline: `Verified Client Partnership — ${item.company}`,
          quote: item.quote,
          statValue: "5.0 ★",
          statLabel: "Direct Verified Client Feedback",
          tag: "Client Feedback",
          packageUsed: item.packageUsed,
          packageHref: "/#packages",
          pills: [
            { icon: "✓", label: "Verified Partner" },
            { icon: "★", label: "5.0 Star Rating" },
          ],
          isUserSubmitted: true,
        }));
        setReviewsList([...mappedUserReviews, ...FEATURED_REVIEWS]);
      }
    } catch (e) {
      console.error("Error loading stored reviews:", e);
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

  const active = reviewsList[activeIndex] || FEATURED_REVIEWS[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  return (
    <Reveal direction="up" duration={0.7}>
      <section
        className="testimonials-section relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-b border-[#232630] bg-[#070709] overflow-hidden"
        id="testimonials"
      >
        {/* Subtle Ambient Golden Glow */}
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(212,168,67,0.05)_0%,transparent_70%)] pointer-events-none blur-3xl" />

        <div className="testimonials-inner max-w-[1320px] mx-auto relative z-10">
          
          {/* Top Bar Header & Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 sm:mb-16 pb-6 border-b border-[#1f222e]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-[3px] text-[var(--gold)] uppercase font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                CLIENT PROOF & GLOBAL REVIEWS
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  setModalTab("form");
                  setIsModalOpen(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[var(--gold)] hover:bg-[#e2bd47] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5"
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
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#12141c] hover:bg-[#181a24] border border-[#2d3142] hover:border-[var(--gold-border)] text-zinc-300 hover:text-[var(--gold)] font-mono text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                <span>📱</span>
                <span>Scan QR</span>
              </button>
            </div>
          </div>

          {/* MAIN 2-COLUMN STRUCTURE MATCHING USER'S SAMPLE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Headline, Story Copy, Pill Stepper, Large Metric Stat */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-1">
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="font-syne font-bold text-2xl sm:text-3xl lg:text-[36px] text-white leading-[1.2] mb-4">
                      {active.headline}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
                      &ldquo;{active.quote}&rdquo;
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Pill Slider Stepper Dots (exact match to sample) */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#12141c] border border-white/15 rounded-full mb-8">
                  {reviewsList.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Go to client review ${idx + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        idx === activeIndex
                          ? "w-8 h-2 bg-[var(--gold)]"
                          : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Large Metric Stat at Bottom Left (e.g. 70% Interview rate in sample) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + "-stat"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="pt-6 border-t border-white/10 flex items-baseline gap-4"
                >
                  <div className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-none">
                    {active.statValue}
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-zinc-400 uppercase tracking-wider leading-tight max-w-[200px]">
                    {active.statLabel}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: The Clean Rounded Visual Card with Overlays */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0f1118] group"
                >
                  {/* Background Client Photo */}
                  <Image
                    src={active.avatar}
                    alt={active.author}
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                  {/* Atmospheric gradient overlay for readable typography */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-black/65 opacity-90 pointer-events-none" />

                  {/* Top Left Overlay: Name & Role/Company subtitle (e.g. Kiara Washington -> Why Kiara is a good fit) */}
                  <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 max-w-[80%]">
                    <h4 className="font-syne font-bold text-2xl sm:text-3xl text-white tracking-wide mb-1 drop-shadow-md">
                      {active.author}
                    </h4>
                    <Link
                      href={active.packageHref || "/#packages"}
                      className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm text-[var(--gold)] hover:text-white uppercase tracking-wider transition-colors drop-shadow-sm"
                    >
                      <span>→ {active.role} · {active.company}</span>
                    </Link>
                  </div>

                  {/* Arrow Navigation Floating Top Right */}
                  <div className="absolute top-6 right-6 z-20 flex gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[var(--gold)] text-white hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Previous story"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 hover:border-[var(--gold)] text-white hover:text-[var(--gold)] flex items-center justify-center transition-all cursor-pointer"
                      aria-label="Next story"
                    >
                      →
                    </button>
                  </div>

                  {/* Bottom Overlay Tag Bar: Pill badges row (Good fit, AI/ML, Enterprise, Rated ★ 4/4) */}
                  <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 z-10 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {/* Highlighted First Pill (like '👍 Good fit' in sample) */}
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white text-black font-sans text-xs font-semibold rounded-full shadow-lg">
                        <span>👍</span>
                        <span>{active.tag}</span>
                      </span>

                      {/* Middle Pill Badges with Icons */}
                      {active.pills.map((pill, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0e1017]/80 backdrop-blur-md border border-white/20 text-zinc-200 font-mono text-[11px] rounded-full"
                        >
                          <span>{pill.icon}</span>
                          <span>{pill.label}</span>
                        </span>
                      ))}
                    </div>

                    {/* Far Right Rating Pill (like 'Rated ★ 4/4' in sample) */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/75 backdrop-blur-md border border-white/20 text-zinc-200 font-mono text-xs rounded-full">
                      <span>Rated</span>
                      <span className="text-[var(--gold)] font-bold">★ 5.0</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom WhatsApp Direct Chat Conversion Link */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified Client Proof across Lagos, Ikoyi, VI, and Ogun Corridor</span>
            </div>

            <a
              href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20saw%20your%20client%20case%20studies%20and%20would%20like%20to%20discuss%20a%20similar%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1.5"
            >
              <span>Discuss Your Scope on WhatsApp (09119059859)</span>
              <span>→</span>
            </a>
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
