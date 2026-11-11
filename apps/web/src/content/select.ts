import type { Cv, CvMode, Status } from "./schema";

interface Tracked {
  status?: Status;
}
interface Versioned<T> {
  verified: T;
  target?: T;
}

export const isVisible = (item: Tracked, mode: CvMode) =>
  mode === "target" || item.status !== "target";
export const pick = <T>(v: Versioned<T>, mode: CvMode): T =>
  mode === "target" && v.target !== undefined ? v.target : v.verified;
const keep = <T extends Tracked>(items: T[], mode: CvMode) =>
  items.filter((i) => isVisible(i, mode));

/** The CV as one audience sees it: production (`verified`) or roadmap preview (`target`). */
export function selectCv(cv: Cv, mode: CvMode) {
  return {
    ...cv,
    headline: pick(cv.headline, mode),
    summary: pick(cv.summary, mode),
    contacts: keep(cv.contacts, mode),
    metrics: keep(cv.metrics, mode),
    experience: keep(cv.experience, mode).map((e) => ({
      ...e,
      highlights: keep(e.highlights, mode),
    })),
    projects: keep(cv.projects, mode),
    skills: keep(cv.skills, mode).map((g) => ({ ...g, items: keep(g.items, mode) })),
    certifications: keep(cv.certifications, mode),
    languages: cv.languages.map((l) => ({ ...l, level: pick(l.level, mode) })),
  };
}
export type SelectedCv = ReturnType<typeof selectCv>;

const PLACEHOLDER = /\[[^\]]*\]/;
/** Lists every unfilled `[X]`-style placeholder, so a release can fail if one leaks into verified content. */
export function findPlaceholders(value: unknown, path = "cv"): string[] {
  if (typeof value === "string") return PLACEHOLDER.test(value) ? [path] : [];
  if (Array.isArray(value))
    return value.flatMap((v, i) => findPlaceholders(v, `${path}[${String(i)}]`));
  if (value && typeof value === "object")
    return Object.entries(value).flatMap(([k, v]) => findPlaceholders(v, `${path}.${k}`));
  return [];
}
