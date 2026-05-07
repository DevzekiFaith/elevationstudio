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
  title: "Elevation Studio — Brand. Digital. Space. Culture.",
  description:
    "Elevation Studio is Nigeria's only integrated brand, digital, and space design studio — backed by Mindvest Global's transformation intelligence.",
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
    >
      <body className="min-h-screen antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
