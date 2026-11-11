import { describe, expect, it } from "vitest";
import { cv } from "../cv";
import { caseStudies } from "./index";

describe("case studies", () => {
  it("has a body for every project marked as a case study, and nothing else", () => {
    const marked = cv.projects
      .filter((p) => p.caseStudy)
      .map((p) => p.id)
      .sort();
    expect(Object.keys(caseStudies).sort()).toEqual(marked);
  });
  it("links to existing jobs", () => {
    for (const c of Object.values(caseStudies)) {
      if (c.experienceId) expect(cv.experience.map((e) => e.id)).toContain(c.experienceId);
    }
  });
});
