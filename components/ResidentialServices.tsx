"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { TiltCard } from "./TiltCard";

/* ─────────────────────────────────────────
   Residential & Private Client Services
   Editorial alternating layout — premium
───────────────────────────────────────── */

const SERVICE_01_MATERIALS = [
  {
    id: "day",
    label: "DAYTIME MONOLITHIC FACADE",
    badge: "5-Bed Bungalow · Grand Portico",
    src: "/renders/modern_5bed_bungalow_day.jpg",
    alt: "Modern 5-Bedroom Residential Architecture — Elevation Studio",
    link: "/renders/24",
  },
  {
    id: "evening",
    label: "EVENING ILLUMINATION",
    badge: "5-Bed Bungalow · LED Nightscape",
    src: "/renders/modern_5bed_bungalow_evening.jpg",
    alt: "Modern 5-Bedroom Bungalow Evening Illumination — Elevation Studio",
    link: "/renders/25",
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
];

const SERVICE_01_INCLUDES = [
  "Discovery & client brief",
  "Space planning and floor plans",
  "Architectural concept and façade design",
  "Materials and finish direction",
  "Elevations and key sections",
  "Detailed 3D model",
  "3–5 high-quality exterior visualizations",
  "Up to 2 revision rounds",
  "Final presentation package",
];

const SERVICE_02_INCLUDES = [
  "Everything in Residential Architecture",
  "Advanced architectural development",
  "Site and compound planning",
  "Entrance and landscape concept",
  "Exterior lighting direction",
  "Premium material direction",
  "6–10 high-quality visualizations",
  "Selected interior concept direction",
  "Up to 3 revision rounds",
  "Premium final presentation package",
];

const WORKFLOW_STAGES = [
  { num: "01", name: "Discovery", desc: "Understanding your site, vision and brief." },
  { num: "02", name: "Architecture", desc: "Spatial planning, massing and concept." },
  { num: "03", name: "Design", desc: "Renders, façade and material refinement." },
  { num: "04", name: "Build", desc: "Final drawings, model and handover pack." },
];

function CheckItem({ text }: { text: string }) {
  return (
    <li
      style={{
        fontFamily: "var(--font-syne), sans-serif",
        fontSize: 13,
        color: "rgba(244,240,232,0.75)",
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
          marginTop: 2,
          fontSize: 8,
        }}
      >
        ◆
      </span>
      {text}
    </li>
  );
}

export function ResidentialServices() {
  const [s1MatIndex, setS1MatIndex] = useState(0);
  const [s2MatIndex, setS2MatIndex] = useState(0);

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
          <div className="res-eyebrow">
            <span className="res-eyebrow-line" />
            Residential &amp; Private Client Services
          </div>

          <h2 className="res-heading">
            Modern homes, designed
            <br />
            from{" "}
            <span style={{ color: "var(--gold)" }}>vision</span> to architectural clarity.
          </h2>

          <p className="res-subtitle">
            Bespoke space planning, floor plans, 3D visualization and compound masterplanning
            — crafted for private property owners and residential developers across Nigeria.
          </p>
        </Reveal>
      </div>

      {/* ── 2. SERVICE 01 — text left / image right ── */}
      <div className="res-block-border">
        <div className="res-block-inner res-block-01">

          {/* Left — content (plain div — full column height) */}
          <div className="res-content-col res-content-left">
            <Reveal direction="left" duration={0.8}>
              <div>
                <div className="res-block-num" aria-hidden>01</div>
                <div className="res-gold-bar" />
                <h3 className="res-service-title">Residential Architecture</h3>
                <div className="res-price">Starting from ₦1.5M</div>
                <p className="res-service-desc">
                  For bungalows, duplexes and private homes. A complete architectural
                  design experience from your first brief to final renders.
                </p>
                <ul className="res-includes-list">
                  {SERVICE_01_INCLUDES.map((item, i) => <CheckItem key={i} text={item} />)}
                </ul>
              </div>
              <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <Magnetic strength={0.2}>
                  <Link
                    href="#contact?service=residential-architecture"
                    className="btn-primary"
                    style={{ display: "inline-block" }}
                  >
                    Start This Project
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

          {/* Right — image wrapped in TiltCard with Material Switcher */}
          <div className="res-image-col">
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

                {/* Top Material Variation Switcher */}
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

                <div className="res-img-label res-img-label-right">
                  {curS1.badge}
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </div>

      {/* ── 3. SERVICE 02 — image left / text right ── */}
      <div className="res-block-border">
        <div className="res-block-inner res-block-02">

          {/* Left — image wrapped in TiltCard with Material Switcher */}
          <div className="res-image-col res-image-left">
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

                {/* Top Material Variation Switcher */}
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

                <div className="res-img-label res-img-label-left">
                  {curS2.badge}
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right — content (plain div — full column height) */}
          <div className="res-content-col res-content-right">
            <Reveal direction="right" duration={0.8}>
              <div>
                <div className="res-block-num" aria-hidden>02</div>
                <div className="res-gold-bar" />
                <h3 className="res-service-title">Residential Masterplan</h3>
                <div className="res-price">Starting from ₦4.5M</div>
                <p className="res-service-desc">
                  For luxury homes, villas, private compounds and larger residential
                  projects. A complete site-to-structure masterplan.
                </p>
                <ul className="res-includes-list">
                  {SERVICE_02_INCLUDES.map((item, i) => <CheckItem key={i} text={item} />)}
                </ul>
              </div>
              <div style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                <Magnetic strength={0.2}>
                  <Link
                    href="#contact?service=residential-masterplan"
                    className="btn-primary"
                    style={{ display: "inline-block" }}
                  >
                    Start This Project
                  </Link>
                </Magnetic>
                <Link
                  href={curS2.link}
                  className="res-explore-link"
                >
                  Explore 3D Concept ↗
                </Link>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* ── 4. WORKFLOW ── */}
      <div className="res-workflow-section">
        <div className="res-workflow-wrap">
          <Reveal direction="up" duration={0.7}>
            <div className="res-eyebrow res-eyebrow-muted">
              <span className="res-eyebrow-line res-eyebrow-line-dim" />
              How It Works
            </div>

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

      {/* ── 5. PRICING NOTE ── */}
      <div className="res-pricing-band">
        <div className="res-pricing-inner">
          <span className="res-pricing-dash" />
          <p className="res-pricing-text">
            Final professional fees depend on project size, complexity, site conditions
            and required deliverables.
          </p>
        </div>
      </div>

      {/* ── 6. FINAL CTA ── */}
      <div className="res-cta-band">
        <div className="res-cta-inner">

          {/* Left copy */}
          <Reveal direction="up" duration={0.8}>
            <div className="res-cta-copy">
              <div className="res-eyebrow">
                <span className="res-eyebrow-line" />
                Start Your Residential Project
              </div>
              <h3 className="res-cta-heading">
                Start Your<br />
                <span style={{ color: "var(--gold)" }}>Residential Project</span>
              </h3>
              <p className="res-cta-body">
                Tell us about your project, your plot and the kind of home you want to
                create. We begin by understanding your vision before we begin designing it.
              </p>
            </div>
          </Reveal>

          {/* Right CTAs — TiltCard on the card panel only */}
          <Reveal direction="right" duration={0.8} delay={0.15}>
            <TiltCard glare maxTilt={5}>
              <div className="res-cta-card">
                <Magnetic strength={0.25}>
                  <Link
                    href="#contact?service=residential-architecture"
                    className="btn-primary"
                    style={{ display: "block", textAlign: "center", whiteSpace: "nowrap" }}
                  >
                    Residential Architecture
                  </Link>
                </Magnetic>
                <Magnetic strength={0.25}>
                  <Link
                    href="#contact?service=residential-masterplan"
                    className="btn-ghost"
                    style={{ display: "block", textAlign: "center", whiteSpace: "nowrap" }}
                  >
                    Residential Masterplan
                  </Link>
                </Magnetic>
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20would%20like%20to%20discuss%20a%20residential%20architecture%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="res-wa-link"
                >
                  WhatsApp Consultation ↗
                </a>
              </div>
            </TiltCard>
          </Reveal>

        </div>
      </div>

      {/* ── SCOPED STYLES ── */}
      <style>{`
        /* ─── Header ─── */
        .res-header-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding: 100px 60px 80px;
        }
        .res-eyebrow {
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .res-eyebrow-muted {
          color: var(--muted);
          margin-bottom: 48px;
        }
        .res-eyebrow-line {
          display: inline-block;
          width: 28px;
          height: 1px;
          background: var(--gold);
          flex-shrink: 0;
        }
        .res-eyebrow-line-dim {
          background: var(--border);
        }
        .res-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(48px, 7vw, 96px);
          line-height: 0.92;
          color: var(--white);
          letter-spacing: 1px;
          margin-bottom: 24px;
        }
        .res-subtitle {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(16px, 1.6vw, 22px);
          font-style: italic;
          color: var(--white-dim);
          max-width: 560px;
          line-height: 1.6;
        }

        /* ─── Service Blocks ─── */
        .res-block-border {
          border-top: 1px solid var(--border);
        }
        .res-block-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 60px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          align-items: stretch;
          min-height: 640px;
        }

        /* Content columns — plain divs, never tilted */
        .res-content-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 80px 0;
        }
        .res-content-left {
          padding-right: 60px;
          border-right: 1px solid var(--border);
        }
        .res-content-right {
          padding-left: 60px;
          border-left: 1px solid var(--border);
        }

        .res-block-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(64px, 9vw, 120px);
          line-height: 1;
          color: rgba(244,240,232,0.07);
          user-select: none;
          margin-bottom: -20px;
        }
        .res-gold-bar {
          width: 32px;
          height: 2px;
          background: var(--gold);
          margin-bottom: 20px;
        }
        .res-service-title {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(28px, 3.5vw, 48px);
          letter-spacing: 1px;
          color: var(--white);
          margin-bottom: 12px;
          line-height: 1;
        }
        .res-price {
          font-family: var(--font-dm-mono), monospace;
          font-size: 13px;
          color: var(--gold);
          letter-spacing: 1px;
          margin-bottom: 20px;
        }
        .res-service-desc {
          font-family: var(--font-cormorant), serif;
          font-size: 18px;
          font-style: italic;
          color: var(--white-dim);
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 420px;
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
          border-radius: 4px;
          transition: all 0.25s ease;
        }
        .res-explore-link:hover {
          border-color: var(--gold);
          background: rgba(212,168,67,0.1);
          color: #fff;
        }

        /* Image columns — get the TiltCard treatment */
        .res-image-col {
          position: relative;
          overflow: hidden;
          min-height: 440px;
        }
        .res-tilt-image {
          height: 100%;
          width: 100%;
        }
        .res-img-inner {
          position: relative;
          overflow: hidden;
          height: 100%;
          min-height: 440px;
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
          border-radius: 4px;
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
          bottom: 24px;
          z-index: 20;
          padding: 10px 18px;
          background: rgba(6,6,6,0.88);
          backdrop-filter: blur(8px);
          border: 1px solid var(--border);
          font-family: var(--font-dm-mono), monospace;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
        }
        .res-img-label-right { right: 24px; }
        .res-img-label-left  { left: 24px; }

        /* ─── Workflow ─── */
        .res-workflow-section {
          border-top: 1px solid var(--border);
          background: var(--steel);
        }
        .res-workflow-wrap {
          max-width: 1300px;
          margin: 0 auto;
          padding: 80px 60px;
        }
        .res-workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .res-workflow-step {
          padding: 28px 24px;
          border: 1px solid var(--border);
          border-radius: 4px;
        }
        .res-wf-num {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px, 5vw, 64px);
          line-height: 1;
          color: var(--white);
          margin-bottom: 8px;
        }
        .res-wf-connector {
          width: 100%;
          height: 1px;
          background: var(--border);
          margin: 12px 0 20px;
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
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 10px;
        }
        .res-wf-desc {
          font-family: var(--font-syne), sans-serif;
          font-size: 13px;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ─── Pricing note ─── */
        .res-pricing-band {
          border-top: 1px solid var(--border);
          background: var(--black);
        }
        .res-pricing-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 28px 60px;
          display: flex;
          align-items: center;
          gap: 20px;
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
          font-size: 15px;
          font-style: italic;
          color: var(--muted);
          line-height: 1.6;
        }

        /* ─── CTA ─── */
        .res-cta-band {
          border-top: 1px solid var(--border);
          background: var(--off-black, #0d0d0d);
        }
        .res-cta-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 100px 60px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
        }
        .res-cta-copy { max-width: 560px; }
        .res-cta-heading {
          font-family: var(--font-bebas), sans-serif;
          font-size: clamp(40px, 5.5vw, 80px);
          line-height: 0.92;
          color: var(--white);
          letter-spacing: 1px;
          margin: 0 0 24px;
        }
        .res-cta-body {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(16px, 1.5vw, 20px);
          font-style: italic;
          color: var(--white-dim);
          line-height: 1.7;
        }
        .res-cta-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: stretch;
          min-width: 240px;
          padding: 32px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          border-radius: 4px;
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
        }
        .res-wa-link:hover { color: var(--gold); }

        /* ═══════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════════ */

        /* Tablet — ≤ 1024px */
        @media (max-width: 1024px) {
          .res-header-wrap   { padding: 72px 40px 60px; }
          .res-block-inner   { padding: 0 40px; min-height: 0; }
          .res-content-left  { padding: 60px 40px 60px 0; }
          .res-content-right { padding: 60px 0 60px 40px; }
          .res-workflow-wrap { padding: 60px 40px; }
          .res-pricing-inner { padding: 24px 40px; }
          .res-cta-inner     { padding: 80px 40px; gap: 40px; }
          .res-workflow-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile — ≤ 768px: stack all blocks vertically */
        @media (max-width: 768px) {
          .res-header-wrap   { padding: 60px 24px 48px; }

          .res-block-inner {
            grid-template-columns: 1fr;
            padding: 0;
            min-height: 0;
          }

          /* Image always on top when stacked */
          .res-image-col       { order: -1; min-height: 280px; }
          .res-image-col.res-image-left { order: -1; }
          .res-img-inner       { min-height: 280px; }

          /* Content cols — reset borders, full-width padding */
          .res-content-col   { padding: 48px 24px 48px; }
          .res-content-left  { border-right: none; border-top: 1px solid var(--border); }
          .res-content-right { border-left: none; border-top: 1px solid var(--border); }

          /* Workflow */
          .res-workflow-wrap  { padding: 48px 24px; }
          .res-workflow-grid  { grid-template-columns: 1fr 1fr; gap: 12px; }

          /* Pricing */
          .res-pricing-inner  { padding: 20px 24px; }

          /* CTA */
          .res-cta-inner {
            grid-template-columns: 1fr;
            padding: 60px 24px;
            gap: 32px;
          }
          .res-cta-card { min-width: 0; }
        }

          /* Small mobile — ≤ 480px */
        @media (max-width: 480px) {
          .res-workflow-grid  { grid-template-columns: 1fr; }
          .res-service-desc   { font-size: 16px; }
          .res-material-switcher-bar {
            top: 12px;
            left: 12px;
            right: 12px;
            gap: 6px;
          }
          .res-mat-tab {
            font-size: 8px;
            padding: 5px 8px;
            letter-spacing: 1px;
          }
          .res-img-label {
            bottom: 12px;
            padding: 6px 12px;
            font-size: 9px;
          }
          .res-img-label-right { right: 12px; }
          .res-img-label-left  { left: 12px; }
        }
      `}</style>
    </section>
  );
}
