#!/usr/bin/env node
/* global document, NodeFilter */
/**
 * Renders /[locale]/cv to A4 PDFs in public/cv, from the current production build.
 *
 *   pnpm build && pnpm cv:pdf      regenerate the committed PDFs
 *   pnpm build && pnpm cv:check    fail if the committed PDFs no longer match the site (CI)
 *
 * The check compares the committed PDF's text with the text of the live page, not with a fresh
 * PDF: rendering differs between Chrome builds (CI vs a laptop), the words must not. Whitespace,
 * case (CSS uppercase) and Unicode forms (ligatures, Vietnamese diacritics) are normalised.
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";
import { extractText, getDocumentProxy } from "unpdf";

const LOCALES = ["en", "de", "vi"];
const PORT = 3400;
const BASE = `http://localhost:${PORT}`;
const check = process.argv.includes("--check");
const file = (locale) => `public/cv/duc-tran-cv-${locale}.pdf`;

if (!existsSync(".next/BUILD_ID")) {
  console.error("No production build found. Run `pnpm build` first.");
  process.exit(1);
}
if (process.env.NEXT_PUBLIC_CV_MODE === "target") {
  console.error("Refusing to export the CV from a target (roadmap) build.");
  process.exit(1);
}

// Start Next directly with the current Node: no npx, so no dependency on how the script was launched.
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)],
  { stdio: "ignore" },
);
const stop = () => server.kill("SIGTERM");

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`${BASE}/en/cv`)).ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error("Server did not start on time");
}

const normalise = (s) =>
  s
    .normalize("NFKC")
    .replace(/[\s\u00ad\u200b]+/g, "")
    .toLocaleLowerCase();

const pdfText = async (bytes) => {
  const { text } = await extractText(await getDocumentProxy(new Uint8Array(bytes)), {
    mergePages: true,
  });
  return normalise(text);
};

/** Visible text of the CV sheet, in document order; screen-reader-only labels are not printed. */
const pageText = (page) =>
  page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(
      document.querySelector("article.cv-sheet"),
      NodeFilter.SHOW_TEXT,
    );
    for (let n = walker.nextNode(); n; n = walker.nextNode())
      if (!n.parentElement.closest(".sr-only")) out.push(n.nodeValue);
    return out.join("");
  });

const firstDifference = (a, b) => {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return `at char ${i}: page "${a.slice(i, i + 50)}" vs pdf "${b.slice(i, i + 50)}"`;
};

let failed = false;
try {
  await waitForServer();
  const browser = await chromium.launch(
    process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
  );
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print", reducedMotion: "reduce" });

  for (const locale of LOCALES) {
    // Fonts use display: optional, so a cold first load may keep the fallback.
    // Load once to fill the cache, then reload so Plex is used from the first paint.
    await page.goto(`${BASE}/${locale}/cv`, { waitUntil: "networkidle" });
    await page.reload({ waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    if (!check) {
      const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
      await writeFile(file(locale), pdf);
      console.log(`wrote ${file(locale)} (${Math.round(pdf.length / 1024)} kB)`);
      continue;
    }
    if (!existsSync(file(locale))) {
      console.error(`missing ${file(locale)}`);
      failed = true;
      continue;
    }
    const expected = normalise(await pageText(page));
    const actual = await pdfText(await readFile(file(locale)));
    if (expected === actual) {
      console.log(`ok    ${file(locale)}`);
    } else {
      console.log(`STALE ${file(locale)} ${firstDifference(expected, actual)}`);
      failed = true;
    }
  }
  await browser.close();
} finally {
  stop();
}

if (failed) {
  console.error(
    "\nThe CV PDFs are out of date with the site. Run `pnpm build && pnpm cv:pdf` and commit public/cv.",
  );
  process.exit(1);
}
