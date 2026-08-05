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

export function RenderGallery() {
  const [filter, setFilter] = useState<"all" | "terrace" | "residential" | "commercial" | "event" | "interior" | "plaza" | "football">("all");
  const [selectedRender, setSelectedRender] = useState<RenderItem | null>(null);

  const filteredRenders = RENDERS.filter(
    (r) => filter === "all" || r.category === filter
  );

  return (
    <Reveal>
      <section className="render-gallery-section" id="renders">
        <div className="render-gallery-inner">
          {/* Section Header */}
          <div className="rg-header-bar">
            <div>
              <div className="section-tag">Spatial Architecture & Renders</div>
              <h2 className="rg-title">
                HIGH-END <span style={{ color: "var(--gold)" }}>3D SPATIAL</span> CONCEPTS
              </h2>
            </div>
            <p className="rg-subtitle">
              From luxury residential villas and private sports grounds to commercial plazas and event pavilions — engineered to bridge architectural blueprint into physical reality.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="rg-filter-bar">
            {[
              { id: "all", label: "ALL RENDERS" },
              { id: "terrace", label: "MODERN TERRACES" },
              { id: "plaza", label: "MODERN PLAZAS" },
              { id: "football", label: "PRIVATE FOOTBALL PITCH" },
              { id: "residential", label: "RESIDENTIAL VILLAS" },
              { id: "commercial", label: "COMMERCIAL PLAZAS" },
              { id: "event", label: "EVENT CENTRES" },
              { id: "interior", label: "LUXURY INTERIORS" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`rg-filter-btn ${filter === tab.id ? "active" : ""}`}
                onClick={() => setFilter(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
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
              autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              keyboard={{ enabled: true }}
              grabCursor={true}
              className="rg-swiper-container"
            >
              {filteredRenders.map((render) => (
                <SwiperSlide key={render.id}>
                  <TiltCard glare maxTilt={8} className="h-full">
                    <div className="rg-card h-full flex flex-col justify-between">
                      <div onClick={() => setSelectedRender(render)} className="cursor-pointer">
                        <div className="rg-card-img-wrap">
                          <Image
                            src={render.image}
                            alt={render.title}
                            fill
                            className="rg-card-img"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={render.id === "0" || render.id === "1"}
                          />
                          <div className="rg-card-overlay" />
                          <div className="rg-card-badge">{render.categoryLabel}</div>
                        </div>

                        <div className="rg-card-body">
                          <div className="rg-card-location">{render.location}</div>
                          <h3 className="rg-card-title">{render.title}</h3>
                          <p className="rg-card-desc">{render.description}</p>

                          <div className="rg-card-specs">
                            {render.specs.slice(0, 2).map((sp, idx) => (
                              <span key={idx} className="rg-spec-chip">
                                ◆ {sp}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-4 border-t border-white/10 flex gap-3 mt-auto">
                        <Link
                          href={`/renders/${render.id}`}
                          className="flex-1 py-3 px-4 bg-[var(--gold)]/10 hover:bg-[var(--gold)] text-[var(--gold)] hover:text-[#060606] border border-[var(--gold-border)] rounded-lg text-[11px] font-mono tracking-wider font-semibold text-center transition-all shadow-sm"
                        >
                          FULL HD PAGE →
                        </Link>
                        <button
                          type="button"
                          onClick={() => setSelectedRender(render)}
                          className="py-3 px-4 bg-[#141419] border border-white/15 hover:border-white/40 text-white rounded-lg text-[11px] font-mono tracking-wider transition-all"
                        >
                          SPECS
                        </button>
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
          <div className="rg-modal-backdrop" onClick={() => setSelectedRender(null)}>
            <div
              className="rg-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="rg-modal-close"
                onClick={() => setSelectedRender(null)}
              >
                [ CLOSE RENDER ]
              </button>

              <div className="rg-modal-grid">
                <div className="rg-modal-image-col">
                  <div className="rg-modal-img-frame relative group">
                    <Image
                      src={selectedRender.image}
                      alt={selectedRender.title}
                      fill
                      className="rg-modal-img"
                      priority
                      sizes="(max-width: 900px) 100vw, 60vw"
                    />
                    <Link
                      href={`/renders/${selectedRender.id}`}
                      className="absolute bottom-4 right-4 py-2 px-4 bg-[#060606]/85 backdrop-blur-md border border-[var(--gold)] text-[var(--gold)] font-mono text-[10px] tracking-widest rounded shadow-xl uppercase hover:bg-[var(--gold)] hover:text-[#060606] transition-all z-20"
                    >
                      EXPAND FULL HD VIEW ↗
                    </Link>
                  </div>
                </div>

                <div className="rg-modal-info-col">
                  <div className="rg-modal-badge">{selectedRender.categoryLabel}</div>
                  <h2 className="rg-modal-title">{selectedRender.title}</h2>
                  <div className="rg-modal-location">{selectedRender.location}</div>

                  <p className="rg-modal-desc">{selectedRender.description}</p>

                  <div className="rg-modal-section-label">ARCHITECTURAL SPECIFICATIONS</div>
                  <div className="rg-modal-spec-grid">
                    {selectedRender.specs.map((sp, idx) => (
                      <div key={idx} className="rg-modal-spec-item">
                        <span className="gold-bullet">◆</span>
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rg-modal-actions flex flex-col gap-3 mt-auto">
                    <Link
                      href={`/renders/${selectedRender.id}`}
                      className="rg-modal-wa-btn text-center justify-center bg-[var(--gold)] text-[#060606]"
                    >
                      OPEN FULL-SCREEN HD PAGE →
                    </Link>
                    <a
                      href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                        `Hello Elevation Studio, I am looking at your 3D Render "${selectedRender.title}" (${selectedRender.categoryLabel}) and would like to discuss a similar architectural project.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 bg-transparent border border-[var(--gold-border)] text-[var(--gold)] hover:bg-[var(--gold)]/10 font-mono text-[11px] tracking-wider text-center rounded uppercase transition-all"
                    >
                      INQUIRE ON WHATSAPP (09119059859) →
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
