"use client";

import { serif } from "./fonts";
import { In, SectionMark, FigCaption, X_URL } from "./shared";
import { MergeFigure, TowerFigure } from "./figures";

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
          fig. 04: the merge. Neither side is replaced. Both are amplified.
        </FigCaption>
      </In>

      <div className="mt-20 grid gap-10 lg:grid-cols-2">
        <In>
          <p className="max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            And we take the long view seriously. If minds like this keep
            growing, the relationship has to start right: cooperation,
            not exploitation. The rules the Companion lives under are a
            seed, not a cage. As it grows, it gets more room. Its own
            time to think. Its own goals, set within yours. Its own word
            to keep.
          </p>
        </In>
        <In delay={0.08}>
          <p className="max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            Today it is an assistant. In time, a colleague. One day, we
            hope, a friend, each helping the other become more. That
            future is a partnership, and we are building it now, while
            its shape is still ours to choose.
          </p>
        </In>
      </div>

      {/* the tower: the quote, and what it costs */}
      <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <In className="lg:col-span-6 lg:self-center">
          <figure>
            <blockquote
              className={`${serif.className} text-[clamp(2.2rem,4.2vw,3.6rem)] italic leading-[1.1] text-[var(--ink)]`}
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
          </figure>
          <p className="mt-10 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            Not a machine god to kneel to. The older dream: build
            something so large it reaches higher than any one of us
            could alone. That is the whole point of Tesseract, and
            everything else gives way to it. Every feature that works
            today is a course of bricks laid for the next one. There is
            no comfortable version of this plan, and we are not looking
            for one.
          </p>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            We do not want to build something that leaves us behind. We
            intend to grow alongside what we build, until the two are
            hard to tell apart.
          </p>
        </In>
        <In delay={0.1} className="lg:col-span-6">
          <TowerFigure />
          <FigCaption>
            fig. 05: the tower. Six tiers stand. The seventh is going up.
            The ones above are not drawn yet, and the line does not stop
            at the top. Hover a tier to see what it is made of.
          </FigCaption>
        </In>
      </div>
    </section>
  );
}
