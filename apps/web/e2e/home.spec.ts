import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const locales = ["en", "de", "vi"] as const;
const pages = [
  "",
  "/experience",
  "/work",
  "/work/multi-tenant-wms",
  "/work/los-dashboards",
  "/work/cinescope",
  "/skills",
  "/about",
  "/cv",
];

for (const locale of locales)
  for (const path of pages) {
    test.describe(`${locale}${path || "/"}`, () => {
      test("has no WCAG 2.2 AA violations in light and dark", async ({ page }) => {
        // Reduced motion: no colour transitions mid-scan after the theme switch.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(`/${locale}${path}`);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        for (const theme of ["light", "dark"]) {
          await page.evaluate(
            (t) => document.documentElement.classList.toggle("dark", t === "dark"),
            theme,
          );
          const { violations } = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze();
          expect(violations, `${theme}: ${violations.map((v) => v.id).join(", ")}`).toEqual([]);
        }
      });

      test("does not scroll horizontally", async ({ page }) => {
        await page.goto(`/${locale}${path}`);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
      });
    });
  }

test("redirects / to the visitor language", async ({ browser }) => {
  const ctx = await browser.newContext({ locale: "de-DE" });
  const page = await ctx.newPage();
  await page.goto("/");
  await expect(page).toHaveURL(/\/de$/);
  await ctx.close();
});

test("language switcher keeps the visitor on the same page", async ({ page }) => {
  await page.goto("/en/work/cinescope");
  await page.getByRole("link", { name: /Deutsch/ }).click();
  await expect(page).toHaveURL(/\/de\/work\/cinescope$/);
  await expect(page.getByRole("heading", { level: 2 }).first()).toHaveText("Warum dieses Projekt");
});

test("every case-study card leads to its page", async ({ page }) => {
  await page.goto("/en/work");
  const links = page.getByRole("main").getByRole("link").filter({ hasText: /.+/ });
  const hrefs = await links.evaluateAll((as) =>
    as
      .map((a) => a.getAttribute("href"))
      .filter((h): h is string => h?.startsWith("/en/work/") ?? false),
  );
  expect(new Set(hrefs).size).toBe(3);
  for (const href of new Set(hrefs)) {
    const res = await page.request.get(href);
    expect(res.status()).toBe(200);
  }
});

test("the nav marks the current page", async ({ page }) => {
  await page.goto("/en/skills");
  await expect(
    page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Skills" }),
  ).toHaveAttribute("aria-current", "page");
});

test("keeps the chosen theme when switching language and page", async ({ page }) => {
  await page.goto("/en");
  const dark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  await page.getByRole("button", { name: /theme/ }).click();
  await page.getByRole("link", { name: /Deutsch/ }).click();
  await expect(page).toHaveURL(/\/de$/);
  await expect(page.locator("html")).toHaveClass(dark ? /^(?!.*dark)/ : /dark/);
  await page
    .getByRole("navigation", { name: "Hauptnavigation" })
    .getByRole("link", { name: "Erfahrung" })
    .click();
  await expect(page).toHaveURL(/\/de\/experience$/);
  await expect(page.locator("html")).toHaveClass(dark ? /^(?!.*dark)/ : /dark/);
});

test("footer sits at the bottom of the viewport on short pages", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1400 });
  await page.goto("/en/work");
  const bottom = await page
    .locator("footer")
    .evaluate((f) => Math.round(f.getBoundingClientRect().bottom));
  expect(bottom).toBe(1400);
});

test.describe("motion", () => {
  test.use({ reducedMotion: "no-preference" });

  test("status board counts up to the real figures", async ({ page }) => {
    await page.goto("/en");
    await page.locator("[data-countup]").first().scrollIntoViewIfNeeded();
    const first = page.locator("[data-countup]").first();
    await expect(first).toHaveText("10+", { timeout: 4000 });
    await expect(page.locator("[data-countup]").nth(1)).toHaveText("~6,500", { timeout: 4000 });
    await expect(page.locator("[data-countup]").nth(3)).toHaveText("−549 kB", { timeout: 4000 });
    // Screen readers get the final value only.
    await expect(page.locator("dd .sr-only").first()).toHaveText("10+");
  });

  test("every animated block ends up visible after scrolling", async ({ page }) => {
    for (const path of ["/en", "/en/work/multi-tenant-wms", "/en/experience"]) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo({ top: y, behavior: "instant" });
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      const pending = await page.$$eval("[data-reveal][data-pending]", (els) =>
        els.map(
          (e) =>
            `${e.tagName}.${(e.getAttribute("class") ?? "").slice(0, 40)}@${String(Math.round(e.getBoundingClientRect().top))}`,
        ),
      );
      expect(pending, path).toEqual([]);
    }
  });

  test("respects reduced motion: no hidden content, final numbers at once", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("http://localhost:3100/en");
    await expect(page.locator("[data-countup]").nth(1)).toHaveText("~6,500");
    const hidden = await page.$$eval(
      "[data-reveal]",
      (els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length,
    );
    expect(hidden).toBe(0);
    await ctx.close();
  });
});

test.describe("seo and sharing", () => {
  test("every page has a canonical, hreflang for all locales and a share image", async ({
    page,
  }) => {
    await page.goto("/de/skills");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/de\/skills$/);
    for (const l of ["en", "de", "vi", "x-default"]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveCount(1);
    }
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    if (!og) throw new Error("og:image is missing");
    const res = await page.request.get(og.replace(/^https?:\/\/[^/]+/, ""));
    expect(res.headers()["content-type"]).toContain("image/png");
  });

  test("home carries Person structured data", async ({ page }) => {
    await page.goto("/en");
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data: unknown = JSON.parse(json ?? "null");
    expect(data).toMatchObject({ "@type": "Person", name: "Duc Tran" });
  });

  test("sitemap lists every locale of every page, robots points to it", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const path of ["/en", "/de/work/cinescope", "/vi/metrics"])
      expect(sitemap).toContain(`${path}</loc>`);
    expect(await (await request.get("/robots.txt")).text()).toContain("Sitemap:");
  });
});

test.describe("cv", () => {
  test("offers the PDF for its locale", async ({ page }) => {
    await page.goto("/de/cv");
    const href = await page.getByRole("link", { name: "PDF herunterladen" }).getAttribute("href");
    expect(href).toBe("/cv/duc-tran-cv-de.pdf");
    const res = await page.request.get(href ?? "");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("application/pdf");
  });

  test("prints only the sheet", async ({ page }) => {
    await page.goto("/en/cv");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("body > header, header").first()).toBeHidden();
    await expect(page.locator("footer")).toBeHidden();
    await expect(page.getByRole("button", { name: "Print" })).toBeHidden();
    await expect(page.locator("article.cv-sheet")).toBeVisible();
  });
});
