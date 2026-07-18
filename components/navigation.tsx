"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { grotesk } from "./landing/fonts";
import { DOWNLOAD_URL, GITHUB_URL } from "./landing/shared";

/* ------------------------------------------------------------------ */
/*  The paper's masthead — a table-of-contents header with footnoted  */
/*  links over a hairline rule. Shared by every page.                 */
/* ------------------------------------------------------------------ */

/* A half-filled circle, rotating with the theme. Quiet, like the
   rest of the masthead. */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex items-center transition-colors hover:text-[var(--blue)]"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        className={`transition-transform duration-500 ${dark ? "rotate-180" : ""}`}
        aria-hidden="true"
      >
        <circle
          cx="6.5"
          cy="6.5"
          r="5.75"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M6.5 0.75 A5.75 5.75 0 0 1 6.5 12.25 Z" fill="currentColor" />
      </svg>
    </button>
  );
}

/* The mark: the app icon redrawn as monoline line art — the outer
   cube (the instrument) in ink, the inner cube (the mind) in blue,
   occluding the shell's edges exactly like fig. 01. */
function TesseractMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M32 6L54.5 19V45L32 58L9.5 45V19L32 6Z M9.5 19L32 32L54.5 19M32 32V58"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M32 17L41.5 22.5V33.5L32 39L22.5 33.5V22.5L32 17Z" fill="var(--paper)" />
      <path
        d="M32 17L41.5 22.5V33.5L32 39L22.5 33.5V22.5L32 17Z M22.5 22.5L32 28L41.5 22.5M32 28V39"
        stroke="var(--blue)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header
      className={`${grotesk.variable} fixed inset-x-0 top-0 z-50 border-b border-[var(--ink)]/10 bg-[var(--paper)]/85 backdrop-blur-sm`}
      style={{ fontFamily: "var(--landing-grotesk), system-ui, sans-serif" }}
    >
      <div className="flex items-center justify-between px-6 py-4 sm:px-12 lg:px-16">
        <Link href="/" className="flex items-center gap-2.5">
          <TesseractMark className="h-[19px] w-[19px] text-[var(--ink)]" />
          <span className="text-base font-bold tracking-[-0.02em] text-[var(--ink)]">
            Tesseract
          </span>
        </Link>
        <nav className="flex items-center gap-5 font-mono text-[11px] text-[var(--body)] sm:gap-7">
          <Link href="/#companion" className="transition-colors hover:text-[var(--blue)]">
            companion<sup className="ml-0.5 text-[9px] text-[var(--blue)]">1</sup>
          </Link>
          <Link href="/#instrument" className="hidden transition-colors hover:text-[var(--blue)] sm:inline">
            instrument<sup className="ml-0.5 text-[9px] text-[var(--blue)]">2</sup>
          </Link>
          <Link href="/#philosophy" className="hidden transition-colors hover:text-[var(--blue)] sm:inline">
            thesis<sup className="ml-0.5 text-[9px] text-[var(--blue)]">3</sup>
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden transition-colors hover:text-[var(--blue)] sm:inline"
          >
            github<sup className="ml-0.5 text-[9px] text-[var(--blue)]">4</sup>
          </a>
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--blue)] underline decoration-[var(--blue)]/30 underline-offset-4 transition-colors hover:decoration-[var(--blue)]"
          >
            download ↓
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Colophon — the same sign-off on every page.                       */
/* ------------------------------------------------------------------ */

export function SiteFooter() {
  return (
    <footer
      className={`${grotesk.variable} border-t border-[var(--ink)]/10 bg-[var(--paper)] px-6 py-10 sm:px-12 lg:px-16`}
      style={{ fontFamily: "var(--landing-grotesk), system-ui, sans-serif" }}
    >
      <div className="flex flex-col gap-6 font-mono text-[11px] text-[var(--gray)] sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[var(--ink)]">
          Tesseract, a working paper on personal intelligence
        </span>
        <nav className="flex gap-6">
          <Link href="/privacy" className="transition-colors hover:text-[var(--blue)]">privacy</Link>
          <Link href="/terms" className="transition-colors hover:text-[var(--blue)]">terms</Link>
          <Link href="/support" className="transition-colors hover:text-[var(--blue)]">support</Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--blue)]"
          >
            github
          </a>
        </nav>
        <span>© 2026 · set in space grotesk &amp; instrument serif</span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Wrapper for the sub-pages (privacy, terms, support).              */
/* ------------------------------------------------------------------ */

export function Navigation({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[var(--paper)] text-[var(--ink)]">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
