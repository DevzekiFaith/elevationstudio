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
    num: "B2B Commission · Package 01",
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
    num: "B2B Commission · Package 02",
    name: "THE STRUCTURE",
    subtitle: "Brand + Digital + Presence",
    description: "We give your business a complete professional look, build you a fast custom website, and make sure new clients can easily find you on Google and Google Maps.",
    range: "From ₦1.5M",
    paymentSplit: "50% To Start / 50% On Handover",
    paymentDesc: "50% deposit to start work. 50% final balance when the project is finished and approved.",
    baseInclude: "Full Brand Identity System (Package 01)",
    pillars: [
      {
        title: "GET FOUND ON GOOGLE & MAPS",
        sub: "Make it easy for local clients to discover your business when searching online",
        details: [
          "Complete Google Business Profile and Google Maps setup & verification",
          "Optimized to rank higher so nearby customers find you before competitors",
          "Direct click-to-call, WhatsApp chat, and driving directions for easy customer contact",
          "Smooth link connecting your Google profile directly to your website",
          "Consistent business name, phone number, and address across the internet",
          "Review of local competitors to ensure your business looks more credible and attractive"
        ]
      },
      {
        title: "CUSTOM HIGH-SPEED WEBSITE",
        sub: "A fast, beautiful website designed to turn visitors into paying clients",
        details: [
          "100% custom-built website tailored to your brand (no slow, generic templates)",
          "Fully responsive design that looks stunning on iPhones, Androids, tablets, and laptops",
          "Built-in Google SEO so your pages appear clearly in search engine results",
          "Photo gallery and portfolio showcase to display your best projects and services",
          "Direct WhatsApp inquiry buttons and instant contact forms for new customer leads",
          "Fast page loading speeds so visitors never leave out of frustration"
        ]
      },
      {
        title: "SOCIAL MEDIA & CLIENT INQUIRIES",
        sub: "Ready-to-use branded social posts and automated replies so you never miss a lead",
        details: [
          "Set of matching social media post and story templates for Instagram and LinkedIn",
          "Eye-catching digital promo banners for special announcements and campaigns",
          "Automated welcome email sent instantly whenever a client fills out your contact form",
          "Customer contact capture system that safely stores names, emails, and phone numbers",
          "Easy email notifications sent straight to your phone when someone asks for a quote",
          "Step-by-step guidance on how to manage your inquiries easily"
        ]
      }
    ],
    cta: "START A PROJECT",
    ctaHref: "/contact?package=2"
  },
  {
    id: "3",
    slugs: ["3", "elevation"],
    num: "B2B Commission · Package 03",
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
    num: "B2B Commission · Package 04",
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
  },
  {
    id: "res-concept",
    slugs: ["res-concept", "concept", "concept-planning", "space-planning"],
    num: "B2C Residential · Package A",
    name: "RESIDENTIAL CONCEPT DESIGN",
    subtitle: "Floor Layout & Façade Concept",
    description: "Give your home a clear architectural direction before committing to a complete design. Translates your space requirements and preferred style into a considered floor layout and architectural façade concept.",
    range: "From ₦600K",
    paymentSplit: "70 / 30",
    paymentDesc: "70% commitment deposit to commence layout planning. 30% final balance upon concept approval prior to digital presentation handover.",
    baseInclude: "Spatial Feasibility & Floor Layouts",
    pillars: [
      {
        title: "BRIEF REVIEW & SPATIAL CONSULTATION",
        sub: "Client spatial consultation & lifestyle requirements",
        details: [
          "Review of design brief, space requirements & lifestyle priorities",
          "Plot orientation and solar/wind path review",
          "Building footprint & spatial arrangement optimization"
        ]
      },
      {
        title: "2D FLOOR PLANS & SPACE ARRANGEMENT",
        sub: "Functional zoning and room circulation flow",
        details: [
          "Conceptual floor plan and space arrangement",
          "Room flow, privacy zoning & circulation mapping",
          "Spatial dimensioning & furniture placement guide"
        ]
      },
      {
        title: "FAÇADE CONCEPT & PRESENTATION",
        sub: "Architectural façade concept & digital presentation",
        details: [
          "Architectural façade concept and style direction",
          "Digital design presentation dossier",
          "One consolidated revision round"
        ]
      }
    ],
    cta: "REQUEST CONCEPT DESIGN",
    ctaHref: "/contact?package=res-concept"
  },
  {
    id: "res-arch",
    slugs: ["res-arch", "residential-architecture", "architecture", "private-home"],
    num: "B2C Residential · Package B",
    name: "COMPLETE RESIDENTIAL ARCHITECTURE",
    subtitle: "Principal Private Residential Design",
    description: "For bungalows, duplexes, and private homes. Complete concept development, façade styling, detailed elevations, and 3D photorealistic visualisations.",
    range: "From ₦1.5M",
    paymentSplit: "70 / 30",
    paymentDesc: "70% commitment deposit to commence architectural design and 3D modeling. 30% final balance upon final design approval prior to blueprint and render pack handover.",
    baseInclude: "Everything in Concept & Space Planning",
    pillars: [
      {
        title: "ARCHITECTURAL FAÇADE & ELEVATIONS",
        sub: "Custom exterior design & technical drawings",
        details: [
          "Detailed 2D floor plans, elevations & key sections",
          "Custom exterior façade styling & massing articulation",
          "Door/window schedules & structural opening intent"
        ]
      },
      {
        title: "3D MODEL & PHOTOREALISTIC RENDERS",
        sub: "High-resolution digital visualisations",
        details: [
          "Detailed 3D architectural digital model",
          "3–5 high-quality exterior visualisations",
          "Daytime and evening illumination studies"
        ]
      },
      {
        title: "FINISH DIRECTION & REVISIONS",
        sub: "Material specifications & presentation pack",
        details: [
          "Exterior materials, cladding & finish direction",
          "Up to 2 comprehensive revision rounds",
          "Final high-resolution digital presentation pack"
        ]
      }
    ],
    cta: "GET A PROJECT QUOTATION",
    ctaHref: "/contact?package=res-arch"
  },
  {
    id: "res-master",
    slugs: ["res-master", "residential-masterplan", "masterplan", "estate-compound"],
    num: "B2C Residential · Package C",
    name: "RESIDENTIAL MASTERPLAN",
    subtitle: "Luxury Estates, Villas & Private Compounds",
    description: "For luxury estates, multi-building family compounds, and residential developments requiring comprehensive site coordination, entrance design, and compound masterplanning.",
    range: "From ₦4.5M",
    paymentSplit: "70 / 30",
    paymentDesc: "70% commitment deposit to commence compound planning and multi-structure coordination. 30% balance upon final masterplan sign-off prior to executive dossier handover.",
    baseInclude: "Everything in Complete Architecture",
    pillars: [
      {
        title: "COMPOUND & SITE MASTERPLANNING",
        sub: "Multi-structure zoning & access coordination",
        details: [
          "Comprehensive site layout and building placement",
          "Vehicular driveway, parking & pedestrian circulation",
          "Gatehouse, perimeter wall & grand entrance design"
        ]
      },
      {
        title: "EXTERIOR LIGHTING & LANDSCAPE",
        sub: "Integrated landscape & illumination concepts",
        details: [
          "Landscape concept design & green buffer zones",
          "Nighttime exterior illumination & lighting direction",
          "Premium material and texture finish schedules"
        ]
      },
      {
        title: "EXPANDED RENDERS & INTERIOR DIRECTION",
        sub: "Comprehensive visualization dossier",
        details: [
          "6–10 high-quality photorealistic visualisations",
          "Selected interior concept and spatial direction",
          "Up to 3 comprehensive revision rounds",
          "Executive masterplan presentation dossier"
        ]
      }
    ],
    cta: "DISCUSS YOUR MASTERPLAN",
    ctaHref: "/contact?package=res-master"
  }
];

export function getPackageBySlug(slug: string): PackageDetail | undefined {
  const normalized = slug.toLowerCase().trim();
  return PACKAGES_DATA.find(
    (p) => p.id === normalized || p.slugs.includes(normalized)
  );
}
