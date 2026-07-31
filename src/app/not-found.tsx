import Link from "next/link";

export default function NotFound() {
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
          fontSize: "clamp(64px, 12vw, 128px)",
          fontWeight: 700,
          color: "var(--ink)",
          lineHeight: 1,
          letterSpacing: "-.03em",
        }}
      >
        404
      </h1>
      <p
        style={{
          marginTop: "1rem",
          fontSize: "clamp(16px, 1.6vw, 18.5px)",
          color: "var(--body)",
          maxWidth: "40ch",
        }}
      >
        Siden blev ikke fundet. Den er måske flyttet eller aldrig eksisteret.
      </p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          display: "inline-block",
          padding: "14px 26px",
          fontSize: "15px",
          fontWeight: 600,
          color: "var(--bg)",
          background: "var(--ink)",
          border: "1px solid var(--ink)",
          borderRadius: "99px",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        Tilbage til forsiden
      </Link>
    </main>
  );
}
