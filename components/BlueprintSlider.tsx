"use client";

import { useState, useRef, useEffect, useCallback, type MouseEvent, type TouchEvent } from "react";
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
  subtitle = "Drag the slider to experience how raw architectural CAD line drawings transform into photorealistic spatial renders.",
}: BlueprintSliderProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let posPct = (x / rect.width) * 100;
    if (posPct < 0) posPct = 0;
    if (posPct > 100) posPct = 100;
    setSliderPos(posPct);
  }, []);

  useEffect(() => {
    const onWindowMouseMove = (e: globalThis.MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const onWindowTouchMove = (e: globalThis.TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const onWindowMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", onWindowMouseMove);
      window.addEventListener("touchmove", onWindowTouchMove);
      window.addEventListener("mouseup", onWindowMouseUp);
      window.addEventListener("touchend", onWindowMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", onWindowMouseMove);
      window.removeEventListener("touchmove", onWindowTouchMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
      window.removeEventListener("touchend", onWindowMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <Reveal direction="up" duration={0.8}>
      <section
        className="blueprint-slider-section relative py-24 px-6 md:px-16 bg-[#060606] text-[#f4f0e8] border-t border-b border-[#333336] overflow-hidden"
        id="blueprint-compare"
      >
        <div className="blueprint-slider-inner max-w-[1300px] mx-auto">
          {/* Header */}
          <div className="blueprint-slider-header flex flex-wrap justify-between items-end mb-12 gap-6">
            <div>
              <div
                className="section-tag mb-4 flex items-center gap-3 text-[10px] tracking-[4px] uppercase text-[#d4a843]"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                Spatial Engineering Proof
              </div>
              <h2
                className="blueprint-slider-title text-[clamp(44px,6.5vw,88px)] leading-[0.92] text-[#f4f0e8] m-0"
                style={{ fontFamily: "var(--font-bebas), sans-serif" }}
              >
                2D BLUEPRINT <span style={{ color: "var(--gold)" }}>VS</span> 3D RENDER
              </h2>
            </div>
            <p
              className="blueprint-slider-sub text-[clamp(17px,1.8vw,22px)] italic text-[rgba(244,240,232,0.6)] max-w-[480px] leading-[1.5]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {subtitle}
            </p>
          </div>

          {/* Interactive Split-View Comparison Container */}
          <div
            ref={containerRef}
            className="blueprint-slider-container relative w-full aspect-[16/9] min-h-[380px] md:min-h-[480px] rounded-xl overflow-hidden border border-[#333336] select-none cursor-col-resize shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              if (e.touches.length > 0) handleMove(e.touches[0].clientX);
            }}
          >
            {/* 3D Render Layer (Right Base Layer) */}
            <div className="blueprint-img-frame absolute inset-0 w-full h-full">
              <Image
                src={renderImg}
                alt="3D Spatial Render Result"
                fill
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority
              />
              <div
                className="blueprint-badge right-badge absolute top-6 right-6 z-10 px-4 py-2 bg-[rgba(6,6,6,0.85)] backdrop-blur-md border border-[rgba(78,203,160,0.4)] rounded text-[10px] tracking-[2px] text-[#4ecba0]"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                ◆ 3D SPATIAL RENDER
              </div>
            </div>

            {/* 2D Blueprint Layer (Left Clipped Overlay) */}
            <div
              className="blueprint-img-frame clipped-frame absolute inset-0 w-full h-full z-10 pointer-events-none"
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
              <div
                className="blueprint-badge left-badge absolute top-6 left-6 z-10 px-4 py-2 bg-[rgba(6,6,6,0.85)] backdrop-blur-md border border-[rgba(212,168,67,0.4)] rounded text-[10px] tracking-[2px] text-[#d4a843]"
                style={{ fontFamily: "var(--font-dm-mono), monospace" }}
              >
                ◆ 2D ARCHITECTURAL BLUEPRINT
              </div>
            </div>

            {/* Central Divider & Handle */}
            <div
              className="blueprint-divider-line absolute top-0 bottom-0 w-[2px] bg-[#d4a843] z-20 -translate-x-1/2 shadow-[0_0_16px_rgba(212,168,67,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="blueprint-handle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#d4a843] text-[#060606] flex items-center justify-center shadow-[0_0_24px_rgba(212,168,67,0.8)] border-2 border-[#f4f0e8]">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
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
