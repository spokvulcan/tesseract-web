import { Instrument_Serif, Space_Grotesk } from "next/font/google";

/** Display serif — used for italics, epigraphs, and the paper's voice. */
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--landing-serif",
  display: "swap",
});

/** Text grotesque — the body and headlines of the paper. */
export const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--landing-grotesk",
  display: "swap",
});
