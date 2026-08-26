export interface PackagePillar {
  title: string;
  sub: string;
  details: string[];
}

export interface PackageDetail {
  id: string;
  slugs: string[];
  num: string;
  name: string;
  subtitle: string;
  description: string;
  range: string;
  paymentSplit: string;
  paymentDesc: string;
  baseInclude: string;
  pillars: PackagePillar[];
  cta: string;
  ctaHref: string;
}

export const PACKAGES_DATA: PackageDetail[] = [
  {
    id: "1",
    slugs: ["1", "foundation"],
    num: "Package 01",
    name: "THE FOUNDATION",
    subtitle: "Brand Identity Only",
    description: "A foundational identity system crafted for clarity, authority, and architectural distinction.",
    range: "From ₦500K",
    paymentSplit: "50 / 50",
    paymentDesc: "50% deposit to commence work. 50% on final delivery before handover.",
    baseInclude: "Core Brand Identity",
    pillars: [
      {
        title: "MARK & LOGO SYSTEM",
        sub: "Logo & master mark design",
        details: ["Master trademark & icon vector suite", "Monochrome & reversed visual variations", "Favicon & app icon mark exports"]
      },
      {
        title: "COLOUR & TYPOGRAPHY",
        sub: "Colour system & typography",
        details: ["Primary & secondary architectural colour palettes", "Web-safe typography hierarchy", "Print & digital color specifications"]
      },
      {
        title: "GUIDELINES & STATIONERY",
        sub: "Brand guidelines document & stationery suite",
        details: ["Comprehensive brand identity PDF manual", "Business card & letterhead digital templates", "Email signature layout"]
      }
    ],
    cta: "START A PROJECT",
    ctaHref: "/contact?package=1"
  },
  {
    id: "2",
    slugs: ["2", "structure"],
    num: "Package 02",
    name: "THE STRUCTURE",
    subtitle: "Brand + Digital + Presence",
    description: "A complete digital and local transformation of how your business is seen, discovered, experienced, and remembered online.",
    range: "From ₦1.5M",
    paymentSplit: "50 / 50",
    paymentDesc: "50% deposit to commence work. 50% on final delivery before handover.",
    baseInclude: "Everything in Foundation",
    pillars: [
      {
        title: "LOCAL PRESENCE",
        sub: "Google presence optimisation & digital discovery",
        details: [
          "Google Business Profile optimisation",
          "Local digital presence optimisation",
          "Business information and services optimisation",
          "Google-to-website customer journey mapping",
          "Website & profile visual consistency",
          "Local competitor presence review"
        ]
      },
      {
        title: "DIGITAL ENGINEERING",
        sub: "Custom website design & development",
        details: [
          "Custom Next.js web application",
          "Responsive mobile-first interface",
          "High-performance SEO architecture",
          "Speed & accessibility engineering"
        ]
      },
      {
        title: "DIGITAL ASSETS & SYSTEMS",
        sub: "Social media templates & email marketing setup",
        details: [
          "Modular social grid templates",
          "Custom digital campaign banners",
          "Automated onboarding email templates",
          "CRM subscriber capture integration"
        ]
      }
    ],
    cta: "START A PROJECT",
    ctaHref: "/contact?package=2"
  },
  {
    id: "3",
    slugs: ["3", "elevation"],
    num: "Package 03",
    name: "THE ELEVATION",
    subtitle: "Brand + Digital + Space",
    description: "Connecting visual identity, digital presence, and custom 3D spatial architectural transformation.",
    range: "Investment from ₦5M",
    paymentSplit: "40 / 30 / 30",
    paymentDesc: "40% on signing. 30% at design approval milestone. 30% on project completion and handover.",
    baseInclude: "Everything in Structure",
    pillars: [
      {
        title: "SPATIAL CONSULTATION",
        sub: "Space design consultation & architectural direction",
        details: [
          "Site spatial potential analysis",
          "Architectural spatial planning",
          "Space-brand alignment assessment"
        ]
      },
      {
        title: "3D SPATIAL DESIGN",
        sub: "Interior & exterior design concept & documentation",
        details: [
          "Interior design concepts",
          "Exterior facade design concepts",
          "3D architectural visualization & render suite",
          "Spatial transformation documentation"
        ]
      },
      {
        title: "BRAND-SPACE AUDIT",
        sub: "Space-brand physical alignment audit & signage",
        details: [
          "Physical-to-digital brand consistency",
          "Architectural signage design & placement",
          "Physical spatial experience touchpoints"
        ]
      }
    ],
    cta: "START A PROJECT",
    ctaHref: "/contact?package=3"
  },
  {
    id: "4",
    slugs: ["4", "master-plan"],
    num: "Package 04",
    name: "THE MASTER PLAN",
    subtitle: "Brand + Digital + Space + Culture",
    description: "End-to-end organisational transformation combining architecture, digital engineering, and Mindvest culture development.",
    range: "Investment from ₦15M",
    paymentSplit: "30 / 30 / 40",
    paymentDesc: "30% on signing. 30% at midpoint. 40% structured as monthly retainer across the 6–12 month partnership.",
    baseInclude: "Everything in Elevation",
    pillars: [
      {
        title: "ORGANISATIONAL CULTURE",
        sub: "Mindvest culture transformation programme",
        details: ["Mindvest organisational alignment training", "Team culture workshops & manuals", "Leadership executive coaching"]
      },
      {
        title: "EXECUTIVE PARTNERSHIP",
        sub: "6–12 month advisory & transformation partnership",
        details: ["Dedicated lead architect oversight", "Quarterly culture & digital audits", "Continuous brand governance"]
      }
    ],
    cta: "START A PROJECT",
    ctaHref: "/contact?package=4"
  }
];

export function getPackageBySlug(slug: string): PackageDetail | undefined {
  const normalized = slug.toLowerCase().trim();
  return PACKAGES_DATA.find(
    (p) => p.id === normalized || p.slugs.includes(normalized)
  );
}
