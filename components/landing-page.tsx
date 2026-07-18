"use client";

import { SiteHeader, SiteFooter } from "@/components/navigation";
import { grotesk } from "./landing/fonts";
import { In } from "./landing/shared";
import { Hero } from "./landing/hero";
import { NoiseSection } from "./landing/noise";
import { CompanionSection } from "./landing/companion";
import { InstrumentSection } from "./landing/instrument";
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
            Tesseract is a mind that lives entirely on your Mac: ears that
            hear ninety-nine languages, a voice that answers in 123
            milliseconds, and a memory that keeps what matters. On top of it
            we are building the Companion, which watches the day with you,
            keeps what is worth keeping, and lets the rest go. Its goal is
            your success. Its promises are on the record. Nothing it learns
            ever leaves the machine.
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)] lg:col-span-3">
            keywords: private by design · living memory · a companion, not a
            tool
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
      <CompanionSection />
      <InstrumentSection />
      <PhilosophySection />
      <ClosingSections />
      <SiteFooter />
    </div>
  );
}
