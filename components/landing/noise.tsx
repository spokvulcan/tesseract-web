"use client";

import { serif } from "./fonts";
import { In, SectionMark, FigCaption, X_URL } from "./shared";
import { NoiseFigure } from "./figures";

export function NoiseSection() {
  return (
    <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 01" title="the problem" />

      <In delay={0.05}>
        <h2 className="mt-14 max-w-4xl text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.03em]">
          The world got louder.{" "}
          <span className={`${serif.className} italic`}>
            Your hours didn&apos;t.
          </span>
        </h2>
      </In>

      <In delay={0.12}>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          Every feed, banner, and badge is built to steal your attention. The
          one machine that could protect it was never given a mind of its own.
          We think the next frontier is not a bigger model. It is a filter
          that knows you: it reads everything happening on your Mac, weighs
          each signal against your life, and interrupts you only when the
          interruption is worth your time.
        </p>
      </In>

      <In delay={0.1} className="mt-16">
        <NoiseFigure />
        <FigCaption>
          fig. 02: the filter. Everything is heard, almost nothing is passed on.
        </FigCaption>
      </In>

      <In delay={0.1}>
        <figure className="mt-20 max-w-3xl lg:ml-auto lg:text-right">
          <blockquote
            className={`${serif.className} text-[clamp(1.8rem,3.4vw,2.9rem)] italic leading-[1.15] text-[var(--ink)]`}
          >
            “AI is the signal.
            <br />
            Everything else is noise.”
          </blockquote>
          <figcaption className="mt-5 font-mono text-[11px] text-[var(--gray)]">
            <a
              href={X_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[var(--blue)]"
            >
              @spok_vulkan
            </a>{" "}
            · sep 2024
          </figcaption>
        </figure>
      </In>
    </section>
  );
}
