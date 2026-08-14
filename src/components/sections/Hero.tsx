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
      className="relative overflow-hidden bg-ink"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <EditorialImage
          src={photos.hero}
          alt=""
          preload
          sizes="100vw"
          className="h-full w-full"
          imageClassName="object-cover object-[center_16%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,13,15,0.78)_0%,rgba(10,13,15,0.66)_42%,rgba(10,13,15,0.86)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12">
        <div className="grid gap-10 lg:min-h-[calc(100svh-6.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)] lg:items-center lg:gap-16">
          <div className="relative z-10">
            <div data-hero-stage className="flex items-center gap-3">
              <span className="h-px w-8 bg-white/45 sm:w-10" aria-hidden="true" />
              <p className="text-[0.65rem] font-medium tracking-[0.32em] text-white/92 uppercase sm:tracking-[0.38em]">
                {specialty}
              </p>
            </div>

            <h1
              data-hero-stage
              id="hero-heading"
              className="mt-5 max-w-[17ch] font-display text-[1.85rem] font-medium leading-[1.12] tracking-[-0.025em] text-white sm:text-[3rem] sm:leading-[1.08] lg:text-[3.5rem] lg:leading-[1.04] xl:text-[3.9rem]"
            >
              Conectándose con la voz, respirando naturalmente y escuchando con los sentidos
            </h1>

            <p
              data-hero-stage
              className="mt-3 text-[0.68rem] tracking-[0.13em] text-white/88 uppercase sm:mt-4 sm:text-xs"
            >
              Formación · UBA · UCA · CEMIC · IUC
            </p>

            <p
              data-hero-stage
              className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-white sm:mt-7 sm:text-lg"
            >
              {subtitle}
            </p>

            <p
              data-hero-stage
              className="mt-4 hidden max-w-xl text-[0.9rem] leading-relaxed text-white/88 sm:block sm:text-base"
            >
              {siteConfig.ui.heroSupportingCopy}
            </p>

            <div
              data-hero-stage
              className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:flex-row sm:items-center"
            >
              <Button href="#contacto" className="w-full sm:w-auto">
                {siteConfig.ui.reserveCta}
              </Button>
              <WhatsAppCta className="w-full border-white/50 text-white hover:border-white/85 hover:bg-white/10 sm:w-auto" />
            </div>

            <div data-hero-stage className="mt-8 sm:mt-10">
              <a
                href="#consultorio"
                className="inline-block text-sm text-white/82 underline decoration-white/35 underline-offset-[6px] transition-all duration-200 hover:text-white hover:underline-offset-[8px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {verbatim.pages.inicio.sectionHeading}
              </a>
            </div>
          </div>

          <aside data-hero-stage className="relative hidden lg:block lg:justify-self-end">
            <p className="text-[0.62rem] tracking-[0.3em] text-white/55 uppercase">
              Perfil
            </p>
            <dl className="mt-5 w-full max-w-[19rem]">
              {trustIndicators.map((indicator) => (
                <div key={indicator} className="border-t border-white/20 py-4">
                  <dt className="font-display text-[1.15rem] leading-snug text-white/92">
                    {indicator}
                  </dt>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
