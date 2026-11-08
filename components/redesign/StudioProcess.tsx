"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & Brief Alignment",
    tagline: "Understanding the Vision & Parameters",
    desc: "We analyze your site coordinates, plot dimensions, topographical orientation, functional room schedules, and target budget. Diaspora clients can submit land surveys and brief parameters completely remotely.",
  },
  {
    num: "02",
    title: "Spatial & Conceptual Strategy",
    tagline: "Translating Ideas into Architectural Form",
    desc: "We formulate preliminary zoning diagrams, volumetric massing, and functional circulation floor plans. We establish the architectural aesthetic—whether tropical contemporary, brutalist concrete, or classical elegance.",
  },
  {
    num: "03",
    title: "Concurrent Engineering Coordination",
    tagline: "Zero Conflict Multidisciplinary Detailing",
    desc: "Our architects, licensed structural engineers, and MEP specialists coordinate concurrently in BIM. Column spans match wall partitions, plumbing drops clear structural beams, and electrical conduits are mapped cleanly.",
  },
  {
    num: "04",
    title: "Photorealistic 3D & Walkthroughs",
    tagline: "Cinema-Grade Visualization Before Groundbreak",
    desc: "We simulate real-world sun angles, twilight illumination, materials, and landscaping. You experience the space through 4K renders and fluid animations—verifying every finish before purchasing a single bag of cement.",
  },
  {
    num: "05",
    title: "Final Technical Pack & Execution Sets",
    tagline: "Ready for Statutory Filing & Contractor Tender",
    desc: "Delivery of full working drawings, construction detailing, schedules, and structural calculations ready for town planning approval and transparent contractor procurement.",
  },
];

export function StudioProcess() {
  return (
    <section id="process" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#090a0f] text-white border-t border-white/5">
      <div className="w-full max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <Reveal direction="down" delay={0.1}>
            <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-3">
              06 · Methodical Execution
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Our 5-Stage Process. <br />
              <span className="text-[var(--gold)]">From Vision to Verified Drawings.</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-sm sm:text-base text-white/70 mt-4 leading-relaxed font-light">
              We replace guesswork with structured milestones, clear review checkpoints, and transparent communication.
            </p>
          </Reveal>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.num}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[var(--gold)]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-[var(--gold)] font-bold px-2 py-0.5 rounded bg-[var(--gold)]/10 border border-[var(--gold)]/30">
                    STAGE {step.num}
                  </span>
                  <span className="font-mono text-xs text-white/30">0{idx + 1} / 05</span>
                </div>

                <h3 className="font-syne text-base font-bold uppercase text-white mb-1.5 leading-snug">
                  {step.title}
                </h3>
                <h4 className="font-mono text-[10px] text-[var(--gold-bright)] uppercase tracking-wider mb-3">
                  {step.tagline}
                </h4>

                <p className="font-sans text-xs text-white/65 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/5 font-mono text-[10px] text-white/40 flex items-center gap-1.5">
                <span className="text-[var(--gold)]">✦</span>
                <span>Client Review Gate</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

