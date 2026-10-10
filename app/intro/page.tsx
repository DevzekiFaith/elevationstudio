import { IntroExperience } from "@/components/IntroExperience";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Intro & Spatial Living Concepts | Elevation Studio",
  description:
    "Explore Elevation Studio's premier architectural home concepts, 3D spatial planning, and our 4-step client satisfaction delivery process.",
};

export default function IntroPage() {
  return <IntroExperience />;
}
