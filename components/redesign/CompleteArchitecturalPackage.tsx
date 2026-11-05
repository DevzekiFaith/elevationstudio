"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { TiltCard } from "@/components/TiltCard";
import { useCurrency } from "@/components/CurrencyContext";
import { CurrencyToggle } from "@/components/CurrencyToggle";

const DISCIPLINES = [
  "Architectural Design & Working Drawings",
  "Structural Engineering Calculations & Detailing",
  "Mechanical & HVAC Engineering Layouts",
  "Electrical & Lighting Conduits",
  "Plumbing & Building Drainage Services",
  "3D Photorealistic Exterior Renders",
  "3D Photorealistic Interior Living Salons",
  "4K Cinema Walkthrough Animation",
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
    <section id="flagship" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#090a0f] text-white border-t border-white/5 relative overflow-hidden">
      {/* Ambient background orb */}
      <div className="ambient-orb ambient-orb-gold w-[600px] h-[600px] -top-32 -right-32 opacity-25 pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Flagship Hero Card with 3D Physics */}
        <TiltCard maxTilt={5} glare className="w-full">
          <div className="rounded-none bg-[#0d0e16] border-2 border-[var(--gold)]/50 p-8 sm:p-14 lg:p-16 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden glow-card-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Offer Details */}
              <div className="lg:col-span-7 space-y-6">
                <Reveal direction="down" delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 text-[var(--gold)] font-mono text-xs uppercase tracking-widest font-bold">
                    Flagship Package · Division 01
                  </div>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                  <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
                    Complete Architectural <br />
                    <span className="text-[var(--gold)]">Design Package</span>
                  </h2>
                </Reveal>

                <Reveal direction="up" delay={0.3}>
                  <p className="font-sans text-base sm:text-lg text-white/80 font-light leading-relaxed">
                    One integrated fee. Coordinated by licensed architects and engineers. Zero site dimension clashes. Ready for municipal submission and construction tender.
                  </p>
                </Reveal>

                {/* Starting Investment Callout with Currency Toggle */}
                <Reveal direction="up" delay={0.35}>
                  <div className="p-5 rounded-none bg-black/60 border border-[var(--gold)]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block font-bold mb-1">
                        Starting Investment ({currency}) · Transparent Baseline:
                      </span>
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-syne text-3xl sm:text-4xl font-black text-[var(--gold)]">
                          {archPrice}
                        </span>
                        <span className="font-mono text-xs text-white/70">
                          Complete 8-Discipline Set
                        </span>
                      </div>
                      <span className="font-sans text-[11px] text-white/50 block mt-1">
                        Every project receives an itemised commercial quotation based on exact square metreage.
                      </span>
                    </div>

                    <div className="shrink-0">
                      <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Currency:</div>
                      <CurrencyToggle />
                    </div>
                  </div>
                </Reveal>

                {/* Clean Checklist */}
                <Reveal direction="up" delay={0.4}>
                  <div className="pt-2">
                    <span className="font-mono text-xs text-[var(--gold)] uppercase tracking-wider block font-bold mb-3">
                      8 Disciplines Included Automatically:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-white/90">
                      {DISCIPLINES.map((d) => (
                        <div key={d} className="flex items-center gap-2 p-2.5 rounded-none bg-white/[0.03] border border-white/5 hover:border-[var(--gold)]/30 transition-colors">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span className="truncate">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* Direct Easy-Closing Action with Magnetic Button */}
                <Reveal direction="up" delay={0.5} className="pt-4 flex flex-wrap items-center gap-4">
                  <Magnetic strength={0.25}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-9 py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_6px_30px_rgba(16,185,129,0.4)] hover:scale-105 cursor-pointer inline-flex"
                    >
                      <span>Claim Package on WhatsApp</span>
                      <span>→</span>
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.15}>
                    <a
                      href="#build-project"
                      className="px-7 py-4.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white font-syne font-semibold text-sm uppercase tracking-wider transition-colors cursor-pointer inline-flex"
                    >
                      Configure Custom Scope
                    </a>
                  </Magnetic>
                </Reveal>
              </div>

              {/* Right Column: Visual Preview */}
              <div className="lg:col-span-5">
                <div className="relative h-80 sm:h-96 rounded-none overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/renders/modern_5bed_bungalow_day.jpg"
                    alt="Complete Architecture Package"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 font-mono text-xs text-white/95 bg-black/80 backdrop-blur-md px-4 py-3 rounded-none border border-white/15">
                    <span className="text-[var(--gold)] font-bold">● Full Coordination:</span> Architectural, Structural, MEP & 4K Walkthrough Set.
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
