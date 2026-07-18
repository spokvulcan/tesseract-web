"use client";

import { serif } from "./fonts";
import { In, SectionMark, FigCaption } from "./shared";
import { DayFigure, MemoryFigure, LadderFigure, FoldFigure } from "./figures";

/* The menu-bar presence states. */
const GLYPH_STATES = [
  {
    glyph: <span className="block h-3.5 w-3.5 animate-pulse bg-[var(--ink)]" />,
    state: "is thinking",
    desc: "it is working on something you have not seen yet",
  },
  {
    glyph: (
      <span className="flex h-3.5 w-3.5 items-center justify-center border border-[var(--ink)]">
        <span className="block h-1.5 w-1.5 bg-[var(--blue)]" />
      </span>
    ),
    state: "is asking for you",
    desc: "it raised its hand, and it will wait until you look",
  },
  {
    glyph: (
      <span className="flex h-3.5 w-3.5 items-end border border-[var(--ink)]">
        <span className="block h-1.5 w-full bg-[var(--ink)]/60" />
      </span>
    ),
    state: "is settling the day",
    desc: "the day's memories settling into beliefs",
  },
];

const DEFS = [
  [
    "def. 2.1: entity and harness",
    "Every judgment belongs to the model. The code only provides what judgment needs: time to think, memory that lasts, and a record it cannot edit.",
  ],
  [
    "def. 2.2: silence, recorded",
    "It speaks when it has something worth saying, never because a timer went off. Every silence is a decision, and every decision is on the record.",
  ],
  [
    "def. 2.3: promises",
    "It makes its own commitments, and each one either happens or is visibly rescheduled. A dropped promise is a defect we stop everything to fix.",
  ],
  [
    "def. 2.4: the flight recorder",
    "Everything it thinks, says, and decides goes into a log that only grows. The Companion can read its own history. It can never rewrite it.",
  ],
];

const STATUS_ROWS = [
  ["invented memories", "never"],
  ["promises dropped silently", "0"],
  ["times switched off", "0"],
  ["worn daily since", "july 12, 2026"],
];

export function CompanionSection() {
  return (
    <section id="companion" className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-32">
      <SectionMark no="§ 02" title="the companion" note="experimental" />

      <In delay={0.05}>
        <h2 className="mt-14 max-w-4xl text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.02] tracking-[-0.03em]">
          An entity,{" "}
          <span className={`${serif.className} italic`}>not a feature.</span>
        </h2>
      </In>

      <In delay={0.12}>
        <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
          The Companion is not a reminder app with generated strings, and not
          a chatbot waiting to be asked. It wakes on its own, books its own
          day around yours, decides when to speak and when to stay silent, and
          writes down everything it decides. Its goal is your success: your
          health, your mind, your work.
        </p>
      </In>

      <In delay={0.1} className="mt-16">
        <DayFigure />
        <FigCaption>
          fig. 03: a day the Companion booked for itself. Tomorrow will look
          different, because the hours are its judgment, not ours.
        </FigCaption>
      </In>

      {/* definitions */}
      <div className="mt-16 grid gap-10 border-t border-[var(--ink)]/10 pt-10 sm:grid-cols-2">
        {DEFS.map(([t, d], i) => (
          <In key={t} delay={i * 0.06}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--blue)]">
              {t}
            </p>
            <p className="mt-3 max-w-md text-[15px] font-light leading-relaxed text-[var(--body)]">
              {d}
            </p>
          </In>
        ))}
      </div>

      {/* living memory */}
      <div className="mt-24">
        <In>
          <h3 className="text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
            It remembers the way you do,{" "}
            <span className={`${serif.className} italic`}>and it knows why.</span>
          </h3>
        </In>
        <In delay={0.08}>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            During the night, the day&apos;s memories settle into lasting
            beliefs, much as they do for you. What deserved remembering is
            decided with hindsight, when the day&apos;s consequences are
            visible. Every morning opens with one specific, true callback to
            your life: a generic line is a disappointment, an invented one a
            betrayal. You can inspect anything it believes, and you can veto
            it. You are the authority on your own life.
          </p>
        </In>
        <In delay={0.1} className="mt-12">
          <MemoryFigure />
          <FigCaption>
            fig. 04: anatomy of one belief. Every claim carries its sources;
            a changed mind supersedes, never erases.
          </FigCaption>
        </In>
      </div>

      {/* escalation */}
      <div className="mt-24">
        <In>
          <h3 className="text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
            Loud enough to matter.{" "}
            <span className={`${serif.className} italic`}>Never louder.</span>
          </h3>
        </In>
        <In delay={0.08}>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            How loud it may get is its judgment. Whether it may get loud at
            all is yours: quiet hours are something you tell it, not a curfew
            we coded, and every dismissal you make is a recorded fact it
            learns from.
          </p>
        </In>
        <In delay={0.1} className="mt-12">
          <LadderFigure />
          <FigCaption>
            fig. 05: how loud it is allowed to get. The final word is always
            yours.
          </FigCaption>
        </In>
        <In delay={0.1}>
          <div className="mt-12 flex flex-col gap-5 border-t border-[var(--ink)]/10 pt-8 sm:flex-row sm:gap-12">
            {GLYPH_STATES.map((g) => (
              <div key={g.state} className="flex items-start gap-3.5">
                <span className="mt-1">{g.glyph}</span>
                <span>
                  <span className="block font-mono text-[12px] text-[var(--ink)]">
                    {g.state}
                  </span>
                  <span className="mt-1 block max-w-[26ch] text-[13px] font-light leading-snug text-[var(--gray)]">
                    {g.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </In>
      </div>

      {/* one mind */}
      <div className="mt-24">
        <In>
          <h3 className="text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
            One mind,{" "}
            <span className={`${serif.className} italic`}>one conversation.</span>
          </h3>
        </In>
        <In delay={0.08}>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            Every signal becomes exactly one event, and every event lands in
            one standing conversation called Mission Control. That conversation
            is the Companion&apos;s whole mind: the thought at 14:00 builds on
            what it noticed at 09:00. Each night it writes a digest of its own
            history, so the mind stays fast on your Mac for years.
          </p>
        </In>
        <In delay={0.1} className="mt-12">
          <FoldFigure />
          <FigCaption>
            fig. 06: the event fold. The same loop that makes a human human,
            with every judgment left to the Companion.
          </FigCaption>
        </In>
      </div>

      {/* honest status */}
      <In delay={0.05}>
        <div className="mt-24 border border-[var(--ink)]/15 p-8 sm:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--blue)]">
            honest status: proof of concept
          </p>
          <p className="mt-5 max-w-2xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            The Companion ships today behind an experimental switch, off by
            default. The loop works: promises happen, silence is earned, and
            its author has worn it daily since July 2026. It is also young. We
            are refining it quickly: one identity across voice and chat, ears
            that hear tone instead of transcripts, a filter that forwards only
            what you would. What you download is the seed, not the tree.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[var(--ink)]/10 pt-6 sm:grid-cols-4">
            {STATUS_ROWS.map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--gray)]">
                  {k}
                </p>
                <p className="mt-2 font-mono text-[13px] text-[var(--ink)]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </In>
    </section>
  );
}
