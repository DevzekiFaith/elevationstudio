"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "zoom" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

export function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.15,
}: RevealProps) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 40, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -40, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0 },
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.85 },
          visible: { opacity: 1, scale: 1 },
        };
      case "none":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1.0], // cubic-bezier smooth ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
