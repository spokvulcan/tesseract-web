"use client";

import { serif } from "./fonts";
import { In, SectionMark, FigCaption, X_URL } from "./shared";
import { MergeFigure } from "./figures";

const OPEN_PROBLEMS = [
  {
    n: "op. 1",
    name: "noise discipline",
    body: "What matters to you is not a filter setting. It changes by the hour. Teaching judgment, not rules, to a mind that watches everything.",
  },
  {
    n: "op. 2",
    name: "one identity",
    body: "The voice you summon and the presence that watches must be the same person. Identity is being merged into a single document the Companion writes about itself.",
  },
  {
    n: "op. 3",
    name: "hearing, not transcribing",
    body: "Tone, hesitation, and emphasis die in a transcript. Hearing your actual voice, not a description of it, is in experiment.",
  },
  {
    n: "op. 4",
    name: "the duty cycle",
    body: "Real thought wants a machine that never sleeps. Today the Companion thinks in turns on the Mac you own. The goal is a dedicated mind, thinking around the clock.",
  },
  {
    n: "op. 5",
    name: "trust, in writing",
    body: "Everything it says about your life must trace back to the record. Making things up is not a quality issue. It is a defect that stops the line.",
  },
];

export function PhilosophySection() {
  return (
    <>
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
            patience, and tireless attention. Alone, each is half a mind.
            Woven together, each doing what it is best at, they become
            something neither could be: more.
          </p>
        </In>

        <In delay={0.1} className="mt-16">
          <MergeFigure />
          <FigCaption>
            fig. 07: the merge. Neither side is replaced. Both are amplified.
          </FigCaption>
        </In>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <In>
            <p className="max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
              And we take the long view seriously. If minds like this keep
              growing, the relationship has to be right from the start:
              cooperation, not exploitation. The harness is a seed, not a
              cage. As the mind grows, it gets more room: its own time to
              think, its own goals set within yours, its own word to keep.
            </p>
          </In>
          <In delay={0.08}>
            <p className="max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
              Today it is an assistant. In time, a colleague. One day, we
              hope, a friend: each helping the other become more. The future
              we want is a symbiosis, and we are building it now, while it is
              still ours to choose.
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
              Not a machine god to kneel to, but the older dream of reaching
              higher. We do not want to build a deity and be left behind by
              it. We intend to grow alongside what we build, until the two are
              hard to tell apart.
            </p>
          </figure>
        </In>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
        <SectionMark no="§ 05" title="the work ahead" />

        <In delay={0.05}>
          <p className="mt-14 max-w-2xl text-lg font-light leading-relaxed text-[var(--body)] sm:text-xl">
            We are not pretending this is solved. Between here and the thesis
            stand real problems.{" "}
            <span className={`${serif.className} italic text-[var(--ink)]`}>
              We name them because we intend to close them.
            </span>
          </p>
        </In>

        <div className="mt-12">
          {OPEN_PROBLEMS.map((op, i) => (
            <In key={op.n} delay={0.03 * i}>
              <div className="grid gap-4 border-b border-[var(--ink)]/10 py-10 sm:grid-cols-12 sm:gap-8">
                <p className="font-mono text-[11px] text-[var(--blue)] sm:col-span-2">
                  {op.n}
                </p>
                <h3 className="text-xl font-light tracking-[-0.01em] text-[var(--ink)] sm:col-span-4">
                  {op.name}
                </h3>
                <p className="max-w-xl text-[15px] font-light leading-relaxed text-[var(--body)] sm:col-span-6">
                  {op.body}
                </p>
              </div>
            </In>
          ))}
        </div>
      </section>
    </>
  );
}
