"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

interface DivisionItem {
  num: string;
  title: string;
  flagship: boolean;
  tag: string;
  standardPrice?: string;
  discountedPrice: string;
  discountBadge?: string;
  image: string;
  ctaText: string;
  ctaHref: string;
}

const DIVISIONS: DivisionItem[] = [
  {
    num: "01",
    title: "Architectural Design",
    flagship: true,
    tag: "Bungalows · Duplexes · Plazas · Estates",
    standardPrice: "Standard: ₦750K ($565)",
    discountedPrice: "From ₦675K ($508)",
    discountBadge: "10% Disc. · Discussable",
    image: "/renders/modern_duplex_residence.jpg",
    ctaText: "Get Architecture Quote",
    ctaHref: "#build-project",
  },
  {
    num: "02",
    title: "Technical Coordination",
    flagship: false,
    tag: "Structural · MEP · Council Drawings",
    standardPrice: "Standard: ₦400K ($300)",
    discountedPrice: "From ₦360K ($270)",
    discountBadge: "10% Disc. · Discussable",
    image: "/renders/commercial_plaza_facade.jpg",
    ctaText: "Request Technical Drawings",
    ctaHref: "#build-project",
  },
  {
    num: "03",
    title: "3D Visualization",
    flagship: false,
    tag: "Photorealistic 3D · 4K Walkthroughs · Stills",
    standardPrice: "Standard: ₦250K ($190)",
    discountedPrice: "From ₦225K ($171)",
    discountBadge: "10% Disc. · Discussable",
    image: "/renders/modern_5bed_bungalow_evening.jpg",
    ctaText: "Outsource 3D Renders",
    ctaHref: "#build-project",
  },
];

export function FourDivisions() {
  return (
    <section id="divisions" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-22 bg-[#060608] text-white w-full">
      <div className="w-full max-w-[1560px] mx-auto">
        {/* Header with Big Bold Text (Seamless Line-Free) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 sm:pb-8 w-full">
          <div>
            <Reveal direction="down" delay={0.1}>
              <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-3">
                Our Core Practice Capabilities
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h2 className="font-syne text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase text-white leading-tight">
                Architectural Services. <br />
                <span className="text-[var(--gold)]">One Standard of Excellence.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal direction="left" delay={0.3}>
            <p className="font-sans text-xs sm:text-base text-white/75 max-w-md font-light leading-relaxed">
              Tailored architectural design, technical drawings, and 3D visualization. Choose only what your project needs.
            </p>
          </Reveal>
        </div>

        {/* 3 Clean Architectural Capability Cards Grid with 3D Tilt (Straight Corners, Line-Free) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">
          {DIVISIONS.map((div, idx) => (
            <Reveal key={div.num} direction="up" delay={0.1 * idx}>
              <TiltCard maxTilt={8} glare className="h-full">
                <div className="rounded-none bg-[#0b0c12] overflow-hidden flex flex-col justify-between group shadow-xl h-full">
                  {/* Image Preview */}
                  <div className="relative h-60 w-full overflow-hidden bg-black">
                    <Image
                      src={div.image}
                      alt={div.title}
                      fill
                      priority={idx === 0}
                      loading="eager"
                      className="object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-90"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c12] via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="font-mono text-[10px] text-black bg-[var(--gold)] font-bold px-2.5 py-1 rounded-none shadow-md">
                        DIV {div.num}
                      </span>
                      {div.flagship && (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-black bg-white font-black px-2 py-1 rounded-none shadow-md">
                          FLAGSHIP
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body & Instant Closing Action */}
                  <div className="p-6 flex flex-col justify-between flex-grow space-y-5">
                    <div>
                      <h3 className="font-syne text-xl font-bold uppercase text-white group-hover:text-[var(--gold)] transition-colors leading-tight mb-2">
                        {div.title}
                      </h3>
                      <span className="font-mono text-xs text-white/55 block">
                        {div.tag}
                      </span>
                    </div>

                    <div className="pt-2 flex flex-col gap-1 font-mono text-[11px]">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-white/45 uppercase text-[10px]">Baseline Fee:</span>
                        {div.standardPrice && (
                          <span className="text-white/40 line-through text-[10px]">
                            {div.standardPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[var(--gold)] font-bold text-xs">{div.discountedPrice}</span>
                        {div.discountBadge && (
                          <span className="text-[9px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 font-semibold">
                            {div.discountBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    <a
                      href={div.ctaHref}
                      className="w-full py-3.5 px-4 rounded-none bg-white/[0.04] hover:bg-[var(--gold)] text-white hover:text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md group-hover:shadow-[0_4px_20px_rgba(212,168,67,0.3)]"
                    >
                      <span>{div.ctaText}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Commercial Pricing Note */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 bg-white/[0.02] border border-white/5 text-center max-w-3xl mx-auto font-mono text-[11px] text-white/60 leading-relaxed">
          &ldquo;All prices are discussable. Enjoy up to 10% discount on applicable services. Final project fees are determined through consultation and agreement on project scope.&rdquo;
        </div>
      </div>
    </section>
  );
}
