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

      {/* BACKDROP AND SPACIOUS MODAL ROUTE CONTAINER */}
      <main className="min-h-screen bg-[#060709]/95 backdrop-blur-2xl text-[#f4f0e8] pt-24 sm:pt-32 pb-16 sm:pb-28 px-3 sm:px-8 md:px-12 flex items-center justify-center relative overflow-y-auto">
        
        {/* Dynamic Modal Window with Generous Spacing & Padding */}
        <div className="relative w-full max-w-3xl bg-[#0c0e13] border border-[#232630] hover:border-[var(--gold-border)] rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] p-4 sm:p-8 md:p-12 my-4 sm:my-10 transition-all duration-300">
          
          {/* Top Bar with Number & Close Button */}
          <div className="flex flex-wrap justify-between items-center pb-5 sm:pb-6 border-b border-[#1f222a] mb-6 sm:mb-8 gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="font-mono text-xs tracking-widest text-[var(--gold)] uppercase font-semibold px-2.5 sm:px-3 py-1 rounded bg-[var(--gold)]/10 border border-[var(--gold)]/20">
                {pkg.num}
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">•</span>
              <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[var(--muted)] uppercase">
                STRATEGIC SCOPE SPECIFICATION
              </span>
            </div>

            <Link
              href="/#packages"
              className="group flex items-center gap-2 font-mono text-xs tracking-widest text-[#a0a4b0] hover:text-white uppercase transition-colors px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10"
              title="Close modal and return to packages section"
            >
              <span>CLOSE</span>
              <span className="text-[var(--gold)] group-hover:rotate-90 transition-transform duration-300">✕</span>
            </Link>
          </div>

          {/* Package Title & Subtitle */}
          <div className="mb-6 sm:mb-8">
            <h1 className="font-bebas text-3xl sm:text-5xl md:text-6xl text-white tracking-wider leading-none mb-2 sm:mb-3">
              {pkg.name}
            </h1>
            <div className="font-cormorant italic text-base sm:text-xl text-[var(--gold)]">
              {pkg.subtitle}
            </div>
          </div>

          {/* Description Block */}
          <div className="p-4 sm:p-6 mb-8 sm:mb-10 border-l-4 border-[var(--gold)] bg-[#131620] rounded-r-xl">
            <p className="font-cormorant text-base sm:text-xl text-[#e0deda] leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Pricing & Milestone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 bg-[#11141c] p-4 sm:p-7 rounded-xl border border-white/10 shadow-inner">
            <div className="p-1 sm:p-2">
              <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase mb-2">
                STARTING INVESTMENT
              </div>
              <div className="font-mono text-sm sm:text-base text-[var(--gold)] font-bold tracking-wider">
                {pkg.range}
              </div>
            </div>
            <div className="p-1 sm:p-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
              <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase mb-2">
                PAYMENT MILESTONE SCHEDULE
              </div>
              <div className="font-mono text-sm sm:text-base font-bold text-white mb-1.5">
                {pkg.paymentSplit}
              </div>
              <div className="text-xs text-[var(--muted)] leading-relaxed">
                {pkg.paymentDesc}
              </div>
            </div>
          </div>

          {/* Base Inclusion */}
          <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 px-4 sm:px-6 bg-[#12151e] rounded-lg border border-white/5">
            <div className="font-mono text-xs text-[var(--muted)] flex flex-wrap items-center gap-2">
              <span className="text-[var(--gold)] font-bold">—</span>
              <span>BASE FOUNDATION:</span>
              <strong className="text-white font-medium pl-1">{pkg.baseInclude}</strong>
            </div>
          </div>

          {/* Detailed Pillars */}
          <div className="space-y-4 sm:space-y-8 mb-8 sm:mb-10">
            {pkg.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-7 rounded-xl bg-[#141722] border border-white/10 hover:border-[var(--gold-border)] transition-all duration-300 shadow-md"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-[var(--gold)] font-bold px-2 py-0.5 rounded bg-[var(--gold)]/10">
                    0{idx + 1}
                  </span>
                  <h2 className="font-mono text-xs sm:text-sm tracking-widest text-[var(--gold)] uppercase font-semibold">
                    {pillar.title}
                  </h2>
                </div>

                <p className="text-sm sm:text-base font-medium text-white mb-4 pl-3 sm:pl-4 border-l-2 border-[var(--gold)]/30">
                  {pillar.sub}
                </p>

                {pillar.details && pillar.details.length > 0 && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-3 sm:pl-6 py-2 border-t border-white/5">
                    {pillar.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="text-xs sm:text-sm text-[#b5b8c2] flex items-start gap-2.5 leading-normal py-1"
                      >
                        <span className="text-[var(--gold)] font-bold text-xs select-none mt-0.5">+</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-8 border-t border-[#1f222a] flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link
              href="/#packages"
              className="text-xs font-mono tracking-wider text-[var(--muted)] hover:text-white transition-colors uppercase flex items-center gap-2 px-2 py-1"
            >
              <span>←</span>
              <span>RETURN TO ALL PACKAGES</span>
            </Link>

            <Magnetic strength={0.2}>
              <Link
                href={pkg.ctaHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 bg-[var(--gold)] hover:bg-[#e2bd47] text-black font-mono text-xs tracking-widest uppercase font-semibold rounded-sm transition-all duration-300 shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.45)] transform hover:-translate-y-0.5"
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
