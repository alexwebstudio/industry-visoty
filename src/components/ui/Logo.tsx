import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Геометрический знак высотного контура и опорной линии. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 34 34"
      width={30}
      height={30}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      aria-hidden
      className={className}
    >
      <path d="M4 29V5h8v24M4 13h20v16M24 13l6-8M24 21l6 8" />
      <circle cx="24" cy="13" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — на главную`}
      className={cn("inline-flex items-center gap-3", className)}
    >
      <Mark className="shrink-0" />
      <span className="t-logo">{site.name}</span>
    </Link>
  );
}
