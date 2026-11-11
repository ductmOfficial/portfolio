import { describe, expect, it } from "vitest";
import { cv } from "./cv";
import { findPlaceholders, selectCv } from "./select";

describe("selectCv", () => {
  const prod = selectCv(cv, "verified");
  const preview = selectCv(cv, "target");

  it("uses the verified headline and summary in production", () => {
    expect(prod.headline).not.toContain("React Native");
    expect(preview.headline).toContain("React Native");
  });

  it("hides target highlights, projects, contacts and certifications in production", () => {
    const bbx = prod.experience.find((e) => e.id === "bbx-intra");
    expect(bbx?.highlights).toHaveLength(6);
    expect(preview.experience.find((e) => e.id === "bbx-intra")?.highlights).toHaveLength(10);
    expect(prod.projects.map((p) => p.id)).toEqual([
      "multi-tenant-wms",
      "los-dashboards",
      "cinescope",
    ]);
    expect(prod.contacts.some((c) => c.kind === "github")).toBe(false);
    expect(prod.certifications).toEqual([]);
  });

  it("removes target skill groups and target items inside verified groups", () => {
    expect(prod.skills.map((g) => g.id)).not.toContain("quality");
    const fe = prod.skills.find((g) => g.id === "frontend")?.items.map((i) => i.name);
    expect(fe).not.toContain("React Native");
  });

  it("never leaks an unfilled [X] placeholder into production", () => {
    expect(findPlaceholders(prod)).toEqual([]);
  });

  it("flags placeholders that still need evidence in the preview", () => {
    expect(findPlaceholders(preview).length).toBeGreaterThan(0);
  });
});

describe("translations", () => {
  it("translates every verified highlight, summary and company blurb into German and Vietnamese", () => {
    const prod = selectCv(cv, "verified");
    const missing = prod.experience.flatMap((e) =>
      [e.summary, e.about, ...e.highlights.map((h) => h.text)]
        .filter((t) => t !== undefined)
        .filter((t) => typeof t === "string" || !t.de || !t.vi)
        .map(() => e.id),
    );
    expect(missing).toEqual([]);
    expect(typeof prod.summary === "object" && prod.summary.de && prod.summary.vi).toBeTruthy();
  });
});
