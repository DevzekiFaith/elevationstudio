import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RENDERS } from "@/lib/rendersData";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Magnetic } from "@/components/Magnetic";
import { WhatsAppButton } from "@/components/WhatsAppButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return RENDERS.map((render) => ({
    id: render.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const render = RENDERS.find((r) => r.id === resolvedParams.id);
  if (!render) return {};

  const title = `${render.title} — 3D Spatial Concept Architecture`;
  const description = `${render.description} Engineered by Elevation Studio along the Ogun–Lagos corridor.`;
  const pageUrl = `https://www.elevationstudiong.com.ng/renders/${render.id}`;

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
      images: [
        {
          url: `https://www.elevationstudiong.com.ng${render.image}`,
          width: 1200,
          height: 675,
          alt: render.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://www.elevationstudiong.com.ng${render.image}`],
    },
  };
}

export default async function RenderDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const renderIndex = RENDERS.findIndex((r) => r.id === resolvedParams.id);
  if (renderIndex === -1) {
    notFound();
  }

  const render = RENDERS[renderIndex];
  const prevRender = RENDERS[(renderIndex - 1 + RENDERS.length) % RENDERS.length];
  const nextRender = RENDERS[(renderIndex + 1) % RENDERS.length];

  return (
    <>
      <Nav />

      <main className="min-h-screen bg-[#060606] text-[#f4f0e8] pt-28 pb-20 relative overflow-hidden">
        {/* Top Breadcrumb & Navigation */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 mb-8 flex flex-wrap justify-between items-center gap-4">
          <Link
            href="/#renders"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[var(--gold)] uppercase hover:text-[var(--gold-bright)] transition-colors"
          >
            ← BACK TO SPATIAL GALLERY
          </Link>
          <div className="font-mono text-xs tracking-wider text-[var(--muted)] uppercase">
            CONCEPT 0{renderIndex + 1} OF 0{RENDERS.length}
          </div>
        </div>

        {/* ULTRA-LARGE IMMERSIVE HD VIEWPORT CONTAINER */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-16">
          <Reveal direction="zoom" duration={0.7}>
            <div className="relative w-full h-[60vh] md:h-[82vh] min-h-[480px] rounded-2xl overflow-hidden border border-[#333336] shadow-[0_25px_80px_rgba(0,0,0,0.85)] group">
              <Image
                src={render.image}
                alt={render.title}
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-black/30 opacity-70 pointer-events-none" />

              {/* Category & Location Badges */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[#060606]/80 backdrop-blur-md border border-[var(--gold-border)] rounded text-[11px] font-mono tracking-widest text-[var(--gold)] uppercase shadow-lg">
                  {render.categoryLabel}
                </span>
                <span className="px-4 py-2 bg-[#060606]/80 backdrop-blur-md border border-white/10 rounded text-[11px] font-mono tracking-widest text-[#f4f0e8]/80 uppercase">
                  {render.location}
                </span>
              </div>

              {/* Overlay Bottom Title Banner */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 z-10">
                <h1 className="text-[clamp(36px,5.5vw,84px)] font-bebas leading-[0.92] text-white tracking-wide drop-shadow-md">
                  {render.title}
                </h1>
              </div>
            </div>
          </Reveal>
        </section>

        {/* SPECIFICATIONS & ARCHITECTURAL BREAKDOWN */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <Reveal direction="up" delay={0.1}>
              <div>
                <div className="section-tag mb-4 flex items-center gap-3 text-xs font-mono tracking-[4px] text-[var(--gold)] uppercase">
                  Architectural Concept Narrative
                </div>
                <p className="text-lg md:text-xl font-serif italic text-white/80 leading-relaxed">
                  {render.description}
                </p>
              </div>
            </Reveal>

            {render.architecturalHighlights && render.architecturalHighlights.length > 0 && (
              <Reveal direction="up" delay={0.2}>
                <div className="p-8 bg-[#0e0e10] border border-[#333336] rounded-xl glow-card-border">
                  <h3 className="font-bebas text-2xl text-[var(--gold)] tracking-wider mb-4">
                    SPATIAL ENGINEERING HIGHLIGHTS
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {render.architecturalHighlights.map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-white/70 leading-relaxed font-sans">
                        <span className="text-[var(--gold)] mt-0.5">◆</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <Reveal direction="up" delay={0.3}>
              <TiltCard glare maxTilt={5}>
                <div className="p-8 bg-[#0e0e10] border border-[#333336] rounded-xl flex flex-col gap-6">
                  <div className="font-mono text-xs tracking-[3px] text-[var(--gold)] uppercase border-b border-[#333336] pb-4">
                    TECHNICAL SPECIFICATIONS
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {render.specs.map((sp, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-white font-sans">
                        <span className="text-[var(--gold)] text-xs">◆</span>
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#333336]">
                    <Magnetic strength={0.35} className="w-full">
                      <a
                        href={`https://wa.me/2349119059859?text=${encodeURIComponent(
                          `Hello Elevation Studio, I am inspecting your HD 3D Spatial Concept "${render.title}" (https://www.elevationstudiong.com.ng/renders/${render.id}) and would like to commission a similar architectural masterplan.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-6 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs tracking-[2px] uppercase font-semibold rounded text-center block transition-colors shadow-lg"
                      >
                        COMMISSION SIMILAR 3D SCOPE →
                      </a>
                    </Magnetic>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </section>

        {/* BOTTOM PREVIOUS / NEXT PROJECT NAVIGATION */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 border-t border-[#333336] pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href={`/renders/${prevRender.id}`}
              className="p-6 bg-[#0e0e10] border border-[#333336] hover:border-[var(--gold-border)] rounded-xl transition-all group flex flex-col gap-2"
            >
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase group-hover:text-[var(--gold)] transition-colors">
                ← PREVIOUS SPATIAL CONCEPT
              </span>
              <span className="font-bebas text-2xl text-white group-hover:text-[var(--gold)] transition-colors truncate">
                {prevRender.title}
              </span>
            </Link>

            <Link
              href={`/renders/${nextRender.id}`}
              className="p-6 bg-[#0e0e10] border border-[#333336] hover:border-[var(--gold-border)] rounded-xl transition-all group flex flex-col items-end text-right gap-2"
            >
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] uppercase group-hover:text-[var(--gold)] transition-colors">
                NEXT SPATIAL CONCEPT →
              </span>
              <span className="font-bebas text-2xl text-white group-hover:text-[var(--gold)] transition-colors truncate">
                {nextRender.title}
              </span>
            </Link>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </>
  );
}
