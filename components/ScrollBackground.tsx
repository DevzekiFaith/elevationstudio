"use client";

import { useEffect } from "react";

/**
 * ScrollBackground
 * Uses IntersectionObserver to watch sections with data-bg="light" or data-bg="dark".
 * Smoothly transitions the <html> background colour as sections scroll into view.
 * Sections without a data-bg attribute are ignored — they inherit the current body bg.
 */

const LIGHT_BG = "#08080c"; // dark luxury
const DARK_BG  = "#060608"; // deep site black

export function ScrollBackground() {
  useEffect(() => {
    // Set CSS transition on html element once
    const html = document.documentElement;
    html.style.transition = "background-color 0.7s cubic-bezier(0.16,1,0.3,1)";
    html.style.backgroundColor = DARK_BG;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-bg]")
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) return;
        html.style.backgroundColor = DARK_BG;
      },
      {
        threshold: [0.15, 0.35, 0.5],
        rootMargin: "0px 0px -10% 0px",
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return null;
}
