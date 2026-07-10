"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PROJECTS = [
  {
    name: "VOLTA",
    sector: "LUXURY HOSPITALITY",
    location: "VICTORIA ISLAND, LAGOS",
    heroImage: "/volta_stage_4.png",
    accentColor: "#d4a843",
    desc: "An ultra-premium 5-star boutique hotel group commanding the coastal Lagos skyline. Complete brand transformation to appeal to global luxury travelers, spanning architectural renders, booking engines, and staff culture alignment.",
    stages: [
      {
        num: "01",
        label: "GUEST INSIGHTS",
        verb: "Auditing market expectations",
        image: "/volta_stage_1.png",
        detail:
          "Audited 12 luxury competitors across Victoria Island to benchmark the unique customer expectations for the Volta boutique experience.",
      },
      {
        num: "02",
        label: "IDENTITY SYSTEM",
        verb: "Crafting visual signature",
        image: "/volta_stage_2.png",
        detail:
          "Designed the bespoke Volta brand identity featuring a signature gold geometric chevron emblem, luxury room signage, and custom leather keycard packaging.",
      },
      {
        num: "03",
        label: "BOOKING ENGINE",
        verb: "Developing digital portal",
        image: "/volta_stage_3.png",
        detail:
          "Engineered the immersive Volta Next.js reservation engine with video backdrops and custom calendar availability flows.",
      },
      {
        num: "04",
        label: "FACADE & SPACE",
        verb: "Architecting physical form",
        image: "/volta_stage_4.png",
        detail:
          "Delivered production-ready exterior facade renders and interior layouts for the Volta hotel, capturing its glass and brass lines against the Lagos sunset.",
      },
      {
        num: "05",
        label: "CULTURE PROGRAM",
        verb: "Aligning human service",
        image: "/volta_stage_5.png",
        detail:
          "Conducted a 6-month Mindvest training alignment program to instil the premium Volta hospitality service model across all front-of-house teams.",
      },
    ],
  },
  {
    name: "GREENFIELD",
    sector: "REAL ESTATE MASTERPLAN",
    location: "SAGAMU–LAGOS CORRIDOR",
    heroImage: "/greenfield_stage_4.png",
    accentColor: "#4ecba0",
    desc: "A pioneering mixed-use eco-luxury metropolis. Setting new benchmarks for sustainable African urbanism with solar mapping, interactive 3D plot selectors, and rammed-earth clubhouse architectural designs.",
    stages: [
      {
        num: "01",
        label: "ECOLOGY SURVEYS",
        verb: "Mapping natural canvas",
        image: "/greenfield_stage_1.png",
        detail:
          "Conducted solar exposure vector models and topographic drone mapping to define the green layout of the Greenfield metropolis.",
      },
      {
        num: "02",
        label: "ECO IDENTITY",
        verb: "Synthesizing structure & soil",
        image: "/greenfield_stage_2.png",
        detail:
          "Designed the sustainable Greenfield brand identity utilizing deep emerald and terracotta clay tones to symbolize structure rising from nature.",
      },
      {
        num: "03",
        label: "PLOT SELECTOR",
        verb: "Coding custom interactive 3D",
        image: "/greenfield_stage_3.png",
        detail:
          "Built the custom Greenfield interactive 3D land plot selector app with live availability and digital contract signing.",
      },
      {
        num: "04",
        label: "CLUBHOUSE FACADE",
        verb: "Modeling organic architecture",
        image: "/greenfield_stage_4.png",
        detail:
          "Designed the physical architecture for the Greenfield eco-clubhouse, showcasing rammed-earth facades, solar roofing, and integrated landscape renders.",
      },
      {
        num: "05",
        label: "GREEN CHARTER",
        verb: "Deploying environmental code",
        image: "/greenfield_stage_5.png",
        detail:
          "Established the Greenfield Sustainability Charter training and workshops to transition construction partners into eco-friendly building practices.",
      },
    ],
  },
  {
    name: "MERIDIAN",
    sector: "FEDERAL INSTITUTION",
    location: "ABEOKUTA, OGUN STATE",
    heroImage: "/meridian_stage_4.png",
    accentColor: "#a89fd4",
    desc: "A monumental public agency modernization. Establishing civic trust through visual crest redesigns, secure citizen portals, contemporary administrative pavilions, and national administrative workflow reforms.",
    stages: [
      {
        num: "01",
        label: "FRICTION AUDIT",
        verb: "Analyzing public bottlenecks",
        image: "/meridian_stage_1.png",
        detail:
          "Mapped public service touchpoints and queue times to identify bottlenecks across all Meridian citizen portals.",
      },
      {
        num: "02",
        label: "SOVEREIGN CREST",
        verb: "Redesigning civic shield",
        image: "/meridian_stage_2.png",
        detail:
          "Re-engineered the historic crest into a clean royal indigo Meridian vector shield emblem, designing official stationery, stamps, and letterheads.",
      },
      {
        num: "03",
        label: "CITIZEN PORTAL",
        verb: "Securing identity node",
        image: "/meridian_stage_3.png",
        detail:
          "Developed the secure React-based Meridian citizen portal optimized for multi-factor login and fast loading on mobile networks.",
      },
      {
        num: "04",
        label: "CIVIC PAVILION",
        verb: "Drafting concrete structure",
        image: "/meridian_stage_4.png",
        detail:
          "Designed the new Meridian administrative pavilion exterior, prioritizing clean concrete geometry, acoustic panels, and shaded public plazas.",
      },
      {
        num: "05",
        label: "SECTOR REFORM",
        verb: "Enacting efficiency framework",
        image: "/meridian_stage_5.png",
        detail:
          "Conducted administrative efficiency workshops for 200+ civil servants using the Mindvest framework to accelerate Meridian's digital adoption.",
      },
    ],
  },
];

export function BrandFlow() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    setScrollProgress((scrollLeft / maxScroll) * 100);
  };

  const openProjectDetails = (idx: number) => {
    setSelectedProjectIdx(idx);
    setActiveStageIdx(0);
    // Prevent background scrolling when overlay is active
    document.body.style.overflow = "hidden";
  };

  const closeProjectDetails = () => {
    setSelectedProjectIdx(null);
    document.body.style.overflow = "unset";
  };

  const handleStageSelect = (idx: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveStageIdx(idx);
      setTransitioning(false);
    }, 200);
  };

  const selectedProject = selectedProjectIdx !== null ? PROJECTS[selectedProjectIdx] : null;
  const currentStage = selectedProject ? selectedProject.stages[activeStageIdx] : null;

  return (
    <section className={`pf-section ${visible ? "pf-visible" : ""}`} ref={sectionRef}>
      <div className="pf-inner">
        {/* Section Header */}
        <div className="pf-header">
          <div className="pf-eyebrow">
            <span className="pf-eyebrow-line" />
            CASE ARCHIVE
          </div>
          <h2 className="pf-title">
            FROM RESEARCH TO <span className="pf-title-accent">TRANSFORMATION</span>
          </h2>
        </div>

        {/* Draggable/Scrollable Project Track */}
        <div className="pf-track-container">
          <div className="pf-track" ref={trackRef} onScroll={handleScroll}>
            {PROJECTS.map((proj, idx) => (
              <div key={proj.name} className="pf-card" onClick={() => openProjectDetails(idx)}>
                <div className="pf-card-img-wrap">
                  <Image
                    src={proj.heroImage}
                    alt={proj.name}
                    fill
                    className="pf-card-img"
                    sizes="(max-width: 900px) 100vw, 30vw"
                  />
                  <div className="pf-card-tint" />
                </div>
                <div className="pf-card-content">
                  <div className="pf-card-meta">
                    <span className="pf-card-sector">{proj.sector}</span>
                    <span className="pf-card-location">{proj.location}</span>
                  </div>
                  <h3 className="pf-card-name">{proj.name}</h3>
                  <button className="pf-card-btn" style={{ "--ac-color": proj.accentColor } as React.CSSProperties}>
                    EXPLORE DECREE <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modern Slider Scroll Bar (Not arrows pointing) */}
        <div className="pf-scrollbar-container">
          <div className="pf-scrollbar-track">
            <div 
              className="pf-scrollbar-thumb" 
              style={{ left: `${scrollProgress}%` }}
            />
          </div>
          <span className="pf-scrollbar-label">DRAG OR SCROLL TO VIEW</span>
        </div>
      </div>

      {/* Full-Screen Project Case Study Drawer Overlay */}
      {selectedProject && currentStage && (
        <div className="pf-drawer">
          <div className="pf-drawer-backdrop" onClick={closeProjectDetails} />
          
          <div className="pf-drawer-content" style={{ "--ac-color": selectedProject.accentColor } as React.CSSProperties}>
            {/* Close Button in top right */}
            <button className="pf-drawer-close" onClick={closeProjectDetails}>
              [ CLOSE CASE STUDY ]
            </button>

            <div className="pf-drawer-grid">
              {/* Drawer Left column: Project Profile info */}
              <div className="pf-d-left">
                <div className="pf-d-project-header">
                  <span className="pf-d-sector">{selectedProject.sector}</span>
                  <h2 className="pf-d-project-name">{selectedProject.name}</h2>
                  <span className="pf-d-location">{selectedProject.location}</span>
                </div>
                
                <p className="pf-d-project-desc">{selectedProject.desc}</p>
                
                {/* Horizontal Progress Timeline Slider Selector (No arrows) */}
                <div className="pf-timeline">
                  <span className="pf-timeline-label">ELEVATION SEGMENT</span>
                  <div className="pf-timeline-track-wrap">
                    <div className="pf-timeline-track-bg" />
                    <div 
                      className="pf-timeline-track-fill" 
                      style={{ width: `${(activeStageIdx / (selectedProject.stages.length - 1)) * 100}%` }}
                    />
                    <div className="pf-timeline-nodes">
                      {selectedProject.stages.map((st, sIdx) => (
                        <button
                          key={st.num}
                          onClick={() => handleStageSelect(sIdx)}
                          className={`pf-timeline-node ${activeStageIdx === sIdx ? "pf-timeline-node--active" : ""} ${sIdx < activeStageIdx ? "pf-timeline-node--past" : ""}`}
                          style={{ left: `${(sIdx / (selectedProject.stages.length - 1)) * 100}%` }}
                          title={st.label}
                        >
                          <span className="pf-node-num">{st.num}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Middle column: Immersive stage image frame */}
              <div className="pf-d-center">
                <div className="pf-d-image-wrap">
                  <Image
                    key={currentStage.image}
                    src={currentStage.image}
                    alt={currentStage.label}
                    fill
                    className={`pf-d-image ${transitioning ? "pf-d-image--fade" : ""}`}
                    sizes="(max-width: 900px) 100vw, 40vw"
                    priority
                  />
                  <div className="pf-d-image-shadow" />
                </div>
              </div>

              {/* Drawer Right column: Technical specifications details */}
              <div className="pf-d-right">
                <div className={`pf-d-spec-box ${transitioning ? "pf-d-spec-box--fade" : ""}`}>
                  <div className="pf-d-spec-eyebrow">
                    <span>STAGE {currentStage.num} OF 05</span>
                    <span className="pf-d-spec-dot" />
                    <span>{currentStage.verb.toUpperCase()}</span>
                  </div>
                  
                  <h3 className="pf-d-spec-label">{currentStage.label}</h3>
                  <div className="pf-d-spec-line" />
                  <p className="pf-d-spec-detail">{currentStage.detail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
