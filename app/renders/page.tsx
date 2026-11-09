import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { RENDERS } from "@/lib/rendersData";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const DOMAIN = "https://www.elevationstudiong.com.ng";

export const metadata: Metadata = {
  title: "3D Architectural Renderings & Spatial Concepts Portfolio | Elevation Studio",
  description:
    "Explore Elevation Studio's complete archive of 3D architectural renders, luxury residential villas, commercial plazas, and masterplan animations across Nigeria and the diaspora.",
  alternates: {
    canonical: `${DOMAIN}/renders`,
  },
  openGraph: {
    title: "3D Architectural Concepts & Spatial Portfolio | Elevation Studio Nigeria",
    description:
      "Explore photorealistic 3D architectural renders, luxury residential villas, commercial plazas, and masterplan animations.",
    url: `${DOMAIN}/renders`,
    images: [
      {
        url: `${DOMAIN}/renders/modern_5bed_alternative_materials.jpg`,
        width: 1200,
        height: 675,
        alt: "Elevation Studio 3D Architectural Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Architectural Concepts & Spatial Portfolio | Elevation Studio",
    description:
      "Explore photorealistic 3D architectural renders, luxury residential villas, and commercial plazas across Nigeria.",
    images: [`${DOMAIN}/renders/modern_5bed_alternative_materials.jpg`],
  },
};

export default function RendersArchivePage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#060608] text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-18 2xl:px-22 relative">
        <div className="w-full max-w-[1560px] mx-auto">
          {/* Breadcrumb Header */}
          <div className="mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--gold)] hover:text-white transition-colors mb-4"
            >
              ← Back to Main Studio
            </Link>
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white leading-none">
              3D SPATIAL <span className="text-[var(--gold)]">PORTFOLIO</span>
            </h1>
            <p className="font-sans text-sm sm:text-base text-white/70 font-light max-w-2xl mt-3">
              Explore our photorealistic 3D architectural renderings, luxury residential villas, commercial plazas, and civil engineering sets.
            </p>
          </div>

          {/* Grid of all 3D Renders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {RENDERS.map((render, idx) => (
              <Reveal key={render.id} direction="up" delay={(idx % 6) * 0.08}>
                <TiltCard maxTilt={6} glare className="h-full">
                  <Link
                    href={`/renders/${render.id}`}
                    className="group block rounded-none bg-[#0a0a0f] border border-white/[0.08] hover:border-white/20 transition-all duration-300 h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.98)]"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#121216]">
                      <Image
                        src={render.image}
                        alt={render.title}
                        fill
                        priority={
                          idx < 4 ||
                          render.image === "/renders/modern_5bed_alternative_materials.jpg" ||
                          render.image === "/renders/modern_duplex_residence.jpg" ||
                          render.image === "/renders/modern_5bed_bungalow_day.jpg"
                        }
                        loading={
                          idx < 4 ||
                          render.image === "/renders/modern_5bed_alternative_materials.jpg" ||
                          render.image === "/renders/modern_duplex_residence.jpg" ||
                          render.image === "/renders/modern_5bed_bungalow_day.jpg"
                            ? "eager"
                            : undefined
                        }
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4 rounded-none bg-black/85 backdrop-blur-md border border-white/10 px-3 py-1 font-mono text-[9px] tracking-widest text-white/90 uppercase">
                        {render.categoryLabel}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="font-mono text-[10px] tracking-widest text-[var(--gold)] uppercase mb-2">
                        {render.location}
                      </div>
                      <h2 className="font-syne text-lg font-bold text-white group-hover:text-[var(--gold)] transition-colors line-clamp-2 leading-snug">
                        {render.title}
                      </h2>
                      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/60 group-hover:text-white transition-colors">
                        <span>EXPLORE CONCEPT</span>
                        <span>→</span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

