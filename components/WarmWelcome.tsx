"use client";

import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

interface GuaranteeItem {
  num: string;
  title: string;
  subtitle: string;
  desc: string;
}

const GUARANTEES: GuaranteeItem[] = [
  {
    num: "01",
    title: "Continuous Client Care",
    subtitle: "Direct Access & Daily Snapshots",
    desc: "No corporate layers or unresponsive threads. You have direct channels to the principal, daily work-in-progress snapshots, and a team that values your voice at every iteration."
  },
  {
    num: "02",
    title: "Diaspora Peace of Mind",
    subtitle: "100% Remote Transparency",
    desc: "Scale your venture in Nigeria with zero oversight stress. We provide international execution benchmarks, remote video briefs, and secure corporate milestone banking."
  },
  {
    num: "03",
    title: "Operational Support",
    subtitle: "Lifetime Partnership Scaling",
    desc: "We don't vanish at handover. We stay by your side to support organizational culture changes, digital systems training, and future spatial or brand expansions."
  }
];

export function WarmWelcome() {
  return (
    <section className="warm-welcome relative overflow-hidden" id="welcome" data-bg="light">
      {/* Soft Ambient Gold Glows */}
      <div className="absolute right-0 top-1/4 pointer-events-none">
        <div className="ambient-orb ambient-orb-gold w-[350px] h-[350px] opacity-10" />
      </div>
      <div className="absolute left-[-50px] bottom-1/4 pointer-events-none">
        <div className="ambient-orb ambient-orb-bridge w-[300px] h-[300px] opacity-10" />
      </div>

      <div className="welcome-inner">
        <div className="welcome-top flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-[650px]">
            <Reveal direction="down" delay={0.1}>
              <div className="section-tag" style={{ background: "rgba(212, 168, 67, 0.08)", color: "var(--gold)" }}>
                Our Core Philosophy
              </div>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h2 className="welcome-headline">
                WE DESIGN FOR
                <br />
                <span className="gold">HUMAN HAPPINESS</span>
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.3}>
              <p className="welcome-sub-italic">
                90% customer care and partnership success. 10% structural concrete, code, and lines.
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.4} className="max-w-[540px] pt-4">
            <div className="welcome-statement-box">
              <p className="welcome-text">
                Brands, codebases, and physical rooms are merely the physical outcomes. Our true craft is **your peace of mind**. 
              </p>
              <p className="welcome-text" style={{ marginTop: "16px" }}>
                At Elevation Studio, we believe building a business should be an exciting, supportive journey. We have structured our entire workflow to prioritize human communication, trust, and ultimate client satisfaction over everything.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="section-divider" style={{ opacity: 0.1, marginBottom: "60px" }} />

        {/* Guarantees Grid */}
        <div className="welcome-grid">
          {GUARANTEES.map((g, index) => (
            <Reveal key={g.num} direction="up" delay={0.1 * index}>
              <TiltCard glare maxTilt={5} className="h-full">
                <div className="welcome-card h-full glow-card-border">
                  <div className="welcome-card-header flex justify-between items-center mb-6">
                    <div className="welcome-card-num">{g.num}</div>
                    <div className="welcome-card-heart">✦</div>
                  </div>
                  <h4 className="welcome-card-title">{g.title}</h4>
                  <div className="welcome-card-subtitle">{g.subtitle}</div>
                  <p className="welcome-card-desc">{g.desc}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
