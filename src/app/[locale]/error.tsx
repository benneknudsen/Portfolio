"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, lang } = useLang();

  useEffect(() => {
    console.error("[error-boundary]", error);
  }, [error]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 700,
          color: "var(--ink)",
          lineHeight: 1.05,
          letterSpacing: "-.03em",
        }}
      >
        {t.error.title}
      </h1>
      <p
        style={{
          marginTop: "1rem",
          fontSize: "clamp(16px, 1.6vw, 18.5px)",
          color: "var(--body)",
          maxWidth: "46ch",
        }}
      >
        {t.error.message}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <button
          type="button"
          onClick={reset}
          style={{
            padding: "14px 26px",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "inherit",
            color: "var(--bg)",
            background: "var(--ink)",
            border: "1px solid var(--ink)",
            borderRadius: "var(--r-pill)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {t.error.retry}
        </button>
        <Link
          href={lang === "en" ? "/en" : "/"}
          style={{
            display: "inline-block",
            padding: "14px 26px",
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--ink)",
            background: "transparent",
            border: "1px solid var(--ink)",
            borderRadius: "var(--r-pill)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {t.error.back}
        </Link>
      </div>
    </main>
  );
}
