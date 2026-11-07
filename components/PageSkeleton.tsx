"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageSkeleton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Display skeleton immediately on client mount then smoothly fade out
    const timer = setTimeout(() => {
      setMounted(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!mounted && (
        <motion.div
          key="skeleton-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#060608] text-white overflow-hidden pointer-events-none select-none flex flex-col justify-between"
        >
          {/* Header Navigation Skeleton */}
          <div className="w-full h-20 px-4 sm:px-12 flex items-center justify-between border-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/[0.08] rounded-none animate-pulse" />
              <div className="w-36 h-5 bg-white/[0.08] rounded-none animate-pulse" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 h-8 bg-white/[0.05] rounded-none animate-pulse" />
              <div className="w-28 h-8 bg-[var(--gold)]/25 rounded-none animate-pulse" />
            </div>
          </div>

          {/* Monumental Hero Section Skeleton */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-12 space-y-7 flex-1 flex flex-col justify-center">
            <div className="w-44 h-7 bg-white/[0.05] rounded-none animate-pulse" />
            <div className="space-y-4 max-w-4xl">
              <div className="w-11/12 h-12 sm:h-20 lg:h-24 bg-white/[0.07] rounded-none animate-pulse" />
              <div className="w-4/5 h-12 sm:h-20 lg:h-24 bg-[var(--gold)]/20 rounded-none animate-pulse" />
              <div className="w-3/5 h-12 sm:h-20 lg:h-24 bg-white/[0.07] rounded-none animate-pulse" />
            </div>
            <div className="space-y-2 max-w-xl pt-2">
              <div className="w-full h-4 bg-white/[0.04] rounded-none animate-pulse" />
              <div className="w-3/4 h-4 bg-white/[0.04] rounded-none animate-pulse" />
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="w-44 h-14 bg-[var(--gold)]/30 rounded-none animate-pulse" />
              <div className="w-48 h-14 bg-emerald-500/20 rounded-none animate-pulse" />
            </div>
          </div>

          {/* Bottom pulse shimmer bar */}
          <div className="w-full h-1 bg-white/[0.03] overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-1/3 h-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
