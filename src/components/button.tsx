import type { ReactNode } from "react";

/**
 * Shared pill button. Renders a real `<a>` when `href` is set (so the primary
 * "write" action is a proper `mailto:` link) and a `<button>` otherwise.
 *
 * Only `transform`/`box-shadow` transition — never color or background
 * (AGENTS.md convention #2: a color transition breaks the theme switch). The
 * fill swaps instantly on hover; only the -2px lift animates.
 * `white-space: nowrap` keeps the label from breaking the pill (convention #4).
 */
const BASE = [
  "inline-block cursor-pointer whitespace-nowrap rounded-pill border border-ink",
  "px-[26px] py-[14px] text-[15px] font-semibold",
  "transition-[transform,box-shadow] duration-[250ms] ease-out hover:-translate-y-0.5",
  "motion-reduce:transition-none",
  "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
].join(" ");

const VARIANTS = {
  primary: "bg-ink text-bg hover:border-accent hover:bg-accent hover:text-bg",
  ghost: "bg-transparent text-ink hover:bg-ink hover:text-bg",
} as const;

type ButtonProps = {
  variant: keyof typeof VARIANTS;
  children: ReactNode;
  className?: string;
  /** When provided the button renders as an `<a>` (e.g. a `mailto:` link). */
  href?: string;
  onClick?: () => void;
};

export function Button({ variant, children, className, href, onClick }: ButtonProps) {
  const cls = [BASE, VARIANTS[variant], className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
