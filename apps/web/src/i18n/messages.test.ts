import { describe, expect, it } from "vitest";
import { de } from "./messages/de";
import { en } from "./messages/en";
import { vi } from "./messages/vi";

const keys = (o: object, p = ""): string[] =>
  Object.entries(o).flatMap(([k, v]: [string, unknown]) =>
    v && typeof v === "object" ? keys(v, `${p}${k}.`) : [`${p}${k}`],
  );

const at = (o: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((v, s) => (v as Record<string, unknown>)[s], o);

describe("messages", () => {
  it.each([
    ["de", de],
    ["vi", vi],
  ] as const)("%s has the same keys as en, none empty", (_, m) => {
    expect(keys(m).sort()).toEqual(keys(en).sort());
    expect(keys(m).filter((k) => !at(m, k))).toEqual([]);
  });
});
