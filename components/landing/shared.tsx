"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export { DOWNLOAD_URL, GITHUB_URL, X_URL } from "@/lib/site";

/* The paper's palette. These resolve through CSS variables, so every
   figure follows the active theme (see custom.css). */
export const INK = "var(--ink)";
export const BLUE = "var(--blue)";
export const GRAY = "var(--gray)";
export const FAINT = "var(--faint)";
export const BODY = "var(--body)";
export const PAPER = "var(--paper)";

export const HAIR = "border-[var(--ink)]/10";

export const MONO = "var(--font-mono), ui-monospace, monospace";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* One media query list for the whole page, created lazily on the
   client, so every consumer shares a single listener. */
let reducedMotionQuery: MediaQueryList | null = null;
function reducedMotion() {
  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return reducedMotionQuery;
}
function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = reducedMotion();
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}
function readReducedMotion() {
  return reducedMotion().matches;
}
function serverReducedMotion() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeReducedMotion, readReducedMotion, serverReducedMotion);
}

/* The clock, read in whole minutes, so a tick that lands inside the
   same minute re-renders nothing. */
function subscribeMinute(onStoreChange: () => void) {
  const id = setInterval(onStoreChange, 10_000);
  return () => clearInterval(id);
}
function readMinute() {
  return Math.floor(Date.now() / 60_000);
}
function serverMinute() {
  return null;
}

/** Live clock, re-rendered once a minute — powers the "now" markers.
    Null on the server and through hydration: the page is prerendered,
    and a time baked in at build never matches the reader's clock. */
export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribeMinute, readMinute, serverMinute);
  return minute === null ? null : new Date(minute * 60_000);
}

/** Scroll-into-view reveal shared by every section of the paper. */
export function In({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: reduced ? 0 : 0.8,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Draw/fade motion props for figure strokes, honoring reduced motion.
    Figures reveal on scroll by default; pass `{ onMount: true }` for one
    that is already on screen when the page loads. Under reduced motion
    both the duration and the delay collapse, so nothing sits invisible
    waiting for a stagger that will never animate. */
export const VIEWPORT = { once: true, margin: "-15% 0px" } as const;

type MotionTarget = Record<string, number | string | Array<number | string>>;

export function useFig(opts?: { onMount?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const to = (target: MotionTarget) =>
    opts?.onMount ? { animate: target } : { whileInView: target, viewport: VIEWPORT };
  return {
    reduced,
    /** Generic reveal: from one state to another. Under reduced motion
        the element starts (and stays) at `rest`, which defaults to the
        target, so nothing sits invisible waiting for a stagger. */
    anim: (
      from: MotionTarget,
      target: MotionTarget,
      o: { delay?: number; duration?: number; ease?: typeof EASE | "linear" | "easeInOut"; rest?: MotionTarget } = {}
    ) => ({
      initial: reduced ? o.rest ?? target : from,
      ...to(reduced ? o.rest ?? target : target),
      transition: {
        duration: reduced ? 0 : o.duration ?? 0.6,
        delay: reduced ? 0 : o.delay ?? 0,
        ease: o.ease ?? EASE,
      },
    }),
    draw: (delay: number, duration = 1) => ({
      initial: { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
      ...to({ pathLength: 1, opacity: 1 }),
      transition: {
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE,
      },
    }),
    fade: (delay: number, duration = 0.6) => ({
      initial: { opacity: reduced ? 1 : 0 },
      ...to({ opacity: 1 }),
      transition: {
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
      },
    }),
  };
}

/** Section marker — "§ 02 — the companion". */
export function SectionMark({
  no,
  title,
  note,
  centered = false,
}: {
  no: string;
  title: string;
  note?: string;
  centered?: boolean;
}) {
  return (
    <In>
      <div
        className={`flex items-baseline gap-4 font-mono text-[11px] uppercase tracking-[0.3em] ${
          centered ? "justify-center" : `justify-between border-t ${HAIR} pt-5`
        }`}
      >
        <span>
          <span className="text-[var(--blue)]">{no}</span>
          <span className="ml-4 text-[var(--gray)]">{title}</span>
        </span>
        {note && (
          <span className="border border-[var(--blue)]/40 px-2.5 py-1 text-[9px] tracking-[0.25em] text-[var(--blue)]">
            {note}
          </span>
        )}
      </div>
    </In>
  );
}

/** The paper's inline link: mono, blue, a quiet underline. */
export function PaperLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block font-mono text-[var(--blue)] underline decoration-[var(--blue)]/30 underline-offset-4 transition-colors hover:decoration-[var(--blue)] ${className}`}
    >
      {children}
    </Link>
  );
}

/** A short list of plain-terms chips, each led by a blue dot. */
export function Chips({
  chips,
  layout = "row",
  className = "",
}: {
  chips: readonly string[];
  layout?: "row" | "stack";
  className?: string;
}) {
  const shape =
    layout === "row"
      ? "flex flex-wrap gap-x-5 gap-y-2 text-[var(--gray)]"
      : "space-y-2 text-[var(--body)]";
  return (
    <ul className={`font-mono text-[12px] ${shape} ${className}`}>
      {chips.map((c) => (
        <li key={c} className="flex gap-2.5">
          <span className="text-[var(--blue)]">·</span>
          {c}
        </li>
      ))}
    </ul>
  );
}

/** Figure caption — every figure is numbered evidence, not decoration. */
export function FigCaption({ children }: { children: ReactNode }) {
  return (
    <p className={`mt-4 border-t ${HAIR} pt-3 font-mono text-[11px] leading-relaxed text-[var(--gray)]`}>
      {children}
    </p>
  );
}
