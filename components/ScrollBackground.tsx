"use client";

import { useEffect } from "react";

/**
 * ScrollBackground
 * Uses IntersectionObserver to watch sections with data-bg="light" or data-bg="dark".
 * Smoothly transitions the <html> background colour as sections scroll into view.
 * Sections without a data-bg attribute are ignored — they inherit the current body bg.
 */

const LIGHT_BG = "#f5f3ef"; // warm off-white
const DARK_BG  = "#060606"; // site black

export function ScrollBackground() {
  useEffect(() => {
    // Set CSS transition on html element once
    const html = document.documentElement;
    html.style.transition = "background-color 0.7s cubic-bezier(0.16,1,0.3,1)";

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bg]")
    );

    if (sections.length === 0) return;

    // Set initial bg from first section
    const firstBg = sections[0].dataset.bg;
    html.style.backgroundColor = firstBg === "light" ? LIGHT_BG : DARK_BG;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that is most visible (largest intersectionRatio) and crossing in
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;
        const top = visible[0].target as HTMLElement;
        const bg = top.dataset.bg;
        html.style.backgroundColor = bg === "light" ? LIGHT_BG : DARK_BG;
      },
      {
        // Fire when 35% of the section is visible
        threshold: [0.15, 0.35, 0.5],
        rootMargin: "0px 0px -10% 0px",
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return null;
}
