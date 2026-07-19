"use client";

import { SiteHeader, SiteFooter } from "@/components/navigation";
import { grotesk } from "./landing/fonts";
import { In } from "./landing/shared";
import { Hero } from "./landing/hero";
import { NoiseSection } from "./landing/noise";
import { CompanionBrief } from "./landing/companion-brief";
import { FeaturesSection } from "./landing/features";
import { PhilosophySection } from "./landing/philosophy";
import { ClosingSections } from "./landing/closing";

function Abstract() {
  return (
    <section className="border-t border-[var(--ink)]/10 px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
      <In>
        <div className="grid gap-10 lg:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--blue)] lg:col-span-2">
            abstract
          </p>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-[var(--body)] lg:col-span-7">
            Tesseract is two things in one Mac app. The first you can use
            today: dictation that types what you say into any app, a voice
            that reads anything aloud, a chat assistant like the ones you
            know, and a gesture that shows it whatever window you are
            looking at. Everything runs on your own Mac, so nothing you say
            or show it is ever sent anywhere. The second is the Companion:
            a new kind of AI that does not wait to be asked. It lives the
            day beside you, notices what happens, remembers what matters,
            and speaks up only when something is worth your attention. It
            is young and evolving fast, and it is the reason Tesseract
            exists. Each capability has a paper of its own on this site;
            this page is the survey.
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)] lg:col-span-3">
            keywords: private by design · living memory · a companion, not a
            chatbot
          </p>
        </div>
      </In>
    </section>
  );
}

export function LandingPage() {
  return (
    <div
      className={`${grotesk.variable} relative min-h-screen bg-[var(--paper)] text-[var(--ink)]`}
      style={{ fontFamily: "var(--landing-grotesk), system-ui, sans-serif" }}
    >
      <SiteHeader />
      <Hero />
      <Abstract />
      <NoiseSection />
      <CompanionBrief />
      <FeaturesSection />
      <PhilosophySection />
      <ClosingSections />
      <SiteFooter />
    </div>
  );
}
