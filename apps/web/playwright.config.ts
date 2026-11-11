import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // The JSON report feeds scripts/metrics.mjs (test counts on /metrics).
  reporter: [[process.env.CI ? "github" : "list"], ["json", { outputFile: ".metrics/e2e.json" }]],
  use: {
    baseURL: "http://localhost:3100",
    // Same switch as scripts/cv-pdf.mjs: use an installed Chromium instead of Playwright's download.
    ...(process.env.CHROME_PATH && { launchOptions: { executablePath: process.env.CHROME_PATH } }),
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "pnpm start -p 3100",
    url: "http://localhost:3100/en",
    reuseExistingServer: !process.env.CI,
  },
});
