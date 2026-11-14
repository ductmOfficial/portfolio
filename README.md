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

## Structure

```
.
├── apps/web/                   # the site (Next.js)
│   ├── src/app/[locale]/       # pages: home, experience, work, skills, about, cv, metrics
│   ├── src/content/            # CV data, case studies (MDX) and measured metrics
│   ├── src/i18n/               # messages for en, de and vi
│   ├── e2e/                    # Playwright tests
│   ├── scripts/                # CV PDF export and metrics collection
│   ├── .env.example            # optional variables (copy to .env.local)
│   └── public/                 # fonts, CV PDFs, screenshots
├── packages/                   # shared ESLint, Prettier and TypeScript configs
├── .github/                    # CI, ruleset, Dependabot, PR and issue templates
└── PROGRESS.md                 # build log: steps, decisions, issues
```

## Setup

### 1. Prerequisites

| Tool                      | Version                    | Needed for                                | Install                                                                                |
| ------------------------- | -------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------- |
| Node.js                   | 24 (`.nvmrc`)              | everything                                | `nvm install && nvm use` (or `fnm use`)                                                |
| pnpm                      | 12.14.0 (`packageManager`) | everything                                | `corepack enable` (or `npm install -g pnpm@12.14.0`)                                   |
| Git                       | any recent                 | everything                                |                                                                                        |
| Chromium or Google Chrome | any recent                 | `e2e`, `cv:pdf`, `cv:check`, `lighthouse` | `pnpm --filter web exec playwright install chromium`, or point `CHROME_PATH` at Chrome |
| GitHub CLI (`gh`)         | any recent, logged in      | `metrics:pull` only                       | [cli.github.com](https://cli.github.com)                                               |

`pnpm install` refuses other Node.js majors (`engineStrict`). Corepack ships with Node.js 24: after `corepack enable`, the first `pnpm` command downloads the exact version from `packageManager` (answer `Y` if it asks). No database is needed: all content is in the repository.

### 2. Clone and install

```bash
git clone https://github.com/ductmOfficial/portfolio.git
cd portfolio
nvm use
corepack enable
pnpm install                 # also installs the commit-msg hook
```

### 3. Configure (optional)

The site runs without environment variables. To override one locally:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Then uncomment the line you need. Next.js reads `apps/web/.env.local`; it is ignored by git.

| Variable               | Required | Default                      | What it does                                                                                   |
| ---------------------- | -------- | ---------------------------- | ---------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | no       | `https://ductran.vercel.app` | Canonical origin for metadata, the sitemap and share images, e.g. `https://example.vercel.app` |
| `NEXT_PUBLIC_CV_MODE`  | no       | `verified`                   | `target` also shows roadmap items, marked and `noindex` (see below)                            |
| `CHROME_PATH`          | no       | Playwright's Chromium        | A local Chrome for `e2e`, `cv:*` and `lighthouse`, e.g. `/usr/bin/google-chrome`               |

`NEXT_PUBLIC_*` values are inlined at build time: restart `dev` or build again after changing them.

## Running

### Development server

```bash
pnpm --filter web dev        # http://localhost:3000 → redirects to /en, /de or /vi
pnpm --filter web dev:target # the same with roadmap items (NEXT_PUBLIC_CV_MODE=target)
```

### Production build

```bash
pnpm build
pnpm --filter web start      # http://localhost:3000
```

The browser tests and the CV scripts start this build themselves on other ports (3100 for `e2e`, 3400 for `cv:*`, 3500 for `lighthouse`), so run `pnpm build` first and keep 3000 free for yourself.

## Testing

| Command                             | What it runs                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| `pnpm test`                         | Vitest: CV content and placeholders, case studies, messages, SEO, locale redirect    |
| `pnpm lint` / `pnpm typecheck`      | ESLint (warnings fail) and `next typegen` + `tsc --noEmit`                           |
| `pnpm format:check` / `pnpm format` | Prettier check / write                                                               |
| `pnpm build`                        | Static production build                                                              |
| `pnpm --filter web e2e`             | Playwright and axe (WCAG 2.2 AA) in light and dark, desktop and mobile, on port 3100 |
| `pnpm --filter web cv:check`        | The committed CV PDFs still match the site, on port 3400                             |
| `pnpm --filter web lighthouse`      | Lighthouse CI with the budgets in `lighthouserc.json`, on port 3500                  |

The last three need a production build and a browser:

```bash
pnpm --filter web exec playwright install chromium
pnpm build
pnpm --filter web e2e
pnpm --filter web cv:check
pnpm --filter web lighthouse
```

With Google Chrome installed, skip the download and set `CHROME_PATH`, e.g. on macOS `CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.

To run what CI runs before opening a pull request (`Verify`, then `Browser`):

```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm turbo run lint typecheck test build
pnpm --filter web test:json
pnpm --filter web e2e
pnpm --filter web cv:check
pnpm --filter web lighthouse
```

### All scripts

Root scripts run in every package through Turborepo:

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `pnpm build`        | Build the site                              |
| `pnpm dev`          | Every package's `dev` task                  |
| `pnpm lint`         | ESLint; warnings fail the run               |
| `pnpm typecheck`    | `next typegen` and `tsc --noEmit`           |
| `pnpm test`         | Unit tests                                  |
| `pnpm format:check` | Check formatting with Prettier (used by CI) |

Scripts of the site, run with `pnpm --filter web <script>`:

| Script                | What it does                                                              |
| --------------------- | ------------------------------------------------------------------------- |
| `dev` / `dev:target`  | Dev server with verified content / with roadmap items (see below)         |
| `start`               | Serve the last production build                                           |
| `check`               | `lint`, `typecheck`, `test` and `build` of the site in a row              |
| `test:json`           | Unit tests with a JSON report for `/metrics` (CI)                         |
| `e2e`                 | Playwright and axe: WCAG 2.2 AA in light and dark, desktop and mobile     |
| `cv:pdf` / `cv:check` | Export the CV PDFs / check that they still match the site (after `build`) |
| `lighthouse`          | Lighthouse CI with the budgets in `lighthouserc.json` (after `build`)     |
| `metrics:pull`        | Update `/metrics` from the latest green CI run on `main` (needs `gh`)     |

## Deployment (Vercel)

Vercel builds the site from `main` with the project's root directory set to `apps/web`, the Next.js preset and its default build command (`next build`). There is no database and nothing to migrate.

| Environment      | Branch        | Variables                                                 |
| ---------------- | ------------- | --------------------------------------------------------- |
| Production       | `main`        | none (`NEXT_PUBLIC_SITE_URL` only for a different domain) |
| Preview          | pull requests | none                                                      |
| Preview, roadmap | `target`      | `NEXT_PUBLIC_CV_MODE=target`                              |

Pull requests get preview deployments. The `target` branch is deployed as a protected preview with `NEXT_PUBLIC_CV_MODE=target`; update it with `git push origin main:target`.

## Troubleshooting

| Symptom                                                     | Fix                                                                                                                                                |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install` fails with `ERR_PNPM_UNSUPPORTED_ENGINE`     | Wrong Node.js major: `nvm use` (Node.js 24), then install again                                                                                    |
| `pnpm: command not found`, or a different pnpm version runs | `corepack enable`, then open a new terminal; `pnpm -v` should print `12.14.0`                                                                      |
| Port 3000 is taken                                          | `pnpm --filter web dev --port 3001`                                                                                                                |
| `e2e`, `cv:*` or `lighthouse` cannot start the server       | Ports 3100, 3400 and 3500 must be free; stop a `start` you left running on them                                                                    |
| `cv:pdf` or `cv:check` says "No production build found"     | Run `pnpm build` first                                                                                                                             |
| The browser tests cannot find a browser                     | `pnpm --filter web exec playwright install chromium`, or set `CHROME_PATH`                                                                         |
| `cv:check` fails after a content change                     | Regenerate and commit the PDFs: `pnpm build && pnpm --filter web cv:pdf`                                                                           |
| axe reports `link-in-text-block`                            | A link inside running text must not rely on color alone (WCAG 1.4.1): keep it underlined                                                           |
| A machine with little memory kills the run (exit code 137)  | Run fewer tasks at once: `pnpm turbo run lint typecheck test build --concurrency=2`                                                                |
| A Vercel preview opens a Vercel sign-in page                | Previews have Deployment Protection: sign in with an account on the team, or check the change locally with `pnpm build && pnpm --filter web start` |
| The commit is rejected                                      | The hook enforces [Conventional Commits](https://www.conventionalcommits.org): `feat(web): …`, `fix: …`, `docs: …`                                 |

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
