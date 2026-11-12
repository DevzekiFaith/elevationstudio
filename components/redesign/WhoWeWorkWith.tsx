"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { DownloadIcon } from "@/components/icons/ArchitecturalIcons";

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
      className="py-16 sm:py-24 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-22 bg-[#07070a] text-white relative overflow-hidden w-full"
    >
      {/* Subtle ambient lighting */}
      <div className="ambient-orb ambient-orb-bridge w-[500px] h-[500px] -top-24 -right-24 opacity-15 pointer-events-none" />

      <div className="w-full max-w-[1560px] mx-auto relative z-10">
        {/* Minimal Section Header (Centered across all screen sizes) */}
        <div className="w-full max-w-xl mx-auto mb-10 sm:mb-14 flex flex-col items-center justify-center text-center">
          <Reveal direction="down" delay={0.1} className="w-full flex justify-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/[0.04] font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-3 mx-auto">
              <span>✦</span> Client Portals
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2} className="w-full flex justify-center text-center">
            <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase text-white leading-tight text-center mx-auto w-full">
              B2C <span className="text-white/30">&</span> <span className="text-[var(--gold)]">B2B</span>
            </h2>
          </Reveal>
        </div>

        {/* 2 Clean, Spacious Cards (Straight Corners, Seamless Line-Free) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
          {/* Card 1: B2C */}
          <Reveal direction="up" delay={0.2}>
            <TiltCard maxTilt={5} glare className="h-full w-full">
              <div className="p-5 sm:p-8 md:p-10 rounded-none bg-[#0c0d12] transition-all duration-300 h-full flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.98)] group w-full">
                <div>
                  <div className="flex flex-col gap-1 mb-5 pb-3 border-b border-white/5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 font-bold px-2.5 py-0.5 bg-white/[0.06] rounded-none">
                        B2C · Private &amp; Diaspora
                      </span>
                      <span className="font-mono text-[10px] text-white/40 line-through">
                        Standard: ₦750K ($565)
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="font-mono text-xs text-[var(--gold)] font-bold">
                        From ₦675K ($508)
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 font-mono font-semibold">
                        10% Disc. · Discussable
                      </span>
                    </div>
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3 group-hover:text-[var(--gold)] transition-colors leading-tight">
                    Private Residences <br />& Diaspora Builds
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8">
                    Contractor-ready working drawings, 4K renders, and 100% remote build oversight for homeowners across Nigeria and abroad.
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href={b2cWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-none bg-emerald-500 hover:bg-emerald-400 text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Discuss Private Home on WhatsApp</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Card 2: B2B */}
          <Reveal direction="up" delay={0.3}>
            <TiltCard maxTilt={5} glare className="h-full w-full">
              <div className="p-5 sm:p-8 md:p-10 rounded-none bg-[#0c0d12] transition-all duration-300 h-full flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.98)] group w-full">
                <div>
                  <div className="flex flex-col gap-1 mb-5 pb-3 border-b border-white/5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold px-2.5 py-0.5 bg-[var(--gold)]/10 rounded-none">
                        B2B · Developers &amp; Studios
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400 font-semibold uppercase">
                        Discussable
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="font-mono text-xs text-white/80 font-bold">
                        Retainers &amp; Phased SLAs
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[var(--gold)] bg-[var(--gold)]/10 px-2 py-0.5 font-mono font-semibold">
                        Discuss Your Project
                      </span>
                    </div>
                  </div>

                  <h3 className="font-syne text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3 group-hover:text-[var(--gold)] transition-colors leading-tight">
                    Estate Terraces <br />& Studio Outsourcing
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8">
                    Cinematic 4K sales animations and confidential 3D/MEP detailing drafted to code under strict NDA for developers and architecture firms.
                  </p>
                </div>

                <div className="pt-4 flex flex-col items-center gap-3">
                  <a
                    href={b2bWhatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 rounded-none bg-white hover:bg-[var(--gold)] text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2"
                  >
                    <span>Discuss Developer Partnership</span>
                    <span>→</span>
                  </a>

                  <a
                    href="/docs/elevation-studio-b2b-capabilities.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Elevation-Studio-B2B-Capabilities.pdf"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-white/50 hover:text-[var(--gold)] transition-colors py-1 group"
                  >
                    <DownloadIcon className="w-3.5 h-3.5 text-[var(--gold)] group-hover:translate-y-0.5 transition-transform" />
                    <span>Download 1-Page Capabilities Deck (PDF)</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>

        {/* Commercial Pricing Note */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 bg-white/[0.02] border border-white/5 text-center max-w-2xl mx-auto font-mono text-[11px] text-white/60 leading-relaxed">
          &ldquo;All prices are discussable. Enjoy up to 10% discount on applicable services. Final project fees are determined through consultation and agreement on project scope.&rdquo;
        </div>
      </div>
    </section>
  );
}
