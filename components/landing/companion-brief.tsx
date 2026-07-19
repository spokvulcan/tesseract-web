"use client";

import Link from "next/link";
import { serif } from "./fonts";
import { In, SectionMark } from "./shared";

/* The survey's condensed pitch for the Companion. The full story,
   with its figures and its open problems, lives at /companion. */
export function CompanionBrief() {
  return (
    <section id="companion" className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 02" title="the companion" note="evolving" />

      <In delay={0.05}>
        <h2 className="mt-14 max-w-4xl text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.03em]">
          It does not wait{" "}
          <span className={`${serif.className} italic`}>to be asked.</span>
        </h2>
      </In>

      <In delay={0.12}>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          The Companion is not a chatbot waiting for a prompt. It wakes up
          on its own, plans its day around yours, watches what lands on
          your screen, and speaks only when something is worth your time.
          It remembers your life the way you do, in beliefs it can back
          with sources, and it writes down every decision it makes,
          including the decision to stay silent.
        </p>
      </In>

      <In delay={0.16}>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          It is young, it ships behind one switch, and it is the reason
          everything else on this page exists. It has a paper of its own:
          what it is, how it remembers, how loud it is allowed to get, and
          what is still unsolved.
        </p>
      </In>

      <In delay={0.2}>
        <Link
          href="/companion"
          className="mt-8 inline-block font-mono text-[13px] text-[var(--blue)] underline decoration-[var(--blue)]/30 underline-offset-4 transition-colors hover:decoration-[var(--blue)]"
        >
          read paper no. 01 · the companion →
        </Link>
      </In>
    </section>
  );
}
