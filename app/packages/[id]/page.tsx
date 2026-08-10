import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPackageBySlug, PACKAGES_DATA } from "@/lib/packagesData";
import { Nav } from "@/components/Nav";
import { Magnetic } from "@/components/Magnetic";

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

  return (
    <>
      <Nav />

      {/* BACKDROP AND SMALL MODAL ROUTE CONTAINER */}
      <main className="min-h-screen bg-[#07080a]/90 backdrop-blur-xl text-[#f4f0e8] pt-24 pb-16 px-4 flex items-center justify-center relative overflow-y-auto">
        {/* Dynamic Modal Window */}
        <div className="relative w-full max-w-2xl bg-[#0d0f14] border border-[#2a2d35] hover:border-[var(--gold-border)] rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8 md:p-10 transition-colors duration-300">
          
          {/* Top Bar with Number & Close Button */}
          <div className="flex justify-between items-center pb-5 border-b border-[#1f222a] mb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs tracking-widest text-[var(--gold)] uppercase font-semibold">
                {pkg.num}
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">•</span>
              <span className="font-mono text-[10px] tracking-wider text-[var(--muted)] uppercase">
                STRATEGIC SCOPE
              </span>
            </div>

            <Link
              href="/#packages"
              className="group flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--muted)] hover:text-white uppercase transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
              title="Close modal and return to packages section"
            >
              <span>CLOSE</span>
              <span className="text-[var(--gold)] group-hover:rotate-90 transition-transform duration-300">✕</span>
            </Link>
          </div>

          {/* Package Title & Subtitle */}
          <div className="mb-6">
            <h1 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-wider leading-none mb-2">
              {pkg.name}
            </h1>
            <div className="font-cormorant italic text-base sm:text-lg text-[var(--gold)]">
              {pkg.subtitle}
            </div>
          </div>

          {/* Description */}
          <p className="font-cormorant text-base sm:text-lg text-[#d0cecb] leading-relaxed mb-8 pl-4 border-l-2 border-[var(--gold-border)] bg-gradient-to-r from-white/[0.02] to-transparent py-2">
            {pkg.description}
          </p>

          {/* Pricing & Milestone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-[#12151c] p-4 sm:p-5 rounded-lg border border-white/5">
            <div>
              <div className="font-mono text-[9px] tracking-widest text-[var(--muted)] uppercase mb-1">
                INVESTMENT RANGE
              </div>
              <div className="font-bebas text-2xl sm:text-3xl text-[var(--gold)]">
                {pkg.range}
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-widest text-[var(--muted)] uppercase mb-1">
                PAYMENT MILESTONE SPLIT
              </div>
              <div className="font-mono text-sm font-bold text-white mb-1">
                {pkg.paymentSplit}
              </div>
              <div className="text-[11px] text-[var(--muted)] leading-tight">
                {pkg.paymentDesc}
              </div>
            </div>
          </div>

          {/* Base Inclusion */}
          <div className="mb-6 pb-4 border-b border-[#1f222a]">
            <div className="font-mono text-xs text-[var(--muted)] flex items-center gap-2">
              <span className="text-[var(--gold)]">—</span>
              <span>BASE FOUNDATION:</span>
              <strong className="text-white font-normal">{pkg.baseInclude}</strong>
            </div>
          </div>

          {/* Detailed Pillars */}
          <div className="space-y-6 mb-8">
            {pkg.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#141720]/60 border border-white/5 hover:border-[var(--gold-border)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] text-[var(--gold)] font-bold">
                    0{idx + 1}
                  </span>
                  <h2 className="font-mono text-xs tracking-widest text-[var(--gold)] uppercase font-semibold">
                    {pillar.title}
                  </h2>
                </div>

                <p className="text-sm font-medium text-white mb-3 pl-4">
                  {pillar.sub}
                </p>

                {pillar.details && pillar.details.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 border-l border-white/10">
                    {pillar.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-xs text-[var(--muted)] flex items-start gap-2 leading-snug"
                      >
                        <span className="text-[var(--gold)] text-[10px] select-none">+</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#1f222a] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/#packages"
              className="text-xs font-mono tracking-wider text-[var(--muted)] hover:text-white transition-colors uppercase"
            >
              ← RETURN TO ALL PACKAGES
            </Link>

            <Magnetic strength={0.2}>
              <Link
                href={pkg.ctaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-6 py-3.5 bg-[var(--gold)] hover:bg-[#e2bd47] text-black font-mono text-xs tracking-widest uppercase font-semibold rounded-sm transition-all duration-300 shadow-[0_4px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5"
              >
                <span>{pkg.cta}</span>
                <span>→</span>
              </Link>
            </Magnetic>
          </div>

        </div>
      </main>
    </>
  );
}
