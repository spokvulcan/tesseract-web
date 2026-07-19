"use client";

import { serif } from "./fonts";
import { In, SectionMark, FigCaption, X_URL } from "./shared";
import { MergeFigure } from "./figures";

const OPEN_PROBLEMS = [
  {
    n: "op. 1",
    name: "eyes",
    body: "Today the Companion cannot see your screen. You can only show it things. Planned: when it wakes to think, it glances at the screen and keeps what it read as words. The picture itself is thrown away on the spot. Words, not pixels, and never a recording.",
  },
  {
    n: "op. 2",
    name: "noise discipline",
    body: "What matters to you is not a setting. It changes by the hour. The work is teaching judgment, not rules. The endgame is a Mac that goes fully quiet, with the Companion as the only voice allowed to interrupt you.",
  },
  {
    n: "op. 3",
    name: "one identity",
    body: "The voice you summon and the presence that watches your day must be the same someone. Today they can drift apart. Their identity is being merged into a single document the Companion writes about itself.",
  },
  {
    n: "op. 4",
    name: "hearing, not transcribing",
    body: "Tone, hesitation, and emphasis die in a transcript. We are experimenting with letting it hear your actual voice, not a written description of it.",
  },
  {
    n: "op. 5",
    name: "the duty cycle",
    body: "Real thought wants a machine that never sleeps. Today the Companion thinks in bursts, on the Mac you own. The goal is a dedicated always-on machine: a mind thinking around the clock.",
  },
  {
    n: "op. 6",
    name: "trust, in writing",
    body: "Everything it says about your life must trace back to its record. An invented memory is not a quality issue. It is the defect that stops everything.",
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
            patience, and tireless attention. Alone, each is half of
            something. Together, each doing what it is best at, they
            become more than either could be.
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
