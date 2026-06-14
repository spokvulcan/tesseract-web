import { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms of Use — Tesseract Agent",
  description: "Terms of use for the Tesseract Agent macOS application.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <div className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6 flex items-center gap-3">
        <span className="w-6 h-px bg-muted-foreground" />
        Legal
      </div>

      <h1 className="font-display text-4xl lg:text-5xl tracking-tight mb-3">
        Terms of Use
      </h1>
      <p className="text-muted-foreground text-sm mb-14">
        Last updated: March 11, 2026
      </p>

      <div className="space-y-10 text-[15px] leading-relaxed">
        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Acceptance of Terms
          </h2>
          <p className="text-muted-foreground">
            By downloading, installing, or using Tesseract Agent, you agree to
            these Terms of Use. If you do not agree, do not use the app.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">License</h2>
          <p className="text-muted-foreground">
            Tesseract Agent is licensed, not sold. We grant you a limited,
            non-exclusive, non-transferable, revocable license to use the app on
            any Apple-branded device that you own or control, subject to the
            Apple Media Services Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            AI-Generated Content
          </h2>
          <p className="text-muted-foreground mb-4">
            Tesseract Agent uses open-source AI models that run locally on your
            device. AI-generated outputs — including text transcriptions,
            synthesized speech, and generated images — are provided as-is.
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>AI outputs may be inaccurate, incomplete, or inappropriate.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>You are solely responsible for how you use AI-generated content.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>We do not guarantee accuracy, quality, or fitness for purpose.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Acceptable Use
          </h2>
          <p className="text-muted-foreground mb-4">
            You agree not to use Tesseract Agent to:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>Generate illegal, harmful, or rights-violating content.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>Reverse-engineer, decompile, or disassemble the app.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
              <span>Redistribute, sublicense, or resell the app.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Open-Source Models
          </h2>
          <p className="text-muted-foreground">
            Tesseract Agent uses open-source AI models subject to their own
            respective licenses. Your use of these models is governed by both
            these terms and the applicable model licenses.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Intellectual Property
          </h2>
          <p className="text-muted-foreground">
            Tesseract Agent and its original content, features, and
            functionality are owned by the developer and protected by copyright
            and other intellectual property laws.
          </p>
          <p className="text-muted-foreground mt-3">
            Content you create using Tesseract Agent belongs to you. We claim no
            ownership over your inputs or the outputs generated on your device.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Disclaimer of Warranties
          </h2>
          <p className="text-muted-foreground">
            Tesseract Agent is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, whether express or
            implied.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Limitation of Liability
          </h2>
          <p className="text-muted-foreground">
            To the maximum extent permitted by applicable law, the developer
            shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of
            Tesseract Agent.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Apple App Store
          </h2>
          <p className="text-muted-foreground">
            If you downloaded Tesseract Agent from the Apple App Store, these
            terms are between you and the developer, not Apple. Apple has no
            obligation to provide maintenance or support.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">
            Changes to These Terms
          </h2>
          <p className="text-muted-foreground">
            We may update these terms from time to time. Continued use of
            Tesseract Agent after changes constitutes acceptance. Updated terms
            will be posted with a new effective date.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl tracking-tight mb-3">Contact</h2>
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
      </div>
    </PageShell>
  );
}
