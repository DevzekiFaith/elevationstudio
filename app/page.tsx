"use client";

import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { BrandFlow } from "@/components/BrandFlow";
import { RenderGallery } from "@/components/RenderGallery";
import { Testimonials } from "@/components/Testimonials";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { QRCodeCard } from "@/components/QRCodeCard";
import { LocationMap } from "@/components/LocationMap";
import { ParallaxLayer } from "@/components/ParallaxLayer";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { BlueprintSlider } from "@/components/BlueprintSlider";
import { useCurrency } from "@/components/CurrencyContext";
import { CurrencyToggle } from "@/components/CurrencyToggle";
import { ResidentialServices } from "@/components/ResidentialServices";
import { ScrollBackground } from "@/components/ScrollBackground";

export default function Home() {
  const { formatPrice, currency } = useCurrency();

  const p1 = formatPrice(1);
  const p2 = formatPrice(2);
  const p3 = formatPrice(3);
  const p4 = formatPrice(4);

  return (
    <>
      <Nav />
      <ScrollBackground />

      {/* Hero Section with Parallax Depth */}
      <section className="hero relative overflow-hidden" data-bg="dark">
        <ParallaxLayer speed={-0.35} className="absolute inset-0 pointer-events-none">
          <div className="hero-bg" />
          <div className="hero-grid opacity-60" />
          <div className="ambient-orb ambient-orb-gold w-[600px] h-[600px] -top-32 -right-32" />
          <div className="ambient-orb ambient-orb-bridge w-[500px] h-[500px] bottom-0 -left-20" />
        </ParallaxLayer>

        <div className="hero-ticker relative z-10">
          <div className="ticker-inner">
            <div className="ticker-item">
              <span>◆</span> Brand Identity
            </div>
            <div className="ticker-item">
              <span>◆</span> Digital Experience
            </div>
            <div className="ticker-item">
              <span>◆</span> Space Design
            </div>
            <div className="ticker-item">
              <span>◆</span> Culture Transformation
            </div>
            <div className="ticker-item">
              <span>◆</span> Ogun — Lagos Corridor
            </div>
            <div className="ticker-item">
              <span>◆</span> Brand Identity
            </div>
            <div className="ticker-item">
              <span>◆</span> Digital Experience
            </div>
            <div className="ticker-item">
              <span>◆</span> Space Design
            </div>
            <div className="ticker-item">
              <span>◆</span> Culture Transformation
            </div>
            <div className="ticker-item">
              <span>◆</span> Ogun — Lagos Corridor
            </div>
          </div>
        </div>

        <div className="hero-content relative z-10 max-w-[1400px] mx-auto flex flex-col gap-8 pt-8 md:pt-14 mt-4">
          {/* Top Label & Massive Headline */}
          <div>
            <Reveal direction="down" duration={0.6} delay={0.1}>
              <div className="hero-label">Elevation Studio · Est. 2026</div>
            </Reveal>
            
            <Reveal direction="up" duration={0.8} delay={0.2}>
              <div className="hero-headline">
                BUILD
                <br />
                <span className="line2">DIFFERENT</span>
                <span className="gold-word pulse-glow">.</span>
              </div>
            </Reveal>
          </div>

          {/* GRAND FLEXED 3D ARCHITECTURAL RENDER SHOWCASE */}
          <Reveal direction="zoom" duration={0.8} delay={0.3}>
            <TiltCard glare maxTilt={5} className="w-full">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#333336] shadow-[0_25px_70px_rgba(0,0,0,0.9)] group glow-card-border">
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full min-h-[340px] md:min-h-[460px]">
                  <Image
                    src="/hero_architectural_render.jpg"
                    alt="Featured 3D Spatial Architecture — Elevation Studio"
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-black/30 opacity-75 pointer-events-none" />
                </div>

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex gap-2">
                  <span className="px-3.5 py-1.5 bg-[#060606]/85 backdrop-blur-md border border-[var(--gold-border)] rounded text-[10px] md:text-[11px] font-mono tracking-widest text-[var(--gold)] uppercase shadow-lg">
                    FEATURED 3D SPATIAL ARCHITECTURE
                  </span>
                </div>

                {/* Bottom Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-10 flex flex-wrap justify-between items-end gap-4 bg-[#0a0a0c]/85 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/10">
                  <div>
                    <div className="font-mono text-[10px] md:text-[11px] tracking-widest text-[var(--gold)] uppercase mb-1">
                      OGUN–LAGOS CORRIDOR
                    </div>
                    <div className="font-bebas text-xl md:text-3xl text-white tracking-wide">
                      5-Bedroom Modern Luxury Residence Masterplan
                    </div>
                  </div>
                  <Link
                    href="/renders/1"
                    className="px-4 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-[11px] tracking-wider uppercase font-semibold rounded transition-colors whitespace-nowrap shadow-md"
                  >
                    EXPLORE FULL HD CONCEPT ↗
                  </Link>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Subtext & Action CTAs Below the Flexed Image */}
          <div className="hero-bottom flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-2">
            <Reveal direction="up" duration={0.7} delay={0.4}>
              <div className="hero-sub text-lg md:text-2xl font-serif italic max-w-[640px]">
                Nigeria&apos;s premier studio fusing brand design, digital engineering,
                spatial 3D architecture, and cultural transformation under one
                roof.
              </div>
            </Reveal>

            <Reveal direction="up" duration={0.7} delay={0.5}>
              <div className="hero-actions flex items-center gap-4">
                <Magnetic strength={0.3}>
                  <a href="#packages" className="btn-primary">
                    View Packages
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <Link href="/contact" className="btn-ghost">
                    Start a Project
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <BrandFlow />

      <Reveal direction="up" duration={0.7}>
        <section className="services relative overflow-hidden" id="services" data-bg="light">
          <ParallaxLayer speed={0.15} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="ambient-orb ambient-orb-gold w-[450px] h-[450px] opacity-10" />
          </ParallaxLayer>

          <div className="services-top">
            <div>
              <div className="section-tag">Capabilities</div>
              <div className="services-headline">
                FOUR DISCIPLINES,
                <br />
                <span className="gold">ONE ARCHITECTURE</span>
              </div>
            </div>
            <div className="services-sub">
              We operate as a single studio, not a group of contractors. Every
              project benefits from all four views — giving you a brand that
              lives comfortably in print, code, concrete, and culture.
            </div>
          </div>

          <div className="section-divider" />

          <div className="services-lead">
            <div className="services-lead-num">04</div>
            <div className="services-lead-text">
              Pillars of execution. Every deliverable is engineered to last,
              designed to outlast the brief.
            </div>
          </div>

          <div className="service-list">
            <Reveal direction="left" delay={0.1}>
              <div className="service-item glow-card-border">
                <div className="service-num">01</div>
                <div className="service-body">
                  <div className="service-name">BRAND IDENTITY</div>
                  <div className="service-desc">
                    Logo systems, colour language, typography, brand guidelines,
                    and stationery. The visual architecture your business will
                    speak from for decades.
                  </div>
                </div>
                <div className="service-tags">
                  <div className="service-tag">Logo Design</div>
                  <div className="service-tag">Guidelines</div>
                  <div className="service-tag">Stationery</div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.2}>
              <div className="service-item glow-card-border">
                <div className="service-num">02</div>
                <div className="service-body">
                  <div className="service-name">DIGITAL ENGINEERING</div>
                  <div className="service-desc">
                    Website design and development, social media systems, email
                    infrastructure. Built with React, Next.js, and TypeScript —
                    not templates.
                  </div>
                </div>
                <div className="service-tags">
                  <div className="service-tag">Web Design</div>
                  <div className="service-tag">Development</div>
                  <div className="service-tag">Next.js</div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.3}>
              <div className="service-item glow-card-border">
                <div className="service-num">03</div>
                <div className="service-body">
                  <div className="service-name">SPACE DESIGN</div>
                  <div className="service-desc">
                    Interior concepts, space-brand alignment, show apartment
                    design. For businesses whose brand must translate into the
                    physical rooms their customers enter.
                  </div>
                </div>
                <div className="service-tags">
                  <div className="service-tag">Interior Design</div>
                  <div className="service-tag">Revit / Lumion</div>
                  <div className="service-tag">BIM</div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.4}>
              <div className="service-item glow-card-border">
                <div className="service-num">04</div>
                <div className="service-body">
                  <div className="service-name">CULTURE TRANSFORMATION</div>
                  <div className="service-desc">
                    Organisational culture programmes, leadership development, and
                    6–12 month transformation partnerships — powered by Mindvest
                    Global&apos;s Human Architecture Framework.
                  </div>
                </div>
                <div className="service-tags">
                  <div className="service-tag">Culture Design</div>
                  <div className="service-tag">Leadership</div>
                  <div className="service-tag">Mindvest</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>

      {/* 2D Blueprint vs 3D Render Comparison Slider - Hidden until custom blueprint assets are assigned */}
      {/* <BlueprintSlider /> */}

      <RenderGallery />

      {/* <ResidentialServices /> */}

      <div className="marquee-bar">
        <div className="marquee-inner">
          <div className="marquee-item">
            Brand Identity <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Web Development <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Space Design <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Culture Architecture <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Digital Systems <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Interior Concepts <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Brand Identity <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Web Development <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Space Design <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Culture Architecture <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Digital Systems <div className="marquee-dot" />
          </div>
          <div className="marquee-item">
            Interior Concepts <div className="marquee-dot" />
          </div>
        </div>
      </div>

      {/* Packages Section with Interactive 3D Tilt Cards and Dynamic Currency State */}
      <Reveal direction="up" duration={0.8}>
        <section className="packages relative overflow-hidden" id="packages" data-bg="dark">
          <ParallaxLayer speed={-0.2} className="absolute left-0 top-1/3 pointer-events-none">
            <div className="ambient-orb ambient-orb-gold w-[500px] h-[500px] opacity-15" />
          </ParallaxLayer>

          <div className="packages-inner">
            <div className="packages-top flex flex-wrap justify-between items-end gap-6 mb-12">
              <div>
                <div className="pkg-title">
                  OUR
                  <br />
                  <span style={{ color: "var(--gold)" }}>PACKAGES</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono tracking-widest text-[var(--muted)] uppercase">
                    CURRENCY TOGGLE:
                  </span>
                  <CurrencyToggle />
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    maxWidth: 340,
                    lineHeight: 1.7,
                    textAlign: "right",
                  }}
                >
                  Each tier builds on the last. Showing figures in{" "}
                  <span className="text-[var(--gold)] font-mono font-bold">{currency}</span>. Enter where your business is.
                </div>
              </div>
            </div>

            <div className="pkg-grid">
              <TiltCard glare maxTilt={7}>
                <div className="pkg-card h-full">
                  <div className="pkg-card-top">
                    <div className="flex justify-between items-center mb-2">
                      <div className="pkg-card-num">Package 01</div>
                      <CurrencyToggle />
                    </div>
                    <div className="pkg-card-name">THE FOUNDATION</div>
                    <div className="pkg-card-subtitle">Brand Identity Only</div>
                    <ul className="pkg-card-includes">
                      <li className="new">Logo & master mark design</li>
                      <li className="new">Colour system & typography</li>
                      <li className="new">Brand guidelines document</li>
                      <li className="new">Stationery suite</li>
                    </ul>
                  </div>
                  <div className="pkg-card-bottom">
                    <div className="pkg-card-tag">ESTIMATED INVESTMENT RANGE ({currency})</div>
                    <div>
                      <div className="pkg-card-price">{p1.min}</div>
                      <div className="pkg-card-range">{p1.max}</div>
                    </div>
                    <Magnetic strength={0.2}>
                      <Link href="/contact?package=1" className="pkg-card-cta">
                        <span>REQUEST PROPOSAL</span>
                        <span>→</span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={7}>
                <div className="pkg-card h-full">
                  <div className="pkg-card-top">
                    <div className="flex justify-between items-center mb-2">
                      <div className="pkg-card-num">Package 02</div>
                      <CurrencyToggle />
                    </div>
                    <div className="pkg-card-name">THE STRUCTURE</div>
                    <div className="pkg-card-subtitle">Brand + Digital + Presence</div>
                    <ul className="pkg-card-includes">
                      <li>Everything in Foundation</li>
                      <li className="new">Local presence &amp; Google optimisation</li>
                      <li className="new">Website design &amp; custom engineering</li>
                      <li className="new">Social media &amp; email marketing setup</li>
                    </ul>
                    <Link href="/packages/2" className="pkg-hover-badge group" title="Open full Package 02 detail modal">
                      <span>OPEN FULL SCOPE MODAL</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">✦</span>
                    </Link>
                  </div>
                  <div className="pkg-card-bottom">
                    <div className="pkg-card-tag">ESTIMATED INVESTMENT RANGE ({currency})</div>
                    <div>
                      <div className="pkg-card-price">{p2.min}</div>
                      <div className="pkg-card-range">{p2.max}</div>
                    </div>
                    <Magnetic strength={0.2}>
                      <Link href="/contact?package=2" className="pkg-card-cta">
                        <span>REQUEST PROPOSAL</span>
                        <span>→</span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={7}>
                <div className="pkg-card h-full">
                  <div className="pkg-card-top">
                    <div className="flex justify-between items-center mb-2">
                      <div className="pkg-card-num">Package 03</div>
                      <CurrencyToggle />
                    </div>
                    <div className="pkg-card-name">THE ELEVATION</div>
                    <div className="pkg-card-subtitle">Brand + Digital + Space</div>
                    <ul className="pkg-card-includes">
                      <li>Everything in Structure</li>
                      <li className="new">Space design consultation</li>
                      <li className="new">Interior design concept &amp; docs</li>
                      <li className="new">Space-brand alignment audit</li>
                    </ul>
                    <Link href="/packages/3" className="pkg-hover-badge group" title="Open full Package 03 detail modal">
                      <span>OPEN FULL SCOPE MODAL</span>
                      <span className="group-hover:translate-x-0.5 transition-transform">✦</span>
                    </Link>
                  </div>
                  <div className="pkg-card-bottom">
                    <div className="pkg-card-tag">ESTIMATED INVESTMENT RANGE ({currency})</div>
                    <div>
                      <div className="pkg-card-price">{p3.min}</div>
                      <div className="pkg-card-range">{p3.max}</div>
                    </div>
                    <Magnetic strength={0.2}>
                      <Link href="/contact?package=3" className="pkg-card-cta">
                        <span>REQUEST PROPOSAL</span>
                        <span>→</span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={8}>
                <div className="pkg-card bridge h-full">
                  <div className="bridge-label">Flagship</div>
                  <div className="pkg-card-top">
                    <div className="flex justify-between items-center mb-2">
                      <div className="pkg-card-num">Package 04</div>
                      <CurrencyToggle />
                    </div>
                    <div className="pkg-card-name">THE MASTER PLAN</div>
                    <div className="pkg-card-subtitle">
                      Brand + Digital + Space + Culture
                    </div>
                    <ul className="pkg-card-includes">
                      <li>Everything in Elevation</li>
                      <li className="new">Mindvest culture transformation</li>
                      <li className="new">Leadership development</li>
                      <li className="new">6–12 month partnership</li>
                    </ul>
                  </div>
                  <div className="pkg-card-bottom">
                    <div className="pkg-card-tag">ESTIMATED INVESTMENT RANGE ({currency})</div>
                    <div>
                      <div className="pkg-card-price">{p4.min}</div>
                      <div className="pkg-card-range">{p4.max}</div>
                    </div>
                    <Magnetic strength={0.25}>
                      <Link href="/contact?package=4" className="pkg-card-cta">
                        <span>COMMISSION BRIEF</span>
                        <span>→</span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Executive Payment & Retainer Scoping Disclosure */}
            <div className="pkg-retainer-disclosure">
              <div className="pkg-retainer-badge">
                <svg className="pkg-retainer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <path d="M9 12l2 2 4-4"/>
                </svg>
                <span>CORPORATE RETAINER &amp; SCOPING DISCLOSURE ({currency})</span>
              </div>

              <div className="pkg-retainer-body">
                <p className="pkg-retainer-text">
                  All project figures represent <strong>customized investment ranges ({currency})</strong> based on client scale and deliverables. Formal project retainers, milestones, and <strong>verified corporate bank transfer details</strong> are issued exclusively via official Elevation Studio proposals upon brief review.
                </p>

                <div className="pkg-retainer-btn-wrapper">
                  <Magnetic strength={0.3}>
                    <a
                      href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20would%20like%20to%20schedule%20an%20Executive%20Discovery%20Consultation."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pkg-retainer-btn"
                    >
                      <span>BOOK DISCOVERY SESSION</span>
                      <span className="pkg-retainer-arrow">→</span>
                    </a>
                  </Magnetic>
                  <span className="pkg-retainer-subnote">DIRECT EXECUTIVE DESK • 24H RESPONSE</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <ResidentialServices />

      <Reveal direction="up">
        <section className="markets" id="markets" data-bg="light">
          <div className="section-tag">Who We Serve</div>
          <div
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "clamp(52px, 8vw, 100px)",
              lineHeight: 0.9,
            }}
          >
            GLOBAL REACH, <span style={{ color: "var(--gold)" }}>LOCAL BASE</span>
          </div>

          <div className="markets-grid">
            <TiltCard glare maxTilt={6}>
              <div className="market h-full">
                <div className="market-num">01</div>
                <div className="market-name">
                  Global Reach
                  <br />
                  Serve Wherever You Are
                </div>
                <div className="market-region">Any Location / Base Globally</div>
                <ul className="market-items">
                  <li>We serve individuals and companies from any location of their base</li>
                  <li>Seamless remote integration, workflow collaboration, and digital engineering</li>
                  <li>African diaspora businesses wanting authentic, high-impact design intelligence</li>
                  <li>Startups, NGOs, and remote-first companies scaling their digital footprint</li>
                </ul>
              </div>
            </TiltCard>

            <TiltCard glare maxTilt={6}>
              <div className="market h-full">
                <div className="market-num">02</div>
                <div className="market-name">
                  Local Base
                  <br />
                  Ogun — Lagos Corridor
                </div>
                <div className="market-region">Our Operational Headquarters</div>
                <ul className="market-items">
                  <li>Retaining the Ogun - Lagos corridor as our headquarters and operational hub</li>
                  <li>Real estate developers — brand identity, web design, and spatial concepts</li>
                  <li>Manufacturing and industrial corridor corporations upgrading visual assets</li>
                  <li>Hospitality, retail, and commercial developments across the corridor</li>
                </ul>
              </div>
            </TiltCard>

            <TiltCard glare maxTilt={6}>
              <div className="market h-full">
                <div className="market-num">03</div>
                <div className="market-name">
                  Government &
                  <br />
                  Institutional
                </div>
                <div className="market-region">Federal, State & Public Sector</div>
                <ul className="market-items">
                  <li>
                    State agencies modernising visual identity and secure citizen portals
                  </li>
                  <li>
                    Educational institutions — brand, digital systems, and space design
                  </li>
                  <li>Feeds into Mindvest Global partnership strategy for public infrastructure</li>
                </ul>
              </div>
            </TiltCard>
          </div>

          <div style={{ marginTop: 48 }}>
            <LocationMap />
          </div>
        </section>
      </Reveal>

      <Reveal direction="up">
        <section className="process" id="process" data-bg="dark">
          <div className="process-inner">
            <div className="section-tag">How We Work</div>
            <div
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: "clamp(52px, 8vw, 100px)",
                lineHeight: 0.9,
              }}
            >
              THE <span style={{ color: "var(--gold)" }}>BUILD</span>
              <br />
              PROCESS
            </div>

            <div className="process-steps">
              {[
                {
                  num: "01",
                  name: "Discovery",
                  desc: "Deep dive into your business, audience, and ambition. We don't design until we understand what you're building toward.",
                },
                {
                  num: "02",
                  name: "Architecture",
                  desc: "Brand strategy, information architecture, spatial concepts. The blueprint before a single pixel is placed.",
                },
                {
                  num: "03",
                  name: "Design",
                  desc: "Visual identity, web design, space concepts. Three rounds of refinement. Your feedback shapes every iteration.",
                },
                {
                  num: "04",
                  name: "Build",
                  desc: "Development, production, handover. Everything documented, everything working, everything yours.",
                },
                {
                  num: "05",
                  name: "Elevate",
                  desc: "For Package 4 clients — the transformation partnership begins. Culture, leadership, ongoing support.",
                },
              ].map((step, index) => (
                <Reveal key={step.num} direction="up" delay={index * 0.1}>
                  <div className="p-step h-full">
                    <div className="p-step-num">{step.num}</div>
                    <div className="p-step-name">{step.name}</div>
                    <div className="p-step-desc">{step.desc}</div>
                    {index < 4 && <div className="p-step-arrow">→</div>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* The Strategic Bridge Section */}
      <Reveal direction="zoom">
        <section className="bridge-section relative overflow-hidden" id="bridge" data-bg="light">
          <ParallaxLayer speed={0.25} className="absolute right-[-100px] bottom-[-100px] pointer-events-none">
            <div className="ambient-orb ambient-orb-bridge w-[600px] h-[600px] opacity-25" />
          </ParallaxLayer>

          <div className="bridge-left">
            <div className="section-tag">The Strategic Bridge</div>
            <div className="bridge-title">
              WHERE
              <br />
              DESIGN MEETS
              <br />
              <span className="green">TRANSFORMATION</span>
            </div>
            <p className="bridge-body">
              No other agency in the Ogun/Lagos corridor — or frankly in Nigeria
              — can offer what Package 4 delivers: a{" "}
              <strong>
                complete transformation of brand, digital presence, physical
                space, and organisational culture
              </strong>{" "}
              under one roof.
            </p>
            <p className="bridge-body">
              This is where Elevation Studio formally connects with{" "}
              <strong>Mindvest Global&apos;s transformation intelligence</strong>{" "}
              — combining architectural design thinking with the Human
              Architecture Framework to reshape not just how a company looks,
              but how its people show up.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.7,
              }}
            >
              Led by a founder who is simultaneously a trained architect, a
              frontend engineer, and a transformation practitioner. This
              position cannot be replicated without the same formation.
            </p>
          </div>

          <div className="bridge-right">
            <TiltCard glare maxTilt={8}>
              <div className="h-full">
                <div className="bridge-pkg-label">Package 04 — Flagship</div>
                <div className="bridge-pkg-name">THE MASTER PLAN</div>
                <ul className="bridge-pkg-includes">
                  <li>Everything in The Elevation (Brand + Digital + Space)</li>
                  <li>
                    Mindvest Global organisational culture transformation programme
                  </li>
                  <li>Leadership development for the client&apos;s team</li>
                  <li>6–12 month transformation partnership</li>
                  <li>Quarterly culture audits and progress reviews</li>
                </ul>
                <div className="bridge-price">{p4.min}</div>
                <div className="bridge-price-range">{p4.max}</div>
              </div>
            </TiltCard>
          </div>
        </section>
      </Reveal>

      <Reveal direction="up">
        <section className="payment" id="payment" data-bg="dark">
          <div className="payment-inner">
            <div className="section-tag">Payment Structure</div>
            <div
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: "clamp(52px, 8vw, 100px)",
                lineHeight: 0.9,
                marginBottom: 0,
              }}
            >
              TERMS & <span style={{ color: "var(--gold)" }}>SCHEDULE</span>
            </div>

            <div className="payment-grid">
              <TiltCard glare maxTilt={5}>
                <div className="payment-card h-full">
                  <div className="payment-card-label">Packages 01 & 02</div>
                  <div className="payment-split">50 / 50</div>
                  <div className="payment-desc">
                    50% deposit to commence work. 50% on final delivery before
                    handover. No exceptions.
                  </div>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={5}>
                <div className="payment-card h-full">
                  <div className="payment-card-label">Package 03</div>
                  <div className="payment-split">40/30/30</div>
                  <div className="payment-desc">
                    40% on signing. 30% at design approval milestone. 30% on
                    project completion and handover.
                  </div>
                </div>
              </TiltCard>

              <TiltCard glare maxTilt={5}>
                <div className="payment-card bridge-pay h-full">
                  <div className="payment-card-label">
                    Package 04 — Master Plan
                  </div>
                  <div className="payment-split">30/30/40</div>
                  <div className="payment-desc">
                    30% on signing. 30% at midpoint. 40% structured as monthly
                    retainer across the 6–12 month partnership.
                  </div>
                </div>
              </TiltCard>
            </div>

            <div className="payment-bank-notice">
              <svg className="payment-bank-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              <div className="payment-bank-text">
                <strong>Executive Governance &amp; Proposal Assurance:</strong> Formal project proposals, milestone schedules, and verified corporate settlement accounts are issued exclusively upon brief review. Quotes remain valid for 30 days from proposal issuance. Retainer clients receive priority calendar scheduling and a dedicated lead architect.
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Testimonials />

      <Reveal direction="zoom">
        <section className="cta-section relative overflow-hidden" id="contact" data-bg="light">
          <ParallaxLayer speed={-0.3} className="absolute inset-0 pointer-events-none">
            <div className="cta-bg" />
            <div className="ambient-orb ambient-orb-gold w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </ParallaxLayer>

          <div className="relative z-10">
            <div className="cta-title">
              READY TO
              <br />
              <span className="gold">BUILD</span>
              <br />
              <span className="stroke">SOMETHING</span>
            </div>
            <div className="cta-sub">
              Tell us what you&apos;re building. We&apos;ll tell you how to build
              it right.
            </div>
            <div className="cta-actions">
              <Magnetic strength={0.35}>
                <Link href="/contact" className="btn-primary">
                  Start a Project
                </Link>
              </Magnetic>
              <Magnetic strength={0.35}>
                <a
                  href="https://wa.me/2349119059859?text=Hello%20Elevation%20Studio%2C%20I%20am%20ready%20to%20start%20a%20project%20brief."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
                >
                  Chat on WhatsApp (09119059859) →
                </a>
              </Magnetic>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal direction="up">
        <section id="qr-access" data-bg="dark" style={{ padding: "80px 48px 40px", background: "#060606" }}>
          <QRCodeCard />
        </section>
      </Reveal>

      <footer id="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">
              ELEVATION <span>STUDIO</span>
            </div>
            <div className="footer-tagline">
              Brand. Digital. Space. Culture.
            </div>
            <a
              href="https://mindvestglobalresources.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-parent-link"
            >
              Elevation Studio — A Subsidiary of Mindvest Global Resources LLC
            </a>
            <div className="mt-4">
              <a
                href="https://instagram.com/elevationstudio.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0e0e10] hover:bg-[var(--gold)]/10 border border-[var(--gold-border)] rounded-lg text-xs font-mono text-[var(--gold)] transition-colors group"
              >
                <span>📸 Follow on Instagram:</span>
                <strong className="text-white group-hover:text-[var(--gold)]">@elevationstudio.ng ↗</strong>
              </a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#packages">Packages</a>
              </li>
              <li>
                <a href="#markets">Who We Serve</a>
              </li>
              <li>
                <a href="#process">Our Process</a>
              </li>
              <li>
                <a href="#testimonials">Client Stories</a>
              </li>
              <li>
                <a href="#bridge">The Master Plan</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-contact-item">
              <div className="footer-contact-label">Email</div>
              <div className="footer-contact-value">
                <a
                  href="mailto:mindvestglobalresources@gmail.com"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  mindvestglobalresources@gmail.com
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-label">WhatsApp Direct</div>
              <div className="footer-contact-value">
                <a
                  href="https://wa.me/2349119059859"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--gold)", textDecoration: "none" }}
                >
                  09119059859
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-label">Instagram</div>
              <div className="footer-contact-value">
                <a
                  href="https://instagram.com/elevationstudio.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--gold)", textDecoration: "none" }}
                >
                  @elevationstudio.ng
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-label">Location Base</div>
              <div className="footer-contact-value">
                Ogun — Lagos Corridor · Nigeria
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-label">Principal</div>
              <div className="footer-contact-value">Zeki Ubor</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">
            © 2026 Elevation Studio · All Rights Reserved
          </div>
          <div className="footer-mindvest">
            Elevation Studio — A Subsidiary of{" "}
            <a href="https://mindvestglobalresources.com.ng" target="_blank" rel="noopener noreferrer">
              Mindvest Global Resources LLC
            </a>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </>
  );
}
