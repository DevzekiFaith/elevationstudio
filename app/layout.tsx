import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Elevation Studio — Integrated Brand, Digital & Space Architecture Studio",
    template: "%s | Elevation Studio Nigeria",
  },
  description:
    "Nigeria's premier integrated studio fusing visual brand identity, Next.js web engineering, spatial 3D architecture, and culture transformation along the Ogun–Lagos corridor — powered by Mindvest Global.",
  keywords: [
    "Architectural rendering company Lagos",
    "Interior design studio Abuja",
    "3D architectural visualization Nigeria",
    "Elevation Studio",
    "Elevation Studio Nigeria",
    "www.elevationstudiong.com.ng",
    "elevationstudiong.com.ng",
    "3D architectural rendering Lagos",
    "Architectural visualization studio Nigeria",
    "Interior design renders Abuja",
    "Brand Identity Studio Nigeria",
    "Digital Engineering Agency Lagos",
    "Space Design Studio Ogun Lagos Corridor",
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
    title: "Elevation Studio — Integrated Brand, Digital, Space & Culture Studio",
    description:
      "Nigeria's only integrated studio combining visual brand identity, Next.js web engineering, 3D spatial architecture, and culture transformation under one roof.",
    url: DOMAIN,
    siteName: "Elevation Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${DOMAIN}/volta_stage_4.png`,
        width: 1200,
        height: 630,
        alt: "Elevation Studio — Integrated Brand, Digital & Space Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevation Studio — Integrated Brand, Digital & Space Architecture",
    description:
      "Architecture, Brand, Digital, and Culture Transformation under one roof. Based in Ogun–Lagos corridor serving clients globally.",
    creator: "@mindvestglobal",
    images: [`${DOMAIN}/volta_stage_4.png`],
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
  "@type": "ProfessionalService",
  name: "Elevation Studio",
  image: `${DOMAIN}/volta_stage_4.png`,
  "@id": DOMAIN,
  url: DOMAIN,
  sameAs: [
    DOMAIN,
    "https://elevationstudiong.com.ng",
    "https://instagram.com/elevationstudio.ng",
    "https://mindvestglobalresources.com.ng",
  ],
  telephone: "+2349119059859",
  email: "mindvestglobalresources@gmail.com",
  priceRange: "₦500,000 - ₦50,000,000+",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ogun — Lagos Corridor",
    addressLocality: "Lagos / Ogun State",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 6.5244,
    longitude: 3.3792,
  },
  areaServed: ["NG", "US", "GB", "Worldwide"],
  parentOrganization: {
    "@type": "Organization",
    name: "Mindvest Global Resources LLC",
    url: "https://mindvestglobalresources.com.ng",
  },
  knowsAbout: [
    "Architectural Rendering & 3D Visualization",
    "Architectural rendering company Lagos",
    "Interior design studio Abuja",
    "3D architectural visualization Nigeria",
    "Brand Identity Systems",
    "Digital Web Engineering",
    "Spatial Architecture & Interior Renders",
    "Real Estate Masterplan Marketing",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Elevation Studio Capabilities & Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Package 01 — The Foundation (Brand Identity Systems)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Package 02 — The Structure (Brand + Digital Engineering)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Package 03 — The Elevation (Brand + Digital + Presence + Space)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Package 04 — The Master Plan (Brand + Digital + Space + Culture)",
        },
      },
    ],
  },
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
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <CurrencyProvider>
          <ScrollProgress />
          <CustomCursor />
          {children}
        </CurrencyProvider>
      </body>
    </html>
  );
}
