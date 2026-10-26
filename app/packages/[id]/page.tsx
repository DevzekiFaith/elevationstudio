import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageBySlug, PACKAGES_DATA } from "@/lib/packagesData";
import { Nav } from "@/components/Nav";
import { PackagePriceBadge } from "@/components/PackagePriceBadge";
import { CurrencyToggle } from "@/components/CurrencyToggle";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const params: { id: string }[] = [];
  PACKAGES_DATA.forEach((pkg) => {
    params.push({ id: pkg.id });
    pkg.slugs.forEach((slug) => {
      if (slug !== pkg.id) {
        params.push({ id: slug });
      }
    });
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const pkg = getPackageBySlug(resolvedParams.id);
  if (!pkg) return {};

  const title = `${pkg.num} — ${pkg.name} | Elevation Studio`;
  const description = `${pkg.subtitle}: ${pkg.description}`;
  const pageUrl = `https://www.elevationstudiong.com.ng/packages/${resolvedParams.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
    },
  };
}

export default async function PackageDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const pkg = getPackageBySlug(resolvedParams.id);

  if (!pkg) {
    notFound();
  }

  const whatsappMessage = `Hello Elevation Studio, I would like to discuss budget flexibility and scope calibration for ${pkg.name} (${pkg.num}).`;

  return (
    <>
      <Nav />

      {/* Futuristic Flexible Container */}
      <main className="min-h-screen bg-[#050608] text-[#f4f0e8] relative selection:bg-[var(--gold)] selection:text-black overflow-x-hidden">
        {/* Subtle Ambient Glows */}
        <div
          className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at top right, rgba(212,168,67,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="fixed bottom-0 left-0 w-[600px] h-[600px] pointer-events-none z-0"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(16,185,129,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Ambient Top Subtle Grid Accent */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-28 sm:pt-36 pb-20 sm:pb-32 flex flex-col gap-8 lg:gap-12">
          
          {/* Friendly Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.16em] text-[var(--gold)] uppercase font-semibold">
                PACKAGE SCOPE &amp; DELIVERABLES
              </span>
              <span className="text-zinc-600 font-mono hidden sm:inline">|</span>
              <span className="font-mono text-[10px] sm:text-xs tracking-wider text-zinc-400 uppercase hidden sm:inline">
                {pkg.num}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CurrencyToggle />
              <Link
                href="/#packages"
                className="group flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-wider text-zinc-400 hover:text-white uppercase transition-colors px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
                title="Return to all commissions"
              >
                <span>← ALL PACKAGES</span>
              </Link>
            </div>
          </div>

          {/* Flexible 2-Column Arrangement (Clean & Accessible) */}
          <div className="w-full flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            
            {/* ─── LEFT: EXECUTIVE BRIEF & INVESTMENT CONSOLE (STICKY) ─── */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-32 flex flex-col gap-6">
              
              <div className="p-6 sm:p-8 bg-[#0a0c12]/90 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                {/* Glowing Top Edge Accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

                {/* Package Category Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] tracking-widest text-[var(--gold)] uppercase font-bold px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                    {pkg.num}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                    VERIFIED PACKAGE
                  </span>
                </div>

                {/* Monumental Title */}
                <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wider leading-none mb-2">
                  {pkg.name}
                </h1>

                {/* Subtitle */}
                <div className="font-syne text-sm sm:text-base text-[var(--gold)] font-medium mb-4">
                  {pkg.subtitle}
                </div>

                {/* Executive Brief Box */}
                <div className="p-4 rounded-xl bg-[#121520] border border-white/5 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light mb-6">
                  {pkg.description}
                </div>

                {/* Investment HUD Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {/* Starting Investment */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#121520] border border-white/5 flex flex-col justify-between">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1">
                      Starting Investment
                    </span>
                    <div className="font-mono text-base sm:text-lg text-[var(--gold)] font-bold">
                      <PackagePriceBadge pkgId={pkg.id} fallback={pkg.range} />
                    </div>
                  </div>

                  {/* Payment Milestone */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#121520] border border-white/5 flex flex-col justify-between">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider mb-1">
                      Payment Schedule
                    </span>
                    <div className="font-mono text-sm sm:text-base text-white font-bold">
                      {pkg.paymentSplit}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-400 font-mono mb-6 pb-6 border-b border-white/5 leading-relaxed">
                  {pkg.paymentDesc}
                </div>

                {/* Base Foundation Pill */}
                {pkg.baseInclude && (
                  <div className="mb-6 p-3 sm:p-3.5 rounded-xl bg-[var(--gold)]/5 border border-[var(--gold)]/20 flex items-center gap-2.5">
                    <span className="text-[var(--gold)] font-mono text-xs font-bold">◆</span>
                    <div className="font-mono text-[10.5px] sm:text-[11px] text-zinc-300">
                      <span className="text-zinc-500 uppercase">Includes:</span>{" "}
                      <strong className="text-white font-medium">{pkg.baseInclude}</strong>
                    </div>
                  </div>
                )}

                {/* Budget Flexibility & Calibration Note */}
                <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#121520] to-[#0c0e17] border border-[var(--gold)]/20 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center shrink-0 mt-0.5 text-[var(--gold)]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="4" y1="21" x2="4" y2="14" />
                      <line x1="4" y1="10" x2="4" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="3" />
                      <line x1="20" y1="21" x2="20" y2="16" />
                      <line x1="20" y1="12" x2="20" y2="3" />
                      <line x1="1" y1="14" x2="7" y2="14" />
                      <line x1="9" y1="8" x2="15" y2="8" />
                      <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] font-semibold text-white tracking-wide uppercase flex items-center gap-1.5">
                      <span>Tailored to Fit Your Project Budget</span>
                    </div>
                    <p className="font-sans text-xs text-zinc-400 mt-1 leading-relaxed">
                      All commissions are modular. If your plot, scope, or milestone schedule differs from this baseline, our team is open to discussion and calibrating deliverables to match your budget.
                    </p>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-col gap-3">
                  <Link
                    href={pkg.ctaHref}
                    className="w-full py-4 px-6 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-black font-mono text-xs font-extrabold uppercase tracking-[0.16em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,168,67,0.35)] hover:shadow-[0_6px_28px_rgba(212,168,67,0.55)] active:scale-95 text-center"
                  >
                    <span>{pkg.cta}</span>
                    <span className="text-sm font-black">→</span>
                  </Link>

                  <a
                    href={`https://wa.me/2349119059859?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 bg-[#161824] hover:bg-[#1d2030] text-zinc-200 hover:text-[var(--gold)] border border-white/10 hover:border-[var(--gold)]/30 font-mono text-xs font-semibold uppercase tracking-wider rounded-xl transition-all text-center flex items-center justify-center gap-2 active:scale-95 group"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[var(--gold)] group-hover:scale-110 transition-transform"
                      aria-hidden="true"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>Discuss Budget Flexibility</span>
                    <span className="text-[var(--gold)] font-bold">↗</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ─── RIGHT: DELIVERABLES LIST (CLEAR, ACCESSIBLE PILLARS) ─── */}
            <div className="w-full lg:w-7/12 flex flex-col gap-6">
              
              {/* Matrix Banner Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-widest font-semibold">
                    WHAT YOU GET IN THIS PACKAGE
                  </span>
                  <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-0.5">
                    COMPLETE LIST OF DELIVERABLES
                  </h2>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase hidden sm:inline">
                  {pkg.pillars.length} Service Areas
                </span>
              </div>

              {/* Pillars Cards */}
              <div className="flex flex-col gap-5 sm:gap-6">
                {pkg.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 bg-[#0a0c12]/90 hover:bg-[#0e111a] border border-white/10 hover:border-[var(--gold)]/40 rounded-2xl transition-all duration-300 shadow-xl relative overflow-hidden group"
                  >
                    {/* Corner Tag */}
                    <div className="absolute top-4 right-4 font-mono text-[9px] text-zinc-600 uppercase tracking-widest select-none">
                      PART 0{idx + 1}
                    </div>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="font-mono text-xs text-[var(--gold)] font-bold px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                        0{idx + 1}
                      </span>
                      <h3 className="font-mono text-xs sm:text-sm tracking-wider text-white uppercase font-bold">
                        {pillar.title}
                      </h3>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs sm:text-sm text-[var(--gold)] font-medium mb-5 pl-3 border-l-2 border-[var(--gold)]/40">
                      {pillar.sub}
                    </p>

                    {/* Deliverable Specifications Grid */}
                    {pillar.details && pillar.details.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/5">
                        {pillar.details.map((detail, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-2.5 sm:p-3 rounded-xl bg-[#121420]/80 border border-white/5 hover:border-white/10 transition-colors flex items-start gap-2.5"
                          >
                            <span className="text-[var(--gold)] text-[9px] mt-0.5 select-none shrink-0 font-bold">
                              ◆
                            </span>
                            <span className="font-sans text-xs text-zinc-300 leading-snug font-light">
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom Navigation Return */}
              <div className="pt-6 flex items-center justify-between text-xs font-mono text-zinc-500">
                <Link
                  href="/#packages"
                  className="hover:text-[var(--gold)] transition-colors flex items-center gap-2"
                >
                  <span>←</span>
                  <span>EXPLORE ALL B2B COMMISSIONS</span>
                </Link>

                <span>ELEVATION STUDIO · 2026</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
