"use client";

import Image from "next/image";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

// Swiper React components & modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";

// Swiper CSS styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface RenderItem {
  id: string;
  title: string;
  category: "residential" | "commercial" | "event" | "interior";
  categoryLabel: string;
  location: string;
  image: string;
  accentColor: string;
  specs: string[];
  description: string;
}

const RENDERS: RenderItem[] = [
  {
    id: "1",
    title: "5-Bedroom Modern Luxury Residence",
    category: "residential",
    categoryLabel: "RESIDENTIAL ARCHITECTURE",
    location: "LEKKI PHASE 1 / OGUN-LAGOS CORRIDOR",
    image: "/renders/residential_villa_facade.jpg",
    accentColor: "#d4a843",
    specs: [
      "Cantilevered Upper Deck",
      "Linear Facade Strip Lighting",
      "Floor-to-Ceiling Glass Stairwell",
      "Bespoke Wooden Entry Pivot Door",
    ],
    description:
      "A contemporary 5-bedroom private villa defined by bold geometric cantilevers, architectural linear LED wall wash, double-height glass stairwell glazing, and secluded perimeter lighting.",
  },
  {
    id: "2",
    title: "Modern High-Rise Apartment Tower at Dusk",
    category: "residential",
    categoryLabel: "LUXURY HIGH-RISE RESIDENTIAL",
    location: "VICTORIA ISLAND WATERFRONT CORRIDOR",
    image: "/renders/highrise_luxury_apartments.jpg",
    accentColor: "#d4a843",
    specs: [
      "Multi-Tier Balcony Recessed LEDs",
      "Warm Vertical Facade Strips",
      "Reflective Wet Paving Entry Courtyard",
      "Glass Balustrade Decking",
    ],
    description:
      "A multi-level luxury apartment tower captured at dusk, boasting warm vertical strip illumination, glass balustrades, integrated lush terrace planters, and executive entrance drops.",
  },
  {
    id: "3",
    title: "Executive 2-Story Luxury Duplex",
    category: "residential",
    categoryLabel: "RESIDENTIAL ARCHITECTURE",
    location: "LEKKI SCHEME 2 / CHEVRON AXIS",
    image: "/renders/modern_duplex_residence.jpg",
    accentColor: "#d4a843",
    specs: [
      "Warm Under-Soffit Lighting",
      "Seamless Glass Balustrade",
      "Landscaped Garden Beds",
      "Interlocked Paved Courtyard",
    ],
    description:
      "A contemporary 2-story luxury duplex boasting integrated under-soffit architectural LED strips, tinted glass balcony railings, and lush perimeter garden beds.",
  },
  {
    id: "4",
    title: "Grand Foyer & Floating Staircase",
    category: "interior",
    categoryLabel: "LUXURY INTERIOR ARCHITECTURE",
    location: "PRIVATE RESIDENTIAL SANCTUARY",
    image: "/renders/foyer_staircase_interior.jpg",
    accentColor: "#4ecba0",
    specs: [
      "Floating Tread Staircase",
      "Under-Riser Warm LED Strips",
      "Polished Marble Flooring",
      "Frameless Glass Balustrade",
    ],
    description:
      "An opulent double-height entryway featuring floating marble treads, seamless frameless glass guardrails, custom gallery artwork, and warm indirect cove ambient lighting.",
  },
  {
    id: "5",
    title: "Sprawling Multi-Family Residential Block",
    category: "residential",
    categoryLabel: "MULTI-FAMILY HOUSING COMPLEX",
    location: "OGUN–LAGOS SUBURBAN CORRIDOR",
    image: "/renders/multifamily_residential_block.jpg",
    accentColor: "#d4a843",
    specs: [
      "Linear Multi-Unit Block Structure",
      "Recessed Wall Sconce Lighting",
      "Wood-Accented Recessed Balconies",
      "Cobblestone Perimeter Courtyard",
    ],
    description:
      "A multi-unit residential development designed with high-density architectural symmetry, incorporating warm accent wall sconces, wood-paneled balcony niches, and cobblestone grounds.",
  },
  {
    id: "6",
    title: "Architectural Gallery & Atrium Corridor",
    category: "interior",
    categoryLabel: "COMMERCIAL INTERIOR ARCHITECTURE",
    location: "VICTORIA ISLAND COMMERCIAL TOWER",
    image: "/renders/corporate_lobby_corridor.jpg",
    accentColor: "#4ecba0",
    specs: [
      "Brushed Brass Guardrails",
      "Fluted Glass Partition Walls",
      "Recessed Step & Uplighting",
      "Custom Branding Wall Pylon",
    ],
    description:
      "An ultra-modern corporate lobby corridor featuring brushed brass trim, fluted privacy glass, custom brand pylons, and architectural floor lighting.",
  },
  {
    id: "7",
    title: "Contemporary Glass-Fronted Residence",
    category: "residential",
    categoryLabel: "MODERN RESIDENTIAL ESTATE",
    location: "BANANA ISLAND / IKOYI CORRIDOR",
    image: "/renders/glass_facade_estate.jpg",
    accentColor: "#d4a843",
    specs: [
      "Floor-to-Ceiling Panoramic Glazing",
      "Custom Parametric Motorized Gate",
      "Illuminated Sunken Planters",
      "Granite Entrance Steps",
    ],
    description:
      "A striking minimalist residence with floor-to-ceiling glass paneling, a bespoke laser-cut black entrance gate, and warm interior ambient glow.",
  },
  {
    id: "8",
    title: "Twin Luxury Multi-Unit Estate",
    category: "residential",
    categoryLabel: "LUXURY RESIDENTIAL COMPOUND",
    location: "EPE EXP.-WAY / OGUN CORRIDOR",
    image: "/renders/twin_villa_estate.jpg",
    accentColor: "#d4a843",
    specs: [
      "Dual Villa Architectural Layout",
      "Terraced Entrance Porticos",
      "Contrasting Dark Pitch Roof",
      "Subtle Step Recessed Lighting",
    ],
    description:
      "A sprawling dual-villa residential estate combining classic pitch roofs with sleek modern white facade rendering, floating portico steps, and subtle ambient nightscape lighting.",
  },
  {
    id: "9",
    title: "Raw Concrete Executive Gallery Atrium",
    category: "interior",
    categoryLabel: "SPATIAL INTERIOR CONCEPTS",
    location: "ELEVATION STUDIOS HEADQUARTERS",
    image: "/renders/executive_hallway_atrium.jpg",
    accentColor: "#4ecba0",
    specs: [
      "Architectural Cast-in-Place Concrete",
      "Integrated Sculptural Planters",
      "High-Gloss Terrazzo Flooring",
      "Warm Up-spot Lighting",
    ],
    description:
      "A sophisticated gallery atrium showcasing raw board-formed architectural concrete walls, high-gloss terrazzo floor reflections, and oversized illuminated vessel planters.",
  },
  {
    id: "10",
    title: "Luxury Event Centre & Pavilion Walkway",
    category: "event",
    categoryLabel: "HOSPITALITY & EVENT SPACES",
    location: "VICTORIA ISLAND / CORRIDOR",
    image: "/renders/event_centre_pavilion.jpg",
    accentColor: "#a89fd4",
    specs: [
      "Tensile Membrane Conical Canopies",
      "Perimeter Landscape Bollard Lights",
      "Microclimate Paving & Garden Border",
      "Al Fresco Executive Lounge Seating",
    ],
    description:
      "A flagship multi-purpose event grounds concept featuring tensioned conical canopy umbrellas, integrated storm-drain channels, and ambient outdoor garden illumination.",
  },
  {
    id: "11",
    title: "Contemporary Executive Master Suite",
    category: "interior",
    categoryLabel: "HIGH-END INTERIOR CONCEPT",
    location: "EXECUTIVE PENTHOUSE",
    image: "/renders/master_suite_interior.jpg",
    accentColor: "#e5a158",
    specs: [
      "Gallery-Grade Wall Art Curation",
      "Raw Concrete & Wood Accent Wall",
      "Teal Velvet & Linen Bedding Suite",
      "Floor-to-Ceiling Rain-Glass Wall",
    ],
    description:
      "An executive master suite blending raw textured concrete surfaces with teal velvet accents, gallery-grade artwork displays, and floor-to-ceiling acoustic glass partitions.",
  },
  {
    id: "12",
    title: "Commercial Plaza & Mixed-Use Complex",
    category: "commercial",
    categoryLabel: "COMMERCIAL & MIXED-USE PLAZA",
    location: "OGUN–LAGOS COMMERCIAL CORRIDOR",
    image: "/renders/commercial_plaza_facade.jpg",
    accentColor: "#60a5fa",
    specs: [
      "Multi-Tier Balcony Grid",
      "Twilight Architectural Uplighting",
      "Reflective Stone Courtyard Paving",
      "High-Efficiency Glazing",
    ],
    description:
      "A monumental commercial plaza and residential complex designed for high-density elegance, featuring warm facade uplighting, glass balconies, and reflective courtyard paving.",
  },
  {
    id: "13",
    title: "Modern Commercial Plaza & Indoor Atrium",
    category: "commercial",
    categoryLabel: "COMMERCIAL & MIXED-USE PLAZA",
    location: "ABUJA / LAGOS COMMERCIAL CORRIDOR, NIGERIA",
    image: "/renders/modern_plaza_indoor_atrium.jpg",
    accentColor: "#60a5fa",
    specs: [
      "4-Story Skylight Central Courtyard",
      "Linear LED Soffit Strips",
      "Frameless Storefront Glazing",
      "Integrated Digital Directory Totem",
    ],
    description:
      "A flagship 4-story commercial plaza interior atrium in Nigeria featuring a soaring skylight canopy, multi-level glass shopfront balconies, fluted store signage, and polished stone walkway paving.",
  },
  {
    id: "14",
    title: "Family Event Centre & Outdoor Dining Pavilion",
    category: "event",
    categoryLabel: "HOSPITALITY & EVENT SPACES",
    location: "VICTORIA ISLAND / OGUN CORRIDOR, NIGERIA",
    image: "/renders/family_event_centre_pavilion.jpg",
    accentColor: "#a89fd4",
    specs: [
      "Pergola Dining Pavilion Shading",
      "Double-Story Modern Event Villa",
      "Lush Perimeter Planter Wall Sconces",
      "Al Fresco Lattice Lounge Seating",
    ],
    description:
      "A serene multi-purpose family event centre and outdoor dining pavilion, boasting white architectural pergolas, green lattice terrace seating, high-contrast black glass framing, and ambient perimeter lighting.",
  },
];

export function RenderGallery() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial" | "event" | "interior">("all");
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
              From luxury residential villas and double-height interiors to commercial plazas and event pavilions — engineered to bridge architectural blueprint into physical reality.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="rg-filter-bar">
            {[
              { id: "all", label: "ALL RENDERS" },
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
                    <div
                      className="rg-card h-full"
                      onClick={() => setSelectedRender(render)}
                    >
                      <div className="rg-card-img-wrap">
                        <Image
                          src={render.image}
                          alt={render.title}
                          fill
                          className="rg-card-img"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={render.id === "1"}
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

                        <div className="rg-card-action">
                          <span>VIEW RENDER SPECS</span>
                          <span>→</span>
                        </div>
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
                  <div className="rg-modal-img-frame">
                    <Image
                      src={selectedRender.image}
                      alt={selectedRender.title}
                      fill
                      className="rg-modal-img"
                      priority
                      sizes="(max-width: 900px) 100vw, 60vw"
                    />
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

                  <div className="rg-modal-actions">
                    <a
                      href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                        `Hello Elevation Studio, I am looking at your 3D Render "${selectedRender.title}" (${selectedRender.categoryLabel}) and would like to discuss a similar architectural project.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rg-modal-wa-btn"
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
