"use client";

import { IntroExperience } from "@/components/IntroExperience";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();

  const handleEnterStudio = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("es_intro_seen", "true");
    }
    router.push("/");
  };

  return <IntroExperience onEnterStudio={handleEnterStudio} />;
}
