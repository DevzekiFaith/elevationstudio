import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#060608] text-white overflow-hidden pointer-events-none select-none">
      {/* 1. Header Navigation Skeleton */}
      <div className="w-full h-20 px-4 sm:px-12 flex items-center justify-between border-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/[0.06] rounded-none animate-pulse" />
          <div className="w-36 h-5 bg-white/[0.06] rounded-none animate-pulse" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="w-20 h-4 bg-white/[0.04] rounded-none animate-pulse" />
          <div className="w-20 h-4 bg-white/[0.04] rounded-none animate-pulse" />
          <div className="w-20 h-4 bg-white/[0.04] rounded-none animate-pulse" />
          <div className="w-20 h-4 bg-white/[0.04] rounded-none animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-16 h-8 bg-white/[0.05] rounded-none animate-pulse" />
          <div className="w-28 h-8 bg-[var(--gold)]/20 rounded-none animate-pulse" />
        </div>
      </div>

      {/* 2. Monumental Hero Section Skeleton */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 pt-16 sm:pt-24 pb-16 space-y-8">
        {/* Tag Pill Skeleton */}
        <div className="w-44 h-7 bg-white/[0.05] rounded-none animate-pulse" />

        {/* Big Bold Headline Skeleton */}
        <div className="space-y-4 max-w-4xl">
          <div className="w-11/12 h-12 sm:h-20 lg:h-24 bg-white/[0.06] rounded-none animate-pulse" />
          <div className="w-4/5 h-12 sm:h-20 lg:h-24 bg-[var(--gold)]/15 rounded-none animate-pulse" />
          <div className="w-3/5 h-12 sm:h-20 lg:h-24 bg-white/[0.06] rounded-none animate-pulse" />
        </div>

        {/* Subtitle Skeleton */}
        <div className="space-y-2 max-w-xl pt-2">
          <div className="w-full h-4 bg-white/[0.04] rounded-none animate-pulse" />
          <div className="w-3/4 h-4 bg-white/[0.04] rounded-none animate-pulse" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <div className="w-44 h-14 bg-[var(--gold)]/25 rounded-none animate-pulse" />
          <div className="w-48 h-14 bg-emerald-500/20 rounded-none animate-pulse" />
          <div className="w-36 h-14 bg-white/[0.05] rounded-none animate-pulse" />
        </div>

        {/* Ticker / Quick Links Skeleton */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-6 bg-white/[0.03] rounded-none animate-pulse" />
          <div className="h-6 bg-white/[0.03] rounded-none animate-pulse" />
          <div className="h-6 bg-white/[0.03] rounded-none animate-pulse" />
          <div className="h-6 bg-white/[0.03] rounded-none animate-pulse" />
        </div>
      </div>

      {/* 3. Four Divisions Grid Skeleton */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 py-16 space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-3">
            <div className="w-32 h-4 bg-[var(--gold)]/20 rounded-none animate-pulse" />
            <div className="w-72 sm:w-96 h-10 bg-white/[0.06] rounded-none animate-pulse" />
          </div>
          <div className="hidden sm:block w-64 h-10 bg-white/[0.03] rounded-none animate-pulse" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-96 bg-[#0c0d14] rounded-none p-4 space-y-4 animate-pulse">
              <div className="w-full h-48 bg-white/[0.04] rounded-none" />
              <div className="w-3/4 h-6 bg-white/[0.06] rounded-none" />
              <div className="w-1/2 h-4 bg-white/[0.03] rounded-none" />
              <div className="w-full h-10 bg-white/[0.05] rounded-none mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
