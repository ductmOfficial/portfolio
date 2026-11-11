import type { SelectedCv } from "./select";
import { tx } from "@/lib/text";

export interface Usage {
  kind: "experience" | "project";
  id: string;
  label: string;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Whole-word, case-insensitive match ("React" ≠ "Reactive"); a trailing `*` makes a prefix ("white-label*"). */
const matcher = (phrases: string[]) =>
  new RegExp(
    `(^|[^\\w])(${phrases.map((p) => (p.endsWith("*") ? escape(p.slice(0, -1)) : `${escape(p)}(?!\\w)`)).join("|")})`,
    "i",
  );

/** Where a skill shows up in the (already mode-filtered) CV: jobs by highlight text, projects by stack. */
export function usageOf(
  item: { name: Parameters<typeof tx>[0]; match?: string[] },
  cv: SelectedCv,
): Usage[] {
  const re = matcher(item.match ?? [tx(item.name, "en")]);
  const jobs = cv.experience
    .filter((e) => e.highlights.some((h) => re.test(tx(h.text, "en"))))
    .map((e) => ({
      kind: "experience" as const,
      id: e.id,
      label: e.company.replace(/ GmbH$/, ""),
    }));
  const projects = cv.projects
    .filter((p) => p.stack.some((s) => re.test(s)))
    .map((p) => ({ kind: "project" as const, id: p.id, label: p.name }));
  return [...jobs, ...projects];
}
