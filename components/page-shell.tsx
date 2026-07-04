import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full bg-[#f5f2ed] text-[#111]">
      {/* Navigation */}
      <header className="relative z-50 w-full border-b border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/icon-64x64.png"
              alt="Tesseract"
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span className="font-display text-lg tracking-tight">tesseract</span>
          </Link>

          <nav className="flex items-center gap-8 text-sm">
            <Link href="/#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-black/10 h-8"
              asChild
            >
              <Link href="/#download">Download</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-black/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="font-display text-lg tracking-tight">
              tesseract
            </Link>

            <div className="flex items-center gap-8 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
