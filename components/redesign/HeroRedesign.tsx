"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { ParallaxLayer } from "@/components/ParallaxLayer";

export function HeroRedesign() {
  const whatsappUrl =
    "https://wa.me/2349119059859?text=" +
    encodeURIComponent(
      "Hello Elevation Studio! I want to discuss a project with your team."
    );

  return (
    <section className="hero relative min-h-[95vh] flex flex-col justify-between pt-28 sm:pt-36 pb-16 px-4 sm:px-8 lg:px-16 xl:px-20 overflow-hidden bg-[#060608] text-white" data-bg="dark">
      {/* Background Parallax Depth & Ambient Orbs */}
      <ParallaxLayer speed={-0.3} className="absolute inset-0 pointer-events-none">
        <div className="hero-bg" />
        <div className="hero-grid opacity-70" />
        <div className="ambient-orb ambient-orb-gold w-[650px] h-[650px] -top-28 -right-28 opacity-40" />
        <div className="ambient-orb ambient-orb-bridge w-[550px] h-[550px] bottom-0 -left-20 opacity-30" />
      </ParallaxLayer>

      {/* Cinematic Architectural Render Image Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/renders/modern_5bed_alternative_materials.jpg"
          alt="Elevation Studio Architecture"
          fill
          priority
          className="object-cover object-center opacity-35 filter brightness-85 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/90 via-transparent to-[#060608]/60" />
      </div>

      {/* Continuous Dynamic Ticker Ribbon */}
      <div className="hero-ticker relative z-10 w-full mb-8">
        <div className="ticker-inner">
          <div className="ticker-item"><span>◆</span> Architecture & Spatial Design</div>
          <div className="ticker-item"><span>◆</span> Engineering Coordination</div>
          <div className="ticker-item"><span>◆</span> 3D Visualization & 4K Animation</div>
          <div className="ticker-item"><span>◆</span> Digital Platforms</div>
          <div className="ticker-item"><span>◆</span> Workforce Development</div>
          <div className="ticker-item"><span>◆</span> Ogun — Lagos Corridor & Diaspora</div>
          <div className="ticker-item"><span>◆</span> Architecture & Spatial Design</div>
          <div className="ticker-item"><span>◆</span> Engineering Coordination</div>
          <div className="ticker-item"><span>◆</span> 3D Visualization & 4K Animation</div>
          <div className="ticker-item"><span>◆</span> Digital Platforms</div>
        </div>
      </div>

      {/* Main Expansive Hero Body */}
      <div className="relative z-10 w-full max-w-[var(--container-max)] mx-auto flex-grow flex flex-col justify-center">
        {/* Label Tag */}
        <Reveal direction="down" delay={0.1}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-[var(--gold)]/40 backdrop-blur-md mb-6 shadow-lg shadow-[var(--gold)]/10">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[3px] text-[#f2cb5d] font-bold">
              Elevation Studio · Est. 2012
            </span>
          </div>
        </Reveal>

        {/* Big Bold Architectural Headline */}
        <Reveal direction="up" delay={0.2}>
          <h1 className="font-syne text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-extrabold uppercase leading-[0.92] tracking-tight text-white">
            We design spaces. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-bright)] via-[var(--gold)] to-[#f4b638]">
              build digital platforms.
            </span> <br />
            develop capabilities.
          </h1>
        </Reveal>

        {/* Short Punchy Subtitle */}
        <Reveal direction="up" delay={0.35} className="mt-8 max-w-2xl">
          <p className="font-sans text-lg sm:text-xl text-white/85 font-light leading-relaxed">
            Coordinated architectural design, licensed structural & MEP engineering, and photorealistic 3D visualization.
          </p>
        </Reveal>

        {/* High-Impact Closing CTAs with Magnetic Buttons */}
        <Reveal direction="up" delay={0.5} className="mt-10 flex flex-wrap items-center gap-5">
          <Magnetic strength={0.25}>
            <a
              href="#build-project"
              className="px-9 py-4.5 rounded-xl bg-[var(--gold)] hover:bg-[#e0b753] text-black font-syne font-black text-sm uppercase tracking-wider transition-all shadow-[0_6px_30px_rgba(212,168,67,0.45)] hover:scale-105 flex items-center gap-3 group cursor-pointer inline-flex"
            >
              <span>Start Your Project</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-base">→</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-syne font-bold text-sm uppercase tracking-wider backdrop-blur-md transition-all flex items-center gap-2.5 cursor-pointer shadow-lg hover:scale-105 inline-flex"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Chat on WhatsApp</span>
            </a>
          </Magnetic>

          <Magnetic strength={0.15}>
            <a
              href="#renders"
              className="px-7 py-4.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/15 text-white font-syne font-semibold text-sm uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer inline-flex"
            >
              View 3D Portfolio
            </a>
          </Magnetic>
        </Reveal>
      </div>

      {/* Free Full-Width Division Quick Ticker Bar */}
      <div className="relative z-10 w-full max-w-[var(--container-max)] mx-auto pt-10 mt-8 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          <a href="#divisions" className="text-white/70 hover:text-[var(--gold)] transition-colors flex items-center gap-2 group">
            <span className="text-[var(--gold)] font-bold group-hover:scale-110 transition-transform">01 ·</span>
            <span className="uppercase tracking-wider">Architecture & Spatial</span>
          </a>
          <a href="#divisions" className="text-white/70 hover:text-[var(--gold)] transition-colors flex items-center gap-2 group">
            <span className="text-[var(--gold)] font-bold group-hover:scale-110 transition-transform">02 ·</span>
            <span className="uppercase tracking-wider">Engineering & 3D Visuals</span>
          </a>
          <a href="#divisions" className="text-white/70 hover:text-[var(--gold)] transition-colors flex items-center gap-2 group">
            <span className="text-[var(--gold)] font-bold group-hover:scale-110 transition-transform">03 ·</span>
            <span className="uppercase tracking-wider">Branding & Digital Web</span>
          </a>
          <a href="#divisions" className="text-white/70 hover:text-[var(--gold)] transition-colors flex items-center gap-2 group">
            <span className="text-[var(--gold)] font-bold group-hover:scale-110 transition-transform">04 ·</span>
            <span className="uppercase tracking-wider">Workforce Development</span>
          </a>
        </div>
      </div>
    </section>
  );
}
