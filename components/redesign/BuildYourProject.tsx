"use client";

import React, { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";

const SERVICES = [
  {
    id: "arch",
    name: "Complete Architecture",
    price: "From ₦1.5M ($1,130)",
    tag: "Drawings + Renders + Engineering",
  },
  {
    id: "3d",
    name: "3D Visualization",
    price: "From ₦500K ($375)",
    tag: "Cinema 4K Still Renders & Video",
  },
  {
    id: "brand",
    name: "Branding & Web",
    price: "From ₦600K ($450)",
    tag: "Brand Identity & Next.js Website",
  },
  {
    id: "train",
    name: "Corporate Training",
    price: "Tailored Scope",
    tag: "Mindvest Workforce Alliance",
  },
];

const TYPOLOGIES = [
  "Duplex / Luxury Residence",
  "Bungalow Villa",
  "Commercial Plaza",
  "Church Auditorium",
  "Estate Masterplan",
];

export function BuildYourProject() {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedTypology, setSelectedTypology] = useState(TYPOLOGIES[0]);

  const whatsappMessage = `Hello Elevation Studio! I would like to get a quote:
- Service: ${selectedService.name} (${selectedService.price})
- Project Typology: ${selectedTypology}
Please let me know your availability for a consultation.`;

  const whatsappUrl = `https://wa.me/2349119059859?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section
      id="build-project"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 xl:px-20 bg-[#060608] text-white border-t border-white/5 relative"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <Reveal direction="down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-3">
              <span>✦</span> Instant Scope Estimator
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
              Tailor Your <span className="text-[var(--gold)]">Scope</span>
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-xs sm:text-sm text-white/60 font-light mt-2">
              Select your discipline and project typology to claim a direct consultation on WhatsApp.
            </p>
          </Reveal>
        </div>

        {/* Spacious, Elegant Estimator Container */}
        <div className="rounded-none bg-[#0a0a0f] border border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
          {/* Step 1: Service Tiles */}
          <div className="mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 block mb-4">
              01 · Select Discipline
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {SERVICES.map((s) => {
                const isSelected = selectedService.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedService(s)}
                    className={`p-5 rounded-none text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.2)] font-bold scale-[1.02]"
                        : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-white"
                    }`}
                  >
                    <span className="font-syne text-sm sm:text-base font-bold block mb-1">
                      {s.name}
                    </span>
                    <span
                      className={`font-mono text-xs block mb-2 ${
                        isSelected ? "text-neutral-800 font-bold" : "text-[var(--gold)]"
                      }`}
                    >
                      {s.price}
                    </span>
                    <span
                      className={`font-sans text-[11px] block leading-tight ${
                        isSelected ? "text-neutral-700" : "text-white/50"
                      }`}
                    >
                      {s.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Typology Pills */}
          <div className="mb-10">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/50 block mb-4">
              02 · Project Typology
            </span>
            <div className="flex flex-wrap gap-2.5">
              {TYPOLOGIES.map((typ) => {
                const isSelected = selectedTypology === typ;
                return (
                  <button
                    key={typ}
                    type="button"
                    onClick={() => setSelectedTypology(typ)}
                    className={`px-5 py-2.5 rounded-full font-syne text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-white text-black font-bold shadow-md"
                        : "bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white/70 hover:text-white"
                    }`}
                  >
                    {typ}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant Closing Summary Bar */}
          <div className="p-6 sm:p-7 rounded-none bg-black/60 border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-1">
                Selected Scope & Baseline
              </span>
              <div className="font-syne text-lg sm:text-xl font-bold text-white">
                {selectedService.name} · <span className="text-[var(--gold)]">{selectedTypology}</span>
              </div>
              <div className="font-mono text-xs text-white/60 mt-1">
                Baseline Investment: <span className="text-white font-semibold">{selectedService.price}</span>
              </div>
            </div>

            <Magnetic strength={0.2}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-syne font-black text-xs uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:scale-105 flex items-center justify-center gap-2 cursor-pointer inline-flex shrink-0"
              >
                <span>Claim Scope on WhatsApp</span>
                <span>→</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
