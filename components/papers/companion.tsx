"use client";

import { serif } from "@/components/landing/fonts";
import { In, SectionMark, FigCaption, HAIR } from "@/components/landing/shared";
import { DayFigure, MemoryFigure, LadderFigure, FoldFigure } from "@/components/landing/figures";
import { PAPERS } from "./list";
import { PaperShell, PaperOpening, PaperAbstract, PaperClose } from "./paper";

const PAPER = PAPERS[0];

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
    "def. 1.1: it decides for itself",
    "The Companion makes its own judgments: what matters, when to speak, what to remember. Nothing about it is scripted. The app around it only provides what a mind needs: time to think, memory that lasts, and a record it cannot edit.",
  ],
  [
    "def. 1.2: silence, recorded",
    "It speaks when it has something worth saying, never because a timer went off. Every silence is a decision too, and every decision, spoken or silent, goes on the record.",
  ],
  [
    "def. 1.3: promises",
    "When it says it will check on something at five, that is a promise. Every promise either happens or is visibly rescheduled. A promise that quietly vanishes is treated as a serious bug. We stop everything to fix it.",
  ],
  [
    "def. 1.4: the flight recorder",
    "Everything it thinks, says, and decides is written to a log that only grows. The Companion can read its own history, but it can never rewrite it. So you can always check what it did, and why.",
  ],
];

const STATUS_ROWS = [
  ["invented memories", "never"],
  ["promises dropped silently", "0"],
  ["times switched off", "0"],
  ["worn daily since", "july 12, 2026"],
];

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

export function CompanionPaper() {
  return (
    <PaperShell>
      <PaperOpening
        paper={PAPER}
        title={
          <>
            An entity,{" "}
            <span className={`${serif.className} italic`}>not a feature.</span>
          </>
        }
        lede="The Companion is not a reminder app, and not a chatbot waiting for a prompt. It is closer to a colleague who shares your Mac: it wakes up on its own, plans its own day around yours, decides for itself when to speak and when to stay quiet, and writes down every decision it makes. Its one job is your success: your health, your mind, your work."
      />

      <PaperAbstract keywords="a colleague, not a chatbot · judgment, not rules · silence as a decision">
        Most of what happens on your screen was made by someone who profits
        when you look. The Companion is the counterweight: an AI that lives
        the day beside you, notices what lands, and interrupts only when the
        interruption is worth your time. This paper describes what that takes:
        a mind that decides for itself, a memory that can show its sources,
        a strict ceiling on how loud it may get, and one continuous
        conversation it holds with itself. It is young, it is evolving in the
        open, and it is the reason Tesseract exists.
      </PaperAbstract>

      {/* ------------------------------------------------------------ */}
      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 01" title="the entity" />

        <In delay={0.1} className="mt-14">
          <DayFigure />
          <FigCaption>
            fig. 01: a day the Companion booked for itself. Tomorrow will look
            different, because the hours are its judgment, not ours.
          </FigCaption>
        </In>

        {/* definitions */}
        <div className={`mt-16 grid gap-10 border-t ${HAIR} pt-10 sm:grid-cols-2`}>
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
      </section>

      {/* ------------------------------------------------------------ */}
      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 02" title="living memory" />

        <In delay={0.05}>
          <h2 className="mt-14 text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
            It remembers the way you do,{" "}
            <span className={`${serif.className} italic`}>and it knows why.</span>
          </h2>
        </In>
        <In delay={0.08}>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            While you sleep, the Companion goes back over the day and
            decides what deserved remembering. It decides with hindsight,
            once the day&apos;s consequences are visible, the same way
            your own memory works. What it keeps becomes a belief: a short
            sentence about your life, with the exact moments that support
            it attached. Every morning opens with one specific, true
            callback to your life. A generic line is a disappointment; an
            invented one, a betrayal. And you can open any belief, see
            exactly why it holds it, and veto it. You are the authority on
            your own life.
          </p>
        </In>
        <In delay={0.1} className="mt-12">
          <MemoryFigure />
          <FigCaption>
            fig. 02: anatomy of one belief. Every claim carries its sources;
            a changed mind supersedes, never erases.
          </FigCaption>
        </In>
      </section>

      {/* ------------------------------------------------------------ */}
      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 03" title="the volume" />

        <In delay={0.05}>
          <h2 className="mt-14 text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
            Loud enough to matter.{" "}
            <span className={`${serif.className} italic`}>Never louder.</span>
          </h2>
        </In>
        <In delay={0.08}>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            When something is worth your attention, the Companion chooses
            how loudly to say so: a small mark in the menu bar, a
            notification, a spoken line, or a full conversation. How loud
            to get is its judgment. Whether it may get loud at all is
            yours: quiet hours are something you tell it in plain words,
            and every dismissal you make is a recorded fact it has to
            answer to.
          </p>
        </In>
        <In delay={0.1} className="mt-12">
          <LadderFigure />
          <FigCaption>
            fig. 03: how loud it is allowed to get. The final word is always
            yours.
          </FigCaption>
        </In>
        <In delay={0.1}>
          <div className={`mt-12 flex flex-col gap-5 border-t ${HAIR} pt-8 sm:flex-row sm:gap-12`}>
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
      </section>

      {/* ------------------------------------------------------------ */}
      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 04" title="one mind" />

        <In delay={0.05}>
          <h2 className="mt-14 text-3xl font-light leading-[1.08] tracking-[-0.02em] sm:text-4xl">
            One mind,{" "}
            <span className={`${serif.className} italic`}>one conversation.</span>
          </h2>
        </In>
        <In delay={0.08}>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
            Everything the Companion notices, whether a notification, an
            app you settled into, or the morning itself, lands in one continuous
            conversation it holds with itself, called Mission Control.
            That one conversation is its whole mind: the thought it has at
            two in the afternoon builds on what it saw at nine. And each
            night it condenses its own history into a short digest, so
            years of living beside you still fit in a mind that stays
            fast.
          </p>
        </In>
        <In delay={0.1} className="mt-12">
          <FoldFigure />
          <FigCaption>
            fig. 04: the event fold. Notice, think, remember: the same
            loop a person runs, with every judgment left to the Companion.
          </FigCaption>
        </In>
      </section>

      {/* ------------------------------------------------------------ */}
      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 05" title="honest status" note="evolving" />

        <In delay={0.05}>
          <div className="mt-14 border border-[var(--ink)]/15 p-8 sm:p-10">
            <p className="max-w-2xl text-base font-light leading-relaxed text-[var(--body)] sm:text-lg">
              The Companion ships today behind one switch in Settings, off by
              default. The core works: promises are kept, silence is earned,
              and its author has worn it every day since July 2026. It is
              also young, and we are rebuilding it layer by layer, in the
              open: one identity across voice and chat, ears that hear your
              tone instead of a transcript, eyes that read the screen when it
              wakes. What you download is the seed, not the tree.
            </p>
            <div className={`mt-8 grid grid-cols-2 gap-6 border-t ${HAIR} pt-6 sm:grid-cols-4`}>
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

      {/* ------------------------------------------------------------ */}
      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 06" title="the work ahead" />

        <In delay={0.05}>
          <p className="mt-14 max-w-2xl text-lg font-light leading-relaxed text-[var(--body)] sm:text-xl">
            We are not pretending this is solved. Between here and the
            Companion we want stand real problems.{" "}
            <span className={`${serif.className} italic text-[var(--ink)]`}>
              We name them because we intend to close them.
            </span>
          </p>
        </In>

        <div className="mt-12">
          {OPEN_PROBLEMS.map((op, i) => (
            <In key={op.n} delay={0.03 * i}>
              <div className={`grid gap-4 border-b ${HAIR} py-10 sm:grid-cols-12 sm:gap-8`}>
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

      <PaperClose
        paper={PAPER}
        note="The Companion waits behind one switch in Settings, off by default. It asks more of the machine than the rest of Tesseract: an Apple silicon Mac with 48 GB of memory or more. It is young, evolving, and worth meeting."
      />
    </PaperShell>
  );
}
