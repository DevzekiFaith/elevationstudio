import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Nav />

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-ticker">
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
              <span>◆</span> Sagamu — Lagos — Nigeria
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
              <span>◆</span> Sagamu — Lagos — Nigeria
            </div>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-label">Elevation Studio · Est. 2026</div>
          <div className="hero-headline">
            BUILD
            <br />
            <span className="line2">DIFFERENT</span>
            <span className="gold-word">.</span>
          </div>
          <div className="hero-bottom">
            <div className="hero-sub">
              Nigeria&apos;s only studio where brand design, digital engineering,
              spatial architecture, and cultural transformation meet under one
              roof.
            </div>
            <div className="hero-actions">
              <Link href="/#packages" className="btn-primary">
                View Packages
              </Link>
              <Link href="/contact" className="btn-ghost">
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      <Reveal>
        <section className="about" id="about">
          <div className="about-left">
            <div className="section-tag">Who We Are</div>
            <div className="about-title">
              WE DON&apos;T
              <br />
              JUST
              <br />
              <span className="stroke">DESIGN</span>
            </div>
            <p className="about-body">
              Elevation Studio is the{" "}
              <strong>design and development arm of Mindvest Global</strong> —
              built for businesses that understand the difference between looking
              good and being architecturally sound.
            </p>
            <p className="about-body">
              We work at the intersection of{" "}
              <strong>
                visual identity, digital engineering, physical space, and human
                culture
              </strong>{" "}
              — because the best brands don&apos;t just communicate, they
              inhabit every dimension they occupy.
            </p>
          </div>
          <div className="about-right">
            <div className="about-stat">
              <div className="stat-big">4</div>
              <div className="stat-label">
                Service
                <br />
                Packages
              </div>
            </div>
            <div className="about-stat">
              <div className="stat-big">3</div>
              <div className="stat-label">
                Target
                <br />
                Markets
              </div>
            </div>
            <div className="about-stat">
              <div className="stat-big">2</div>
              <div className="stat-label">
                Disciplines
                <br />
                Combined
              </div>
            </div>
            <div className="about-stat">
              <div className="stat-big">∞</div>
              <div className="stat-label">
                Transformation
                <br />
                Potential
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="services" id="services">
          <div className="services-header">
            <div className="services-title">
              WHAT
              <br />
              WE <span style={{ color: "var(--gold)" }}>BUILD</span>
            </div>
            <div className="services-desc">
              Four disciplines. One integrated intelligence. Every engagement is
              designed to outlast the brief.
            </div>
          </div>

          <div className="service-list">
            <div className="service-item">
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

            <div className="service-item">
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

            <div className="service-item">
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

            <div className="service-item">
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
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="packages" id="packages">
          <div className="packages-inner">
            <div className="packages-top">
              <div className="pkg-title">
                OUR
                <br />
                <span style={{ color: "var(--gold)" }}>PACKAGES</span>
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "var(--muted)",
                  maxWidth: 320,
                  lineHeight: 1.8,
                }}
              >
                Each tier builds on the last. Enter where your business is.
                Ascend as your vision demands.
              </div>
            </div>

            <div className="pkg-grid">
              <div className="pkg-card">
                <div className="pkg-card-top">
                  <div className="pkg-card-num">Package 01</div>
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
                  <div className="pkg-card-price">₦500K</div>
                  <div className="pkg-card-range">— ₦2,000,000</div>
                </div>
              </div>

              <div className="pkg-card">
                <div className="pkg-card-top">
                  <div className="pkg-card-num">Package 02</div>
                  <div className="pkg-card-name">THE STRUCTURE</div>
                  <div className="pkg-card-subtitle">Brand + Digital</div>
                  <ul className="pkg-card-includes">
                    <li>Everything in Foundation</li>
                    <li className="new">Website design & development</li>
                    <li className="new">Social media templates</li>
                    <li className="new">Email marketing setup</li>
                  </ul>
                </div>
                <div className="pkg-card-bottom">
                  <div className="pkg-card-price">₦1.5M</div>
                  <div className="pkg-card-range">— ₦5,000,000</div>
                </div>
              </div>

              <div className="pkg-card">
                <div className="pkg-card-top">
                  <div className="pkg-card-num">Package 03</div>
                  <div className="pkg-card-name">THE ELEVATION</div>
                  <div className="pkg-card-subtitle">Brand + Digital + Space</div>
                  <ul className="pkg-card-includes">
                    <li>Everything in Structure</li>
                    <li className="new">Space design consultation</li>
                    <li className="new">Interior design concept & docs</li>
                    <li className="new">Space-brand alignment audit</li>
                  </ul>
                </div>
                <div className="pkg-card-bottom">
                  <div className="pkg-card-price">₦5M</div>
                  <div className="pkg-card-range">— ₦20,000,000</div>
                </div>
              </div>

              <div className="pkg-card bridge">
                <div className="bridge-label">Flagship</div>
                <div className="pkg-card-top">
                  <div className="pkg-card-num">Package 04</div>
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
                  <div className="pkg-card-price">₦15M</div>
                  <div className="pkg-card-range">— ₦50,000,000+</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="markets" id="markets">
          <div className="section-tag">Who We Serve</div>
          <div
            style={{
              fontFamily: "var(--font-bebas), sans-serif",
              fontSize: "clamp(52px, 8vw, 100px)",
              lineHeight: 0.9,
            }}
          >
            THREE <span style={{ color: "var(--gold)" }}>MARKETS</span>
          </div>

          <div className="markets-grid">
            <div className="market">
              <div className="market-num">01</div>
              <div className="market-name">
                Primary
                <br />
                Ogun / Lagos Corridor
              </div>
              <div className="market-region">Sagamu · Lagos · Abeokuta</div>
              <ul className="market-items">
                <li>New businesses launching from scratch</li>
                <li>Manufacturers in the Sagamu industrial corridor</li>
                <li>
                  Real estate developers — brand, web, show apartments
                </li>
                <li>Hospitality — hotels, event centres, restaurants</li>
                <li>Healthcare facilities modernising their brand</li>
              </ul>
            </div>

            <div className="market">
              <div className="market-num">02</div>
              <div className="market-name">
                Secondary
                <br />
                International Remote
              </div>
              <div className="market-region">Diaspora · Global · Remote</div>
              <ul className="market-items">
                <li>
                  African diaspora businesses wanting African design intelligence
                </li>
                <li>International companies entering the Nigerian market</li>
                <li>NGOs and development organisations</li>
                <li>Tech startups needing design-development integration</li>
              </ul>
            </div>

            <div className="market">
              <div className="market-num">03</div>
              <div className="market-name">
                Government &
                <br />
                Institutional
              </div>
              <div className="market-region">Ogun State · Federal · Education</div>
              <ul className="market-items">
                <li>
                  State agencies modernising visual identity and digital presence
                </li>
                <li>
                  Educational institutions — brand, digital, space design
                </li>
                <li>Feeds into Mindvest Global government partnership strategy</li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="process" id="process">
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
              <div className="p-step">
                <div className="p-step-num">01</div>
                <div className="p-step-name">Discovery</div>
                <div className="p-step-desc">
                  Deep dive into your business, audience, and ambition. We
                  don&apos;t design until we understand what you&apos;re building
                  toward.
                </div>
                <div className="p-step-arrow">→</div>
              </div>
              <div className="p-step">
                <div className="p-step-num">02</div>
                <div className="p-step-name">Architecture</div>
                <div className="p-step-desc">
                  Brand strategy, information architecture, spatial concepts. The
                  blueprint before a single pixel is placed.
                </div>
                <div className="p-step-arrow">→</div>
              </div>
              <div className="p-step">
                <div className="p-step-num">03</div>
                <div className="p-step-name">Design</div>
                <div className="p-step-desc">
                  Visual identity, web design, space concepts. Three rounds of
                  refinement. Your feedback shapes every iteration.
                </div>
                <div className="p-step-arrow">→</div>
              </div>
              <div className="p-step">
                <div className="p-step-num">04</div>
                <div className="p-step-name">Build</div>
                <div className="p-step-desc">
                  Development, production, handover. Everything documented,
                  everything working, everything yours.
                </div>
                <div className="p-step-arrow">→</div>
              </div>
              <div className="p-step">
                <div className="p-step-num">05</div>
                <div className="p-step-name">Elevate</div>
                <div className="p-step-desc">
                  For Package 4 clients — the transformation partnership begins.
                  Culture, leadership, ongoing support.
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="bridge-section" id="bridge">
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
            <div className="bridge-price">₦15M</div>
            <div className="bridge-price-range">— ₦50,000,000+</div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="payment" id="payment">
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
              <div className="payment-card">
                <div className="payment-card-label">Packages 01 & 02</div>
                <div className="payment-split">50 / 50</div>
                <div className="payment-desc">
                  50% deposit to commence work. 50% on final delivery before
                  handover. No exceptions.
                </div>
              </div>
              <div className="payment-card">
                <div className="payment-card-label">Package 03</div>
                <div className="payment-split">40/30/30</div>
                <div className="payment-desc">
                  40% on signing. 30% at design approval milestone. 30% on
                  project completion and handover.
                </div>
              </div>
              <div className="payment-card bridge-pay">
                <div className="payment-card-label">
                  Package 04 — Master Plan
                </div>
                <div className="payment-split">30/30/40</div>
                <div className="payment-desc">
                  30% on signing. 30% at midpoint. 40% structured as monthly
                  retainer across the 6–12 month partnership.
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 2,
                background: "var(--black)",
                padding: "32px 40px",
                border: "1px solid var(--border)",
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  color: "var(--gold)",
                  fontSize: 18,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                ◆
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  lineHeight: 1.8,
                }}
              >
                All payments to{" "}
                <strong style={{ color: "var(--white)" }}>
                  Mindvest Global Resources LLC — Globus Bank
                </strong>
                . Quotes are valid for 30 days. Project slots are reserved in
                order of deposit received. Retainer clients receive priority
                scheduling and a dedicated point of contact.
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="cta-section" id="contact">
          <div className="cta-bg" />
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
            <Link href="/contact" className="btn-primary">
              Start a Project
            </Link>
            <Link href="/#packages" className="btn-ghost">
              View Packages
            </Link>
          </div>
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
              href="https://mindvestglobal.com"
              className="footer-parent-link"
            >
              A Mindvest Global Company
            </a>
          </div>

          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li>
                <Link href="/#services">Services</Link>
              </li>
              <li>
                <Link href="/#packages">Packages</Link>
              </li>
              <li>
                <Link href="/#markets">Who We Serve</Link>
              </li>
              <li>
                <Link href="/#process">Our Process</Link>
              </li>
              <li>
                <Link href="/#bridge">The Master Plan</Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-contact-item">
              <div className="footer-contact-label">Email</div>
              <div className="footer-contact-value">
                <a
                  href="mailto:hello@elevationstudio.ng"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  hello@elevationstudio.ng
                </a>
              </div>
            </div>
            <div className="footer-contact-item">
              <div className="footer-contact-label">Location</div>
              <div className="footer-contact-value">
                Sagamu, Ogun State · Nigeria
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
            Part of{" "}
            <a href="https://mindvestglobal.com">Mindvest Global Resources LLC</a>
          </div>
        </div>
      </footer>
    </>
  );
}
