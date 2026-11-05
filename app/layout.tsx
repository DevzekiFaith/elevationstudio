import type { Metadata, Viewport } from "next";
import {
  Bebas_Neue,
  Cormorant_Garamond,
  DM_Mono,
  Syne,
} from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CurrencyProvider } from "@/components/CurrencyContext";
import { HomecareSmartPopup } from "@/components/HomecareSmartPopup";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Analytics } from "@vercel/analytics/next";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const dmMono = DM_Mono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const DOMAIN = "https://www.elevationstudiong.com.ng";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#060608",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Elevation Studio — Architectural Design, 3D Visualization & Digital Engineering",
    template: "%s | Elevation Studio Nigeria",
  },
  description:
    "Nigeria's premier architectural and spatial studio. Contractor-ready working drawings, licensed structural/MEP engineering, 4K 3D visualization, and diaspora remote project oversight along the Ogun–Lagos corridor.",
  keywords: [
    "Architectural design Nigeria",
    "Architectural firm Lagos",
    "House plan drawing in Nigeria",
    "3D architectural rendering Lagos",
    "Architectural rendering company Lagos",
    "Interior design studio Abuja",
    "3D architectural visualization Nigeria",
    "Elevation Studio",
    "Elevation Studio Nigeria",
    "www.elevationstudiong.com.ng",
    "elevationstudiong.com.ng",
    "Luxury residential architects Nigeria",
    "Lekki Phase 1 architectural design",
    "Ikoyi luxury villa design",
    "Ogun Lagos corridor real estate masterplan",
    "Bungalow architectural drawings Nigeria",
    "Duplex architectural plans Nigeria",
    "Commercial plaza design Lagos",
    "Diaspora building property in Nigeria",
    "Diaspora architectural services Nigeria",
    "Real Estate Masterplan 3D Visualisation Nigeria",
    "3D Interior Renders Lekki Victoria Island Ikoyi",
    "Walkthrough Animation Studio Nigeria",
    "Spatial Architecture Firm Lagos",
    "Zeki Ubor Architecture Studio",
  ],
  authors: [{ name: "Zeki Ubor — Elevation Studio" }],
  creator: "Elevation Studio / Mindvest Global Resources LLC",
  publisher: "Mindvest Global Resources LLC",
  alternates: {
    canonical: DOMAIN,
  },
  openGraph: {
    title: "Elevation Studio — Architectural Design, 3D Visualization & Digital Platforms",
    description:
      "Contractor-ready working drawings, licensed engineering, 4K 3D visualization, and remote diaspora project oversight. Serving clients across Nigeria and globally.",
    url: DOMAIN,
    siteName: "Elevation Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DOMAIN}/renders/modern_5bed_alternative_materials.jpg`,
        width: 1200,
        height: 675,
        alt: "Elevation Studio — 3D Spatial Architecture & Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevation Studio — Architectural Design, 3D Visualization & Digital Platforms",
    description:
      "Contractor-ready working drawings, licensed structural/MEP engineering, and photorealistic 3D visualization. Based in Ogun–Lagos corridor serving clients worldwide.",
    creator: "@mindvestglobal",
    images: [`${DOMAIN}/renders/modern_5bed_alternative_materials.jpg`],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "2Bp0Uvg6fEQtGvzJR7t41i96T1-30PDbpLQXzgAkAdM",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "ArchitecturalService"],
      "@id": `${DOMAIN}/#organization`,
      name: "Elevation Studio",
      image: `${DOMAIN}/renders/modern_5bed_alternative_materials.jpg`,
      url: DOMAIN,
      sameAs: [
        DOMAIN,
        "https://elevationstudiong.com.ng",
        "https://instagram.com/elevationstudio.ng",
        "https://mindvestglobalresources.com.ng",
      ],
      telephone: "+2349119059859",
      email: ["support@mindvestglobalresources.com.ng", "lightwavesupport@gmail.com"],
      priceRange: "₦500,000 - ₦50,000,000+",
      currenciesAccepted: "NGN, USD, GBP",
      paymentAccepted: "Bank Transfer, Wire, Card",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ogun — Lagos Residential Corridor",
        addressLocality: "Lagos / Ogun State",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 6.6852,
        longitude: 3.4158,
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Nigeria",
        },
        {
          "@type": "Country",
          name: "United Kingdom",
        },
        {
          "@type": "Country",
          name: "United States",
        },
        {
          "@type": "Country",
          name: "Canada",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "42",
        bestRating: "5",
        worstRating: "1",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Mindvest Global Resources LLC",
        url: "https://mindvestglobalresources.com.ng",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
      knowsAbout: [
        "Architectural Working Drawings & Submission Sets",
        "3D Architectural Rendering Lagos",
        "Structural Engineering Calculations",
        "Mechanical Electrical Plumbing (MEP) Engineering",
        "4K Cinema Walkthrough Animations",
        "Diaspora Remote Construction Assurance",
        "Commercial Plaza & Masterplan Design",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Elevation Studio Core Divisions",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Division 01 — Complete Architectural Design Package",
              description: "Contractor-ready working drawings, structural/MEP sets, 4K renders, and municipal submission sets.",
            },
            price: "750000",
            priceCurrency: "NGN",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Division 02 — Standalone 3D Visualization & 4K Animation",
              description: "Photorealistic 3D exterior/interior renders and cinematic marketing walkthroughs.",
            },
            price: "250000",
            priceCurrency: "NGN",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Division 03 — Branding & High-Performance Digital Platforms",
              description: "Brand identity systems, investor pitch collateral, and custom Next.js web portals.",
            },
            price: "300000",
            priceCurrency: "NGN",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Division 04 — Corporate Workforce Capacity Building",
              description: "Custom organizational development and workforce training powered by Mindvest Global.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      url: DOMAIN,
      name: "Elevation Studio",
      description: "Nigeria's Integrated Architecture, 3D Visualization & Digital Studio",
      publisher: {
        "@id": `${DOMAIN}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${bebas.variable} ${cormorant.variable} ${dmMono.variable} ${syne.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased overflow-x-hidden" suppressHydrationWarning>
        <CurrencyProvider>
          <CartProvider>
            <ScrollProgress />
            <CustomCursor />
            {children}
            <CartDrawer />
            <HomecareSmartPopup />
            <Analytics />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
