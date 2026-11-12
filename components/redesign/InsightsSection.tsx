"use client";

import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const ARTICLES = [
  {
    category: "Architecture & Construction",
    title: "Avoiding Costly Site Clashes: Why Coordinated Architectural & MEP Drawings Save Millions in Nigerian Builds",
    readTime: "5 min read",
    date: "November 2026",
    summary:
      "A technical breakdown of how independent consultant hiring creates dimensional conflicts on-site and why integrated BIM engineering eliminates structural rework.",
    image: "/renders/modern_5bed_bungalow_evening.jpg",
  },
  {
    category: "Property Development & Presales",
    title: "Selling Off-Plan in Lekki & Abuja: How 4K 3D Animations Drive Early Capital for Developers",
    readTime: "4 min read",
    date: "October 2026",
    summary:
      "How institutional developers leverage high-definition spatial walkthroughs and tailored marketing portals to secure buyer deposits before pouring concrete.",
    image: "/renders/luxury_terrace_duplex_estate.jpg",
  },
  {
    category: "Design & Technology",
    title: "Parametric Facades & Algorithmic Form-Finding: How Computational Design is Reshaping Nigerian Architecture",
    readTime: "6 min read",
    date: "September 2026",
    summary:
      "How leading studios are using generative design tools to push architectural boundaries — producing structurally rational, visually distinctive facades that manual drafting could never achieve.",
    image: "/renders/corporate_lobby_corridor.jpg",
  },
];

export function InsightsSection() {
  return (
    <section id="insights" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#060608] text-white border-t border-white/5">
      <div className="w-full max-w-[1560px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div>
            <Reveal direction="down" delay={0.1}>
              <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-3">
                07 · Perspectives & Insights
              </span>
            </Reveal>
            <Reveal direction="up" delay={0.2}>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white max-w-2xl">
                Studio Perspectives. <br />
                <span className="text-[var(--gold)]">On Design, Capital & Craft.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.3} className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed font-light">
              We publish regular analyses on architecture, property development economics, and built-environment innovation.
            </p>
          </Reveal>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art) => (
            <article
              key={art.title}
              className="rounded-none bg-white/[0.02] border border-white/10 overflow-hidden hover:border-[var(--gold)]/40 transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-black">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-mono text-[9px] uppercase tracking-wider text-[var(--gold)]">
                  {art.category}
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[10px] text-white/40 mb-2">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-syne text-base font-bold text-white group-hover:text-[var(--gold)] transition-colors leading-snug mb-3">
                    {art.title}
                  </h3>

                  <p className="font-sans text-xs text-white/60 leading-relaxed font-light">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[var(--gold)]">
                  <span>Read Full Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

