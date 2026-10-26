"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { TiltCard } from "./TiltCard";
import { useCurrency } from "./CurrencyContext";
import { CurrencyToggle } from "./CurrencyToggle";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─────────────────────────────────────────
   Residential Architecture Services
   Three Clearly Differentiated Offers
───────────────────────────────────────── */

const SERVICE_00_MATERIALS = [
  {
    id: "bungalow_day",
    label: "5-BEDROOM BUNGALOW CONCEPT",
    badge: "5-Bed Bungalow · Conceptual Façade",
    src: "/renders/modern_5bed_bungalow_day.jpg",
    alt: "Modern 5-Bedroom Bungalow Concept — Elevation Studio",
    link: "/renders/24",
  },
  {
    id: "bungalow_evening",
    label: "EVENING ILLUMINATION",
    badge: "5-Bed Bungalow · LED Nightscape",
    src: "/renders/modern_5bed_bungalow_evening.jpg",
    alt: "Modern 5-Bedroom Bungalow Evening Illumination — Elevation Studio",
    link: "/renders/25",
  },
];

const SERVICE_01_MATERIALS = [
  {
    id: "duplex_twilight",
    label: "EXECUTIVE LUXURY DUPLEX",
    badge: "2-Story Luxury Duplex · Full Façade & Detailing",
    src: "/renders/modern_duplex_residence.jpg",
    alt: "Executive 2-Story Luxury Duplex — Elevation Studio",
    link: "/renders/26",
  },
  {
    id: "terrace_duplex",
    label: "MULTI-UNIT TERRACE DUPLEX",
    badge: "Terrace Duplex · Integrated Lighting & Carport",
    src: "/renders/luxury_terrace_duplex_estate.jpg",
    alt: "Multi-Unit Terrace Duplex Estate — Elevation Studio",
    link: "/renders/2",
  },
];

const SERVICE_02_MATERIALS = [
  {
    id: "villa_facade",
    label: "PRIMARY FACADE MASTERPLAN",
    badge: "Villas · Compounds · Estates",
    src: "/renders/residential_villa_facade.jpg",
    alt: "Luxury Residential Masterplan — Elevation Studio",
    link: "/renders/1",
  },
  {
    id: "twin_villa",
    label: "COMPOUND PLANNING",
    badge: "Multi-Structure Residential",
    src: "/renders/twin_villa_estate.jpg",
    alt: "Twin Villa Residential Masterplan — Elevation Studio",
    link: "/renders/2",
  },
];

const SERVICE_00_INCLUDES = [
  "Review of your design brief & spatial requirements",
  "Conceptual floor plan and space arrangement",
  "Architectural façade concept",
  "Digital design presentation",
  "One consolidated revision round",
  "Clear progression path toward complete architectural design",
];

const SERVICE_01_INCLUDES = [
  "Discovery and client brief consultation",
  "Space planning and detailed floor plans",
  "Architectural concept and façade design",
  "Materials and finish direction",
  "Elevations and key sections",
  "Detailed 3D model",
  "3–5 high-quality exterior visualisations",
  "Up to 2 revision rounds",
  "Final presentation package",
];

const SERVICE_02_INCLUDES = [
  "Everything in Complete Residential Architecture",
  "Advanced architectural development for multiple structures",
  "Site and compound planning & building placement",
  "Entrance, gatehouse and boundary wall concept",
  "Landscape concept and vehicular/pedestrian circulation",
  "Exterior lighting direction",
  "Premium material direction",
  "6–10 high-quality visualisations",
  "Selected interior concept direction",
  "Up to 3 revision rounds",
  "Premium final presentation dossier",
];

const COMPARISON_ROWS = [
  {
    dimension: "Intended Customer",
    p0: "Homeowners & diaspora clients establishing design direction before full commitment",
    p1: "Homeowners building a private bungalow, duplex, or single residence",
    p2: "Property owners building luxury villas, family compounds, or multi-structure estates",
  },
  {
    dimension: "Project Scope",
    p0: "Single residential structure layout & architectural concept",
    p1: "Comprehensive design of a single private residence",
    p2: "Multi-structure compound, large villa estate, or masterplanned site",
  },
  {
    dimension: "Floor Plans & Layout",
    p0: "Conceptual floor plan & room arrangement",
    p1: "Detailed 2D floor plans & space planning",
    p2: "Multi-structure floor plans & compound zoning",
  },
  {
    dimension: "Façade & Elevations",
    p0: "Architectural façade concept",
    p1: "Full custom façade design, elevations & key sections",
    p2: "Site-wide architectural façade coordination",
  },
  {
    dimension: "3D Visualisations",
    p0: "Digital presentation (visualisations excluded)",
    p1: "3–5 high-quality exterior visualisations",
    p2: "6–10 high-quality exterior & selected interior visualisations",
  },
  {
    dimension: "Site & Compound Scope",
    p0: "Basic building footprint on plot",
    p1: "Standard plot layout & building placement",
    p2: "Complete compound masterplan, gatehouse, access & landscape concepts",
  },
  {
    dimension: "Revision Allowance",
    p0: "1 consolidated revision round",
    p1: "Up to 2 revision rounds",
    p2: "Up to 3 revision rounds",
  },
  {
    dimension: "Scope Classification",
    p0: "Concept-design stage (not full construction docs)",
    p1: "Complete architectural design package",
    p2: "Executive masterplan & render package",
  },
];

const WORKFLOW_STAGES = [
  { num: "01", name: "Brief & Discovery", desc: "Understanding your plot, space requirements, lifestyle, and vision." },
  { num: "02", name: "Architecture & Layout", desc: "Developing spatial flow, room relationships, and architectural massing." },
  { num: "03", name: "Design & Refinement", desc: "3D modelling, façade styling, material palettes, and agreed revisions." },
  { num: "04", name: "Handover Pack", desc: "Final drawings, presentation pack, and milestone handover." },
];

function CheckItem({ text }: { text: string }) {
  return (
    <li
      style={{
        fontFamily: "var(--font-syne), sans-serif",
        fontSize: 13,
        color: "rgba(244,240,232,0.85)",
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        lineHeight: 1.5,
      }}
    >
      <span
        style={{
          color: "var(--gold)",
          flexShrink: 0,
          marginTop: 3,
          fontSize: 8,
        }}
      >
        ◆
      </span>
      <span>{text}</span>
    </li>
  );
}

/* ─────────────────────────────────────────
   CTA Band — Eden Oasis-style overlay effect
───────────────────────────────────────── */
function ResCtaBand() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y = useSpring(rawY, { stiffness: 60, damping: 18 });

  return (
    <div ref={sectionRef} className="res-cta-band">
      {/* Parallax image layer */}
      <motion.div
        style={{ y, position: "absolute", inset: 0, scale: 1.18 }}
        aria-hidden="true"
      >
        <Image
          src="/renders/luxury_3d_interior_cta_bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="res-cta-bg-img"
          priority
        />
      </motion.div>

      {/* Gold warm overlay */}
      <div className="res-cta-overlay" />

      {/* Content */}
      <div className="res-cta-inner">
        {/* Left copy */}
        <Reveal direction="up" duration={0.8}>
          <div className="res-cta-copy">
            <div className="res-eyebrow" style={{ color: "#ffffff", textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}>
              <span className="res-eyebrow-line" style={{ background: "#ffffff" }} />
              Residential Project Enquiries
            </div>
            <h3 className="res-cta-heading">
              Start Your{" "}
              <br className="hidden sm:inline" />
              <span style={{ color: "rgba(255, 255, 255, 0.75)" }}>Residential Project</span>
            </h3>
            <p className="res-cta-body">
              Tell us about your plot, proposed home, space requirements, and vision. We will review your project parameters and confirm the appropriate scope and quotation.
            </p>
          </div>
        </Reveal>

        {/* Right CTAs */}
        <Reveal direction="right" duration={0.8} delay={0.15}>
          <TiltCard glare maxTilt={5} className="w-full">
            <div className="res-cta-card">
              <Magnetic strength={0.25} className="w-full">
                <Link
                  href="/contact?package=res-arch"
                  className="btn-primary res-cta-btn"
                >
                  Complete Architecture (From ₦1.5M) →
                </Link>
              </Magnetic>
              <Magnetic strength={0.25} className="w-full">
                <Link
                  href="/contact?package=res-concept"
                  className="btn-ghost res-cta-btn text-[11px]"
                  style={{ borderColor: "rgba(212,168,67,0.35)", color: "var(--gold)" }}
                >
                  Concept Design (From ₦600K) →
                </Link>
              </Magnetic>
              <Magnetic strength={0.25} className="w-full">
                <Link
                  href="/contact?package=res-master"
                  className="btn-ghost res-cta-btn"
                >
                  Residential Masterplan (From ₦4.5M) →
                </Link>
              </Magnetic>
              <a
                href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20would%20like%20to%20discuss%20budget%20flexibility%20and%20scope%20for%20a%20residential%20architecture%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="res-wa-link flex items-center justify-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                <span>Discuss Budget Flexibility on WhatsApp</span>
                <span>↗</span>
              </a>
              <div className="text-[10px] font-mono text-zinc-400 text-center mt-1.5 flex items-center justify-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Calibrated to fit your project budget</span>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </div>
  );
}

export function ResidentialServices() {
  const { formatResidentialPrice } = useCurrency();
  const [s0MatIndex, setS0MatIndex] = useState(0);
  const [s1MatIndex, setS1MatIndex] = useState(0);
  const [s2MatIndex, setS2MatIndex] = useState(0);

  const curS0 = SERVICE_00_MATERIALS[s0MatIndex];
  const curS1 = SERVICE_01_MATERIALS[s1MatIndex];
  const curS2 = SERVICE_02_MATERIALS[s2MatIndex];

  return (
    <section
      id="residential"
      data-bg="dark"
      style={{
        background: "var(--black)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* ── 1. SECTION HEADER ── */}
      <div className="res-header-wrap">
        <Reveal direction="up" duration={0.7}>
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <div className="res-eyebrow" style={{ margin: 0 }}>
              <span className="res-eyebrow-line" />
              <span className="text-[var(--gold)] font-bold mr-1">B2C</span> · Residential Architectural Design
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-[var(--muted)] uppercase">
                CURRENCY:
              </span>
              <CurrencyToggle />
            </div>
          </div>

          <h2 className="res-heading">
            Modern homes, designed
            <br />
            from <span style={{ color: "var(--gold)" }}>vision</span> to architectural clarity.
          </h2>

          <p className="res-subtitle">
            Bespoke space planning, floor plans, 3D visualization, and compound masterplanning
            — structured for private homeowners, landowners, and diaspora clients building across Nigeria.
          </p>
        </Reveal>
      </div>

      {/* ── 2. PACKAGE 01 — RESIDENTIAL CONCEPT DESIGN (text left / image right) ── */}
      <div className="res-block-border">
        <div className="res-block-inner res-block-01">
          {/* Left — content */}
          <div className="res-content-col res-content-left">
            <Reveal direction="left" duration={0.8}>
              <div>
                <div className="res-block-num" aria-hidden>01</div>
                <div className="res-gold-bar" />
                <div className="text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase mb-1">
                  B2C · Residential Design · Package A
                </div>
                <h3 className="res-service-title">Residential Concept Design</h3>
                <div className="res-price flex items-center flex-wrap gap-2.5">
                  <span>{formatResidentialPrice("concept")}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] font-mono text-[9.5px] tracking-wider uppercase font-semibold">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Open to Discussion
                  </span>
                </div>
                <p className="res-service-desc">
                  Give your home a clear architectural direction before committing to a complete design. This service helps you translate your ideas, space requirements, and preferred style into a considered floor layout and façade concept.
                </p>
                <div className="res-purpose-badge">
                  <strong>Scope Note:</strong> This is a concept-design stage, not a complete construction-documentation package. Ideal for establishing design direction before proceeding to full architectural documentation.
                </div>
                <ul className="res-includes-list">
                  {SERVICE_00_INCLUDES.map((item, i) => <CheckItem key={i} text={item} />)}
                </ul>
              </div>
              <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <Magnetic strength={0.2}>
                  <Link
                    href="/contact?package=res-concept"
                    className="btn-primary"
                    style={{ display: "inline-block" }}
                  >
                    Request Concept Design
                  </Link>
                </Magnetic>
                <Link
                  href={curS0.link}
                  className="res-explore-link"
                >
                  Explore 3D Concept ↗
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — image */}
          <div className="res-image-col">
            <TiltCard glare maxTilt={5} className="res-tilt-image">
              <div className="res-img-inner group">
                <Image
                  key={curS0.src}
                  src={curS0.src}
                  alt={curS0.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {SERVICE_00_MATERIALS.length > 1 && (
                  <div className="res-material-switcher-bar">
                    {SERVICE_00_MATERIALS.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setS0MatIndex(idx)}
                        className={`res-mat-tab ${s0MatIndex === idx ? "active" : ""}`}
                      >
                        <span className="res-mat-dot">◆</span> {m.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="res-img-label res-img-label-right">
                  {curS0.badge}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* ── 3. PACKAGE 02 — COMPLETE RESIDENTIAL ARCHITECTURE (image left / text right) ── */}
      <div className="res-block-border">
        <div className="res-block-inner res-block-02">
          {/* Left — image with Day/Evening switcher */}
          <div className="res-image-col res-image-left">
            <TiltCard glare maxTilt={5} className="res-tilt-image">
              <div className="res-img-inner group">
                <Image
                  key={curS1.src}
                  src={curS1.src}
                  alt={curS1.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {SERVICE_01_MATERIALS.length > 1 && (
                  <div className="res-material-switcher-bar">
                    {SERVICE_01_MATERIALS.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setS1MatIndex(idx)}
                        className={`res-mat-tab ${s1MatIndex === idx ? "active" : ""}`}
                      >
                        <span className="res-mat-dot">◆</span> {m.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="res-img-label res-img-label-left">
                  {curS1.badge}
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right — content */}
          <div className="res-content-col res-content-right">
            <Reveal direction="right" duration={0.8}>
              <div>
                <div className="res-block-num" aria-hidden>02</div>
                <div className="res-gold-bar" />
                <div className="text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase mb-1">
                  B2C · Residential Design · Package B
                </div>
                <h3 className="res-service-title">Complete Residential Architecture</h3>
                <div className="res-price flex items-center flex-wrap gap-2.5">
                  <span>{formatResidentialPrice("architecture")}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] font-mono text-[9.5px] tracking-wider uppercase font-semibold">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Open to Discussion
                  </span>
                </div>
                <p className="res-service-desc">
                  The principal residential design offer for homeowners planning a bungalow, duplex or single residence. A comprehensive architectural design engagement from initial brief to 3D visualisations and presentation drawings.
                </p>
                <div className="res-purpose-badge">
                  <strong>Scope Distinction:</strong> Extends concept design into full exterior façade development, technical elevations, key sections, materials direction, and 3–5 high-quality exterior visualisations.
                </div>
                <ul className="res-includes-list">
                  {SERVICE_01_INCLUDES.map((item, i) => <CheckItem key={i} text={item} />)}
                </ul>
              </div>
              <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <Magnetic strength={0.2}>
                  <Link
                    href="/contact?package=res-arch"
                    className="btn-primary"
                    style={{ display: "inline-block" }}
                  >
                    Get a Project Quotation
                  </Link>
                </Magnetic>
                <Link
                  href={curS1.link}
                  className="res-explore-link"
                >
                  Explore 3D Concept ↗
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── 4. PACKAGE 03 — RESIDENTIAL MASTERPLAN (text left / image right) ── */}
      <div className="res-block-border">
        <div className="res-block-inner res-block-01">
          {/* Left — content */}
          <div className="res-content-col res-content-left">
            <Reveal direction="left" duration={0.8}>
              <div>
                <div className="res-block-num" aria-hidden>03</div>
                <div className="res-gold-bar" />
                <div className="text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase mb-1">
                  B2C · Residential Design · Package C
                </div>
                <h3 className="res-service-title">Residential Masterplan</h3>
                <div className="res-price flex items-center flex-wrap gap-2.5">
                  <span>{formatResidentialPrice("masterplan")}</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] font-mono text-[9.5px] tracking-wider uppercase font-semibold">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Open to Discussion
                  </span>
                </div>
                <p className="res-service-desc">
                  For luxury private estates, multi-building family compounds, and residential projects requiring extensive site coordination, entrance design, compound zoning, and nighttime illumination direction.
                </p>
                <div className="res-purpose-badge">
                  <strong>Scope Distinction:</strong> Comprehensive site-wide coordination for multiple structures, gatehouses, boundary architecture, vehicular/pedestrian circulation, and 6–10 visualisations.
                </div>
                <ul className="res-includes-list">
                  {SERVICE_02_INCLUDES.map((item, i) => <CheckItem key={i} text={item} />)}
                </ul>
              </div>
              <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <Magnetic strength={0.2}>
                  <Link
                    href="/contact?package=res-master"
                    className="btn-primary"
                    style={{ display: "inline-block" }}
                  >
                    Discuss Your Masterplan
                  </Link>
                </Magnetic>
                <Link
                  href={curS2.link}
                  className="res-explore-link"
                >
                  Explore 3D Masterplan ↗
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right — image */}
          <div className="res-image-col">
            <TiltCard glare maxTilt={5} className="res-tilt-image">
              <div className="res-img-inner group">
                <Image
                  key={curS2.src}
                  src={curS2.src}
                  alt={curS2.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {SERVICE_02_MATERIALS.length > 1 && (
                  <div className="res-material-switcher-bar">
                    {SERVICE_02_MATERIALS.map((m, idx) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setS2MatIndex(idx)}
                        className={`res-mat-tab ${s2MatIndex === idx ? "active" : ""}`}
                      >
                        <span className="res-mat-dot">◆</span> {m.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="res-img-label res-img-label-right">
                  {curS2.badge}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* ── 5. RESPONSIVE COMPARISON MATRIX ── */}
      <div className="res-matrix-section">
        <div className="res-matrix-wrap">
          <Reveal direction="up" duration={0.7}>
            <div className="res-eyebrow res-eyebrow-muted">
              <span className="res-eyebrow-line res-eyebrow-line-dim" />
              Direct Package Comparison
            </div>

            <h3 className="res-section-title">
              Compare <span style={{ color: "var(--gold)" }}>B2C Residential Packages</span>
            </h3>
            <p className="res-section-sub">
              Understand the exact difference in deliverables, project stage, and design scope so you can choose the right starting point for your property.
            </p>

            <div className="res-matrix-table-container">
              <table className="res-matrix-table">
                <thead>
                  <tr>
                    <th className="res-th-feature">Scope Dimension</th>
                    <th className="res-th-pkg">
                      <div className="res-th-tag">Package A · Concept Stage</div>
                      <div className="res-th-name">Concept Design</div>
                      <div className="res-th-price">{formatResidentialPrice("concept")}</div>
                      <div className="text-[9px] font-mono text-[var(--gold)] uppercase tracking-wider mt-1 opacity-90">Open to Discussion</div>
                    </th>
                    <th className="res-th-pkg res-th-featured">
                      <div className="res-th-badge">★ Principal Design</div>
                      <div className="res-th-tag">Package B · Full Private Home</div>
                      <div className="res-th-name">Complete Architecture</div>
                      <div className="res-th-price">{formatResidentialPrice("architecture")}</div>
                      <div className="text-[9px] font-mono text-[var(--gold)] uppercase tracking-wider mt-1 opacity-90">Open to Discussion</div>
                    </th>
                    <th className="res-th-pkg">
                      <div className="res-th-tag">Package C · Compounds &amp; Estates</div>
                      <div className="res-th-name">Residential Masterplan</div>
                      <div className="res-th-price">{formatResidentialPrice("masterplan")}</div>
                      <div className="text-[9px] font-mono text-[var(--gold)] uppercase tracking-wider mt-1 opacity-90">Open to Discussion</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx}>
                      <td className="res-td-feature">{row.dimension}</td>
                      <td className="res-td-val">{row.p0}</td>
                      <td className="res-td-val res-td-featured">{row.p1}</td>
                      <td className="res-td-val">{row.p2}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="res-td-feature">Next Step</td>
                    <td className="res-td-val">
                      <Link href="/contact?package=res-concept" className="res-table-cta">
                        Request Concept →
                      </Link>
                    </td>
                    <td className="res-td-val res-td-featured">
                      <Link href="/contact?package=res-arch" className="res-table-cta primary">
                        Get Quotation →
                      </Link>
                    </td>
                    <td className="res-td-val">
                      <Link href="/contact?package=res-master" className="res-table-cta">
                        Discuss Masterplan →
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 6. SCOPE CLARITY & VALUE SECTION ── */}
      <div className="res-value-section">
        <div className="res-value-wrap">
          <Reveal direction="up" duration={0.7}>
            <div className="res-eyebrow res-eyebrow-muted">
              <span className="res-eyebrow-line res-eyebrow-line-dim" />
              Design Process &amp; Scope Clarity
            </div>

            <h3 className="res-section-title">
              Clarity Before <span style={{ color: "var(--gold)" }}>Construction</span>
            </h3>

            <div className="res-value-grid">
              <TiltCard glare maxTilt={5}>
                <div className="res-value-card h-full">
                  <div className="res-value-num">01</div>
                  <h4 className="res-value-title">Informed Spatial Decisions</h4>
                  <p className="res-value-desc">
                    A considered architectural design process ensures room sizes, privacy zones, natural ventilation, and daylighting are resolved on paper before site excavation begins.
                  </p>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={5}>
                <div className="res-value-card h-full">
                  <div className="res-value-num">02</div>
                  <h4 className="res-value-title">Structured Design Progression</h4>
                  <p className="res-value-desc">
                    If you are not yet ready for full technical drawings, you can start with <strong>Residential Concept Design (From ₦600K · Open to Discussion)</strong>. All scopes are calibrated to fit your project budget.
                  </p>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={5}>
                <div className="res-value-card h-full">
                  <div className="res-value-num">03</div>
                  <h4 className="res-value-title">Transparent Scope &amp; Revisions</h4>
                  <p className="res-value-desc">
                    Every package comes with clearly specified deliverables and built-in revision allowances. The scope and expectations are documented before work begins.
                  </p>
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 7. WORKFLOW ── */}
      <div className="res-workflow-section">
        <div className="res-workflow-wrap">
          <Reveal direction="up" duration={0.7}>
            <div className="res-eyebrow res-eyebrow-muted">
              <span className="res-eyebrow-line res-eyebrow-line-dim" />
              Delivery Workflow
            </div>

            <h3 className="res-section-title" style={{ marginBottom: 32 }}>
              How We Work <span style={{ color: "var(--gold)" }}>Together</span>
            </h3>

            <div className="res-workflow-grid">
              {WORKFLOW_STAGES.map((stage) => (
                <TiltCard key={stage.num} glare maxTilt={8} className="res-workflow-step">
                  <div className="res-wf-num">{stage.num}</div>
                  <div className="res-wf-connector" />
                  <div className="res-wf-name">{stage.name}</div>
                  <div className="res-wf-desc">{stage.desc}</div>
                </TiltCard>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 8. RESIDENTIAL PAYMENT TERMS ── */}
      <div className="res-payment-section">
        <div className="res-payment-wrap">
          <Reveal direction="up" duration={0.7}>
            <div className="res-eyebrow res-eyebrow-muted">
              <span className="res-eyebrow-line res-eyebrow-line-dim" />
              Payment Terms &amp; Milestones
            </div>

            <h3 className="res-payment-heading">
              Residential <span style={{ color: "var(--gold)" }}>Payment Terms</span>
            </h3>

            <div className="res-payment-grid">
              <TiltCard glare maxTilt={5}>
                <div className="res-payment-card h-full">
                  <div className="res-payment-card-label">Package A: Concept Design</div>
                  <div className="res-payment-split">70 / 30</div>
                  <div className="res-payment-desc">
                    70% commencement deposit to begin layout planning. 30% final payment upon concept design approval before presentation handover.
                  </div>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={5}>
                <div className="res-payment-card h-full">
                  <div className="res-payment-card-label">Package B: Complete Architecture</div>
                  <div className="res-payment-split">70 / 30</div>
                  <div className="res-payment-desc">
                    70% commencement deposit to start architectural design and 3D modelling. 30% final payment following final design approval before full package handover.
                  </div>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={5}>
                <div className="res-payment-card h-full">
                  <div className="res-payment-card-label">Package C: Masterplan</div>
                  <div className="res-payment-split">70 / 30</div>
                  <div className="res-payment-desc">
                    70% commencement deposit to begin site planning and multi-structure design. 30% final payment upon masterplan approval before dossier handover.
                  </div>
                </div>
              </TiltCard>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 9. PRICING NOTE ── */}
      <div className="res-pricing-band">
        <div className="res-pricing-inner">
          <span className="res-pricing-dash" />
          <p className="res-pricing-text">
            All prices represent starting figures. Every project is individually assessed and quoted based on agreed project requirements, plot conditions, building complexity, and required deliverables.
          </p>
        </div>
      </div>

      {/* ── 10. FINAL CTA BAND ── */}
      <ResCtaBand />

      {/* ── SCOPED STYLES ── */}
      <style>{`
        /* ─── Header ─── */
        .res-header-wrap {
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 44px var(--gutter) 20px;
        }
        .res-eyebrow {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .res-eyebrow-muted {
          color: var(--muted);
          margin-bottom: 12px;
        }
        .res-eyebrow-line {
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--gold);
          flex-shrink: 0;
        }
        .res-eyebrow-line-dim {
          background: var(--border);
        }
        .res-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(30px, 4.2vw, 52px);
          line-height: 1.02;
          color: var(--white);
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }
        .res-subtitle {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(14.5px, 1.2vw, 17.5px);
          font-style: italic;
          color: var(--white-dim);
          max-width: 640px;
          line-height: 1.5;
        }

        .res-section-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(26px, 3.2vw, 40px);
          line-height: 1.02;
          color: var(--white);
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .res-section-sub {
          font-family: var(--font-cormorant), serif;
          font-size: 15.5px;
          font-style: italic;
          color: var(--muted);
          max-width: 600px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        /* ─── Service Blocks ─── */
        .res-block-border {
          border-top: 1px solid var(--border);
        }
        .res-block-inner {
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 0 var(--gutter);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: stretch;
          min-height: auto;
        }

        /* Content columns */
        .res-content-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 36px 0;
        }
        .res-content-left {
          padding-right: 36px;
          border-right: 1px solid var(--border);
        }
        .res-content-right {
          padding-left: 36px;
          border-left: 1px solid var(--border);
        }

        .res-block-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px, 5vw, 64px);
          line-height: 1;
          color: rgba(244,240,232,0.07);
          user-select: none;
          margin-bottom: -10px;
        }
        .res-gold-bar {
          width: 28px;
          height: 2px;
          background: var(--gold);
          margin-bottom: 16px;
        }
        .res-service-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(24px, 2.5vw, 34px);
          letter-spacing: 0.5px;
          color: var(--white);
          margin-bottom: 8px;
          line-height: 1.05;
        }
        .res-price {
          font-family: var(--font-dm-mono), monospace;
          font-size: 13px;
          color: var(--gold);
          letter-spacing: 0.5px;
          margin-bottom: 14px;
        }
        .res-service-desc {
          font-family: var(--font-cormorant), serif;
          font-size: 16px;
          font-style: italic;
          color: var(--white-dim);
          line-height: 1.6;
          margin-bottom: 16px;
          max-width: 480px;
        }
        .res-purpose-badge {
          background: rgba(212, 168, 67, 0.06);
          border-left: 2px solid var(--gold);
          padding: 8px 12px;
          border-radius: 0 4px 4px 0;
          font-family: var(--font-syne), sans-serif;
          font-size: 12px;
          color: rgba(244, 240, 232, 0.9);
          line-height: 1.5;
          margin-bottom: 20px;
          max-width: 480px;
        }
        .res-purpose-badge strong {
          color: var(--gold);
        }
        .res-includes-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .res-explore-link {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          padding: 10px 16px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          border-radius: 9999px;
          transition: all 0.25s ease;
        }
        .res-explore-link:hover {
          border-color: var(--gold);
          background: rgba(212,168,67,0.1);
          color: #fff;
        }

        /* Image columns */
        .res-image-col {
          position: relative;
          overflow: hidden;
          min-height: 400px;
        }
        .res-tilt-image {
          height: 100%;
          width: 100%;
        }
        .res-img-inner {
          position: relative;
          overflow: hidden;
          height: 100%;
          min-height: 400px;
        }
        .res-material-switcher-bar {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          z-index: 20;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .res-mat-tab {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 7px 12px;
          background: rgba(6,6,6,0.85);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--white-dim, #ccc);
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .res-mat-tab:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        .res-mat-tab.active {
          background: rgba(212,168,67,0.22);
          border-color: var(--gold);
          color: var(--gold);
          font-weight: bold;
          box-shadow: 0 0 12px rgba(212,168,67,0.3);
        }
        .res-mat-dot {
          font-size: 7px;
          color: var(--gold);
        }
        .res-img-label {
          position: absolute;
          bottom: 20px;
          z-index: 20;
          padding: 8px 14px;
          background: rgba(6,6,6,0.88);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          border-radius: 9999px;
          font-family: var(--font-dm-mono), monospace;
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
        }
        .res-img-label-right { right: 20px; }
        .res-img-label-left  { left: 20px; }

        /* ─── Comparison Matrix Table ─── */
        .res-matrix-section {
          border-top: 1px solid var(--border);
          background: #08080c;
        }
        .res-matrix-wrap {
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 56px var(--gutter);
        }
        .res-matrix-table-container {
          overflow-x: auto;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: #0d0d12;
        }
        .res-matrix-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 780px;
        }
        .res-matrix-table th,
        .res-matrix-table td {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          vertical-align: top;
        }
        .res-th-feature {
          width: 25%;
          font-family: var(--font-dm-mono), monospace;
          font-size: 10.5px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--muted);
          background: #09090e;
        }
        .res-th-pkg {
          width: 25%;
          background: #0d0d12;
          border-left: 1px solid rgba(255, 255, 255, 0.06);
        }
        .res-th-featured {
          background: rgba(212, 168, 67, 0.05) !important;
          border-left: 1px solid rgba(212, 168, 67, 0.3) !important;
          border-right: 1px solid rgba(212, 168, 67, 0.3) !important;
        }
        .res-th-badge {
          display: inline-block;
          font-family: var(--font-dm-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #060606;
          background: var(--gold);
          padding: 3px 9px;
          border-radius: 9999px;
          font-weight: bold;
          margin-bottom: 6px;
        }
        .res-th-tag {
          font-family: var(--font-dm-mono), monospace;
          font-size: 8.5px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 4px;
        }
        .res-th-name {
          font-family: var(--font-bebas), sans-serif;
          font-size: 20px;
          letter-spacing: 0.5px;
          color: var(--white);
          margin-bottom: 4px;
          line-height: 1.1;
        }
        .res-th-price {
          font-family: var(--font-dm-mono), monospace;
          font-size: 12px;
          color: var(--gold);
          font-weight: bold;
        }
        .res-td-feature {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.5px;
          color: var(--white);
          background: #09090e;
          font-weight: 500;
        }
        .res-td-val {
          font-family: var(--font-syne), sans-serif;
          font-size: 12.5px;
          color: rgba(244, 240, 232, 0.8);
          line-height: 1.5;
          border-left: 1px solid rgba(255, 255, 255, 0.06);
        }
        .res-td-featured {
          background: rgba(212, 168, 67, 0.02) !important;
          border-left: 1px solid rgba(212, 168, 67, 0.2) !important;
          border-right: 1px solid rgba(212, 168, 67, 0.2) !important;
          color: #ffffff !important;
        }
        .res-table-cta {
          display: inline-block;
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          padding: 6px 14px;
          border: 1px solid rgba(212, 168, 67, 0.3);
          border-radius: 9999px;
          transition: all 0.2s ease;
        }
        .res-table-cta:hover {
          background: rgba(212, 168, 67, 0.15);
          border-color: var(--gold);
          color: #fff;
        }
        .res-table-cta.primary {
          background: var(--gold);
          color: #060606;
          border-color: var(--gold);
          font-weight: bold;
        }
        .res-table-cta.primary:hover {
          background: #fff;
          border-color: #fff;
          color: #060606;
        }

        /* ─── Scope Value Section ─── */
        .res-value-section {
          border-top: 1px solid var(--border);
          background: #060608;
        }
        .res-value-wrap {
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 56px var(--gutter);
        }
        .res-value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .res-value-card {
          background: linear-gradient(145deg, #0e0e14 0%, #08080a 100%);
          padding: 28px 24px;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .res-value-num {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          color: var(--gold);
          letter-spacing: 1.5px;
          margin-bottom: 12px;
        }
        .res-value-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: 22px;
          letter-spacing: 0.5px;
          color: var(--white);
          margin-bottom: 10px;
          line-height: 1.1;
        }
        .res-value-desc {
          font-family: var(--font-syne), sans-serif;
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.6;
        }
        .res-value-desc strong {
          color: var(--white);
        }

        /* ─── Workflow ─── */
        .res-workflow-section {
          border-top: 1px solid var(--border);
          background: var(--steel);
        }
        .res-workflow-wrap {
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 56px var(--gutter);
        }
        .res-workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .res-workflow-step {
          padding: 22px 20px;
          border: 1px solid var(--border);
          border-radius: 20px;
        }
        .res-wf-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(32px, 4vw, 48px);
          line-height: 1;
          color: var(--white);
          margin-bottom: 6px;
        }
        .res-wf-connector {
          width: 100%;
          height: 1px;
          background: var(--border);
          margin: 10px 0 16px;
          position: relative;
        }
        .res-wf-connector::after {
          content: "";
          position: absolute;
          right: 0;
          top: -3px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
        }
        .res-wf-name {
          font-family: var(--font-dm-mono), monospace;
          font-size: 9.5px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 8px;
        }
        .res-wf-desc {
          font-family: var(--font-syne), sans-serif;
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.55;
        }

        /* ─── Residential Payment Schedule ─── */
        .res-payment-section {
          border-top: 1px solid var(--border);
          background: var(--black);
        }
        .res-payment-wrap {
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 56px var(--gutter);
        }
        .res-payment-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(28px, 3.5vw, 44px);
          line-height: 0.95;
          color: var(--white);
          margin-bottom: 28px;
        }
        .res-payment-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .res-payment-card {
          background: linear-gradient(145deg, #0e0e12 0%, #060608 100%);
          padding: 28px 24px;
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .res-payment-card:hover {
          border-color: rgba(212, 168, 67, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 168, 67, 0.1);
        }
        .res-payment-card-label {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .res-payment-card-label::before {
          content: "◆";
          font-size: 7px;
        }
        .res-payment-split {
          font-family: var(--font-bebas), sans-serif;
          font-size: 40px;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }
        .res-payment-desc {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ─── Pricing note ─── */
        .res-pricing-band {
          border-top: 1px solid var(--border);
          background: var(--black);
        }
        .res-pricing-inner {
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 22px var(--gutter);
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .res-pricing-dash {
          display: inline-block;
          width: 20px;
          height: 1px;
          background: var(--border);
          flex-shrink: 0;
        }
        .res-pricing-text {
          font-family: var(--font-cormorant), serif;
          font-size: 14.5px;
          font-style: italic;
          color: var(--muted);
          line-height: 1.5;
        }

        /* ─── CTA Band ─── */
        .res-cta-band {
          position: relative;
          border-top: 1px solid var(--border);
          overflow: hidden;
        }
        .res-cta-bg-img {
          object-fit: cover;
          object-position: center 40%;
        }
        .res-cta-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(215, 140, 20, 0.44) 0%,
            rgba(165, 95, 12, 0.50) 48%,
            rgba(16, 12, 6, 0.68) 100%
          );
        }
        .res-cta-inner {
          position: relative;
          z-index: 2;
          max-width: calc(var(--container) + var(--gutter) * 2);
          margin: 0 auto;
          padding: 64px var(--gutter);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: center;
        }
        .res-cta-copy { max-width: 560px; }
        .res-cta-copy .res-eyebrow {
          color: #ffffff !important;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.7);
        }
        .res-cta-copy .res-eyebrow-line {
          background: #ffffff !important;
        }
        .res-cta-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px, 5.5vw, 80px);
          line-height: 0.92;
          color: var(--white);
          letter-spacing: 1px;
          margin: 0 0 24px;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.65);
        }
        .res-cta-body {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(16px, 1.5vw, 20px);
          font-style: italic;
          color: rgba(255,255,255,0.92);
          line-height: 1.7;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.65);
        }
        .res-cta-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: stretch;
          min-width: 280px;
          padding: 32px;
          background: rgba(6, 6, 6, 0.8);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(212, 168, 67, 0.25);
          border-radius: 24px;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
        }
        .res-cta-btn {
          display: block;
          width: 100%;
          text-align: center;
          padding: 14px 20px;
          border-radius: 9999px;
          box-sizing: border-box;
          word-break: normal;
        }
        .res-wa-link {
          font-family: var(--font-dm-mono), monospace;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
          text-align: center;
          margin-top: 4px;
        }
        .res-wa-link:hover { color: var(--gold); }

        /* ═══════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════════ */

        @media (max-width: 1024px) {
          .res-header-wrap   { padding: 44px 24px 24px; }
          .res-block-inner   { padding: 0 24px; min-height: 0; }
          .res-content-left  { padding: 40px 24px 40px 0; }
          .res-content-right { padding: 40px 0 40px 24px; }
          .res-matrix-wrap   { padding: 44px 24px; }
          .res-value-wrap    { padding: 44px 24px; }
          .res-value-grid    { grid-template-columns: 1fr; }
          .res-workflow-wrap { padding: 44px 24px; }
          .res-pricing-inner { padding: 20px 24px; }
          .res-cta-inner     { padding: 48px 24px; gap: 32px; }
          .res-workflow-grid { grid-template-columns: repeat(2, 1fr); }
          .res-payment-wrap  { padding: 44px 24px; }
          .res-payment-grid  { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .res-header-wrap   { padding: 36px 16px 20px; }

          .res-block-inner {
            grid-template-columns: 1fr;
            padding: 0;
            min-height: 0;
          }

          .res-image-col       { order: -1; min-height: 260px; }
          .res-image-col.res-image-left { order: -1; }
          .res-img-inner       { min-height: 260px; }

          .res-content-col   { padding: 28px 16px 32px; }
          .res-content-left  { border-right: none; border-top: 1px solid var(--border); }
          .res-content-right { border-left: none; border-top: 1px solid var(--border); }

          .res-matrix-wrap   { padding: 36px 16px; }
          .res-value-wrap    { padding: 36px 16px; }
          .res-workflow-wrap  { padding: 36px 16px; }
          .res-workflow-grid  { grid-template-columns: 1fr 1fr; gap: 10px; }

          .res-payment-wrap  { padding: 36px 16px; }
          .res-payment-grid  { grid-template-columns: 1fr; gap: 14px; }

          .res-pricing-inner  { padding: 16px 16px; }

          .res-cta-inner {
            grid-template-columns: 1fr;
            padding: 40px 16px;
            gap: 24px;
          }
          .res-cta-heading {
            font-size: clamp(30px, 7.5vw, 44px);
            line-height: 1.05;
            margin: 0 0 14px;
            word-break: break-word;
          }
          .res-cta-body {
            font-size: 15px;
            line-height: 1.6;
          }
          .res-cta-card {
            min-width: 0;
            width: 100%;
            padding: 20px 16px;
            gap: 10px;
          }
          .res-cta-btn {
            padding: 11px 14px;
            font-size: 11px;
            letter-spacing: 1px;
          }
        }

        @media (max-width: 480px) {
          .res-header-wrap   { padding: 28px 14px 16px; }
          .res-content-col   { padding: 24px 14px; }
          .res-matrix-wrap   { padding: 28px 14px; }
          .res-value-wrap    { padding: 28px 14px; }
          .res-workflow-wrap { padding: 28px 14px; }
          .res-workflow-grid  { grid-template-columns: 1fr; }
          .res-service-desc   { font-size: 15px; }
          .res-payment-wrap   { padding: 28px 14px; }
          .res-payment-card   { padding: 20px 16px; }
          .res-cta-inner {
            padding: 32px 14px;
            gap: 20px;
          }
          .res-cta-heading {
            font-size: clamp(26px, 8vw, 36px);
          }
          .res-cta-card {
            padding: 16px 12px;
          }
          .res-cta-btn {
            padding: 10px 12px;
            font-size: 10px;
          }
          .res-material-switcher-bar {
            top: 10px;
            left: 10px;
            right: 10px;
            gap: 6px;
          }
          .res-mat-tab {
            font-size: 8px;
            padding: 4px 7px;
            letter-spacing: 0.8px;
          }
          .res-img-label {
            bottom: 10px;
            padding: 5px 10px;
            font-size: 8.5px;
          }
          .res-img-label-right { right: 10px; }
          .res-img-label-left  { left: 10px; }
        }
      `}</style>
    </section>
  );
}
