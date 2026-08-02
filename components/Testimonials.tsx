"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { Magnetic } from "./Magnetic";
import { motion, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
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
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];

  return (
    <Reveal direction="up" duration={0.7}>
      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-inner">
          <div className="testimonials-top">
            <div>
              <div className="section-tag">Client Proof & Real Stories</div>
              <div className="testimonials-headline">
                REAL <span style={{ color: "var(--gold)" }}>PARTNERSHIPS</span>,
                <br />
                MEASURABLE IMPACT
              </div>
            </div>
            <div className="testimonials-sub">
              Hear directly from developers, hospitality operators, and enterprise leaders across Lagos & Nigeria who experienced the integration of brand, digital, space, and culture.
            </div>
          </div>

          <TiltCard glare maxTilt={6} className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="testimonial-card-featured glow-card-border"
              >
                <div className="flex flex-wrap justify-between items-center gap-2 mb-6">
                  <div className="t-card-badge mb-0">{active.tag}</div>
                  <div className="font-mono text-[11px] tracking-widest text-[var(--gold)] uppercase flex items-center gap-1.5">
                    <span>📍</span> {active.location}
                  </div>
                </div>

                <blockquote className="t-quote">&ldquo;{active.quote}&rdquo;</blockquote>

                <div className="t-footer flex flex-wrap justify-between items-center gap-6 mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--gold-border)] shadow-md flex-shrink-0">
                      <Image
                        src={active.avatar}
                        alt={active.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="t-author font-bold text-white text-base md:text-lg">{active.author}</div>
                      <div className="t-role text-xs md:text-sm text-white/70">
                        {active.role} · <span style={{ color: "var(--gold)" }}>{active.company}</span>
                      </div>
                    </div>
                  </div>
                  <div className="t-package text-xs font-mono text-[var(--gold)] uppercase tracking-wider">{active.packageUsed}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TiltCard>

          <div className="testimonial-nav mt-8">
            <div className="t-dots flex flex-wrap gap-3">
              {TESTIMONIALS.map((t, idx) => (
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
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[var(--gold-border)] flex-shrink-0">
                    <Image
                      src={t.avatar}
                      alt={t.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-mono text-[10px] tracking-wider text-[var(--gold)] uppercase">0{idx + 1}</span>
                    <span className="font-sans text-xs font-medium">{t.author.split(" ")[t.author.split(" ").length - 1]}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="t-actions mt-6 sm:mt-0">
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
      </section>
    </Reveal>
  );
}
