"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { motion } from "framer-motion";

export const DOWNLOAD_URL =
  "https://github.com/spokvulcan/tesseract/releases/latest/download/Tesseract.dmg";

export const GITHUB_URL = "https://github.com/spokvulcan/tesseract";

export const X_URL = "https://x.com/spok_vulkan";

/* The paper's palette. These resolve through CSS variables, so every
   figure and canvas follows the active theme (see custom.css). */
export const INK = "var(--ink)";
export const BLUE = "var(--blue)";
export const GRAY = "var(--gray)";
export const FAINT = "var(--faint)";
export const BODY = "var(--body)";
export const PAPER = "var(--paper)";

export const HAIR = "border-[var(--ink)]/10";

export const MONO = "var(--font-mono), ui-monospace, monospace";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

/** Live clock, re-rendered once a minute — powers the "now" markers. */
export function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
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

/** Draw/fade motion props for figure strokes, honoring reduced motion. */
export function useFig() {
  const reduced = usePrefersReducedMotion();
  return {
    reduced,
    draw: (delay: number) => ({
      initial: { pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 },
      whileInView: { pathLength: 1, opacity: 1 },
      viewport: { once: true, margin: "-15% 0px" },
      transition: { duration: reduced ? 0 : 1, delay, ease: EASE },
    }),
    fade: (delay: number) => ({
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, margin: "-15% 0px" },
      transition: { duration: reduced ? 0 : 0.6, delay },
    }),
  };
}

/** Section marker — "§ 02 — the companion". */
export function SectionMark({
  no,
  title,
  note,
}: {
  no: string;
  title: string;
  note?: string;
}) {
  return (
    <In>
      <div
        className={`flex items-baseline justify-between gap-4 border-t ${HAIR} pt-5 font-mono text-[11px] uppercase tracking-[0.3em]`}
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

/** Figure caption — every figure is numbered evidence, not decoration. */
export function FigCaption({ children }: { children: ReactNode }) {
  return (
    <p className={`mt-4 border-t ${HAIR} pt-3 font-mono text-[11px] leading-relaxed text-[var(--gray)]`}>
      {children}
    </p>
  );
}
