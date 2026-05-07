import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Start a Project — Elevation Studio",
  description:
    "Tell Elevation Studio about your brand, digital, space, or culture project.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <ContactForm />
    </>
  );
}
