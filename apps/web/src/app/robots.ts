import type { MetadataRoute } from "next";
import { cvMode } from "@/lib/mode";
import { siteUrl } from "@/lib/site";

/** The target (roadmap) build must never be indexed; production is open with a sitemap. */
export default function robots(): MetadataRoute.Robots {
  if (cvMode === "target") return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
