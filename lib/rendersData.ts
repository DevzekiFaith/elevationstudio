export interface RenderItem {
  id: string;
  title: string;
  category: "residential" | "commercial" | "event" | "interior";
  categoryLabel: string;
  location: string;
  image: string;
  accentColor: string;
  specs: string[];
  description: string;
  architecturalHighlights?: string[];
}

export const RENDERS: RenderItem[] = [
  {
    id: "0",
    title: "4-Story Commercial Plaza — Front Facade & Executive Parking",
    category: "commercial",
    categoryLabel: "COMMERCIAL & SPATIAL ARCHITECTURE",
    location: "LEKKI PHASE 1 / OGUN-LAGOS CORRIDOR",
    image: "/renders/commercial_plaza_front_facade.jpg",
    accentColor: "#d4a843",
    specs: [
      "4-Story Symmetrical White Rendered Facade",
      "Automated Black Steel Perimeter Gate",
      "Executive Ground-Level Parking Bays",
      "Linear Under-Soffit Warm LED Wash",
      "Floor-to-Ceiling Anodized Shopfront Glazing",
      "Integrated Security Access Control",
    ],
    description:
      "A flagship 4-story commercial plaza front elevation featuring symmetrical architectural white framing, automated security gating, executive courtyard parking for luxury vehicles, and warm linear LED soffit illumination.",
    architecturalHighlights: [
      "Dual vertical structural towers flanking an internal pedestrian courtyard accessway",
      "High-contrast dark anodized aluminum window mullions with floor-to-ceiling double glazing",
      "Recessed perimeter wall sconces highlighting boundary security fencing and driveway paving",
      "Dedicated ground-floor retail showroom bays with unobstructed street-facing visibility",
    ],
  },
  {
    id: "15",
    title: "Lettable Commercial Plaza & Executive Studio Suite",
    category: "commercial",
    categoryLabel: "COMMERCIAL & SPATIAL ARCHITECTURE",
    location: "PRIME BUSINESS LOCATION / OGUN-LAGOS CORRIDOR",
    image: "/renders/lettable_space_commercial_flyer.jpg",
    accentColor: "#d4a843",
    specs: [
      "4-Story Glass & LED Wash Facade",
      "Rooftop Studio Suite (5m x 6m)",
      "Warm Cove Kitchen & Bath Lighting",
      "24/7 Secure Business Environment",
      "Interlocked Courtyard Paving",
      "High-Contrast Aluminium Framing",
    ],
    description:
      "A flagship commercial building masterplan featuring premium office spaces for rent, floor-to-ceiling curtain wall glazing, interlocked paved courtyard, and an executive rooftop studio apartment with custom wood finishes and warm LED cove illumination.",
    architecturalHighlights: [
      "Cantilevered upper floor balconies with embedded linear LED strip wash",
      "Full-height acoustic curtain wall glass panels maximizing natural daylighting",
      "Executive rooftop studio suite (5m x 6m) with dedicated kitchen nook and rain-shower bath",
      "Heavy-duty interlocked stone driveway designed for high-density corporate parking",
    ],
  },
  {
    id: "1",
    title: "5-Bedroom Modern Luxury Residence",
    category: "residential",
    categoryLabel: "RESIDENTIAL ARCHITECTURE",
    location: "LEKKI PHASE 1 / OGUN-LAGOS CORRIDOR",
    image: "/renders/residential_villa_facade.jpg",
    accentColor: "#d4a843",
    specs: [
      "Cantilevered Upper Deck",
      "Linear Facade Strip Lighting",
      "Floor-to-Ceiling Glass Stairwell",
      "Bespoke Wooden Entry Pivot Door",
    ],
    description:
      "A contemporary 5-bedroom private villa defined by bold geometric cantilevers, architectural linear LED wall wash, double-height glass stairwell glazing, and secluded perimeter lighting.",
    architecturalHighlights: [
      "Floating concrete upper cantilever slab",
      "Integrated vertical timber wall cladding",
      "Hidden perimeter nightscape LED channels",
    ],
  },
  {
    id: "2",
    title: "Modern High-Rise Apartment Tower at Dusk",
    category: "residential",
    categoryLabel: "LUXURY HIGH-RISE RESIDENTIAL",
    location: "VICTORIA ISLAND WATERFRONT CORRIDOR",
    image: "/renders/highrise_luxury_apartments.jpg",
    accentColor: "#d4a843",
    specs: [
      "Multi-Tier Balcony Recessed LEDs",
      "Warm Vertical Facade Strips",
      "Reflective Wet Paving Entry Courtyard",
      "Glass Balustrade Decking",
    ],
    description:
      "A multi-level luxury apartment tower captured at dusk, boasting warm vertical strip illumination, glass balustrades, integrated lush terrace planters, and executive entrance drops.",
    architecturalHighlights: [
      "Multi-tiered terrace gardening integration",
      "High-index reflective glass envelope",
    ],
  },
  {
    id: "3",
    title: "Executive 2-Story Luxury Duplex",
    category: "residential",
    categoryLabel: "RESIDENTIAL ARCHITECTURE",
    location: "LEKKI SCHEME 2 / CHEVRON AXIS",
    image: "/renders/modern_duplex_residence.jpg",
    accentColor: "#d4a843",
    specs: [
      "Warm Under-Soffit Lighting",
      "Seamless Glass Balustrade",
      "Landscaped Garden Beds",
      "Interlocked Paved Courtyard",
    ],
    description:
      "A contemporary 2-story luxury duplex boasting integrated under-soffit architectural LED strips, tinted glass balcony railings, and lush perimeter garden beds.",
    architecturalHighlights: [
      "Integrated soffit lighting channels",
      "High-contrast dark roof parapet capping",
    ],
  },
  {
    id: "4",
    title: "Grand Foyer & Floating Staircase",
    category: "interior",
    categoryLabel: "LUXURY INTERIOR ARCHITECTURE",
    location: "PRIVATE RESIDENTIAL SANCTUARY",
    image: "/renders/foyer_staircase_interior.jpg",
    accentColor: "#4ecba0",
    specs: [
      "Floating Tread Staircase",
      "Under-Riser Warm LED Strips",
      "Polished Marble Flooring",
      "Frameless Glass Balustrade",
    ],
    description:
      "An opulent double-height entryway featuring floating marble treads, seamless frameless glass guardrails, custom gallery artwork, and warm indirect cove ambient lighting.",
    architecturalHighlights: [
      "Cantilevered steel structural staircase stringer",
      "Book-matched Italian marble slab floor",
    ],
  },
  {
    id: "5",
    title: "Sprawling Multi-Family Residential Block",
    category: "residential",
    categoryLabel: "MULTI-FAMILY HOUSING COMPLEX",
    location: "OGUN–LAGOS SUBURBAN CORRIDOR",
    image: "/renders/multifamily_residential_block.jpg",
    accentColor: "#d4a843",
    specs: [
      "Linear Multi-Unit Block Structure",
      "Recessed Wall Sconce Lighting",
      "Wood-Accented Recessed Balconies",
      "Cobblestone Perimeter Courtyard",
    ],
    description:
      "A multi-unit residential development designed with high-density architectural symmetry, incorporating warm accent wall sconces, wood-paneled balcony niches, and cobblestone grounds.",
  },
  {
    id: "6",
    title: "Architectural Gallery & Atrium Corridor",
    category: "interior",
    categoryLabel: "COMMERCIAL INTERIOR ARCHITECTURE",
    location: "VICTORIA ISLAND COMMERCIAL TOWER",
    image: "/renders/corporate_lobby_corridor.jpg",
    accentColor: "#4ecba0",
    specs: [
      "Double-Height Skylight Glazing",
      "Linear Acoustic Wooden Ceiling Baffles",
      "High-Gloss Polished Terrazzo",
      "Minimalist Recessed Track Spotlights",
    ],
    description:
      "A grand commercial atrium corridor utilizing natural skylight penetration, sound-absorbing timber ceiling baffles, and polished stone flooring designed for institutional prestige.",
  },
  {
    id: "7",
    title: "Modern Glass Facade Villa Estate",
    category: "residential",
    categoryLabel: "LUXURY RESIDENTIAL COMPOUND",
    location: "LEKKI PHASE 1 WATERFRONT",
    image: "/renders/glass_facade_estate.jpg",
    accentColor: "#d4a843",
    specs: [
      "Floor-to-Ceiling Panoramic Glazing",
      "Cantilevered Infinity Deck",
      "Linear Landscape Sconce Lighting",
      "Executive Entry Portico",
    ],
    description:
      "A waterfront luxury residence designed around unobstructed panoramic views, featuring floor-to-ceiling double-glazed curtain walls and architectural perimeter step lighting.",
  },
  {
    id: "8",
    title: "Twin Luxury Multi-Unit Estate",
    category: "residential",
    categoryLabel: "LUXURY RESIDENTIAL COMPOUND",
    location: "EPE EXP.-WAY / OGUN CORRIDOR",
    image: "/renders/twin_villa_estate.jpg",
    accentColor: "#d4a843",
    specs: [
      "Dual Villa Architectural Layout",
      "Terraced Entrance Porticos",
      "Contrasting Dark Pitch Roof",
      "Subtle Step Recessed Lighting",
    ],
    description:
      "A sprawling dual-villa residential estate combining classic pitch roofs with sleek modern white facade rendering, floating portico steps, and subtle ambient nightscape lighting.",
  },
  {
    id: "9",
    title: "Raw Concrete Executive Gallery Atrium",
    category: "interior",
    categoryLabel: "SPATIAL INTERIOR CONCEPTS",
    location: "ELEVATION STUDIOS HEADQUARTERS",
    image: "/renders/executive_hallway_atrium.jpg",
    accentColor: "#4ecba0",
    specs: [
      "Architectural Cast-in-Place Concrete",
      "Integrated Sculptural Planters",
      "High-Gloss Terrazzo Flooring",
      "Warm Up-spot Lighting",
    ],
    description:
      "A sophisticated gallery atrium showcasing raw board-formed architectural concrete walls, high-gloss terrazzo floor reflections, and oversized illuminated vessel planters.",
  },
  {
    id: "10",
    title: "Luxury Event Centre & Pavilion Walkway",
    category: "event",
    categoryLabel: "HOSPITALITY & EVENT SPACES",
    location: "VICTORIA ISLAND / CORRIDOR",
    image: "/renders/event_centre_pavilion.jpg",
    accentColor: "#a89fd4",
    specs: [
      "Tensile Membrane Conical Canopies",
      "Perimeter Landscape Bollard Lights",
      "Microclimate Paving & Garden Border",
      "Al Fresco Executive Lounge Seating",
    ],
    description:
      "A flagship multi-purpose event grounds concept featuring tensioned conical canopy umbrellas, integrated storm-drain channels, and ambient outdoor garden illumination.",
  },
  {
    id: "11",
    title: "Contemporary Executive Master Suite",
    category: "interior",
    categoryLabel: "HIGH-END INTERIOR CONCEPT",
    location: "EXECUTIVE PENTHOUSE",
    image: "/renders/master_suite_interior.jpg",
    accentColor: "#e5a158",
    specs: [
      "Gallery-Grade Wall Art Curation",
      "Raw Concrete & Wood Accent Wall",
      "Teal Velvet & Linen Bedding Suite",
      "Floor-to-Ceiling Rain-Glass Wall",
    ],
    description:
      "An executive master suite blending raw textured concrete surfaces with teal velvet accents, gallery-grade artwork displays, and floor-to-ceiling acoustic glass partitions.",
  },
  {
    id: "12",
    title: "Commercial Plaza & Mixed-Use Complex",
    category: "commercial",
    categoryLabel: "COMMERCIAL & MIXED-USE PLAZA",
    location: "OGUN–LAGOS COMMERCIAL CORRIDOR",
    image: "/renders/commercial_plaza_facade.jpg",
    accentColor: "#60a5fa",
    specs: [
      "Multi-Tier Balcony Grid",
      "Twilight Architectural Uplighting",
      "Reflective Stone Courtyard Paving",
      "High-Efficiency Glazing",
    ],
    description:
      "A monumental commercial plaza and residential complex designed for high-density elegance, featuring warm facade uplighting, glass balconies, and reflective courtyard paving.",
  },
  {
    id: "13",
    title: "Modern Commercial Plaza & Indoor Atrium",
    category: "commercial",
    categoryLabel: "COMMERCIAL & MIXED-USE PLAZA",
    location: "ABUJA / LAGOS COMMERCIAL CORRIDOR, NIGERIA",
    image: "/renders/modern_plaza_indoor_atrium.jpg",
    accentColor: "#60a5fa",
    specs: [
      "4-Story Skylight Central Courtyard",
      "Linear LED Soffit Strips",
      "Frameless Storefront Glazing",
      "Integrated Digital Directory Totem",
    ],
    description:
      "A flagship 4-story commercial plaza interior atrium in Nigeria featuring a soaring skylight canopy, multi-level glass shopfront balconies, fluted store signage, and polished stone walkway paving.",
  },
  {
    id: "14",
    title: "Family Event Centre & Outdoor Dining Pavilion",
    category: "event",
    categoryLabel: "HOSPITALITY & EVENT SPACES",
    location: "VICTORIA ISLAND / OGUN CORRIDOR, NIGERIA",
    image: "/renders/family_event_centre_pavilion.jpg",
    accentColor: "#a89fd4",
    specs: [
      "Pergola Dining Pavilion Shading",
      "Double-Story Modern Event Villa",
      "Lush Perimeter Planter Wall Sconces",
      "Al Fresco Lattice Lounge Seating",
    ],
    description:
      "A serene multi-purpose family event centre and outdoor dining pavilion, boasting white architectural pergolas, green lattice terrace seating, high-contrast black glass framing, and ambient perimeter lighting.",
  },
];
