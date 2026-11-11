import { describe, expect, it } from "vitest";
import { cv } from "./cv";
import { selectCv } from "./select";
import { usageOf } from "./usage";

const prod = selectCv(cv, "verified");
const ids = (name: string) => {
  const item = prod.skills
    .flatMap((g) => g.items)
    .find((i) => (typeof i.name === "string" ? i.name : i.name.en) === name);
  if (!item) throw new Error(`no skill ${name}`);
  return usageOf(item, prod).map((u) => u.id);
};

describe("usageOf", () => {
  it("links skills to jobs by highlight text", () => {
    expect(ids("ECharts")).toEqual(["bbx-intra", "multi-tenant-wms"]);
    expect(ids("Leaflet")).toEqual(["heureka"]);
  });
  it("uses match phrases for aliases and practices", () => {
    expect(ids("TanStack Query")).toContain("heureka");
    expect(ids("White-labelling")).toEqual(["bbx-intra"]);
  });
  it("matches whole words only", () => {
    expect(ids("React")).not.toContain("nhn");
  });
});
