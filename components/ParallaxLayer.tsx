"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "vertical" | "horizontal";
  rotate?: boolean;
}

export function ParallaxLayer({
  children,
  speed = 0.2,
  className = "",
  direction = "vertical",
  rotate = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * -150, speed * 150]
  );
  
  const rawRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [rotate ? speed * -15 : 0, rotate ? speed * 15 : 0]
  );

  const offset = useSpring(rawOffset, { stiffness: 100, damping: 20 });
  const rotation = useSpring(rawRotate, { stiffness: 100, damping: 20 });

  return (
    <div ref={ref} className={`relative ${className}`.trim()}>
      <motion.div
        style={{
          ...(direction === "vertical" ? { y: offset } : { x: offset }),
          ...(rotate ? { rotate: rotation } : {}),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
