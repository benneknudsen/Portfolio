# benjaminschou.dk

Personal portfolio site — built and maintained with AI as my coding partner.

## How it's built

- **Next.js 16** (App Router) + **TypeScript strict** + **Tailwind CSS v3**
- **Lenis** for smooth scrolling
- **Google Fonts** via `next/font` (Hanken Grotesk, Instrument Serif, JetBrains Mono)
- Static site — no backend, database, auth, or CMS
- Deployed to **Vercel** (main → production)

## How I work

I use [Hermes Agent](https://hermes-agent.nousresearch.com/) (Nous Research) as my orchestrator, running 24/7 on a Mac Mini M4 via Telegram. Claude Code writes the code in isolated sessions, and Hermes handles everything from issue to deploy.

The design was delivered as a handoff folder with tokens, components, and copy — I didn't design it in Figma, I built it from a spec.

## Development

```bash
npm run dev        # Dev server
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

Quality gate: `build`, `lint`, and `typecheck` must all be green before every commit.

## Structure

```
src/
├── app/          # Layout, page, globals.css, metadata
├── components/   # React components (nav, hero, footer, etc.)
├── lib/          # i18n, Lenis, animations
└── hooks/        # Custom hooks
public/           # Images, favicon, logos
```

All user-facing copy lives in `src/lib/i18n.ts` (DA + EN). Design tokens are CSS custom properties in `globals.css` mirrored in `tailwind.config.ts`.

## License

Private — © 2026 Benjamin Schou Knudsen
