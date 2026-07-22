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
    location: "OGUN–LAGOS CORRIDOR",
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
    location: "OGUN STATE, NIGERIA",
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
  
  const [visible, setVisible] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number | null>(null);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [stageTransitioning, setStageTransitioning] = useState(false);

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

  const handleProjectSelect = (idx: number) => {
    if (idx === activeProjectIdx || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveProjectIdx(idx);
      setTransitioning(false);
    }, 400);
  };

  const handleNext = () => {
    const nextIdx = (activeProjectIdx + 1) % PROJECTS.length;
    handleProjectSelect(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeProjectIdx - 1 + PROJECTS.length) % PROJECTS.length;
    handleProjectSelect(prevIdx);
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
    setStageTransitioning(true);
    setTimeout(() => {
      setActiveStageIdx(idx);
      setStageTransitioning(false);
    }, 200);
  };

  const getPreviewIndices = (activeIdx: number) => {
    const indices = [];
    for (let i = 1; i < PROJECTS.length; i++) {
      indices.push((activeIdx + i) % PROJECTS.length);
    }
    return indices;
  };

  const activeProject = PROJECTS[activeProjectIdx];
  const previewIndices = getPreviewIndices(activeProjectIdx);

  const selectedProject = selectedProjectIdx !== null ? PROJECTS[selectedProjectIdx] : null;
  const currentStage = selectedProject ? selectedProject.stages[activeStageIdx] : null;

  return (
    <section className={`pf-section ${visible ? "pf-visible" : ""}`} ref={sectionRef}>
      {/* Immersive background layer */}
      <div className="pf-bg-container">
        {PROJECTS.map((proj, idx) => (
          <div
            key={proj.name}
            className={`pf-bg-image-wrap ${idx === activeProjectIdx ? "active" : ""}`}
          >
            <Image
              src={proj.heroImage}
              alt={proj.name}
              fill
              className="pf-bg-image"
              priority={idx === 0}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="pf-bg-overlay" />
      </div>

      <div className="pf-inner">
        {/* Section Header Row */}
        <div className="pf-header-bar">
          <div className="pf-eyebrow">
            <span className="pf-eyebrow-line" />
            CASE ARCHIVE
          </div>
          <h2 className="pf-section-title-small">FROM RESEARCH TO TRANSFORMATION</h2>
        </div>

        {/* Full-Screen Content Layout */}
        <div className="pf-main-layout">
          {/* Left Column: Active project details */}
          <div className={`pf-active-details ${transitioning ? "pf-fade-out" : ""}`}>
            <span className="pf-project-sector">{activeProject.sector}</span>
            <h3 className="pf-project-name">{activeProject.name}</h3>
            <span className="pf-project-location">{activeProject.location}</span>
            <p className="pf-project-desc">{activeProject.desc}</p>
            
            <button 
              className="pf-explore-btn"
              onClick={() => openProjectDetails(activeProjectIdx)}
              style={{ "--ac-color": activeProject.accentColor } as React.CSSProperties}
            >
              EXPLORE DECREE <span>→</span>
            </button>
          </div>

          {/* Right Column: Floating Preview cards */}
          <div className="pf-previews-column">
            {previewIndices.map((idx) => {
              const proj = PROJECTS[idx];
              return (
                <div 
                  key={proj.name} 
                  className="pf-preview-card"
                  onClick={() => handleProjectSelect(idx)}
                >
                  <div className="pf-preview-img-wrap">
                    <Image
                      src={proj.heroImage}
                      alt={proj.name}
                      fill
                      className="pf-preview-img"
                      sizes="(max-width: 900px) 100vw, 250px"
                    />
                    <div className="pf-preview-tint" />
                  </div>
                  <div className="pf-preview-content">
                    <span className="pf-preview-sector">{proj.sector}</span>
                    <h4 className="pf-preview-name">{proj.name}</h4>
                    <span className="pf-preview-action">EXPLORE DECREE →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="pf-bottom-controls">
          <div className="pf-progress-container">
            <span className="pf-progress-label">DRAG OR SCROLL TO VIEW</span>
            <div className="pf-progress-bar-track">
              <div 
                className="pf-progress-bar-thumb"
                style={{ 
                  width: `${((activeProjectIdx + 1) / PROJECTS.length) * 100}%`,
                  backgroundColor: activeProject.accentColor
                }}
              />
            </div>
            <span className="pf-progress-numbers">
              {String(activeProjectIdx + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="pf-nav-arrows">
            <button 
              className="pf-arrow-btn" 
              onClick={handlePrev} 
              aria-label="Previous Project"
              style={{ "--ac-color": activeProject.accentColor } as React.CSSProperties}
            >
              &lt;
            </button>
            <button 
              className="pf-arrow-btn" 
              onClick={handleNext} 
              aria-label="Next Project"
              style={{ "--ac-color": activeProject.accentColor } as React.CSSProperties}
            >
              &gt;
            </button>
          </div>
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
              {/* Drawer Left column: Immersive stage image slider */}
              <div className="pf-d-slider-container">
                <div className="pf-d-image-viewport">
                  <button 
                    className="pf-d-nav-arrow prev" 
                    onClick={() => handleStageSelect((activeStageIdx - 1 + selectedProject.stages.length) % selectedProject.stages.length)}
                    aria-label="Previous Stage"
                  >
                    &lt;
                  </button>

                  <div 
                    className="pf-d-image-click-target" 
                    onClick={() => handleStageSelect((activeStageIdx + 1) % selectedProject.stages.length)}
                  >
                    <Image
                      key={currentStage.image}
                      src={currentStage.image}
                      alt={currentStage.label}
                      fill
                      className={`pf-d-image ${stageTransitioning ? "pf-d-image--fade" : ""}`}
                      sizes="(max-width: 900px) 100vw, 50vw"
                      priority
                    />
                    <div className="pf-d-image-shadow" />
                  </div>

                  <button 
                    className="pf-d-nav-arrow next" 
                    onClick={() => handleStageSelect((activeStageIdx + 1) % selectedProject.stages.length)}
                    aria-label="Next Stage"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              {/* Drawer Right column: Project profile details ("write up"), stage specs, and timeline */}
              <div className="pf-d-writeup-card">
                <div className="pf-d-project-header">
                  <span className="pf-d-sector">{selectedProject.sector}</span>
                  <h2 className="pf-d-project-name">{selectedProject.name}</h2>
                  <span className="pf-d-location">{selectedProject.location}</span>
                </div>
                
                <p className="pf-d-project-desc">{selectedProject.desc}</p>
                
                <div className="pf-d-divider" />

                {/* Stage Technical Specifications details */}
                <div className={`pf-d-spec-box ${stageTransitioning ? "pf-d-spec-box--fade" : ""}`}>
                  <div className="pf-d-spec-eyebrow">
                    <span>STAGE {currentStage.num} OF 05</span>
                    <span className="pf-d-spec-dot" />
                    <span>{currentStage.verb.toUpperCase()}</span>
                  </div>
                  
                  <h3 className="pf-d-spec-label">{currentStage.label}</h3>
                  <div className="pf-d-spec-line" />
                  <p className="pf-d-spec-detail">{currentStage.detail}</p>
                </div>

                {/* Passive timeline tracker */}
                <div className="pf-timeline">
                  <span className="pf-timeline-label">ELEVATION SEGMENT</span>
                  <div className="pf-timeline-progress-wrap">
                    <div className="pf-timeline-steps">
                      {selectedProject.stages.map((st, sIdx) => (
                        <div
                          key={st.num}
                          className={`pf-timeline-step-indicator ${activeStageIdx === sIdx ? "active" : ""}`}
                        >
                          <span className="pf-step-num">{st.num}</span>
                          <span className="pf-step-dot" />
                        </div>
                      ))}
                    </div>
                    <div className="pf-timeline-line-track">
                      <div 
                        className="pf-timeline-line-thumb" 
                        style={{ width: `${(activeStageIdx / (selectedProject.stages.length - 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                  <a
                    href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                      `Hello Elevation Studio, I'm viewing the ${selectedProject.name} (${selectedProject.sector}) case study and would like to discuss a similar project scope.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-explore-btn"
                    style={{
                      "--ac-color": selectedProject.accentColor,
                      display: "inline-flex",
                      textDecoration: "none",
                    } as React.CSSProperties}
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
  );
}
