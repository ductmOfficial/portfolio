import { describe, expect, it } from "vitest";
import { languageAlternates, pageMetadata } from "./seo";

describe("seo", () => {
  it("lists every locale plus x-default for a path", () => {
    expect(languageAlternates("/work")).toEqual({
      en: "/en/work",
      de: "/de/work",
      vi: "/vi/work",
      "x-default": "/en/work",
    });
  });
  it("sets a self-referencing canonical and the OG locale", () => {
    const m = pageMetadata({
      locale: "de",
      path: "/skills",
      title: "Kenntnisse",
      description: "x",
    });
    expect(m.alternates?.canonical).toBe("/de/skills");
    expect(m.openGraph).toMatchObject({ locale: "de_DE", title: "Kenntnisse · Duc Tran" });
  });
});
