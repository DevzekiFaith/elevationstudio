"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

export function FinalCTASection() {
  const whatsappUrl =
    "https://wa.me/2349119059859?text=" +
    encodeURIComponent(
      "Hello Elevation Studio! I am ready to start my project consultation."
    );

  return (
    <section className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#060608] text-white border-t border-white/10 text-center relative overflow-hidden flex flex-col items-center justify-center">
      {/* Ambient background glow */}
      <div className="ambient-orb ambient-orb-gold w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto space-y-8 relative z-10 flex flex-col items-center text-center">
        <Reveal direction="down" delay={0.1} className="w-full flex justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[var(--gold)]/40 text-[var(--gold)] font-mono text-xs uppercase tracking-widest font-bold mx-auto">
            ✦ Ready to Start?
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2} className="w-full flex justify-center text-center">
          <h2 className="font-syne text-5xl sm:text-7xl md:text-8xl font-extrabold uppercase tracking-tight text-white leading-tight text-center mx-auto">
            Let’s Build <br />
            <span className="text-[var(--gold)]">Your Space.</span>
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.3} className="w-full flex justify-center text-center">
          <p className="font-sans text-lg sm:text-xl text-white/75 max-w-2xl mx-auto font-light leading-relaxed text-center">
            Bespoke architectural drawings, 3D animations, and turnkey engineering coordination.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.4} className="pt-6 flex flex-wrap items-center justify-center gap-5 w-full">
          <Magnetic strength={0.25}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-sm sm:text-base uppercase tracking-wider transition-all flex items-center gap-3 shadow-[0_6px_35px_rgba(16,185,129,0.45)] hover:scale-105 cursor-pointer inline-flex"
            >
              <span>Chat on WhatsApp (Direct)</span>
              <span className="text-lg">➔</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href="#build-project"
              className="px-9 py-5 rounded-2xl bg-[var(--gold)] hover:bg-[#e0b753] text-black font-syne font-bold text-sm sm:text-base uppercase tracking-wider transition-all hover:scale-105 shadow-[0_4px_25px_rgba(212,168,67,0.35)] cursor-pointer inline-flex"
            >
              Configure Scope
            </a>
          </Magnetic>

          <Magnetic strength={0.15}>
            <a
              href="/contact"
              className="px-8 py-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 text-white font-syne font-semibold text-sm sm:text-base uppercase tracking-wider transition-colors cursor-pointer inline-flex"
            >
              Submit Brief
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}