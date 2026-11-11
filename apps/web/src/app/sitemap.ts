import type { MetadataRoute } from "next";
import { cv } from "@/content/cv";
import { isVisible } from "@/content/select";
import { locales } from "@/content/schema";
import { cvMode } from "@/lib/mode";
import { languageAlternates } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = cv.projects
    .filter((p) => p.caseStudy && isVisible(p, cvMode))
    .map((p) => `/work/${p.id}`);
  const paths = [
    "",
    "/experience",
    "/work",
    ...caseStudies,
    "/skills",
    "/about",
    "/cv",
    "/metrics",
  ];
  const abs = (p: string) => new URL(p, siteUrl).toString();
  const lastModified = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: abs(`/${locale}${path}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/work/") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(languageAlternates(path)).map(([k, v]) => [k, abs(v)]),
        ),
      },
    })),
  );
}
