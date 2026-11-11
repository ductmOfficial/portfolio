import { describe, expect, it } from "vitest";
import { negotiate } from "./proxy";

describe("negotiate", () => {
  it("picks the highest-ranked supported language", () => {
    expect(negotiate("de-DE,de;q=0.9,en;q=0.8")).toBe("de");
    expect(negotiate("fr-FR,vi;q=0.7,en;q=0.5")).toBe("vi");
  });
  it("falls back to English", () => {
    expect(negotiate("ja-JP")).toBe("en");
    expect(negotiate(null)).toBe("en");
  });
});
