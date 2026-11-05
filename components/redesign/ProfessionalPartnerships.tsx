"use client";

import React from "react";
import Image from "next/image";

export function ProfessionalPartnerships() {
  const whatsappUrl =
    "https://wa.me/2349119059859?text=" +
    encodeURIComponent(
      "Hello Elevation Studio! I represent a firm/developer interested in discussing professional B2B partnership and outsourced 3D visualization."
    );

  return (
    <section id="partnerships" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#060608] text-white border-t border-white/5">
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative rounded-none overflow-hidden bg-gradient-to-br from-[#0e101b] via-[#090a10] to-[#060608] border border-[var(--gold)]/30 p-8 sm:p-14 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Partnership Proposal */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-widest text-[#00f2fe] font-bold">
                B2B Professional Alliance
              </div>

              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                Architect & Developer <br />
                <span className="text-[var(--gold)]">Partnership Program</span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-white/75 leading-relaxed font-light">
                Do you lead an architectural firm, construction company, or property development syndicate? Partner with Elevation Studio to scale your project throughput without ballooning your internal headcount.
              </p>

              {/* 3 Partnership Models */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-none bg-white/[0.02] border border-white/5">
                  <span className="text-xl mb-1 block">🎨</span>
                  <h4 className="font-syne text-xs font-bold uppercase text-white mb-1">
                    Outsourced 3D Visuals
                  </h4>
                  <p className="font-sans text-[11px] text-white/60 leading-normal">
                    Deliver breathtaking renders & animations under strict NDA.
                  </p>
                </div>

                <div className="p-4 rounded-none bg-white/[0.02] border border-white/5">
                  <span className="text-xl mb-1 block">📐</span>
                  <h4 className="font-syne text-xs font-bold uppercase text-white mb-1">
                    Engineering Detailing
                  </h4>
                  <p className="font-sans text-[11px] text-white/60 leading-normal">
                    Structural, MEP, and working drawing sets drafted to code.
                  </p>
                </div>

                <div className="p-4 rounded-none bg-white/[0.02] border border-white/5">
                  <span className="text-xl mb-1 block">🤝</span>
                  <h4 className="font-syne text-xs font-bold uppercase text-white mb-1">
                    Developer Retainers
                  </h4>
                  <p className="font-sans text-[11px] text-white/60 leading-normal">
                    Recurring monthly support for ongoing estate phases.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-lg bg-[var(--gold)] hover:bg-[#e0b753] text-black font-syne font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Discuss B2B Collaboration</span>
                  <span>→</span>
                </a>

                <a
                  href="/contact?intent=b2b-partnership"
                  className="px-6 py-3.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white font-syne font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Request Partnership Deck
                </a>
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-none overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/renders/luxury_terrace_duplex_estate.jpg"
                alt="B2B Developer Partnership Estate Rendering"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 font-mono text-xs text-white/90 bg-black/70 backdrop-blur-md p-3 rounded-none border border-white/10">
                <span className="text-[var(--gold)] font-bold">Proven Case:</span> Multi-unit terrace duplex estate rendered for off-plan presales.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
