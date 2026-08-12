"use client";

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { TiltCard } from "./TiltCard";

/* ─────────────────────────────────────────
   Residential & Private Client Services
   Editorial alternating layout – premium
───────────────────────────────────────── */

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

export function ResidentialServices() {
  return (
    <section
      id="residential"
      style={{
        background: "var(--black)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* ── 1. SECTION HEADER ── */}
      <div
        style={{
          maxWidth: 1300,
          margin: "0 auto",
          padding: "100px 60px 80px",
        }}
        className="res-header-wrap"
      >
        <Reveal direction="up" duration={0.7}>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 10,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 28,
                height: 1,
                background: "var(--gold)",
              }}
            />
            Residential &amp; Private Client Services
          </div>

          <h2
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.92,
              color: "var(--white)",
              letterSpacing: 1,
              marginBottom: 24,
            }}
          >
            Modern homes, designed
            <br />
            from{" "}
            <span style={{ color: "var(--gold)" }}>vision</span> to architectural clarity.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(16px, 1.6vw, 22px)",
              fontStyle: "italic",
              color: "var(--white-dim)",
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Bespoke space planning, floor plans, 3D visualization and compound masterplanning
            — crafted for private property owners and residential developers across Nigeria.
          </p>
        </Reveal>
      </div>

      {/* ── 2. SERVICE 01 — text left / image right ── */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="res-block-inner res-block-01"
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "0 60px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            alignItems: "stretch",
            minHeight: 640,
          }}
        >
          {/* Left — content */}
          <div
            style={{
              padding: "80px 60px 80px 0",
              borderRight: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className="res-content-col"
          >
            <Reveal direction="left" duration={0.8}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "clamp(64px, 9vw, 120px)",
                    lineHeight: 1,
                    color: "rgba(244,240,232,0.07)",
                    userSelect: "none",
                    marginBottom: -20,
                  }}
                >
                  01
                </div>

                <div
                  style={{
                    width: 32,
                    height: 2,
                    background: "var(--gold)",
                    marginBottom: 20,
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    letterSpacing: 1,
                    color: "var(--white)",
                    marginBottom: 12,
                    lineHeight: 1,
                  }}
                >
                  Residential Architecture
                </h3>

                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: 13,
                    color: "var(--gold)",
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}
                >
                  Starting from ₦1.5M
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: 18,
                    fontStyle: "italic",
                    color: "var(--white-dim)",
                    lineHeight: 1.7,
                    marginBottom: 36,
                    maxWidth: 420,
                  }}
                >
                  For bungalows, duplexes and private homes. A complete architectural
                  design experience from your first brief to final renders.
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {SERVICE_01_INCLUDES.map((item, i) => (
                    <li
                      key={i}
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 48 }}>
                <Magnetic strength={0.2}>
                  <Link
                    href="#contact?service=residential-architecture"
                    className="btn-primary"
                    style={{ display: "inline-block" }}
                  >
                    Start This Project
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Right — image */}
          <TiltCard glare maxTilt={5} className="res-image-col">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: 500,
                height: "100%",
              }}
            >
              <Image
                src="/renders/modern_5bed_bungalow_day.jpg"
                alt="Modern 5-Bedroom Residential Architecture — Elevation Studio"
                fill
                className="object-cover"
                style={{ transition: "transform 1s ease" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Floating Label */}
              <div
                style={{
                  position: "absolute",
                  bottom: 32,
                  right: 32,
                  padding: "10px 18px",
                  background: "rgba(6,6,6,0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Bungalow · Villa · Duplex
              </div>
            </div>
          </TiltCard>
        </div>
      </div>

      {/* ── 3. SERVICE 02 — image left / text right ── */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div
          className="res-block-inner res-block-02"
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "0 60px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            alignItems: "stretch",
            minHeight: 680,
          }}
        >
          {/* Left — image (reversed) */}
          <TiltCard glare maxTilt={5} className="res-image-col res-image-left">
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                minHeight: 500,
                height: "100%",
              }}
            >
              <Image
                src="/renders/residential_villa_facade.jpg"
                alt="Luxury Residential Masterplan — Elevation Studio"
                fill
                className="object-cover"
                style={{ transition: "transform 1s ease" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 32,
                  left: 32,
                  padding: "10px 18px",
                  background: "rgba(6,6,6,0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 10,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "var(--gold)",
                }}
              >
                Villas · Compounds · Estates
              </div>
            </div>
          </TiltCard>

          {/* Right — content */}
          <div
            style={{
              padding: "80px 0 80px 60px",
              borderLeft: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            className="res-content-col"
          >
            <Reveal direction="right" duration={0.8}>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "clamp(64px, 9vw, 120px)",
                    lineHeight: 1,
                    color: "rgba(244,240,232,0.07)",
                    userSelect: "none",
                    marginBottom: -20,
                  }}
                >
                  02
                </div>

                <div
                  style={{
                    width: 32,
                    height: 2,
                    background: "var(--gold)",
                    marginBottom: 20,
                  }}
                />

                <h3
                  style={{
                    fontFamily: "var(--font-bebas), sans-serif",
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    letterSpacing: 1,
                    color: "var(--white)",
                    marginBottom: 12,
                    lineHeight: 1,
                  }}
                >
                  Residential Masterplan
                </h3>

                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: 13,
                    color: "var(--gold)",
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}
                >
                  Starting from ₦4.5M
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontSize: 18,
                    fontStyle: "italic",
                    color: "var(--white-dim)",
                    lineHeight: 1.7,
                    marginBottom: 36,
                    maxWidth: 420,
                  }}
                >
                  For luxury homes, villas, private compounds and larger residential
                  projects. A complete site-to-structure masterplan.
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {SERVICE_02_INCLUDES.map((item, i) => (
                    <li
                      key={i}
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 48 }}>
                <Magnetic strength={0.2}>
                  <Link
                    href="#contact?service=residential-masterplan"
                    className="btn-primary"
                    style={{ display: "inline-block" }}
                  >
                    Start This Project
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── 4. WORKFLOW ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--steel)",
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "80px 60px",
          }}
        >
          <Reveal direction="up" duration={0.7}>
            <div
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: 10,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: 48,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 28,
                  height: 1,
                  background: "var(--border)",
                }}
              />
              How It Works
            </div>

            <div className="res-workflow-grid">
              {WORKFLOW_STAGES.map((stage, i) => (
                <div key={stage.num} className="res-workflow-step">
                  {/* Number */}
                  <div
                    style={{
                      fontFamily: "var(--font-bebas), sans-serif",
                      fontSize: "clamp(48px, 6vw, 72px)",
                      lineHeight: 1,
                      color: "var(--white)",
                      marginBottom: 8,
                    }}
                  >
                    {stage.num}
                  </div>
                  {/* Connector line */}
                  <div className="res-workflow-connector" />
                  {/* Name */}
                  <div
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: 11,
                      letterSpacing: 3,
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: 10,
                    }}
                  >
                    {stage.name}
                  </div>
                  {/* Description */}
                  <div
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.6,
                      maxWidth: 200,
                    }}
                  >
                    {stage.desc}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── 5. PRICING NOTE ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--black)",
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "32px 60px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
          className="res-pricing-note"
        >
          <span
            style={{
              display: "inline-block",
              width: 20,
              height: 1,
              background: "var(--border)",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: 15,
              fontStyle: "italic",
              color: "var(--muted)",
              lineHeight: 1.6,
            }}
          >
            Final professional fees depend on project size, complexity, site conditions
            and required deliverables.
          </p>
        </div>
      </div>

      {/* ── 6. FINAL CTA ── */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--off-black)",
        }}
      >
        <div
          style={{
            maxWidth: 1300,
            margin: "0 auto",
            padding: "100px 60px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 60,
            alignItems: "center",
          }}
          className="res-cta-grid"
        >
          {/* Left copy */}
          <Reveal direction="up" duration={0.8}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 10,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 1,
                    background: "var(--gold)",
                  }}
                />
                Start Your Residential Project
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-bebas), sans-serif",
                  fontSize: "clamp(40px, 5.5vw, 80px)",
                  lineHeight: 0.92,
                  color: "var(--white)",
                  letterSpacing: 1,
                  marginBottom: 24,
                }}
              >
                Start Your
                <br />
                <span style={{ color: "var(--gold)" }}>Residential Project</span>
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(16px, 1.5vw, 20px)",
                  fontStyle: "italic",
                  color: "var(--white-dim)",
                  lineHeight: 1.7,
                  maxWidth: 520,
                }}
              >
                Tell us about your project, your plot and the kind of home you want to
                create. We begin by understanding your vision before we begin designing it.
              </p>
            </div>
          </Reveal>

          {/* Right CTAs */}
          <Reveal direction="right" duration={0.8} delay={0.15}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "flex-end",
                minWidth: 240,
              }}
              className="res-cta-buttons"
            >
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
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                WhatsApp Consultation ↗
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Responsive CSS ── */}
      <style>{`
        @media (max-width: 900px) {
          .res-header-wrap {
            padding: 72px 24px 56px !important;
          }
          .res-block-inner {
            grid-template-columns: 1fr !important;
            padding: 0 24px !important;
          }
          .res-block-01 .res-image-col,
          .res-block-02 .res-image-col {
            order: -1 !important;
            min-height: 320px !important;
            border-right: none !important;
            border-left: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .res-block-02 .res-image-left {
            order: -1 !important;
          }
          .res-content-col {
            padding: 48px 0 48px 0 !important;
            border-right: none !important;
            border-left: none !important;
          }
          .res-workflow-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .res-cta-grid {
            grid-template-columns: 1fr !important;
            padding: 72px 24px !important;
          }
          .res-cta-buttons {
            align-items: flex-start !important;
          }
          .res-pricing-note {
            padding: 28px 24px !important;
          }
        }
        @media (max-width: 560px) {
          .res-block-inner {
            padding: 0 16px !important;
          }
          .res-workflow-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .res-workflow-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }
        .res-workflow-step {
          padding: 0 32px 0 0;
          position: relative;
        }
        .res-workflow-connector {
          width: 100%;
          height: 1px;
          background: var(--border);
          margin: 16px 0 24px;
          position: relative;
        }
        .res-workflow-connector::after {
          content: "";
          position: absolute;
          right: -6px;
          top: -3px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold);
          border: 1px solid var(--gold);
        }
        .res-block-inner .res-image-col:hover img {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}
