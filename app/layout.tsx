import type { Metadata } from "next";
import {
  Bebas_Neue,
  Cormorant_Garamond,
  DM_Mono,
  Syne,
} from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://elevationstudio.vercel.app"),
  title: {
    default: "Elevation Studio — Integrated Brand, Digital & Space Architecture Studio",
    template: "%s | Elevation Studio",
  },
  description:
    "Nigeria's premier integrated studio fusing visual brand identity, Next.js digital engineering, spatial architecture, and culture transformation — powered by Mindvest Global.",
  keywords: [
    "Elevation Studio",
    "Brand Identity Studio Nigeria",
    "Digital Engineering Agency Lagos",
    "Space Design Studio Ogun Lagos Corridor",
    "Real Estate Masterplan Visualisation",
    "Luxury Hospitality Brand Agency",
    "Culture Architecture Mindvest Global",
    "Zeki Ubor Architecture Studio",
    "Next.js Development Agency Nigeria",
  ],
  authors: [{ name: "Zeki Ubor — Elevation Studio" }],
  creator: "Elevation Studio / Mindvest Global Resources LLC",
  publisher: "Mindvest Global Resources LLC",
  alternates: {
    canonical: "https://elevationstudio.vercel.app",
  },
  openGraph: {
    title: "Elevation Studio — Brand. Digital. Space. Culture.",
    description:
      "Nigeria's only integrated studio combining visual brand identity, web engineering, spatial architecture, and culture transformation under one roof.",
    url: "https://elevationstudio.vercel.app",
    siteName: "Elevation Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elevation Studio — Integrated Brand, Digital & Space Architecture",
    description:
      "Architecture, Brand, Digital, and Culture Transformation under one roof. Based in Ogun–Lagos corridor serving clients globally.",
    creator: "@mindvestglobal",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Elevation Studio",
  image: "https://elevationstudio.vercel.app/volta_stage_4.png",
  "@id": "https://elevationstudio.vercel.app",
  url: "https://elevationstudio.vercel.app",
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
  parentOrganization: {
    "@type": "Organization",
    name: "Mindvest Global Resources LLC",
    url: "https://mindvestglobalresources.com.ng",
  },
  knowsAbout: [
    "Brand Identity Systems",
    "Digital Web Engineering",
    "Spatial Architecture & Interior Renders",
    "Organisational Culture Transformation",
    "Real Estate Masterplan Marketing",
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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
