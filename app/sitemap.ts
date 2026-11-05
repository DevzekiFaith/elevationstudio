import { MetadataRoute } from "next";
import { RENDERS } from "@/lib/rendersData";

const BASE_URL = "https://www.elevationstudiong.com.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Core static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/renders`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic 3D render detail pages for complete Google indexing
  const renderPages: MetadataRoute.Sitemap = RENDERS.map((render) => ({
    url: `${BASE_URL}/renders/${render.id}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticPages, ...renderPages];
}
