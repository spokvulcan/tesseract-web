import { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Terms of Use · Tesseract",
  description: "Terms of use for the Tesseract macOS application.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <Reveal>
        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter mb-4">
          Terms of Use
        </h1>
        <p className="text-muted-foreground text-sm">
          Last updated: March 11, 2026
        </p>
      </Reveal>

      <div className="mt-14 space-y-14 text-lg leading-relaxed">
        <Reveal delay={0.05}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By downloading, installing, or using Tesseract, you agree to
              these Terms of Use. If you do not agree, do not use the app.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">License</h2>
            <p className="text-muted-foreground">
              Tesseract is licensed, not sold. We grant you a limited,
              non-exclusive, non-transferable, revocable license to use the app on
              any Apple-branded device that you own or control, subject to the
              Apple Media Services Terms and Conditions.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.15}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              AI-Generated Content
            </h2>
            <p className="text-muted-foreground mb-5">
              Tesseract uses open-source AI models that run locally on your
              device. AI-generated outputs, including text transcriptions and
              synthesized speech, are provided as-is.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>AI outputs may be inaccurate, incomplete, or inappropriate.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>You are solely responsible for how you use AI-generated content.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>We do not guarantee accuracy, quality, or fitness for purpose.</span>
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.2}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Acceptable Use
            </h2>
            <p className="text-muted-foreground mb-5">
              You agree not to use Tesseract to:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>Generate illegal, harmful, or rights-violating content.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>Reverse-engineer, decompile, or disassemble the app.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
                <span>Redistribute, sublicense, or resell the app.</span>
              </li>
            </ul>
          </section>
        </Reveal>

        <Reveal delay={0.25}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Open-Source Models
            </h2>
            <p className="text-muted-foreground">
              Tesseract Agent uses open-source AI models subject to their own
              respective licenses. Your use of these models is governed by both
              these terms and the applicable model licenses.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.3}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Intellectual Property
            </h2>
            <p className="text-muted-foreground">
              Tesseract and its original content, features, and
              functionality are owned by the developer and protected by copyright
              and other intellectual property laws.
            </p>
            <p className="text-muted-foreground mt-4">
              Content you create using Tesseract Agent belongs to you. We claim no
              ownership over your inputs or the outputs generated on your device.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.35}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Disclaimer of Warranties
            </h2>
            <p className="text-muted-foreground">
              Tesseract is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, whether express or
              implied.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.4}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by applicable law, the developer
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of
              Tesseract.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.45}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Apple App Store
            </h2>
            <p className="text-muted-foreground">
              If you downloaded Tesseract from the Apple App Store, these
              terms are between you and the developer, not Apple. Apple has no
              obligation to provide maintenance or support.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.5}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">
              Changes to These Terms
            </h2>
            <p className="text-muted-foreground">
              We may update these terms from time to time. Continued use of
              Tesseract after changes constitutes acceptance. Updated terms
              will be posted with a new effective date.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.55}>
          <section>
            <h2 className="font-display text-3xl tracking-tight mb-5">Contact</h2>
            <p className="text-muted-foreground">
              If you have questions about these terms, please reach out via our{" "}
              <a
                href="/support"
                className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
              >
                support page
              </a>
              .
            </p>
          </section>
        </Reveal>
      </div>
    </PageShell>
  );
}
