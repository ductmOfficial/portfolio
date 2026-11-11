# Duc Tran · Portfolio

[![CI](https://github.com/ductmOfficial/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/ductmOfficial/portfolio/actions/workflows/ci.yml)

Personal portfolio of Duc Tran, a senior front-end engineer, in English, German and Vietnamese, with performance and accessibility measured by CI. Live at **https://ductran.vercel.app**.

## What's inside

| Area          | Tools                                                                                     |
| ------------- | ----------------------------------------------------------------------------------------- |
| App           | Next.js 16 (App Router, static generation), React 19, MDX case studies                    |
| Design system | [Sen UI](https://github.com/ductmOfficial/sen-ui) tokens and components, Tailwind CSS 4   |
| Language      | TypeScript 6 (strict), Node.js 24 LTS                                                     |
| Monorepo      | pnpm workspaces, Turborepo, shared ESLint, Prettier and TypeScript configs                |
| Testing       | Vitest and Testing Library; Playwright with axe (WCAG 2.2 AA); Lighthouse CI with budgets |
| CI            | GitHub Actions, protected `main` (ruleset), Conventional Commits, Dependabot              |
| Hosting       | Vercel                                                                                    |

## Requirements

- Node.js 24 (`.nvmrc`)
- pnpm 12 (the exact version is pinned in `packageManager`)

## Getting started

```bash
git clone https://github.com/ductmOfficial/portfolio.git
cd portfolio
pnpm install                 # also installs the git hooks
pnpm --filter web dev        # http://localhost:3000 → redirects to /en, /de or /vi
```

## Scripts

Root scripts run in every package through Turborepo:

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `pnpm build`        | Build the site                              |
| `pnpm lint`         | ESLint; warnings fail the run               |
| `pnpm typecheck`    | `next typegen` and `tsc --noEmit`           |
| `pnpm test`         | Unit tests                                  |
| `pnpm format:check` | Check formatting with Prettier (used by CI) |

Scripts of the site, run with `pnpm --filter web <script>`:

| Script                | What it does                                                              |
| --------------------- | ------------------------------------------------------------------------- |
| `dev` / `dev:target`  | Dev server with verified content / with roadmap items (see below)         |
| `e2e`                 | Playwright and axe: WCAG 2.2 AA in light and dark, desktop and mobile     |
| `cv:pdf` / `cv:check` | Export the CV PDFs / check that they still match the site (after `build`) |
| `lighthouse`          | Lighthouse CI with the budgets in `lighthouserc.json` (after `build`)     |
| `metrics:pull`        | Update `/metrics` from the latest green CI run on `main` (needs `gh`)     |

`e2e`, `cv:*` and `lighthouse` use Playwright's Chromium (`pnpm --filter web exec playwright install chromium`), or the browser in `CHROME_PATH`.

## Project structure

```
.
├── apps/web/                   # the site (Next.js)
│   ├── src/app/[locale]/       # pages: home, experience, work, skills, about, cv, metrics
│   ├── src/content/            # CV data, case studies (MDX) and measured metrics
│   ├── src/i18n/               # messages for en, de and vi
│   ├── e2e/                    # Playwright tests
│   ├── scripts/                # CV PDF export and metrics collection
│   └── public/                 # fonts, CV PDFs, screenshots
├── packages/                   # shared ESLint, Prettier and TypeScript configs
├── .github/                    # CI, ruleset, Dependabot, PR and issue templates
└── PROGRESS.md                 # build log: steps, decisions, issues
```

## Verified vs target content

All CV content lives in `apps/web/src/content/cv.ts` (validated by `schema.ts`). Most of it is verified: things that already happened. Some items are marked `status: "target"`: they are a personal roadmap (skills, projects and certifications planned but not yet done), kept next to the CV so it is clear what each one would add. Values that differ carry `{ verified, target }`.

Target items never appear on the production site. They only show in a preview build with `NEXT_PUBLIC_CV_MODE=target`, clearly marked and `noindex`. They are visible in this repository's source by design.

| Mode                             | How                               | Shows                            |
| -------------------------------- | --------------------------------- | -------------------------------- |
| `verified` (default, production) | `pnpm --filter web dev` / `build` | Verified content only            |
| `target` (preview)               | `pnpm --filter web dev:target`    | Everything, roadmap items marked |

Target items may contain `[X]` placeholders for numbers that do not exist yet. To promote an item, fill every `[X]` with evidence, then remove its `status: "target"`. `cv.test.ts` fails if an unfilled placeholder ever reaches production content.

## Pages

`/[locale]` home · `/experience` · `/work` · `/work/[slug]` case studies · `/skills` (each skill links to where it was used) · `/about` · `/cv` · `/metrics`. Also `sitemap.xml`, `robots.txt` (the target build is `noindex`) and a share image per locale and per case study. Locales: `en`, `de`, `vi`; `/` redirects by `Accept-Language`.

## Case studies

MDX bodies live in `apps/web/src/content/case-studies/<slug>/<locale>.mdx` and are registered in `case-studies/index.ts` (every locale is required by type). Diagrams are React SVG components (`src/components/diagrams`) that follow the theme. Client code and screenshots stay private: only facts from the CV and measured numbers go in.

## Design system

The site uses [Sen UI](https://www.npmjs.com/package/@ductmofficial/sen-ui) and keeps its own editorial look by overriding Sen UI's tokens, as the library's README describes:

- **Tokens.** `globals.css` sets the `--sen-color-*` tokens to the site's palette (warm paper, near-black ink, one green signal) for light and dark, and square corners through `--sen-radius-*`. The short names used by the site's Tailwind utilities (`--bg`, `--ink`, `--line`, …) are aliases of those tokens.
- **Layers.** `@layer theme, base, sen, components, utilities` puts Sen UI above Tailwind's base styles and below its utilities, so a utility class on a Sen UI component still wins.
- **Theme.** An inline script sets `data-theme="light"` or `"dark"` on `<html>` before the first paint, from the stored choice or the system setting. Sen UI and the Tailwind `dark:` variant both read that attribute.
- **Components.** The theme toggle and the print button are Sen UI `Button`s (under 1 kB). The language switcher stays a list of links, the right pattern for moving between pages.

## CV PDF

`/[locale]/cv` is the print layout. The PDFs in `apps/web/public/cv` are generated from it and committed:

```bash
pnpm build && pnpm --filter web cv:pdf     # regenerate after changing CV content
```

CI runs `cv:check`, which fails when the committed PDFs no longer match the site (text comparison).

## Metrics

`/[locale]/metrics` renders `apps/web/src/content/metrics.json`. On every pull request and push to `main`, the `Browser` job builds the site and runs the unit tests, Playwright with axe, the CV check and Lighthouse (budgets in `lighthouserc.json` fail the build). On `main` it keeps the reports as the `measurements` artifact.

To publish new numbers, run `pnpm --filter web metrics:pull` on a branch: it downloads the reports of the latest green run on `main`, writes `metrics.json` and records that run's commit. Commit the file in a pull request; Vercel deploys it after the merge.

## Deployment

Vercel builds the site from `main` with the project's root directory set to `apps/web`. Pull requests get preview deployments. The `target` branch is deployed as a protected preview with `NEXT_PUBLIC_CV_MODE=target`; update it with `git push origin main:target`.

## Contributing workflow

1. Branch from `main`: `git switch -c feat/short-description`
2. Commit using [Conventional Commits](https://www.conventionalcommits.org). The `commit-msg` hook rejects anything else.
3. Push and open a PR: `gh pr create --fill-first`
4. Wait for the `Verify` and `Browser` checks: `gh pr checks --watch`
5. Merge: `gh pr merge --rebase --delete-branch`

## Progress

The step-by-step build log, with the reasoning behind each decision and the issues met along the way, is in [PROGRESS.md](PROGRESS.md).

## License

- Code: [MIT](LICENSE) © 2026 Duc Tran.
- Content (CV, case studies, PDFs, screenshots in `apps/web/src/content/` and `apps/web/public/`): all rights reserved, see [`CONTENT_LICENSE.md`](CONTENT_LICENSE.md). IBM Plex fonts are under the SIL Open Font License ([`OFL.txt`](apps/web/public/fonts/OFL.txt)).
