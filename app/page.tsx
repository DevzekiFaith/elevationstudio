"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HeroRedesign } from "@/components/redesign/HeroRedesign";
import { FourDivisions } from "@/components/redesign/FourDivisions";
import { CompleteArchitecturalPackage } from "@/components/redesign/CompleteArchitecturalPackage";
import { BuildYourProject } from "@/components/redesign/BuildYourProject";
import { WhoWeWorkWith } from "@/components/redesign/WhoWeWorkWith";
import { FinalCTASection } from "@/components/redesign/FinalCTASection";
import { RenderGallery } from "@/components/RenderGallery";
import { Testimonials } from "@/components/Testimonials";
import { LocationMap } from "@/components/LocationMap";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#060608] text-[#f4f0e8] relative selection:bg-[var(--gold)] selection:text-black">
      {/* Global Navigation Header */}
      <Nav />

      {/* 01. Hero Section: Big Bold Letters & Immediate Closing */}
      <HeroRedesign />

      {/* 02. The 4 Specialized Divisions (Clean Visual Cards) */}
      <FourDivisions />

      {/* 03. Visual Proof: 3D Photorealistic Architectural Renders */}
      <section id="renders" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#090a0f] border-t border-white/5">
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-2">
                Selected Works Archive
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white">
                Featured 3D Renders & <br />
                <span className="text-[var(--gold)]">Architectural Works</span>
              </h2>
            </div>
            <p className="font-sans text-xs sm:text-sm text-white/60 max-w-sm font-light">
              Concept studies and commissioned residential and commercial projects across Nigeria and the diaspora.
            </p>
          </div>
        </div>
        <RenderGallery />
      </section>

      {/* 04. Flagship Offer: Complete Architectural Design Package */}
      <CompleteArchitecturalPackage />

      {/* 05. 3-Click Scope Configurator: Build & Close on WhatsApp */}
      <BuildYourProject />

      {/* 06. Who We Serve: 4 Clean Client Pathways */}
      <WhoWeWorkWith />

      {/* 07. Verified Client Feedback */}
      <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#060608] border-t border-white/5">
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-2">
            Client Verification
          </span>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white">
            Client Stories & <br />
            <span className="text-[var(--gold)]">Verified Reviews</span>
          </h2>
        </div>
        <Testimonials />
      </section>

      {/* 08. Interactive Studio Location & Footprint Map */}
      <section id="location" className="py-20 sm:py-28 px-4 sm:px-8 lg:px-16 xl:px-20 bg-[#08090e] border-t border-white/5 relative">
        <div className="w-full max-w-[var(--container-max)] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
            <div>
              <span className="font-mono text-xs uppercase tracking-[3px] text-[var(--gold)] font-bold block mb-2">
                Operational Base · Physical & Remote Presence
              </span>
              <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase text-white leading-tight">
                Studio Location & <br />
                <span className="text-[var(--gold)]">Geographic Footprint</span>
              </h2>
            </div>
            <div className="max-w-md font-sans text-xs sm:text-sm text-white/70 font-light space-y-2">
              <p>
                Strategically anchored along the <strong className="text-white font-semibold">Ogun — Lagos Corridor</strong> with coordinated project deliveries across Nigeria and global diaspora sites.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[var(--gold)] pt-1">
                <span>● Physical Consultations</span>
                <span>● Site Dimension Verifications</span>
                <span>● Worldwide Remote Delivery</span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <LocationMap height="480px" />
          </div>
        </div>
      </section>

      {/* 09. Big Bold Final Closing Section */}
      <FinalCTASection />

      {/* 09. Minimalist Studio Footer */}
      <footer className="footer relative z-10 border-t border-white/10 bg-[#040406] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-bebas text-2xl tracking-[3px] text-white">
                ELEVATION <span className="text-[var(--gold)]">STUDIO</span>
              </span>
            </Link>
            <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed font-light max-w-sm">
              We design spaces, build digital platforms, and develop capabilities. Coordinated architecture and photorealistic visualization across Nigeria and diaspora corridors.
            </p>

            {/* Official HomeCare Partner Link */}
            <div className="pt-1">
              <a
                href="https://www.homecare.com.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-emerald-400 transition-colors"
              >
                <span>✦ HomeCare Smart Living:</span>
                <span className="underline">www.homecare.com.ng ↗</span>
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2 font-mono text-xs">
            <span className="font-syne text-xs uppercase tracking-widest text-white/40 font-bold block mb-3">
              Divisions
            </span>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="#divisions" className="hover:text-[var(--gold)] transition-colors">
                  01 Architecture & Spatial
                </a>
              </li>
              <li>
                <a href="#divisions" className="hover:text-[var(--gold)] transition-colors">
                  02 Engineering & 3D Visuals
                </a>
              </li>
              <li>
                <a href="#divisions" className="hover:text-[var(--gold)] transition-colors">
                  03 Branding & Digital Web
                </a>
              </li>
              <li>
                <a href="#divisions" className="hover:text-[var(--gold)] transition-colors">
                  04 Workforce Training
                </a>
              </li>
              <li>
                <a href="#flagship" className="hover:text-[var(--gold)] transition-colors">
                  Flagship Complete Pack
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[var(--gold)] transition-colors">
                  Studio Location Map
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Channels (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs text-white/70">
            <span className="font-syne text-xs uppercase tracking-widest text-white/40 font-bold block mb-3">
              Direct Contact
            </span>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Principal Lead</span>
              <span className="text-white font-semibold">Zeki Ubor</span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Direct WhatsApp</span>
              <a
                href="https://wa.me/2349119059859"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--gold)] hover:underline"
              >
                +234 911 905 9859
              </a>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Location Base</span>
              <span className="text-white">Ogun — Lagos Corridor · Serving Nationally & Diaspora</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 py-5 px-4 sm:px-6 lg:px-12 text-center sm:flex sm:justify-between sm:items-center max-w-6xl mx-auto font-mono text-[11px] text-white/40">
          <div>
            © 2026 Elevation Studio · All Rights Reserved
          </div>
          <div className="mt-2 sm:mt-0">
            A Subsidiary of{" "}
            <a
              href="https://mindvestglobalresources.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--gold)] hover:underline"
            >
              Mindvest Global Resources LLC
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Priority WhatsApp Channel */}
      <WhatsAppButton />
    </div>
  );
}
