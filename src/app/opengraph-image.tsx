import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// File-based OG image. Next 16 wires this into both `og:image` and
// `twitter:image` (summary_large_image). Light theme only — matches the
// brand default and the hero. Tokens mirror src/app/globals.css.
export const runtime = "nodejs";
export const alt = "Benjamin Schou Knudsen — Frontend-udvikler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Design tokens (light theme) — do NOT invent; keep in sync with globals.css.
const BG = "#f7f5f1";
const INK = "#141310";
const BODY = "#41403c";
const DIM = "#6e6b63";
const ACCENT = "#2d4a3e";
const ACCENT_SOFT = "#eef1ee";
const BLOB = "rgba(45, 74, 62, .09)";

// Satori needs ttf/otf/woff (not woff2). The TTFs are committed locally
// (src/assets/fonts) so the build has no network dependency — same pattern
// as public/memoji.png below.
type FontWeight = 400 | 500 | 700;

async function loadFont(
  file: string,
  name: string,
  weight: FontWeight,
  style: "normal" | "italic" = "normal",
) {
  const data = await readFile(join(process.cwd(), "src", "assets", "fonts", file));
  return { name, data, weight, style };
}

export default async function Image() {
  const [hanken400, hanken700, mono500, memoji] = await Promise.all([
    loadFont("hanken-grotesk-400.ttf", "Hanken Grotesk", 400),
    loadFont("hanken-grotesk-700.ttf", "Hanken Grotesk", 700),
    loadFont("jetbrains-mono-500.ttf", "JetBrains Mono", 500),
    readFile(join(process.cwd(), "public", "memoji.png")),
  ]);

  const memojiSrc = `data:image/png;base64,${memoji.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: BG,
          fontFamily: "Hanken Grotesk",
          padding: 64,
          overflow: "hidden",
        }}
      >
        {/* Soft sage blob backdrop, echoing the hero (A9). */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 760,
            height: 760,
            borderRadius: 999,
            backgroundImage: `radial-gradient(circle at center, ${BLOB} 0%, rgba(45,74,62,0) 70%)`,
          }}
        />

        {/* Main row: text left, avatar right. */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 999,
                  background: ACCENT,
                }}
              />
              <div
                style={{
                  fontFamily: "JetBrains Mono",
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: 3,
                  color: ACCENT,
                }}
              >
                OPEN TO WORK
              </div>
            </div>

            {/* Name */}
            <div
              style={{
                marginTop: 26,
                fontSize: 78,
                fontWeight: 700,
                letterSpacing: -2,
                lineHeight: 1.04,
                color: INK,
              }}
            >
              Benjamin Schou Knudsen
            </div>

            {/* Subtitle */}
            <div style={{ marginTop: 22, fontSize: 30, color: BODY }}>
              Frontend-udvikler · React &amp; TypeScript
            </div>

            {/* Signature sage rule */}
            <div
              style={{
                marginTop: 30,
                width: 48,
                height: 5,
                borderRadius: 99,
                background: ACCENT,
              }}
            />
          </div>

          {/* Avatar with ring + floor shadow (echoes the levitating hero avatar). */}
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 340,
              height: 340,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 6,
                width: 210,
                height: 26,
                borderRadius: 999,
                background: "rgba(45,74,62,0.16)",
              }}
            />
            <img
              src={memojiSrc}
              width={300}
              height={300}
              alt=""
              style={{
                width: 300,
                height: 300,
                borderRadius: 999,
                boxShadow: `0 0 0 8px ${ACCENT_SOFT}, 0 30px 60px rgba(20,19,16,0.16)`,
              }}
            />
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              color: DIM,
            }}
          >
            Silkeborg, Danmark
          </div>
          <div style={{ width: 5, height: 5, borderRadius: 999, background: DIM, display: "flex" }} />
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              fontWeight: 500,
              color: INK,
            }}
          >
            benjaminschou.dk
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [hanken400, hanken700, mono500],
    },
  );
}
