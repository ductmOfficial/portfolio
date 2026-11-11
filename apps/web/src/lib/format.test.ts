import { describe, expect, it } from "vitest";
import { formatMetric, formatMonth, formatRange } from "./format";

describe("format", () => {
  it("formats months per locale", () => {
    expect(formatMonth("2026-02", "en")).toBe("Feb 2026");
    expect(formatMonth("2026-02", "vi")).toBe("02/2026");
    expect(formatMonth("2026-02", "de")).toMatch(/^Feb\.? 2026$/);
  });

  it("uses locale grouping and a true minus sign", () => {
    expect(formatMetric({ value: 6500, prefix: "~" }, "en")).toBe("~6,500");
    expect(formatMetric({ value: 6500, prefix: "~" }, "de")).toBe("~6.500");
    expect(formatMetric({ value: -549, unit: "kB" }, "en")).toBe("−549 kB");
  });

  it("renders open-ended ranges", () => {
    expect(formatRange("2021-10", null, "Present", "en")).toBe("Oct 2021 – Present");
  });
});
