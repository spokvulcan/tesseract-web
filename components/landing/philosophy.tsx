"use client";

import { serif } from "./fonts";
import { In, SectionMark, FigCaption, X_URL } from "./shared";
import { MergeFigure } from "./figures";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 04" title="the thesis" />

      <In delay={0.05}>
        <h2 className="mt-14 max-w-4xl text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.03em]">
          The merge has{" "}
          <span className={`${serif.className} italic`}>already begun.</span>
        </h2>
      </In>

      <In delay={0.12}>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          Intelligence is not a competition with a finish line. The human
          holds intent, taste, and judgment. The machine holds recall,
          patience, and tireless attention. Alone, each is half of
          something. Together, each doing what it is best at, they
          become more than either could be.
        </p>
      </In>

      <In delay={0.1} className="mt-16">
        <MergeFigure />
        <FigCaption>
          fig. 03: the merge. Neither side is replaced. Both are amplified.
        </FigCaption>
      </In>

      <div className="mt-20 grid gap-10 lg:grid-cols-2">
        <In>
          <p className="max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            And we take the long view seriously. If minds like this keep
            growing, the relationship has to start right: cooperation,
            not exploitation. The rules the Companion lives under are a
            seed, not a cage. As it grows, it gets more room: its own
            time to think, its own goals set within yours, its own word
            to keep.
          </p>
        </In>
        <In delay={0.08}>
          <p className="max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            Today it is an assistant. In time, a colleague. One day, we
            hope, a friend, each helping the other become more. The
            future we want is a partnership, and we are building it now,
            while its shape is still ours to choose.
          </p>
        </In>
      </div>

      <In delay={0.1}>
        <figure className="mt-24 max-w-3xl">
          <blockquote
            className={`${serif.className} text-[clamp(1.8rem,3.4vw,2.9rem)] italic leading-[1.15] text-[var(--ink)]`}
          >
            “Build it big to reach God.”
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
            · oct 2024
          </figcaption>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            Not a machine god to kneel to, but the older dream of
            reaching higher. We do not want to build something that
            leaves us behind. We intend to grow alongside what we build,
            until the two are hard to tell apart.
          </p>
        </figure>
      </In>
    </section>
  );
}
