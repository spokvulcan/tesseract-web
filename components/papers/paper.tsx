"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/navigation";
import { grotesk, serif } from "@/components/landing/fonts";
import { DOWNLOAD_URL, GITHUB_URL, HAIR, In } from "@/components/landing/shared";
import { paperAfter, type Paper } from "./list";

/* ------------------------------------------------------------------ */
/*  The shared skeleton of a capability paper. Each page under        */
/*  /companion, /dictation, ... is one of these: the same masthead,   */
/*  the same type system, its own claims and figures.                 */
/* ------------------------------------------------------------------ */

export function PaperShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${grotesk.variable} relative min-h-screen bg-[var(--paper)] text-[var(--ink)]`}
      style={{ fontFamily: "var(--landing-grotesk), system-ui, sans-serif" }}
    >
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

/** The paper's front matter: series line, title claim, and lede. */
export function PaperOpening({
  paper,
  title,
  lede,
}: {
  paper: Paper;
  title: ReactNode;
  lede: ReactNode;
}) {
  return (
    <section className="px-6 pt-40 sm:px-12 lg:px-16 lg:pt-48">
      <In>
        <div className="flex items-baseline justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.3em]">
          <span>
            <span className="text-[var(--blue)]">paper no. {paper.no}</span>
            <span className="ml-4 text-[var(--gray)]">{paper.name}</span>
          </span>
          <span className="border border-[var(--blue)]/40 px-2.5 py-1 text-[9px] tracking-[0.25em] text-[var(--blue)]">
            {paper.status}
          </span>
        </div>
      </In>
      <In delay={0.08}>
        <h1 className="mt-12 max-w-4xl text-[clamp(2.8rem,6vw,5.4rem)] font-light leading-[1.0] tracking-[-0.03em]">
          {title}
        </h1>
      </In>
      <In delay={0.16}>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          {lede}
        </p>
      </In>
    </section>
  );
}

/** The abstract block, same shape as the survey's. */
export function PaperAbstract({
  children,
  keywords,
}: {
  children: ReactNode;
  keywords: string;
}) {
  return (
    <section className={`mt-16 border-t ${HAIR} px-6 py-16 sm:px-12 lg:px-16 lg:py-20`}>
      <In>
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--blue)] lg:col-span-2">
            abstract
          </p>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-[var(--body)] lg:col-span-7">
            {children}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)] lg:col-span-3">
            keywords: {keywords}
          </p>
        </div>
      </In>
    </section>
  );
}

/** One theorem row: numbered claim, proof, plain-terms chips. */
export function Theorem({
  n,
  name,
  stmt,
  proof,
  chips,
  href,
  delay = 0,
}: {
  n: string;
  name: string;
  stmt: ReactNode;
  proof: ReactNode;
  chips: string[];
  href?: string;
  delay?: number;
}) {
  return (
    <In delay={delay}>
      <div className={`grid gap-8 border-b ${HAIR} py-14 lg:grid-cols-12 lg:gap-10`}>
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] text-[var(--blue)]">
            theorem {n} <span className="text-[var(--gray)]">({name})</span>
          </p>
          <h3 className="mt-4 text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
            {stmt}
          </h3>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[15px] font-light leading-relaxed text-[var(--body)]">
            <span className={`${serif.className} italic text-[var(--ink)]`}>Proof. </span>
            {proof}
          </p>
          {href && (
            <Link
              href={href}
              className="mt-5 inline-block font-mono text-[12px] text-[var(--blue)] underline decoration-[var(--blue)]/30 underline-offset-4 transition-colors hover:decoration-[var(--blue)]"
            >
              read the paper →
            </Link>
          )}
        </div>
        <div className="lg:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--faint)]">
            in plain terms
          </p>
          <ul className="mt-3 space-y-2 font-mono text-[12px] text-[var(--body)]">
            {chips.map((c) => (
              <li key={c} className="flex gap-2.5">
                <span className="text-[var(--blue)]">·</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </In>
  );
}

/** The "in practice" facts: a full-width two-column grid, one bordered
    cell per fact, so the section fills the row instead of hugging the
    left edge. */
export function Practice({ items }: { items: string[][] }) {
  return (
    <div className="mt-12 grid gap-x-16 gap-y-10 sm:grid-cols-2">
      {items.map(([k, v], i) => (
        <In key={k} delay={0.04 * i}>
          <div className={`border-t ${HAIR} pt-4`}>
            <p className="font-mono text-[12px] text-[var(--gray)]">{k}</p>
            <p className="mt-2 max-w-md text-[15px] font-light leading-relaxed text-[var(--ink)]">
              {v}
            </p>
          </div>
        </In>
      ))}
    </div>
  );
}

/** The paper's closing: one plain requirement line, the download, and
    a pointer to the next paper in the series. */
export function PaperClose({
  paper,
  note,
}: {
  paper: Paper;
  note: string;
}) {
  const next = paperAfter(paper.slug);
  return (
    <section className="px-6 py-28 text-center sm:px-12 lg:py-36">
      <In>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em]">
          <span className="text-[var(--blue)]">§ end</span>
          <span className="ml-4 text-[var(--gray)]">see for yourself</span>
        </p>
      </In>
      <In delay={0.08}>
        <p className="mx-auto mt-8 max-w-md text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          {note}
        </p>
      </In>
      <In delay={0.14}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-8 py-4 font-mono text-sm text-[var(--paper)] transition-colors hover:bg-[var(--blue)]"
          >
            Download for Mac
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-[var(--gray)] underline decoration-[var(--ink)]/20 underline-offset-4 transition-colors hover:text-[var(--blue)]"
          >
            read the source
          </a>
        </div>
      </In>
      <In delay={0.2}>
        <p className="mt-14 font-mono text-[11px] text-[var(--gray)]">
          next in the series:{" "}
          <Link
            href={`/${next.slug}`}
            className="text-[var(--blue)] transition-colors hover:underline"
          >
            paper no. {next.no} · {next.name} →
          </Link>
        </p>
      </In>
    </section>
  );
}
