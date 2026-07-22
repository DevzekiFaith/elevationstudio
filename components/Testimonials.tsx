"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "When launching our estate along the Ogun–Lagos corridor, we needed more than just a logo. We needed spatial architecture renders that matched real civil blueprints and an interactive plot selector. Elevation Studio delivered both flawlessly without us needing three different agencies.",
    author: "Engr. Rotimi Adebayo",
    role: "Managing Director",
    company: "Crestview Eco-Properties & Masterplans",
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
    packageUsed: "Package 02 — The Structure (Brand + Digital Systems)",
    tag: "Institutional & Civic Digital",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const active = TESTIMONIALS[activeIndex];

  return (
    <Reveal>
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
              Hear directly from developers, hospitality operators, and enterprise leaders who experienced the integration of brand, digital, space, and culture.
            </div>
          </div>

          <div className="testimonial-card-featured">
            <div className="t-card-badge">{active.tag}</div>
            <blockquote className="t-quote">&ldquo;{active.quote}&rdquo;</blockquote>

            <div className="t-footer">
              <div>
                <div className="t-author">{active.author}</div>
                <div className="t-role">
                  {active.role} · <span style={{ color: "var(--gold)" }}>{active.company}</span>
                </div>
              </div>
              <div className="t-package">{active.packageUsed}</div>
            </div>
          </div>

          <div className="testimonial-nav">
            <div className="t-dots">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  type="button"
                  className={`t-dot ${idx === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View testimonial ${idx + 1}`}
                >
                  <span className="t-dot-num">0{idx + 1}</span>
                  <span className="t-dot-name">{t.author.split(" ")[1]}</span>
                </button>
              ))}
            </div>

            <div className="t-actions">
              <a
                href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20saw%20your%20client%20case%20studies%20and%20would%20like%20to%20discuss%20a%20similar%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="t-wa-cta"
              >
                Discuss Your Scope on WhatsApp (09119059859) →
              </a>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
