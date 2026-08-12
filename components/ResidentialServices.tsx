"use client";

import Link from "next/link";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { Magnetic } from "./Magnetic";

export function ResidentialServices() {
  const residentialOptions = [
    {
      id: "res-arch",
      code: "01",
      title: "RESIDENTIAL ARCHITECTURE",
      price: "Starting from ₦1.5M",
      description: "For clients planning modern bungalows, duplexes and private homes.",
      suitableFor: "Modern Bungalows • Duplexes • Private Homes",
      scope: [
        "Discovery and client brief",
        "Space planning",
        "Floor plan development",
        "Architectural concept and building massing",
        "Façade design",
        "Material and finish direction",
        "Key elevations and sections",
        "Detailed 3D architectural model",
        "3–5 high-quality exterior visualizations",
        "Up to 2 design revision rounds",
        "Final design presentation",
      ],
      ctaText: "START RESIDENTIAL PROJECT →",
      accent: "var(--gold)",
    },
    {
      id: "res-master",
      code: "02",
      title: "RESIDENTIAL MASTERPLAN",
      price: "Starting from ₦4.5M",
      description:
        "For luxury homes, villas, private compounds, multiple residential buildings and complex residential developments.",
      suitableFor:
        "Luxury Bungalows • Villas • Private Compounds • Multiple Residential Buildings • Sprawling Estates",
      scope: [
        "Everything in Residential Architecture",
        "Advanced architectural design development",
        "Site and compound planning",
        "Entrance and gate concept",
        "Landscape concept",
        "Exterior lighting direction",
        "Premium material and finish direction",
        "Expanded 3D design development",
        "6–10 high-quality visualizations",
        "Selected interior concept direction",
        "Up to 3 design revision rounds",
        "Premium final presentation",
      ],
      ctaText: "START MASTERPLAN PROJECT →",
      accent: "var(--bridge-accent)",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "DISCOVERY",
      text: "We understand the client's vision, plot, lifestyle, requirements and project goals.",
    },
    {
      step: "02",
      title: "ARCHITECTURE",
      text: "We develop the space planning, floor plans, circulation and architectural concept.",
    },
    {
      step: "03",
      title: "DESIGN",
      text: "We develop the façade, materials, finishes and 3D visualizations.",
    },
    {
      step: "04",
      title: "BUILD",
      text: "We prepare the agreed final design and presentation package for the next stage.",
    },
  ];

  return (
    <section
      className="residential-section py-20 sm:py-28 md:py-36 px-6 md:px-16 lg:px-24 bg-[#060606] relative overflow-hidden"
      id="residential"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[var(--gold)]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section Header */}
        <Reveal direction="up" duration={0.6}>
          <div className="mb-14 md:mb-20">
            <div className="section-tag mb-3">Service Category</div>
            <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide text-white mb-4">
              RESIDENTIAL & <span style={{ color: "var(--gold)" }}>PRIVATE CLIENT</span> SERVICES
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--white-dim)] max-w-3xl leading-relaxed">
              Dedicated architectural spatial design, floor planning, facade engineering, and masterplanning for private homeowners, modern bungalow builders, villa compounds, and multi-unit residential developments.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Residential Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {residentialOptions.map((opt, idx) => (
            <Reveal key={opt.id} direction="up" delay={idx * 0.15}>
              <TiltCard glare maxTilt={4} className="h-full">
                <div className="h-full bg-[#0a0a0e] border border-white/10 hover:border-[var(--gold-border)] rounded-2xl p-8 sm:p-10 md:p-12 flex flex-col justify-between transition-all duration-500 shadow-2xl relative overflow-hidden group">
                  {/* Card Header */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6 border-b border-white/10 pb-6">
                      <div>
                        <span className="font-mono text-xs tracking-[3px] text-[var(--gold)] uppercase block mb-1">
                          Option {opt.code}
                        </span>
                        <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                          {opt.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs text-[var(--muted)] block">PRICING</span>
                        <span className="font-mono text-lg sm:text-xl font-bold text-[var(--gold-bright)] whitespace-nowrap">
                          {opt.price}
                        </span>
                      </div>
                    </div>

                    <p className="font-sans text-sm sm:text-base text-white/80 mb-6 italic">
                      {opt.description}
                    </p>

                    {/* Suitable For Banner */}
                    <div className="bg-[#121218] border border-white/5 rounded-xl p-4 mb-8">
                      <div className="font-mono text-[10px] tracking-[2px] text-[var(--gold)] uppercase mb-1">
                        SUITABLE FOR
                      </div>
                      <div className="font-sans text-xs sm:text-sm text-white/90 font-medium">
                        {opt.suitableFor}
                      </div>
                    </div>

                    {/* Deliverables Scope List */}
                    <div className="mb-8">
                      <div className="font-mono text-xs tracking-[2px] text-white/60 uppercase mb-4">
                        WHAT IS INCLUDED:
                      </div>
                      <ul className="space-y-2.5">
                        {opt.scope.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 font-mono">
                            <span className="text-[var(--gold)] shrink-0 mt-0.5">✦</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="pt-6 border-t border-white/10">
                    <Link
                      href={`#contact?pkg=${opt.id}`}
                      className="w-full py-4 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-center rounded-xl transition-all duration-300 block shadow-lg shadow-[var(--gold)]/10 group-hover:scale-[1.01]"
                    >
                      {opt.ctaText}
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* Required Pricing Footnote */}
        <Reveal direction="up" delay={0.2}>
          <div className="text-center font-mono text-xs text-[var(--muted)] mb-20 max-w-2xl mx-auto">
            “Final professional fees are determined by project size, complexity, site conditions and required deliverables.”
          </div>
        </Reveal>

        {/* 4-Step Residential Client Workflow */}
        <Reveal direction="up" delay={0.25}>
          <div className="bg-[#09090d] border border-white/10 rounded-2xl p-8 sm:p-12 md:p-16 mb-16">
            <div className="text-center mb-12">
              <span className="font-mono text-xs tracking-[4px] text-[var(--gold)] uppercase block mb-2">
                CLIENT WORKFLOW
              </span>
              <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl text-white tracking-wide">
                HOW WE DESIGN YOUR RESIDENTIAL HOME
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((wf) => (
                <div
                  key={wf.step}
                  className="bg-[#111116] border border-white/5 rounded-xl p-6 relative flex flex-col justify-between hover:border-[var(--gold-border)]/40 transition-colors"
                >
                  <div>
                    <span className="font-mono text-2xl font-bold text-[var(--gold)] block mb-3">
                      {wf.step}
                    </span>
                    <h4 className="font-bebas text-xl text-white tracking-wider mb-2">
                      {wf.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                      {wf.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Strong Bottom CTA Section */}
        <Reveal direction="up" delay={0.3}>
          <div className="bg-gradient-to-r from-[#121218] via-[#1a1a24] to-[#121218] border border-[var(--gold-border)]/40 rounded-2xl p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl mx-auto">
              <span className="font-mono text-xs tracking-[4px] text-[var(--gold)] uppercase block mb-3">
                START YOUR RESIDENTIAL PROJECT
              </span>
              <h3 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide mb-4">
                LET&apos;S BUILD YOUR DREAM RESIDENTIAL SPACE
              </h3>
              <p className="font-sans text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
                “Tell us about your project, your plot and the kind of home you want to create. We begin by understanding your vision before we begin designing it.”
              </p>
              <div className="flex justify-center">
                <Magnetic strength={0.3}>
                  <Link
                    href="#contact"
                    className="px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-bright)] text-[#060606] font-mono text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 shadow-xl shadow-[var(--gold)]/20 hover:scale-105 block"
                  >
                    START YOUR PROJECT →
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
