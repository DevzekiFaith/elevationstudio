"use client";

import { useEffect } from "react";

export function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    if (!cursor || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let curX = 0;
    let curY = 0;
    let frame = 0;

    const setHover = (hover: boolean) => {
      if (hover) {
        cursor.style.width = "20px";
        cursor.style.height = "20px";
        ring.style.width = "56px";
        ring.style.height = "56px";
      } else {
        cursor.style.width = "10px";
        cursor.style.height = "10px";
        ring.style.width = "36px";
        ring.style.height = "36px";
      }
    };

    const onMove = (e: MouseEvent) => {
      curX = e.clientX;
      curY = e.clientY;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;

      const under = document.elementFromPoint(curX, curY);
      const interactive = under?.closest(
        'a, button, [role="button"], input, textarea, select, label',
      );
      setHover(Boolean(interactive));
    };

    const animateRing = () => {
      ringX += (curX - ringX) * 0.12;
      ringY += (curY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      frame = requestAnimationFrame(animateRing);
    };

    document.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" aria-hidden />
      <div className="cursor-ring" id="cursorRing" aria-hidden />
    </>
  );
}
