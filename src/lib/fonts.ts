import { Fraunces, Instrument_Sans } from "next/font/google";

export const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  style: ["normal", "italic"],
});
