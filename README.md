# Portfolio — Benjamin Schou Knudsen

Personal portfolio site built with Next.js 16, TypeScript, and Tailwind CSS.

## Stack

- **Next.js 16** (App Router) + **TypeScript strict** + **Tailwind CSS v3**
- **Lenis** for smooth scrolling
- **Google Fonts**: Hanken Grotesk, Instrument Serif, JetBrains Mono (via `next/font`)
- Static site — no backend, database, auth, or CMS
- Deployed to Vercel at `benjaminschou.dk`

## Development

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint
npm run typecheck # TypeScript type checking
```

## Design System

See `CONTEXT.md` for implementation guidelines and `design_handoff_portfolio/README.md` for the full specification.

**Key principles:**
- Design tokens in `src/app/globals.css` (CSS custom properties) and `tailwind.config.ts`
- DA is default language, EN via toggle (persisted in `localStorage['bk-lang']`)
- Light is default theme, dark via `<html data-theme="dark">` (persisted in `localStorage['bk-theme']`)
- All animations A1–A16 must be implemented with exact values from spec
- `prefers-reduced-motion` must be respected
- No CDN assets in production (Hermes logo is local)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with fonts and metadata
│   ├── page.tsx        # Main page
│   └── globals.css     # Design tokens + base styles
├── components/         # React components
├── lib/                # Utilities (i18n, lenis, etc.)
└── hooks/              # Custom React hooks
public/
├── memoji.png          # Avatar image
├── stride-preview.png  # Project preview
└── hermes.svg          # Hermes logo (local, not CDN)
```

## Deployment

Connected to Vercel. Pushes to `main` deploy to production.

## License

Private — © 2026 Benjamin Schou Knudsen
