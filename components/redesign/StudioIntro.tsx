"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";

export function StudioIntro() {
  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#090a0f] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Top Tag & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <Reveal direction="down" delay={0.1}>
              <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-3">
                02 · About The Studio
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white max-w-2xl">
                One Studio. Multiple Capabilities. Built Around What You Need.
              </h2>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.3} className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
              We eliminate the friction of fragmented project procurement. Elevation Studio unites spatial design, structural engineering, photorealistic 3D visualization, digital systems, and organizational training under one coordinated roof.
            </p>
          </Reveal>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal direction="up" delay={0.1}>
            <div className="p-8 rounded-none bg-white/[0.02] border border-white/10 hover:border-[var(--gold)]/40 transition-all h-full flex flex-col justify-between group">
              <div>
                <span className="font-mono text-xs text-[var(--gold)] tracking-widest font-bold block mb-4">
                  01 · COORDINATED COHESION
                </span>
                <h3 className="font-syne text-xl font-bold uppercase text-white mb-3">
                  No Conflicting Drawings
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/65 leading-relaxed">
                  Traditional development forces you to independently hire an architect, structural engineer, and MEP technician—frequently resulting in dimensional clashes and costly site delays. We coordinate every line in-house before construction begins.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-white/40">
                Architectural + Structural + MEP Alignment
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="p-8 rounded-none bg-white/[0.02] border border-white/10 hover:border-[var(--gold)]/40 transition-all h-full flex flex-col justify-between group">
              <div>
                <span className="font-mono text-xs text-[var(--gold)] tracking-widest font-bold block mb-4">
                  02 · MODULAR FLEXIBILITY
                </span>
                <h3 className="font-syne text-xl font-bold uppercase text-white mb-3">
                  Never Forced to Bundle
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/65 leading-relaxed">
                  Have an architect already and just need high-end 3D visualization? Or need a corporate digital platform without physical construction? We support your exact requirement without demanding unnecessary service lock-ins.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-white/40">
                Standalone & Integrated Service Models
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="p-8 rounded-none bg-white/[0.02] border border-white/10 hover:border-[var(--gold)]/40 transition-all h-full flex flex-col justify-between group">
              <div>
                <span className="font-mono text-xs text-[var(--gold)] tracking-widest font-bold block mb-4">
                  03 · COMMERCIAL VELOCITY
                </span>
                <h3 className="font-syne text-xl font-bold uppercase text-white mb-3">
                  Designed for Return on Capital
                </h3>
                <p className="font-sans text-xs sm:text-sm text-white/65 leading-relaxed">
                  Whether selling luxury terrace duplexes off-plan in Lekki or launching a commercial hospitality resort, our 3D animations and brand storytelling drive pre-sales and secure investor backing well ahead of ground-breaking.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[11px] text-white/40">
                Diaspora Confidence & Developer Presales
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

