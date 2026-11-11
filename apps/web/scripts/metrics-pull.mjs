#!/usr/bin/env node
/**
 * Updates src/content/metrics.json from the latest green CI run on main: downloads that run's
 * `measurements` artifact (unit, end-to-end and Lighthouse reports) and runs scripts/metrics.mjs.
 * Commit the result in a pull request. Needs the GitHub CLI, logged in.
 *
 *   pnpm metrics:pull
 */
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";

const gh = (...args) => execFileSync("gh", args, { encoding: "utf8" }).trim();

const [run] = JSON.parse(
  gh(
    "run",
    "list",
    "--workflow",
    "ci.yml",
    "--branch",
    "main",
    "--event",
    "push",
    "--status",
    "success",
    "--limit",
    "1",
    "--json",
    "databaseId,headSha",
  ),
);
if (!run) {
  console.error("No successful CI run on main yet.");
  process.exit(1);
}

rmSync(".metrics", { recursive: true, force: true });
rmSync(".lighthouseci", { recursive: true, force: true });
gh("run", "download", String(run.databaseId), "--name", "measurements", "--dir", ".");
execFileSync(process.execPath, ["scripts/metrics.mjs", "--source", "ci", "--commit", run.headSha], {
  stdio: "inherit",
});
