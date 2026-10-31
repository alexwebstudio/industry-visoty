import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/works", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/contacts", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
  ];
  return [
    ...staticPages.map((p) => ({ url: absoluteUrl(p.path), lastModified: now, priority: p.priority })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      priority: 0.8,
      images: [absoluteUrl(s.image)],
    })),
  ];
}
