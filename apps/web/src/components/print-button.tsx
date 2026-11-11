"use client";

import { Button } from "@ductmofficial/sen-ui";

export function PrintButton({ label, className }: { label: string; className?: string }) {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        window.print();
      }}
      className={className}
    >
      {label}
    </Button>
  );
}
