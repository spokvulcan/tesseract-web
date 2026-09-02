"use client";

import { SiteHeader, SiteFooter } from "@/components/navigation";
import { grotesk } from "./landing/fonts";
import { Hero } from "./landing/hero";
import { NoiseSection } from "./landing/noise";
import { CompanionBrief } from "./landing/companion-brief";
import { FeaturesSection } from "./landing/features";
import { PhilosophySection } from "./landing/philosophy";
import { ClosingSections } from "./landing/closing";

export function LandingPage() {
  return (
    <div
      className={`${grotesk.variable} relative min-h-screen bg-[var(--paper)] text-[var(--ink)]`}
      style={{ fontFamily: "var(--landing-grotesk), system-ui, sans-serif" }}
    >
      <SiteHeader />
      <Hero />
      <FeaturesSection />
      <NoiseSection />
      <CompanionBrief />
      <PhilosophySection />
      <ClosingSections />
      <SiteFooter />
    </div>
  );
}
