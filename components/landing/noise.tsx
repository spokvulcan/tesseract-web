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
          The only app that{" "}
          <span className={`${serif.className} italic`}>
            wants you to look away.
          </span>
        </h2>
      </In>

      <In delay={0.12}>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          Every feed, banner, and badge on your screen was made by someone
          who profits when you look. Your Mac, the machine it all happens
          on, was never taught to take your side. We think the next step
          for AI is not a bigger model. It is judgment about your
          attention: a filter that knows your day well enough to decide
          what is worth interrupting it.
        </p>
      </In>

      <In delay={0.16}>
        <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          So the Companion watches your notifications as they land and
          notices which ones you never got to. The unimportant ones are
          left to die quietly. The few that truly needed you, it brings
          back at a moment it judges right, as loudly as the matter
          deserves and no louder. What counts as important is not a
          setting you configure. It is judgment, learned from your life,
          and every time you dismiss it, that dismissal is remembered and
          weighed the next time. The goal is simple: fewer, better
          interruptions, and hours that stay yours.
        </p>
      </In>

      <In delay={0.1} className="mt-16">
        <NoiseFigure />
        <FigCaption>
          fig. 02: the filter. Everything is heard; almost nothing is
          allowed to reach you.
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
