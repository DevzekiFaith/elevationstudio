"use client";

import { useState, useRef, type MouseEvent, type TouchEvent } from "react";
import Image from "next/image";
import { Reveal } from "./Reveal";

interface BlueprintSliderProps {
  blueprintImg?: string;
  renderImg?: string;
  title?: string;
  subtitle?: string;
}

export function BlueprintSlider({
  blueprintImg = "/volta_stage_1.png",
  renderImg = "/volta_stage_4.png",
  title = "2D CIVIL BLUEPRINT TO 3D SPATIAL REALITY",
  subtitle = "Drag the slider to experience how raw architectural CAD line drawings transform into photorealistic spatial renders.",
}: BlueprintSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let posPct = (x / rect.width) * 100;
    if (posPct < 0) posPct = 0;
    if (posPct > 100) posPct = 100;
    setSliderPos(posPct);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <Reveal direction="up" duration={0.8}>
      <section className="blueprint-slider-section" id="blueprint-compare">
        <div className="blueprint-slider-inner">
          <div className="blueprint-slider-header">
            <div>
              <div className="section-tag">Spatial Engineering Proof</div>
              <h2 className="blueprint-slider-title">
                2D BLUEPRINT <span style={{ color: "var(--gold)" }}>VS</span> 3D RENDER
              </h2>
            </div>
            <p className="blueprint-slider-sub">{subtitle}</p>
          </div>

          <div
            ref={containerRef}
            className="blueprint-slider-container"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={onMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={onTouchMove}
          >
            {/* 3D Render Image (Base Layer - Right Side) */}
            <div className="blueprint-img-frame">
              <Image
                src={renderImg}
                alt="3D Spatial Render Result"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
              <div className="blueprint-badge right-badge">
                <span>3D SPATIAL RENDER</span>
              </div>
            </div>

            {/* 2D Blueprint Image (Clipped Overlay - Left Side) */}
            <div
              className="blueprint-img-frame clipped-frame"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <Image
                src={blueprintImg}
                alt="2D Architectural Blueprint"
                fill
                className="object-cover filter contrast-125 brightness-90 saturate-50"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
              <div className="blueprint-badge left-badge">
                <span>2D ARCHITECTURAL BLUEPRINT</span>
              </div>
            </div>

            {/* Slider Divider Line & Drag Handle */}
            <div
              className="blueprint-divider-line"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="blueprint-handle">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
