import { z } from "zod";

export const locales = ["en", "de", "vi"] as const;
export const LocaleSchema = z.enum(locales);
export type Locale = z.infer<typeof LocaleSchema>;
export const defaultLocale: Locale = "en";

/** `verified` = backed by evidence, shown in production. `target` = roadmap item, preview only. */
export const StatusSchema = z.enum(["verified", "target"]);
export type Status = z.infer<typeof StatusSchema>;

export const CvModeSchema = z.enum(["verified", "target"]);
export type CvMode = z.infer<typeof CvModeSchema>;

/** Plain string (same in all locales) or per-locale text; missing locales fall back to English. */
export const TextSchema = z.union([
  z.string().min(1),
  z.object({
    en: z.string().min(1),
    de: z.string().min(1).optional(),
    vi: z.string().min(1).optional(),
  }),
]);
export type Text = z.infer<typeof TextSchema>;

/** A value whose target version replaces the verified one in target mode. */
const versioned = <T extends z.ZodType>(schema: T) =>
  z.object({ verified: schema, target: schema.optional() });

const tracked = { status: StatusSchema.optional() };

export const MonthSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM");

export const HighlightSchema = z.object({ text: TextSchema, ...tracked });

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  city: TextSchema,
  country: z.string().length(2),
  title: z.string(),
  employment: z.enum(["freelance", "full-time"]).optional(),
  start: MonthSchema,
  end: MonthSchema.nullable(),
  titleHistory: TextSchema.optional(),
  about: TextSchema.optional(),
  /** One-line summary used on the home timeline. */
  summary: TextSchema,
  highlights: z.array(HighlightSchema),
  compact: z.boolean().optional(),
  ...tracked,
});

export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** Case-study headline; falls back to `name`. */
  title: TextSchema.optional(),
  kicker: TextSchema,
  description: TextSchema,
  metric: TextSchema.optional(),
  url: z.string().optional(),
  repo: z.string().optional(),
  stack: z.array(z.string()),
  caseStudy: z.boolean().optional(),
  ...tracked,
});

export const SkillGroupSchema = z.object({
  id: z.string(),
  name: TextSchema,
  /** `match`: phrases that identify the skill in highlights and project stacks (defaults to the English name). */
  items: z.array(z.object({ name: TextSchema, match: z.array(z.string()).optional(), ...tracked })),
  ...tracked,
});

export const MetricSchema = z.object({
  id: z.string(),
  value: z.number(),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  unit: z.string().optional(),
  label: TextSchema,
  ...tracked,
});

export const ContactSchema = z.object({
  kind: z.enum(["email", "phone", "linkedin", "github", "website"]),
  value: z.string(),
  href: z.string(),
  ...tracked,
});

export const CvSchema = z.object({
  name: z.string(),
  headline: versioned(z.string()),
  location: TextSchema,
  availability: TextSchema,
  summary: versioned(TextSchema),
  contacts: z.array(ContactSchema),
  metrics: z.array(MetricSchema),
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  skills: z.array(SkillGroupSchema),
  education: z.array(
    z.object({
      degree: z.string(),
      school: z.string(),
      city: TextSchema,
      country: z.string().length(2),
      end: MonthSchema,
    }),
  ),
  certifications: z.array(z.object({ name: z.string(), date: z.string().optional(), ...tracked })),
  languages: z.array(z.object({ name: TextSchema, level: versioned(TextSchema) })),
});

export type CvInput = z.input<typeof CvSchema>;
export type Cv = z.output<typeof CvSchema>;
export type Experience = z.output<typeof ExperienceSchema>;
export type Project = z.output<typeof ProjectSchema>;
export type Metric = z.output<typeof MetricSchema>;
