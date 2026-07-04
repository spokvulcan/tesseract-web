import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  HERO BUTTONS                                                        */
/*  Bold & minimal design with generous spacing                         */
/* ------------------------------------------------------------------ */

export function HeroButtons() {
  return (
    <Reveal delay={0.3}>
      <div className="flex items-center gap-8 flex-nowrap">
        <Button
          size="lg"
          className="h-14 px-10 text-base font-mono rounded-lg bg-[#111] dark:bg-[#f0f0f0] text-[#f5f2ed] dark:text-[#0a0a0a] hover:bg-[#333] dark:hover:bg-[#ddd] transition-all duration-300"
          asChild
        >
          <a href="https://github.com/spokvulcan/tesseract/releases/latest/download/Tesseract.dmg" target="_blank" rel="noopener noreferrer">
            Download for Mac
          </a>
        </Button>
        
        <Link
          href="#features"
          className="text-lg text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 py-2 font-display"
        >
          Explore features
          <ArrowDown className="w-4 h-4" />
        </Link>
      </div>
    </Reveal>
  );
}
