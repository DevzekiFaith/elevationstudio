"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const CLIENTS = [
  {
    role: "Private Homeowners",
    sub: "Bungalows & Luxury Duplexes",
    benefit: "100% remote diaspora transparency, 3D renders before digging, and verified working drawings.",
    cta: "Build Private Home →",
    href: "#build-project",
  },
  {
    role: "Property Developers",
    sub: "Estates & Terrace Duplexes",
    benefit: "Photorealistic 4K animations that drive off-plan presales and investor backing.",
    cta: "Developer Inquiries →",
    href: "#build-project",
  },
  {
    role: "Architects & Contractors",
    sub: "Outsourced 3D & Engineering",
    benefit: "White-label 3D rendering, walkthrough animations, and MEP detailing under strict NDA.",
    cta: "Outsource With Us →",
    href: "#build-project",
  },
  {
    role: "Churches & Institutions",
    sub: "Auditoriums & Schools",
    benefit: "Large-span auditorium acoustics, campus masterplanning, and workforce training.",
    cta: "Institutional Brief →",
    href: "#build-project",
  },
];

export function WhoWeWorkWith() {
  return (
    <section id="solutions" className="py-24 sm:py-32 px-4 sm:px-8 lg:px-16 xl:px-20 bg-[#090a0f] text-white border-t border-white/5">
      <div className="w-full max-w-[var(--container-max)] mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="down" delay={0.1}>
            <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-3">
              Who We Work With
            </span>
          </Reveal>
          <Reveal direction="up" delay={0.2}>
            <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase text-white leading-tight">
              Tailored Solutions. <br />
              <span className="text-[var(--gold)]">Direct Results.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLIENTS.map((c, idx) => (
            <Reveal key={c.role} direction="up" delay={0.1 * idx}>
              <TiltCard maxTilt={8} glare className="h-full">
                <div className="p-7 rounded-none bg-white/[0.02] border border-white/10 hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between group shadow-xl h-full glow-card-border">
                  <div>
                    <h3 className="font-syne text-xl font-bold uppercase text-white mb-1.5">
                      {c.role}
                    </h3>
                    <span className="font-mono text-xs text-[var(--gold)] uppercase block mb-4">
                      {c.sub}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-8">
                      {c.benefit}
                    </p>
                  </div>

                  <a
                    href={c.href}
                    className="w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-[var(--gold)] text-white hover:text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all cursor-pointer shadow-md group-hover:shadow-[0_4px_20px_rgba(212,168,67,0.3)]"
                  >
                    {c.cta}
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
