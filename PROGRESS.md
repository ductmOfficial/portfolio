# Progress

> Last updated: 2026-11-11
>
> Legend: ✅ done · 🔄 in progress · ⬜ not started

The portfolio site, built on the `ductran-starter` template and styled with Sen UI. This log records each step, the decisions behind it and the issues met along the way.

## Steps

| #   | Step                                                                  | Branch              | Status |
| --- | --------------------------------------------------------------------- | ------------------- | ------ |
| 1   | Repository from the `ductran-starter` template                        | `main`              | ✅     |
| 2   | Portfolio workspace: drop the sample package and the database         | `chore/setup`       | ✅     |
| 3   | Site with the typed CV model, locales and the main pages              | `feat/site`         | ✅     |
| 4   | Case studies in MDX with themed SVG diagrams                          | `feat/case-studies` | ✅     |
| 5   | Sitemap, robots and share images                                      | `feat/seo`          | ✅     |
| 6   | Printable CV with committed PDFs and a text check                     | `feat/cv`           | ✅     |
| 7   | Playwright and axe tests, `Browser` job in CI                         | `test/e2e`          | ✅     |
| 8   | Lighthouse budgets and the metrics page                               | `feat/metrics`      | ✅     |
| 9   | Sen UI tokens, `data-theme` and Sen UI buttons, with no visual change | `feat/sen-ui`       | ✅     |
| 10  | README, content license and this progress log                         | `docs/readme`       | ✅     |

Each step is a pull request with green `Verify` and `Browser` checks (`Browser` from step 7), merged with rebase.

## Decisions

| Decision                                                                        | Reason                                                                                                                               |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| The site lives in `apps/web` of the starter monorepo                            | Shared ESLint, Prettier and TypeScript presets, the same CI and conventions as every other project                                   |
| Static generation for every page, `proxy.ts` only for the locale redirect       | Fast first load and simple hosting; `/` still picks the visitor's language                                                           |
| CV content typed and validated with Zod, with `verified` and `target` modes     | One source for the site, the PDFs and the roadmap; production can never show a planned item                                          |
| Sen UI tokens overridden in unlayered CSS, site colors as aliases of the tokens | The library stays neutral; the site's look is one block of token values, and Sen UI components pick it up                            |
| Layer order `theme, base, sen, components, utilities`                           | Sen UI sits above Tailwind's reset and below its utilities, so a utility class on a Sen UI component wins                            |
| `data-theme` on `<html>`, always set by an inline script                        | Sen UI and the Tailwind `dark:` variant read the same attribute; setting it explicitly avoids a mismatch with `prefers-color-scheme` |
| Language switcher stays a list of links                                         | Moving between pages is navigation, not a form value; a `Select` would also add about 57 kB gzipped to every page                    |
| Visual check by full-page screenshots before and after Sen UI                   | "No visual change" is checked pixel by pixel on 10 pages, light and dark, desktop and mobile                                         |
| End-to-end, CV and Lighthouse checks in a separate `Browser` job                | Runs in parallel with `Verify`; both are required by the ruleset                                                                     |
| Metrics updated through a pull request (`metrics:pull`), not a bot commit       | `main` only accepts pull requests; the numbers still come from a green CI run on `main`                                              |
| Fonts self-hosted with `font-display: optional` and preloads                    | No third-party request and no layout shift from a late font swap                                                                     |
| Code under MIT, personal content all rights reserved                            | Others may reuse the code; the CV and case studies describe one real person                                                          |
| No Co-Authored-By trailer in commits                                            | Maintainer's preference                                                                                                              |

## Follow-ups

- [ ] Run `metrics:pull` after the first green CI run on `main`, so `/metrics` shows CI numbers
- [ ] Promote the Sen UI project in the CV from `target` to verified, with its real numbers
- [ ] Case study links for the movie app once it is live under its new name

## Issue log

- **2026-11-11:** the starter's `nextjs` preset sets `types: ["node"]`, which also hides `@types/mdx`; imports of `.mdx` files failed typecheck until the app listed `"mdx"` in its own `types`.
- **2026-11-11:** the shared ESLint preset (`strict-type-checked`) reported 76 issues that the previous linter allowed: Node globals in scripts, non-null assertions, numbers in template literals, `any` in a test helper, conditions on values that cannot be null. Fixed in code; the remaining disables (`dangerouslySetInnerHTML` for the theme script and JSON-LD, index keys for fixed lists) carry a reason.
- **2026-11-11:** Prettier rewrote `{a} · {b}` across two lines as `{a} ·{" "}`, which splits one text node into two. Chromium then shapes the text differently and the CV page moved by a few pixels. Separators are written as one string (`{" · "}`) instead.
- **2026-11-11:** the CI job that committed metrics to `main` would be rejected by the ruleset. Metrics now come in through a pull request.
