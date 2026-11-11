import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const C = { bg: "#16161a", ink: "#f6f4ef", muted: "#a3a19a", line: "#2f3236", signal: "#3dd6ac" };

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** Plex from the same Fontsource packages the site uses; Vietnamese glyphs come from their own subset. */
async function fonts() {
  const [sans400, sans600, sansVi400, sansVi600, mono500, monoVi500] = await Promise.all([
    font("ibm-plex-sans", "ibm-plex-sans-latin-400-normal.woff"),
    font("ibm-plex-sans", "ibm-plex-sans-latin-600-normal.woff"),
    font("ibm-plex-sans", "ibm-plex-sans-vietnamese-400-normal.woff"),
    font("ibm-plex-sans", "ibm-plex-sans-vietnamese-600-normal.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-vietnamese-500-normal.woff"),
  ]);
  return [
    { name: "Plex", data: sans400, weight: 400 as const },
    { name: "Plex", data: sans600, weight: 600 as const },
    // Separate family names: Satori keeps one font per name+weight, so subsets must not share a name.
    { name: "PlexVi", data: sansVi400, weight: 400 as const },
    { name: "PlexVi", data: sansVi600, weight: 600 as const },
    { name: "Mono", data: mono500, weight: 500 as const },
    { name: "MonoVi", data: monoVi500, weight: 500 as const },
  ];
}

interface Card {
  kicker: string;
  title: string;
  footer: { value: string; label: string }[];
}

/** One layout for every share card: brand row, kicker, headline, a status-board strip. */
export async function renderOg({ kicker, title, footer }: Card) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: C.bg,
        color: C.ink,
        fontFamily: "Plex, PlexVi",
        padding: "64px 72px",
        backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            background: C.ink,
            color: C.bg,
            fontFamily: "Mono, MonoVi",
            fontSize: 22,
          }}
        >
          DT
        </div>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>Duc Tran</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "Mono, MonoVi",
            fontSize: 22,
            color: C.muted,
            letterSpacing: 2,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 12, background: C.signal }} />
          {kicker.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 48 ? 58 : 68,
            fontWeight: 600,
            lineHeight: 1.08,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: "flex", gap: 56, borderTop: `2px solid ${C.line}`, paddingTop: 28 }}>
        {footer.map((f) => (
          <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{ display: "flex", fontFamily: "Mono, MonoVi", fontSize: 40, color: C.signal }}
            >
              {f.value}
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "Mono, MonoVi",
                fontSize: 16,
                color: C.muted,
                letterSpacing: 1.5,
              }}
            >
              {f.label.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>,
    { ...ogSize, fonts: await fonts() },
  );
}
