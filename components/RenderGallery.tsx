"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { RENDERS, type RenderItem } from "@/lib/rendersData";

// Swiper React components & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";

// Swiper CSS styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FILTER_TABS = [
  { id: "all", label: "ALL WORKS" },
  { id: "residential", label: "RESIDENTIAL VILLAS" },
  { id: "terrace", label: "MODERN TERRACES" },
  { id: "commercial", label: "COMMERCIAL & PLAZAS" },
  { id: "interior", label: "LUXURY INTERIORS" },
] as const;

type FilterTabId = (typeof FILTER_TABS)[number]["id"];

export function RenderGallery() {
  const [filter, setFilter] = useState<FilterTabId>("all");
  const [selectedRender, setSelectedRender] = useState<RenderItem | null>(null);

  const filteredRenders = RENDERS.filter((r) => {
    if (filter === "all") return true;
    if (filter === "commercial") {
      return (
        r.category === "commercial" ||
        r.category === "plaza" ||
        r.category === "event" ||
        r.category === "football" ||
        r.category === "institutional"
      );
    }
    return r.category === filter;
  });

  return (
    <Reveal className="w-full">
      <section
        className="render-gallery-section py-16 sm:py-24 md:py-36 px-3.5 sm:px-6 md:px-10 lg:px-16 xl:px-20 relative w-full"
        id="renders"
      >
        <div className="render-gallery-inner w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-4">
                <span>✦</span> Spatial Architecture & Renders
              </div>
              <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none">
                HIGH-END <span className="text-[var(--gold)]">3D SPATIAL</span> CONCEPTS
              </h2>
            </div>
            <p className="max-w-md font-sans text-xs sm:text-sm text-white/60 leading-relaxed font-light">
              Interactive 3D visualization and architectural modeling for residential estates, modern plazas, and landmark destinations across Nigeria and international markets.
            </p>
          </div>

          {/* Clean, Streamlined Category Filter Controls (Straight Corners, Line-Free) */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10 sm:mb-12">
            {FILTER_TABS.map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={`px-5 py-2.5 rounded-none font-mono text-[11px] tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-black font-bold shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
                      : "bg-[#0e0e12] text-white/70 hover:text-white hover:bg-white/[0.06]"
                  }`}
                  onClick={() => setFilter(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Render Swiper Carousel */}
          <div className="rg-swiper-wrapper">
            <Swiper
              key={filter}
              modules={[Navigation, Pagination, Autoplay, Keyboard]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.4 },
                768: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3 },
              }}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              keyboard={{ enabled: true }}
              grabCursor={true}
              className="rg-swiper-container pb-14"
            >
              {filteredRenders.map((render) => (
                <SwiperSlide key={render.id} className="h-auto">
                  <TiltCard glare maxTilt={6} className="h-full">
                    <div className="group rounded-none bg-[#0a0a0e] transition-all duration-300 h-full flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.98)]">
                      <div
                        onClick={() => setSelectedRender(render)}
                        className="cursor-pointer flex-1 flex flex-col"
                      >
                        {/* 3D Render Image Frame */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#121216]">
                          <Image
                            src={render.image}
                            alt={render.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={render.id === "0" || render.id === "1"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-transparent to-transparent opacity-80" />
                          <div className="absolute top-4 left-4 rounded-none bg-black/85 backdrop-blur-md px-3 py-1 font-mono text-[9px] tracking-widest text-white/90 uppercase">
                            {render.categoryLabel}
                          </div>
                        </div>

                        {/* Card Info (Concise & High Visual Impact) */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="font-mono text-[10px] tracking-widest text-[var(--gold)] uppercase mb-2">
                              {render.location}
                            </div>
                            <h3 className="font-syne text-lg font-bold text-white group-hover:text-[var(--gold)] transition-colors line-clamp-2 leading-snug">
                              {render.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Button */}
                      <div className="p-5 pt-0 mt-auto">
                        <Link
                          href={`/renders/${render.id}`}
                          className="w-full py-3 px-5 rounded-none bg-white/[0.04] hover:bg-white text-white hover:text-black font-syne font-bold text-xs tracking-wider text-center transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                        >
                          <span>EXPLORE 3D CONCEPT</span>
                          <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Full-Screen Lightbox Modal for Render Details */}
        {selectedRender && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedRender(null)}
          >
            <div
              className="relative w-full max-w-5xl rounded-none bg-[#0c0d12] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.98)] overflow-hidden max-h-[92vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                type="button"
                className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-white hover:text-black border border-white/20 text-white font-mono text-[10px] tracking-wider transition-all cursor-pointer"
                onClick={() => setSelectedRender(null)}
              >
                ✕ CLOSE
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 overflow-y-auto">
                {/* Image Column */}
                <div className="md:col-span-7 relative min-h-[320px] md:min-h-[520px] bg-black">
                  <Image
                    src={selectedRender.image}
                    alt={selectedRender.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 900px) 100vw, 60vw"
                  />
                  <Link
                    href={`/renders/${selectedRender.id}`}
                    className="absolute bottom-4 right-4 py-2 px-4 bg-black/80 backdrop-blur-md border border-white/20 hover:border-[var(--gold)] text-white hover:text-[var(--gold)] font-mono text-[10px] tracking-widest rounded-full shadow-xl uppercase transition-all z-20"
                  >
                    EXPAND FULL HD VIEW ↗
                  </Link>
                </div>

                {/* Details Column */}
                <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[var(--gold)] uppercase mb-2">
                      {selectedRender.categoryLabel} · {selectedRender.location}
                    </div>
                    <h2 className="font-syne text-2xl font-bold text-white mb-4 leading-tight">
                      {selectedRender.title}
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light mb-6">
                      {selectedRender.description}
                    </p>

                    <div className="font-mono text-[10px] tracking-widest text-white/50 uppercase mb-3">
                      ARCHITECTURAL SPECIFICATIONS
                    </div>
                    <div className="space-y-2">
                      {selectedRender.specs.map((sp, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 font-sans text-xs text-white/80"
                        >
                          <span className="text-[var(--gold)] text-xs mt-0.5">◆</span>
                          <span>{sp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                    <Link
                      href={`/renders/${selectedRender.id}`}
                      className="w-full py-3 px-5 rounded-full bg-[var(--gold)] hover:bg-[var(--gold)]/90 text-black font-syne font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md"
                    >
                      OPEN FULL-SCREEN HD PAGE →
                    </Link>
                    <a
                      href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                        `Hello Elevation Studio, I am viewing your 3D concept "${selectedRender.title}" (${selectedRender.categoryLabel}) and would like to inquire about a similar project.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-syne font-semibold text-xs tracking-wider text-center transition-all"
                    >
                      INQUIRE ON WHATSAPP →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Reveal>
  );
}
