"use client";

import { serif } from "@/components/landing/fonts";
import { In, SectionMark, FigCaption } from "@/components/landing/shared";
import { PAPERS } from "./list";
import { PaperShell, PaperOpening, PaperAbstract, PaperClose, Practice, Theorem } from "./paper";
import { AppshotFigure } from "./figures";

const PAPER = PAPERS[4];

const PRACTICE = [
  ["the gesture", "tap ⌘ command twice · changeable in Settings"],
  ["what is captured", "the frontmost window, whole, as an image and nothing more"],
  ["the permission", "Screen Recording, granted once, applied after a relaunch"],
  ["where it goes", "the chat composer on your Mac · never anywhere else"],
];

export function AppshotPaper() {
  return (
    <PaperShell>
      <PaperOpening
        paper={PAPER}
        title={
          <>
            Tap command twice, and it{" "}
            <span className={`${serif.className} italic`}>sees your window.</span>
          </>
        }
        lede="An Appshot is the fastest way to show the assistant what you are looking at. Double-tap the command key and the window in front of you is captured and staged in the chat, named after the app it came from. Then ask."
      />

      <PaperAbstract keywords="double-tap ⌘ · the window, not the screen · ask about what you see">
        Most of what you want from an AI at work is about something already
        on your screen: the Slack reply you are about to send, a client
        email in a language you half know, an error that means nothing to
        you. Describing it is slower than showing it. An Appshot captures
        the frontmost window in one gesture and hands it to the chat, where
        you ask in plain words: tighten this, translate this, explain this.
        The image is processed on your Mac and never leaves it.
      </PaperAbstract>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 01" title="the claims" />

        <div className="mt-6">
          <Theorem
            n="5.1"
            name="the capture"
            stmt="One gesture, no framing."
            proof="No crosshair to drag, no region to pick. Double-tap command and the frontmost window is the shot, whatever window that is, one of Tesseract's own included. It lands in the composer labeled with the app and window title, ready for a question."
            chips={["double-tap ⌘", "the frontmost window, whole", "staged in the chat, named"]}
          />
          <Theorem
            n="5.2"
            name="the workday"
            stmt="Built for the message you are about to send."
            proof="The everyday use is words. A reply you want a second opinion on before it goes to the whole channel. A thread in a language you read slowly. A dialog full of jargon. Appshot it, ask, and the answer arrives in the chat beside your work. Nothing is typed into the other app; you stay the editor."
            chips={["proofread before sending", "translate what you see", "explain what is on screen"]}
            delay={0.05}
          />
          <Theorem
            n="5.3"
            name="the patience"
            stmt="The shot waits for you."
            proof="A staged Appshot is part of your draft, and the draft survives you: switch conversations, start a new chat, come back later, and it is still there until you send or discard it. And it is an image and nothing more. No text is scraped from the window behind your back; the assistant sees exactly what you saw."
            chips={["survives switching chats", "an image, nothing scraped", "sent only when you send"]}
            delay={0.1}
          />
        </div>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 02" title="from window to question" />
        <In delay={0.1} className="mt-14">
          <AppshotFigure />
          <FigCaption>
            fig. 01: from window to question. The shot is staged, named, and
            waiting for you.
          </FigCaption>
        </In>
      </section>

      <section className="px-6 pt-24 sm:px-12 lg:px-16 lg:pt-28">
        <SectionMark no="§ 03" title="in practice" />
        <Practice items={PRACTICE} />
      </section>

      <PaperClose
        paper={PAPER}
        note="Appshot is shipped and in daily use. It needs a vision-capable model from the chat paper and the one permission macOS requires, and the shot never leaves your Mac."
      />
    </PaperShell>
  );
}
