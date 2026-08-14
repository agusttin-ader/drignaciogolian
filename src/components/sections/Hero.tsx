"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";
import { EditorialImage } from "@/components/media/EditorialImage";
import { siteConfig, verbatim } from "@/data/site";
import { useLazyGsap } from "@/hooks/useLazyGsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { photos } from "@/lib/photos";

export function HeroSection() {
  const { subtitle, specialty } = siteConfig.doctor;
  const { trustIndicators } = siteConfig.ui;
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLazyGsap(({ gsap }) => {
    if (prefersReducedMotion || !rootRef.current) {
      return;
    }

    const stages = rootRef.current.querySelectorAll("[data-hero-stage]");
    const intro = gsap.fromTo(
      stages,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.05,
      },
    );

    return () => {
      intro.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={rootRef}
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-background"
    >
      <div className="absolute inset-0 lg:hidden" aria-hidden="true">
        <EditorialImage
          src={photos.hero}
          alt=""
          sizes="100vw"
          className="h-full w-full"
          imageClassName="object-cover object-[center_16%] opacity-[0.88]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,13,15,0.76)_0%,rgba(10,13,15,0.66)_42%,rgba(10,13,15,0.82)_100%)]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-[24rem] bg-[radial-gradient(80%_65%_at_90%_0%,rgb(44_53_57/0.07),transparent_72%)] sm:h-[30rem] lg:block" />
      <div className="relative mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12">
        <div className="grid gap-8 lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.94fr)] lg:items-center lg:gap-14">
          <div className="relative z-10 space-y-0">
            <div data-hero-stage className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/45 sm:w-10 lg:bg-border" aria-hidden="true" />
              <p className="text-[0.65rem] font-medium tracking-[0.32em] text-white/92 uppercase sm:tracking-[0.38em] lg:text-muted-foreground">
                {specialty}
              </p>
            </div>

            <h1
              data-hero-stage
              id="hero-heading"
              className="mt-5 max-w-[17ch] font-display text-[1.85rem] font-medium leading-[1.12] tracking-[-0.025em] text-white sm:text-[3rem] sm:leading-[1.08] lg:text-[3.75rem] lg:leading-[1.03] lg:text-foreground xl:text-[4rem]"
            >
              Conectándose con la voz, respirando naturalmente y escuchando con los sentidos
            </h1>

            <p
              data-hero-stage
              className="mt-3 text-[0.68rem] tracking-[0.13em] text-white/88 uppercase sm:mt-4 sm:text-xs lg:text-muted-foreground/85"
            >
              Formación · UBA · UCA · CEMIC · IUC
            </p>

            <p
              data-hero-stage
              className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-white sm:mt-7 sm:text-lg lg:text-muted-foreground"
            >
              {subtitle}
            </p>
            <p data-hero-stage className="mt-4 hidden max-w-xl text-[0.9rem] leading-relaxed text-white/88 sm:block sm:text-base lg:text-muted-foreground/85">
              {siteConfig.ui.heroSupportingCopy}{" "}
              {siteConfig.ui.heroSupportingCopyExtended}
            </p>

            <div
              data-hero-stage
              className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:items-center"
            >
              <Button href="#contacto" className="w-full sm:w-auto">
                {siteConfig.ui.reserveCta}
              </Button>
              <WhatsAppCta className="w-full border-white/50 text-white hover:border-white/85 hover:bg-white/10 sm:w-auto lg:border-border lg:text-foreground lg:hover:border-foreground/35 lg:hover:bg-muted" />
            </div>

            <div data-hero-stage className="mt-8 hidden border-t border-white/20 pt-5 sm:mt-12 sm:pt-6 lg:block lg:border-border/80">
              <div className="grid gap-2.5 rounded-2xl border border-border/60 bg-background/70 p-3.5 sm:grid-cols-3 sm:gap-2 sm:p-5">
                {trustIndicators.map((indicator) => (
                  <p
                    key={indicator}
                    className="text-[0.64rem] tracking-[0.13em] text-muted-foreground uppercase sm:text-[0.7rem]"
                  >
                    {indicator}
                  </p>
                ))}
              </div>
            </div>

            <div data-hero-stage className="mt-5 sm:mt-8">
              <a
                href="#consultorio"
                className="inline-block text-sm text-white/82 underline decoration-white/35 underline-offset-[6px] transition-all duration-200 hover:text-white hover:underline-offset-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:text-muted-foreground lg:decoration-border lg:hover:text-foreground"
              >
                {verbatim.pages.inicio.sectionHeading}
              </a>
            </div>
          </div>

          <aside className="relative hidden lg:block">
            <div
              data-hero-stage
              className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-muted shadow-warm"
            >
              <EditorialImage
                src={photos.hero}
                alt={siteConfig.images.alt}
                preload
                sizes="(max-width: 1023px) 100vw, 48vw"
                className="aspect-[5/6] w-full sm:aspect-[5/6]"
                imageClassName="object-[center_20%]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
            </div>
            <div
              data-hero-stage
              className="mt-4 rounded-2xl border border-border/70 bg-background/90 px-5 py-4 text-sm leading-relaxed text-muted-foreground shadow-warm-sm"
            >
              Primera valoración con enfoque funcional, respiratorio y seguimiento clínico. Plan de atención orientado por diagnóstico y evolución.
            </div>
            <div
              data-hero-stage
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-[0.72rem] tracking-[0.12em] text-muted-foreground uppercase"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/70" aria-hidden="true" />
              Perfil institucional ORL
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
