"use client";

import { useLayoutEffect } from "react";

export function readTheme(): "light" | "dark" {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* storage blocked: fall back to the system setting */
  }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Switching locale remounts the root layout, and React re-renders <html> without the class
 * the inline script set on first load. Re-apply the stored theme before paint on each mount.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", readTheme() === "dark");
  }, []);
  return null;
}
