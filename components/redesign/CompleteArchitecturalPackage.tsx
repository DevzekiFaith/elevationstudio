"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { TiltCard } from "@/components/TiltCard";
import { useCurrency } from "@/components/CurrencyContext";
import { CurrencyToggle } from "@/components/CurrencyToggle";

const CORE_DELIVERABLES = [
  {
    title: "Architectural Working Drawings",
    subtitle: "Floor plans, elevations, sections & schedules",
  },
  {
    title: "Structural Engineering Sets",
    subtitle: "Calculations, foundation & rebar detailing",
  },
  {
    title: "Full MEP Services",
    subtitle: "Mechanical, electrical, lighting & plumbing layouts",
  },
  {
    title: "4K Photorealistic Renders",
    subtitle: "Cinematic exterior, interior & walkthroughs",
  },
];

export function CompleteArchitecturalPackage() {
  const { currency, formatResidentialPrice } = useCurrency();
  const archPrice = formatResidentialPrice("architecture");

  const whatsappUrl =
    "https://wa.me/2349119059859?text=" +
    encodeURIComponent(
      `Hello Elevation Studio! I am ready to discuss the Complete Architectural Design Package (Starting from ${archPrice}) for my project.`
    );

  return (
    <section
      id="flagship"
      className="py-16 sm:py-24 md:py-32 px-3.5 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-[#08080c] text-white border-t border-white/5 relative overflow-hidden w-full"
    >
      {/* Subtle ambient orb */}
      <div className="ambient-orb ambient-orb-gold w-[600px] h-[600px] -top-32 -right-32 opacity-20 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Flagship Hero Card with 3D Physics */}
        <TiltCard maxTilt={4} glare className="w-full">
          <div className="rounded-none bg-[#0c0d14] border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-4 sm:p-8 md:p-12 lg:p-16 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left Column: Bold Offer */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                <Reveal direction="down" delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/80 font-mono text-xs uppercase tracking-widest font-semibold">
                    <span>✦</span> Flagship Package · Division 01
                  </div>
                </Reveal>

                {/* Monumental Bold Headline */}
                <Reveal direction="up" delay={0.2}>
                  <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05]">
                    Complete Architectural <br />
                    <span className="text-[var(--gold)]">Design Package</span>
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.25}>
                  <p className="font-sans text-sm sm:text-base md:text-lg text-white/85 font-normal leading-relaxed max-w-xl">
                    Contractor-ready working drawings and photorealistic 4K renders in one coordinated package.
                  </p>
                </Reveal>

                {/* Bold Starting Price Card */}
                <Reveal direction="up" delay={0.3}>
                  <div className="p-4 sm:p-6 rounded-none bg-black/60 border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5 shadow-[0_15px_40px_rgba(0,0,0,0.7)] w-full">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block font-bold mb-1">
                        Starting Baseline ({currency})
                      </span>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="font-syne text-3xl sm:text-5xl font-black text-[var(--gold)] tracking-tight">
                          {archPrice}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold)] font-mono text-[10px] tracking-wider uppercase font-semibold">
                          ✦ Open to Discussion
                        </span>
                        <span className="font-mono text-xs text-white/70 uppercase">
                          All 8 Disciplines
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-white/45 block mt-2 tracking-wide">
                        ✦ &lt; 1% of total build cost · Safeguards 100% of construction spend
                      </span>
                    </div>

                    <div className="shrink-0 sm:border-l sm:border-white/10 sm:pl-6 pt-3 sm:pt-0 border-t border-white/10 sm:border-t-0">
                      <div className="text-[10px] font-mono text-white/40 uppercase mb-1.5">Currency:</div>
                      <CurrencyToggle />
                    </div>
                  </div>
                </Reveal>

                {/* Core Deliverable Pillars (Bolder, fewer words) */}
                <Reveal direction="up" delay={0.35}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1 w-full">
                    {CORE_DELIVERABLES.map((item) => (
                      <div
                        key={item.title}
                        className="p-3.5 sm:p-4 rounded-none bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-emerald-400 font-bold text-sm">✓</span>
                          <span className="font-syne font-bold text-xs sm:text-sm text-white">
                            {item.title}
                          </span>
                        </div>
                        <p className="font-sans text-[11px] sm:text-xs text-white/60 font-light pl-5">
                          {item.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                {/* Direct High-Conversion Closing CTAs */}
                <Reveal direction="up" delay={0.4} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
                  <Magnetic strength={0.25} className="w-full sm:w-auto">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 sm:px-9 py-4 sm:py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_6px_30px_rgba(16,185,129,0.35)] hover:scale-105 cursor-pointer inline-flex"
                    >
                      <span>Claim Package on WhatsApp</span>
                      <span>→</span>
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.15} className="w-full sm:w-auto">
                    <a
                      href="#build-project"
                      className="w-full sm:w-auto px-6 sm:px-7 py-4 sm:py-4.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white font-syne font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center justify-center"
                    >
                      Configure Scope
                    </a>
                  </Magnetic>
                </Reveal>
              </div>

              {/* Right Column: Visual Preview */}
              <div className="lg:col-span-5">
                <div className="relative h-80 sm:h-[480px] rounded-none overflow-hidden border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
                  <Image
                    src="/renders/modern_5bed_bungalow_day.jpg"
                    alt="Complete Architecture Package"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider block mb-1">
                      Elevation Studio Flagship
                    </span>
                    <h4 className="font-syne text-lg font-bold text-white uppercase">
                      5-Bedroom Modern Villa
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
