"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BRANDS = [
  {
    name: "VOLTA",
    sector: "Luxury Hospitality",
    location: "Victoria Island, Lagos",
    accentColor: "#d4a843",
    stages: [
      {
        num: "01",
        label: "Guest Insights",
        image: "/volta_stage_1.png",
        detail:
          "Audited 12 luxury competitors across Victoria Island and Accra, mapping guest friction and sensory lobby environments.",
      },
      {
        num: "02",
        label: "Identity System",
        image: "/volta_stage_2.png",
        detail:
          "Golden geometric chevron emblem, luxury room signage, and custom leather keycard packaging.",
      },
      {
        num: "03",
        label: "Booking Platform",
        image: "/volta_stage_3.png",
        detail:
          "Immersive Next.js reservation engine with video backdrops and custom calendar availability flows.",
      },
      {
        num: "04",
        label: "Facade & Architecture",
        image: "/volta_stage_4.png",
        detail:
          "Exterior facade renders and BIM layouts — glass, brass, and dark granite against the Lagos twilight.",
      },
      {
        num: "05",
        label: "Culture Program",
        image: "/volta_stage_5.png",
        detail:
          "6-month Mindvest hospitality alignment — training front-of-house, butler, and concierge teams.",
      },
    ],
  },
  {
    name: "GREENFIELD",
    sector: "Real Estate Development",
    location: "Sagamu–Lagos Corridor",
    accentColor: "#4ecba0",
    stages: [
      {
        num: "01",
        label: "Ecology Surveys",
        image: "/greenfield_stage_1.png",
        detail:
          "Topographic drone mapping and solar exposure vectors along the Lagos–Sagamu corridor.",
      },
      {
        num: "02",
        label: "Eco Identity",
        image: "/greenfield_stage_2.png",
        detail:
          "Deep emerald and terracotta logo system — structures rising from nature.",
      },
      {
        num: "03",
        label: "Plot Selector",
        image: "/greenfield_stage_3.png",
        detail:
          "Real-time interactive land plot app with live pricing and availability for buyers.",
      },
      {
        num: "04",
        label: "Clubhouse Facade",
        image: "/greenfield_stage_4.png",
        detail:
          "Rammed-earth facade, solar canopy roof, and integrated landscape 3D renders.",
      },
      {
        num: "05",
        label: "Sustainability Charter",
        image: "/greenfield_stage_5.png",
        detail:
          "Internal developer workshops and a printed charter manual for eco-compliant construction.",
      },
    ],
  },
  {
    name: "MERIDIAN",
    sector: "Federal Institution",
    location: "Abeokuta, Ogun State",
    accentColor: "#a89fd4",
    stages: [
      {
        num: "01",
        label: "Friction Audit",
        image: "/meridian_stage_1.png",
        detail:
          "Service blueprint mapping citizen queue times and paper-form bottlenecks across all public touchpoints.",
      },
      {
        num: "02",
        label: "Sovereign Crest",
        image: "/meridian_stage_2.png",
        detail:
          "Royal indigo vector shield crest, official stationery, stamps, and agency letterheads.",
      },
      {
        num: "03",
        label: "Citizen Portal",
        image: "/meridian_stage_3.png",
        detail:
          "Secure React platform with multi-factor login, fast mobile loads, and accessible data widgets.",
      },
      {
        num: "04",
        label: "Civic Pavilion",
        image: "/meridian_stage_4.png",
        detail:
          "Modern administrative pavilion exterior — concrete geometry, acoustic panels, shaded public plazas.",
      },
      {
        num: "05",
        label: "Sector Reform",
        image: "/meridian_stage_5.png",
        detail:
          "Digital adoption workshops for 200+ civil servants using the Mindvest Human Architecture Framework.",
      },
    ],
  },
];

export function BrandFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeBrand, setActiveBrand] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const brand = BRANDS[activeBrand];
  const stage = brand.stages[activeStage];

  const switchBrand = (idx: number) => {
    if (idx === activeBrand) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveBrand(idx);
      setActiveStage(0);
      setTransitioning(false);
    }, 260);
  };

  const switchStage = (idx: number) => {
    if (idx === activeStage) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveStage(idx);
      setTransitioning(false);
    }, 200);
  };

  return (
    <section
      className={`bfx-section ${visible ? "bfx-visible" : ""}`}
      ref={sectionRef}
    >
      {/* Subtle editorial grid */}
      <div className="bfx-grid" />

      <div className="bfx-inner">
        {/* ── Top bar: eyebrow + brand switcher ── */}
        <div className="bfx-topbar">
          <div className="bfx-eyebrow">
            <span className="bfx-eyebrow-line" />
            The Elevation Journey
          </div>
          <div className="bfx-switcher">
            {BRANDS.map((b, i) => (
              <button
                key={b.name}
                className={`bfx-switch ${activeBrand === i ? "bfx-switch--on" : ""}`}
                onClick={() => switchBrand(i)}
                style={{ "--ac": b.accentColor } as React.CSSProperties}
              >
                <span className="bfx-switch-num">0{i + 1}</span>
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main card ── */}
        <div className="bfx-card">
          {/* Full-bleed background image */}
          <div className={`bfx-img-bg ${transitioning ? "bfx-img-bg--out" : "bfx-img-bg--in"}`}>
            <Image
              src={stage.image}
              alt={`${brand.name} — ${stage.label}`}
              fill
              className="bfx-img"
              sizes="100vw"
              priority={activeBrand === 0 && activeStage === 0}
            />
            {/* Dark left gradient so text is legible */}
            <div className="bfx-img-fade" />
          </div>

          {/* Glass content panel */}
          <div
            className="bfx-glass"
            style={{ "--ac": brand.accentColor } as React.CSSProperties}
          >
            {/* Accent top rule */}
            <div
              className="bfx-accent-rule"
              style={{ background: brand.accentColor }}
            />

            {/* Sector + location */}
            <div className="bfx-meta">
              <span
                className="bfx-sector"
                style={{ color: brand.accentColor }}
              >
                {brand.sector}
              </span>
              <span className="bfx-location">{brand.location}</span>
            </div>

            {/* MASSIVE brand name — bleeds over image */}
            <div
              className={`bfx-brand-name ${transitioning ? "bfx-brand-name--out" : "bfx-brand-name--in"}`}
            >
              {brand.name}
            </div>

            {/* Stage label + detail */}
            <div className={`bfx-stage-block ${transitioning ? "bfx-stage-block--out" : "bfx-stage-block--in"}`}>
              <div className="bfx-stage-label-row">
                <span
                  className="bfx-stage-num"
                  style={{ color: brand.accentColor }}
                >
                  Stage {stage.num}
                </span>
                <span className="bfx-stage-slash">/</span>
                <span className="bfx-stage-name">{stage.label}</span>
              </div>
              <p className="bfx-stage-detail">{stage.detail}</p>
            </div>

            {/* Stage navigation pills */}
            <div className="bfx-stage-nav">
              {brand.stages.map((s, i) => (
                <button
                  key={s.num}
                  className={`bfx-pill ${activeStage === i ? "bfx-pill--on" : ""}`}
                  onClick={() => switchStage(i)}
                  style={{ "--ac": brand.accentColor } as React.CSSProperties}
                  title={s.label}
                >
                  {s.num}
                </button>
              ))}
              <span className="bfx-pill-label">{stage.label}</span>
            </div>
          </div>

          {/* Corner chrome detail (editorial) */}
          <div className="bfx-corner bfx-corner-tr">
            <div className="bfx-corner-dot" />
            <span className="bfx-corner-text">5 STAGES</span>
          </div>
          <div className="bfx-corner bfx-corner-br">
            <span
              className="bfx-corner-text"
              style={{ color: brand.accentColor }}
            >
              ◆ {activeBrand + 1} / {BRANDS.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
