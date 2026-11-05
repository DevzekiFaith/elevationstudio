"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

export function WhoWeWorkWith() {
  const b2cWhatsapp =
    "https://wa.me/2349119059859?text=" +
    encodeURIComponent(
      "Hello Elevation Studio! I am a private/diaspora homeowner interested in architectural design and 3D renders for my property."
    );

  const b2bWhatsapp =
    "https://wa.me/2349119059859?text=" +
    encodeURIComponent(
      "Hello Elevation Studio! I am a property developer/firm interested in B2B retainers and outsourced 3D visualization."
    );

  return (
    <section
      id="solutions"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#07070a] text-white border-t border-white/5"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Minimal Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-3">
              <span>✦</span> Client Pathways
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
              B2C <span className="text-white/40">&</span> <span className="text-[var(--gold)]">B2B</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-2">
              Choose your profile for direct access to pricing and immediate consultation.
            </p>
          </Reveal>
        </div>

        {/* 2 Clear, High-Contrast Pathways (No Tab Switching, No Clutter) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Pathway 1: B2C Private & Diaspora Homeowners */}
          <Reveal direction="up" delay={0.2}>
            <TiltCard maxTilt={5} glare className="h-full">
              <div className="p-8 sm:p-10 rounded-none bg-[#0c0d12] border border-white/[0.08] hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.98)] group">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 font-bold px-2.5 py-1 bg-white/[0.06]">
                      B2C · Private Clients & Diaspora
                    </span>
                    <span className="font-mono text-xs text-[var(--gold)] font-bold">
                      From ₦1.5M ($1,130)
                    </span>
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3 group-hover:text-[var(--gold)] transition-colors leading-tight">
                    Private Residences <br />& Diaspora Builds
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8">
                    Complete working drawings, 4K renders, and 100% remote transparency for private homes, luxury duplexes, and diaspora property owners before breaking ground.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/[0.06]">
                  <a
                    href={b2cWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Discuss Private Home</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#build-project"
                    className="py-3.5 px-6 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-syne font-semibold text-xs uppercase tracking-wider text-center transition-all"
                  >
                    Calculate Scope
                  </a>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Pathway 2: B2B Developers & Architecture Firms */}
          <Reveal direction="up" delay={0.3}>
            <TiltCard maxTilt={5} glare className="h-full">
              <div className="p-8 sm:p-10 rounded-none bg-[#0c0d12] border border-white/[0.08] hover:border-white/20 transition-all duration-300 h-full flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.98)] group">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold px-2.5 py-1 bg-[var(--gold)]/10">
                      B2B · Developers & Studios
                    </span>
                    <span className="font-mono text-xs text-white/70 font-bold">
                      Retainers & Phased SLA
                    </span>
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3 group-hover:text-[var(--gold)] transition-colors leading-tight">
                    Estate Terraces <br />& Studio Outsourcing
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8">
                    Cinematic 4K marketing animations that sell out off-plan phases, plus confidential white-label 3D rendering and structural/MEP detailing drafted to code under strict NDA.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/[0.06]">
                  <a
                    href={b2bWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-full bg-white hover:bg-[var(--gold)] text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
                  >
                    <span>Developer Partnership</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#partnerships"
                    className="py-3.5 px-6 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-syne font-semibold text-xs uppercase tracking-wider text-center transition-all"
                  >
                    View Alliance
                  </a>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
