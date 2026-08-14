"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/media/EditorialImage";
import { siteConfig, verbatim } from "@/data/site";
import { photoAlts, photos } from "@/lib/photos";

const institutions = [
  "UBA",
  "UCA",
  "CEMIC",
  "IUC",
  "Hospital J. M. Ramos Mejia",
] as const;

export function AboutSection() {
  const { historial } = verbatim.pages;
  const { aboutBio } = siteConfig.ui;

  return (
    <section
      id="historial"
      aria-labelledby="about-heading"
      className="border-y border-border bg-background"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32 xl:px-12">
        <p className="text-[0.64rem] font-medium tracking-[0.28em] text-muted-foreground/90 uppercase sm:text-xs">
          Historial
        </p>
        <SectionHeading
          id="about-heading"
          className="mt-3 max-w-3xl font-display text-[1.65rem] font-medium tracking-[-0.01em] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {siteConfig.ui.aboutHeading}
        </SectionHeading>

        <div className="mt-8 grid items-start gap-10 sm:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="space-y-5 sm:space-y-8">
            <Reveal>
              <p className="max-w-3xl text-[0.98rem] leading-relaxed text-muted-foreground/95 sm:text-lg">
                {historial.intro}
              </p>
            </Reveal>
            {aboutBio.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-[0.92rem] leading-relaxed text-muted-foreground/95 sm:text-base">
                {paragraph}
              </p>
            ))}

            <Reveal delay={0.08}>
              <h3 className="font-display text-[1.35rem] italic tracking-[-0.01em] sm:text-3xl">{historial.heading}</h3>
              <ul className="mt-6 space-y-4">
                {historial.items.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border/70 pb-3.5 text-[0.94rem] text-foreground last:border-0 sm:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="relative lg:pt-2">
            <EditorialImage
              src={photos.named}
              alt={siteConfig.images.alt}
              sizes="(max-width: 1023px) 100vw, 480px"
              className="aspect-[3/4] w-full rounded-lg shadow-warm"
              imageClassName="object-[center_28%]"
            />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-4">
              <EditorialImage
                src={photos.portrait}
                alt={siteConfig.images.alt}
                sizes="(max-width: 1023px) 50vw, 230px"
                className="aspect-[3/4] rounded-lg shadow-warm-sm"
                imageClassName="object-[center_22%]"
              />
              <EditorialImage
                src={photos.close}
                alt={photoAlts.or}
                sizes="(max-width: 1023px) 50vw, 230px"
                className="aspect-[3/4] rounded-lg shadow-warm-sm"
                imageClassName="object-[center_30%]"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-border pt-10 sm:mt-16 md:grid-cols-[1fr_1.2fr] md:items-center lg:mt-20 lg:pt-12">
          <div>
            <p className="text-[0.7rem] font-medium tracking-[0.2em] text-muted-foreground/90 uppercase">
              {historial.publicationsHeading}
            </p>
            <p className="mt-2 text-[0.88rem] text-muted-foreground/90">
              {historial.publicationsIntro}
            </p>
            <p className="mt-2.5 text-[0.95rem]">{historial.publications.join(" · ")}</p>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-2.5 text-[0.82rem] tracking-[0.14em] text-muted-foreground/85 uppercase">
            {institutions.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
