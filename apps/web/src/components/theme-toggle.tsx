"use client";

import { Button } from "@ductmofficial/sen-ui";

export function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage blocked: the toggle still works for this visit */
    }
  };
  return (
    <Button
      variant="secondary"
      onClick={toggle}
      aria-label={label}
      className="size-11 border-line bg-transparent p-0 text-ink hover:border-ink"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </Button>
  );
}
