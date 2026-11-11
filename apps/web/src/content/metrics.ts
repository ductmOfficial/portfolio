import { z } from "zod";
import raw from "./metrics.json";

const count = z.object({
  total: z.number().int().nonnegative(),
  passed: z.number().int().nonnegative(),
});

export const LighthouseRowSchema = z.object({
  path: z.string(),
  performance: z.number(),
  accessibility: z.number(),
  bestPractices: z.number(),
  seo: z.number(),
  lcpMs: z.number(),
  tbtMs: z.number(),
  cls: z.number(),
  scriptKb: z.number(),
  totalKb: z.number(),
});

/** Shape written by scripts/metrics.mjs. Parsed at build time: a broken CI write fails the build. */
export const MetricsSchema = z.object({
  source: z.enum(["ci", "local"]),
  measuredAt: z.iso.datetime(),
  commit: z.string().nullable(),
  lighthouse: z.array(LighthouseRowSchema),
  budgets: LighthouseRowSchema.omit({ path: true, totalKb: true }).extend({ totalKb: z.number() }),
  tests: z.object({ unit: count, e2e: count, a11y: count }),
});

export type LighthouseRow = z.infer<typeof LighthouseRowSchema>;
export const metrics = MetricsSchema.parse(raw);
