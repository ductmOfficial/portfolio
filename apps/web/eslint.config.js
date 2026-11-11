import next from "@repo/eslint-config/next";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export default defineConfig(
  globalIgnores(["playwright-report/", "test-results/", ".lighthouseci/", ".metrics/"]),
  next,
  {
    files: ["scripts/**/*.mjs", "*.config.{js,mjs,ts}"],
    languageOptions: { globals: globals.node },
  },
);
