"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

const PRIMARY_SERVICES = [
  { id: "arch-complete", title: "Complete Architecture Package", div: "Division 01 · Flagship Multidisciplinary", starting: "From ₦1.5M ($1,130)" },
  { id: "3d-visuals", title: "Standalone 3D Visualization", div: "Division 02 · 4K Cinema Renders", starting: "From ₦500K ($375)" },
  { id: "branding-digital", title: "Branding & Digital Platforms", div: "Division 03 · Next.js Web Portals", starting: "From ₦600K ($450)" },
  { id: "workforce-dev", title: "Corporate Workforce Training", div: "Division 04 · Mindvest Global Alliance", starting: "Tailored Proposal" },
];

const PROJECT_TYPES = [
  { id: "duplex", label: "Duplex / Luxury Residence" },
  { id: "bungalow", label: "Bungalow Villa" },
  { id: "commercial", label: "Commercial Plaza / Office" },
  { id: "religious", label: "Church Auditorium" },
  { id: "estate", label: "Estate Masterplan" },
  { id: "hospitality", label: "Hotel / Event Pavilion" },
];

export function BuildYourProject() {
  const [service, setService] = useState<string>("arch-complete");
  const [projectType, setProjectType] = useState<string>("duplex");

  const currentService = PRIMARY_SERVICES.find((s) => s.id === service) || PRIMARY_SERVICES[0];
  const currentType = PROJECT_TYPES.find((p) => p.id === projectType) || PROJECT_TYPES[0];

  const briefText = `Hello Elevation Studio! I would like to get a quotation:
- Service: ${currentService.title} (${currentService.div})
- Project Category: ${currentType.label}
Please let me know your consultation schedule and quote.`;

  const whatsappLink = `https://wa.me/2349119059859?text=${encodeURIComponent(briefText)}`;

  return (
    <section id="build-project" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-16 xl:px-20 bg-[#060608] text-white">
      <div className="w-full max-w-[var(--container-max)] mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="down" delay={0.1}>
            <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-3">
              Build Your Project Scope
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
              Choose What You Need. <br />
              <span className="text-[var(--gold)]">Close in 2 Clicks.</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-base text-white/70 mt-4 font-light">
              Select your service, choose your project type, and tap to submit directly on WhatsApp.
            </p>
          </Reveal>
        </div>

        {/* 2-Step Fast Scope Card */}
        <div className="rounded-none bg-[#0b0c12] border border-white/10 p-8 sm:p-14 shadow-2xl space-y-10 glow-card-border">
          {/* Step 1: Service */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--gold)] font-bold block mb-4">
              1. Select Service Division:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PRIMARY_SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setService(s.id)}
                  className={`p-5 rounded-none text-left border transition-all cursor-pointer ${
                    service === s.id
                      ? "bg-[var(--gold)]/15 border-[var(--gold)] text-white shadow-[0_4px_25px_rgba(212,168,67,0.25)] scale-[1.02]"
                      : "bg-white/[0.02] border-white/5 text-white/70 hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="font-syne text-base font-bold block mb-1">{s.title}</span>
                  <div className="flex items-center justify-between text-[10px] font-mono mt-2 pt-2 border-t border-white/5">
                    <span className="text-[var(--gold)] uppercase">{s.div.split("·")[0]}</span>
                    <span className="text-white/60 font-semibold">{s.starting}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Project Type */}
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--gold)] font-bold block mb-4">
              2. Choose Project Category:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {PROJECT_TYPES.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  className={`py-4 px-4 rounded-none text-center font-syne text-xs font-semibold border transition-all cursor-pointer ${
                    projectType === pt.id
                      ? "bg-white text-black border-white font-bold scale-[1.03] shadow-lg"
                      : "bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/[0.05]"
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Big Instant Closing CTA Box with Magnetic Button */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 bg-black/50 p-7 rounded-none border border-[var(--gold)]/40 shadow-inner">
            <div className="text-center md:text-left">
              <span className="font-mono text-[10px] uppercase text-[var(--gold)] font-bold block">
                Selected Scope:
              </span>
              <span className="font-syne text-lg font-bold text-white block mt-0.5">
                {currentService.title} · {currentType.label}
              </span>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 font-mono text-xs">
                <span className="text-[var(--gold)] font-bold">
                  Baseline Investment: {currentService.starting}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-white/60">
                  Itemised Commercial Quotation upon site brief
                </span>
              </div>
            </div>

            <Magnetic strength={0.25}>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-9 py-4.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-sm uppercase tracking-wider transition-all shadow-[0_4px_30px_rgba(16,185,129,0.45)] hover:scale-105 flex items-center justify-center gap-2.5 cursor-pointer inline-flex"
              >
                <span>CLAIM SCOPE ON WHATSAPP</span>
                <span className="text-base">➔</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
