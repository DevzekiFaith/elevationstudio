"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { CubeSpatialIcon, DraftingIcon, HandshakeIcon } from "@/components/icons/ArchitecturalIcons";

export function ProfessionalPartnerships() {
  const whatsappUrl =
    "https://wa.me/2349119059859?text=" +
    encodeURIComponent(
      "Hello Elevation Studio! I represent a firm/developer interested in discussing professional B2B partnership and outsourced 3D visualization."
    );

  const capabilities = [
    {
      icon: <CubeSpatialIcon className="w-6 h-6 text-[var(--gold)]" />,
      title: "Outsourced 3D Visuals",
      desc: "Cinema 4K renders & walkthroughs under strict mutual NDA.",
    },
    {
      icon: <DraftingIcon className="w-6 h-6 text-[var(--gold)]" />,
      title: "Engineering Detailing",
      desc: "Structural, MEP, and working drawings drafted to code.",
    },
    {
      icon: <HandshakeIcon className="w-6 h-6 text-[var(--gold)]" />,
      title: "Developer Retainers",
      desc: "Dedicated monthly throughput for phased estate developments.",
    },
  ];

  return (
    <section id="partnerships" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-22 bg-[#060608] text-white w-full">
      <div className="w-full max-w-[1560px] mx-auto">
        <div className="relative rounded-none overflow-hidden bg-gradient-to-br from-[#0c0d14] via-[#08090e] to-[#040406] p-4 sm:p-8 md:p-14 lg:p-16 shadow-[0_25px_80px_rgba(0,0,0,0.95)] w-full">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Partnership Proposal */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal direction="down" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-white/[0.04] font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold">
                  <span>✦</span> B2B Professional Alliance
                </div>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  Architect & Developer <br />
                  <span className="text-[var(--gold)]">Partnership Program</span>
                </h2>
              </Reveal>

              <Reveal direction="up" delay={0.3}>
                <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light max-w-xl">
                  Scale your firm’s output without adding overhead. Coordinated architectural documentation and photorealistic 3D visualization delivered under strict NDA.
                </p>
              </Reveal>

              {/* 3 Kinetic Cards with Soft Shadow and No Coloured Border */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {capabilities.map((c, idx) => (
                  <Reveal key={c.title} direction="up" delay={0.35 + idx * 0.1}>
                    <TiltCard maxTilt={6} glare className="h-full">
                      <div className="p-5 rounded-none bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 h-full flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                        <div>
                          <div className="w-10 h-10 rounded-none bg-white/[0.04] flex items-center justify-center mb-3">
                            {c.icon}
                          </div>
                          <h4 className="font-syne text-xs font-bold uppercase text-white mb-1.5 tracking-wide">
                            {c.title}
                          </h4>
                          <p className="font-sans text-xs text-white/60 leading-relaxed">
                            {c.desc}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </Reveal>
                ))}
              </div>

              {/* CTAs */}
              <Reveal direction="up" delay={0.5} className="pt-4 flex flex-wrap items-center gap-4">
                <Magnetic strength={0.2}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-none bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-xs uppercase tracking-wider transition-all shadow-[0_6px_30px_rgba(16,185,129,0.35)] hover:scale-105 flex items-center gap-2 cursor-pointer inline-flex"
                  >
                    <span>Discuss B2B Collaboration</span>
                    <span>→</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.15}>
                  <a
                    href="/contact?intent=b2b-partnership"
                    className="px-7 py-4 rounded-none bg-white/[0.04] hover:bg-white/[0.08] text-white font-syne font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer inline-flex"
                  >
                    Request Partnership Deck
                  </a>
                </Magnetic>
              </Reveal>
            </div>

            {/* Right Column: Visual Showcase with 3D Tilt */}
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.3}>
                <TiltCard maxTilt={6} glare className="w-full">
                  <div className="relative h-80 sm:h-96 rounded-none overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                    <Image
                      src="/renders/luxury_terrace_duplex_estate.jpg"
                      alt="B2B Developer Partnership Estate Rendering"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 font-mono text-xs text-white/90 bg-black/80 backdrop-blur-md p-3.5 rounded-none shadow-lg">
                      <span className="text-[var(--gold)] font-bold">Proven Case:</span> Multi-unit terrace estate rendered for off-plan investor presales.
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
