"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";

type SegmentId = "developer" | "corporate" | "diaspora" | "government";

interface SegmentData {
  id: SegmentId;
  tabLabel: string;
  title: string;
  subtitle: string;
  region: string;
  points: string[];
  recommendedPkg: string;
  ctaText: string;
  ctaUrl: string;
}

const SEGMENTS: SegmentData[] = [
  {
    id: "developer",
    tabLabel: "Real Estate Developers",
    title: "DEVELOPERS",
    subtitle: "Translate Concrete & Blueprints into Premium Value",
    region: "Ideal for Estates & Luxury Compound Masterplans",
    points: [
      "Fusing branding systems directly into architectural layouts and show apartment designs",
      "High-end 3D Revit & Lumion architectural rendering to secure off-plan buyers",
      "Custom development websites, online property catalogs, and sales portals",
      "Standardizing visual marketing assets across the entire project lifecycle"
    ],
    recommendedPkg: "Package 03 (Brand + Digital + Space)",
    ctaText: "Request Developer Brief",
    ctaUrl: "/contact?industry=developer&package=3"
  },
  {
    id: "corporate",
    tabLabel: "Corridor Corporations",
    title: "CORPORATIONS",
    subtitle: "Modernize Visual Assets & Team Alignment",
    region: "Operational Hubs along the Ogun — Lagos Industrial Corridor",
    points: [
      "Redesigning legacy branding systems, corporate guidelines, and stationery",
      "Secure custom websites, employee portals, and industrial workflow systems",
      "Aligning physical workspace environments (offices, visitor experience centers) to your brand",
      "Human Architecture Framework partnerships (via Mindvest Global) to optimize corporate culture"
    ],
    recommendedPkg: "Package 04 (The Master Plan)",
    ctaText: "Request Corporate Brief",
    ctaUrl: "/contact?industry=corporate&package=4"
  },
  {
    id: "diaspora",
    tabLabel: "Diaspora Founders",
    title: "DIASPORA",
    subtitle: "Premium Ventures in Nigeria with Remote Peace of Mind",
    region: "Global Reach / Seamless Remote Collaboration",
    points: [
      "100% remote workflow collaboration via Slack, WhatsApp, and Google Meet",
      "International execution standards built to match global design benchmarks",
      "Verified corporate milestones, transparency guarantees, and secure transaction details",
      "Direct oversight from our principal (architect, frontend dev, and culture practitioner)"
    ],
    recommendedPkg: "Package 02 (Brand + Digital + Presence)",
    ctaText: "Start Diaspora Brief",
    ctaUrl: "/contact?industry=diaspora&package=2"
  },
  {
    id: "government",
    tabLabel: "Gov & Institutions",
    title: "PUBLIC SECTOR",
    subtitle: "State Agencies & Schools Upgrading for a New Era",
    region: "Federal, State & Educational Sectors",
    points: [
      "Citizen portals and state agency brand identities built on secure code bases",
      "School masterplanning: space layout aligned to contemporary educational needs",
      "Institutional branding systems, public signage guidelines, and stationery packages",
      "Leadership development partnerships to elevate administrative service culture"
    ],
    recommendedPkg: "Package 04 (The Master Plan)",
    ctaText: "Initiate Public Brief",
    ctaUrl: "/contact?industry=government&package=4"
  }
];

export function MarketsSelector() {
  const [activeTab, setActiveTab] = useState<SegmentId>("developer");

  const currentSegment = SEGMENTS.find((s) => s.id === activeTab)!;

  return (
    <section className="markets" id="markets" data-bg="light">
      <div className="section-tag">Who We Serve</div>
      <div
        style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: "clamp(52px, 8vw, 100px)",
          lineHeight: 0.9,
          marginBottom: "40px"
        }}
      >
        GLOBAL REACH, <span style={{ color: "var(--gold)" }}>LOCAL BASE</span>
      </div>

      {/* Tabs Navigation */}
      <div className="markets-tabs-nav">
        {SEGMENTS.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`markets-tab-btn ${activeTab === s.id ? "active" : ""}`}
            onClick={() => setActiveTab(s.id)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      {/* Dynamic Segment Panel */}
      <div className="markets-dynamic-content">
        <Reveal key={activeTab} direction="up" duration={0.5}>
          <TiltCard glare maxTilt={3}>
            <div className="market-detail-card">
              <div className="market-card-left">
                <div className="market-num">
                  {activeTab === "developer" && "01"}
                  {activeTab === "corporate" && "02"}
                  {activeTab === "diaspora" && "03"}
                  {activeTab === "government" && "04"}
                </div>
                <h3 className="market-card-title">{currentSegment.title}</h3>
                <p className="market-card-subtitle">{currentSegment.subtitle}</p>
                <div className="market-card-region">{currentSegment.region}</div>
              </div>

              <div className="market-card-right">
                <div className="market-points-title">WHAT WE RESOURCE FOR YOU:</div>
                <ul className="market-items" style={{ marginBottom: "24px" }}>
                  {currentSegment.points.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>

                <div className="market-recommendation-block">
                  <div className="recommendation-lbl">RECOMMENDED ARCHITECTURE:</div>
                  <div className="recommendation-val">{currentSegment.recommendedPkg}</div>
                </div>

                <div style={{ marginTop: "32px" }}>
                  <Magnetic strength={0.2}>
                    <Link href={currentSegment.ctaUrl} className="btn-primary" style={{ display: "inline-block" }}>
                      {currentSegment.ctaText} →
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
