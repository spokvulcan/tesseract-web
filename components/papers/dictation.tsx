"use client";

import { serif } from "@/components/landing/fonts";
import { In, SectionMark, FigCaption } from "@/components/landing/shared";
import { PAPERS } from "./list";
import { PaperShell, PaperOpening, PaperAbstract, PaperClose, Practice, Theorem } from "./paper";
import { DictationFigure } from "./figures";

const PAPER = PAPERS[1];

const PRACTICE = [
  ["the hotkey", "hold ⌥ option and space · changeable in Settings"],
  ["permissions", "the microphone to hear you, accessibility to type"],
  ["the models", "Whisper Turbo, ~1.5 GB · a ~650 MB compact variant for tighter Macs"],
  ["the network", "needed once, to download the models · dictation itself is offline"],
];

export function DictationPaper() {
  return (
    <PaperShell>
      <PaperOpening
        paper={PAPER}
        title={
          <>
            Any text field{" "}
            <span className={`${serif.className} italic`}>becomes a microphone.</span>
          </>
        }
        lede="Hold option and space, and speak. Your words are typed into whatever app is in front of you, in any of 99 languages, with nothing leaving the Mac. Release the keys and the sentence is already there."
      />

      <PaperAbstract keywords="hold to talk · 99 languages · works offline">
        Dictation turns speech into typed text anywhere on your Mac. There is
        no window to open and no mode to enter: the held keys are the
        microphone switch, and the words land wherever your cursor is, in
        Mail, in Slack, in a code editor. A second, much smaller model reads
        every take before it is typed and quietly repairs what the ear got
        wrong. All of it runs on your machine. On a plane, in a dead zone,
        it works exactly the same.
      </PaperAbstract>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 01" title="the claims" />

        <div className="mt-6">
          <Theorem
            n="2.1"
            name="hold to talk"
            stmt="The keys are the microphone switch."
            proof="While option and space are down, Tesseract listens. The moment you let go, the sentence is typed into the app in front of you. No app of ours to focus first, no record button, no paste step. The distance between a thought and typed text is the time it takes to say it."
            chips={["hold ⌥ space, speak, release", "types into any app", "no window, no mode"]}
          />
          <Theorem
            n="2.2"
            name="the proofread pass"
            stmt="A second pair of eyes, half a gigabyte small."
            proof="Raw transcription is imperfect: a missing comma, the wrong casing, a word the ear misheard. So a small dedicated model reads every take before it is typed and fixes exactly those things. When a take is pure mumble, it says so instead of typing garbage. It runs alongside everything else and never holds your sentence hostage."
            chips={["fixes punctuation and casing", "catches misheard words", "rejects unintelligible takes"]}
            delay={0.05}
          />
          <Theorem
            n="2.3"
            name="the languages"
            stmt="Speak the language you think in."
            proof="Dictation understands 99 languages, and switching is a picker, not a project. Underneath is Whisper, running whole on your Mac: about 1.5 GB on disk, with a compact variant at about 650 MB that gives up almost nothing. After the one download, the internet is never consulted again."
            chips={["99 languages", "switch any time", "offline, permanently"]}
            delay={0.1}
          />
        </div>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 02" title="the path of a sentence" />
        <In delay={0.1} className="mt-14">
          <DictationFigure />
          <FigCaption>
            fig. 01: from breath to sentence. The proofread pass stands
            between what was heard and what is typed.
          </FigCaption>
        </In>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 03" title="in practice" />
        <Practice items={PRACTICE} />
      </section>

      <PaperClose
        paper={PAPER}
        note="Dictation is shipped and worn daily. It runs on any Apple silicon Mac with 16 GB of memory, and nothing you say to it ever leaves the machine."
      />
    </PaperShell>
  );
}
