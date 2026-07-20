"use client";

import { serif } from "@/components/landing/fonts";
import { In, SectionMark, FigCaption } from "@/components/landing/shared";
import { PAPERS } from "./list";
import { PaperShell, PaperOpening, PaperAbstract, PaperClose, Practice, Theorem } from "./paper";
import { RecallFigure } from "./figures";

const PAPER = PAPERS[3];

const PRACTICE = [
  ["ask by voice", "hold ⌃ control and space, speak, release"],
  ["show it things", "paste a screenshot, drop an image, or take an Appshot"],
  ["the models", "open models you download once, from ~3.5 GB to a ~21 GB flagship"],
  ["the memory", "beliefs with sources, reviewed while the Mac is idle · yours to veto"],
];

export function ChatPaper() {
  return (
    <PaperShell>
      <PaperOpening
        paper={PAPER}
        title={
          <>
            It remembers what you{" "}
            <span className={`${serif.className} italic`}>told it in March.</span>
          </>
        }
        lede="Underneath everything in Tesseract is a full chat assistant, like the AI apps you already know. Speak or type, paste a screenshot, hand it a task. The difference is where it lives, and what it keeps."
      />

      <PaperAbstract keywords="a chat you already know · living memory · everything stays local">
        The chat is the familiar part of Tesseract, deliberately so. You ask,
        it answers; you show it an image, it reads it. Two things set it
        apart. It runs whole on your Mac, on open models you download once
        and own, so nothing you type, say, or show it is ever sent anywhere.
        And it keeps a living memory: what matters from each conversation is
        distilled into beliefs about your life, each one carrying the exact
        moments that support it, so a fact you mentioned once in March still
        shapes an answer in July.
      </PaperAbstract>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 01" title="the claims" />

        <div className="mt-6">
          <Theorem
            n="4.1"
            name="the assistant"
            stmt="Everything you expect from a chat AI, minus the cloud."
            proof="Ask questions, draft and rewrite text, think through problems, hand it images. It runs on open models kept on your disk: a ~3.5 GB starter that is quick on a 16 GB Mac, up to a ~21 GB flagship for bigger machines, chosen in Settings. There is no account and no server of ours behind it."
            chips={["text, voice, images", "open models, downloaded once", "no account, no cloud"]}
          />
          <Theorem
            n="4.2"
            name="living memory"
            stmt="A memory that works like yours."
            proof="It does not transcribe your life; it distills it. What deserved remembering becomes a belief, a short sentence with the exact conversations that support it attached. Ask why it believes something and it shows its sources. Veto anything. You are the authority on your own life."
            chips={["beliefs carry their sources", "you hold the veto", "continuity across months"]}
            delay={0.05}
          />
          <Theorem
            n="4.3"
            name="ask by voice"
            stmt="Hold control and space, and just say it."
            proof="The chat is never more than a held key away. Hold control and space, ask out loud, release: your question lands in the conversation, transcribed on the machine. Flip one switch and the answers come back spoken too, in the designed voice from the voice paper."
            chips={["⌃ space to ask aloud", "spoken answers, optional", "one assistant everywhere"]}
            delay={0.1}
          />
        </div>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 02" title="continuity" />
        <In delay={0.1} className="mt-14">
          <RecallFigure />
          <FigCaption>
            fig. 01: continuity. A fact mentioned once, carried as a belief
            with its sources, shaping an answer months later.
          </FigCaption>
        </In>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 03" title="in practice" />
        <Practice items={PRACTICE} />
      </section>

      <PaperClose
        paper={PAPER}
        note="The chat is shipped and worn daily. It starts on any Apple silicon Mac with 16 GB of memory, and every conversation stays on your disk."
      />
    </PaperShell>
  );
}
