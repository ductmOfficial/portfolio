import type { Metadata } from "next";
import { locales, type Locale } from "@/content/schema";
import { siteName } from "./site";

const ogLocale: Record<Locale, string> = { en: "en_US", de: "de_DE", vi: "vi_VN" };

/** Paths are locale-less ("" for home, "/work" …); every page gets a canonical plus hreflang for all locales. */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/en${path}`,
  };
}

interface PageMeta {
  locale: Locale;
  path?: string;
  title?: string;
  description: string;
  type?: "website" | "article";
  /** Share card; defaults to the locale's site card (file-based images do not reach nested pages that set openGraph). */
  image?: string;
}

/**
 * Per-page metadata. Next replaces (not merges) the `openGraph` object of parent layouts,
 * so each page passes the full set here.
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  type = "website",
  image,
}: PageMeta): Metadata {
  const url = `/${locale}${path}`;
  const fullTitle = title ? `${title} · ${siteName}` : undefined;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      siteName,
      ...(fullTitle ? { title: fullTitle } : {}),
      description,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: image ?? `/${locale}/opengraph-image`, width: 1200, height: 630 }],
    },
  };
}
