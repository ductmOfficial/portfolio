import type { MDXContent } from "mdx/types";
import type { Locale } from "@/content/schema";

type Loader = () => Promise<{ default: MDXContent }>;
interface CaseStudy {
  /** Links the case study to a job for the facts panel (period, role, company). */
  experienceId?: string;
  /** Every locale is required: a missing translation is a type error, not a runtime fallback. */
  body: Record<Locale, Loader>;
}

/** Keys are project ids in cv.ts with `caseStudy: true`; the slug in /work/[slug] is the same id. */
export const caseStudies: Record<string, CaseStudy> = {
  "multi-tenant-wms": {
    experienceId: "bbx-intra",
    body: {
      en: () => import("./multi-tenant-wms/en.mdx"),
      de: () => import("./multi-tenant-wms/de.mdx"),
      vi: () => import("./multi-tenant-wms/vi.mdx"),
    },
  },
  "los-dashboards": {
    experienceId: "heureka",
    body: {
      en: () => import("./los-dashboards/en.mdx"),
      de: () => import("./los-dashboards/de.mdx"),
      vi: () => import("./los-dashboards/vi.mdx"),
    },
  },
  lumi: {
    body: {
      en: () => import("./lumi/en.mdx"),
      de: () => import("./lumi/de.mdx"),
      vi: () => import("./lumi/vi.mdx"),
    },
  },
};
