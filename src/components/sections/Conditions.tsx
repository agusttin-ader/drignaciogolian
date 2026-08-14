"use client";

import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialImage } from "@/components/media/EditorialImage";
import { siteConfig, verbatim } from "@/data/site";
import { useLazyGsap } from "@/hooks/useLazyGsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { photoAlts, photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

const conditionImages = [photos.procedure, photos.monitor, photos.focus, photos.team] as const;

export function ConditionsSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLazyGsap(({ gsap }) => {
    if (prefersReducedMotion || !listRef.current) {
      return;
    }

    const items = listRef.current.querySelectorAll("[data-condition-card]");
    const tween = gsap.fromTo(
      items,
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 82%",
          once: true,
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="consultorio"
      aria-labelledby="conditions-heading"
      className="bg-sand/85"
    >
      <div className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32 xl:px-12">
        <div className="grid gap-4 sm:gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="text-[0.64rem] font-medium tracking-[0.28em] text-muted-foreground/90 uppercase sm:text-xs sm:tracking-[0.3em]">
              Consultorio
            </p>
            <SectionHeading
              id="conditions-heading"
              className="mt-3 max-w-2xl font-display text-[1.65rem] font-medium tracking-[-0.01em] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {verbatim.pages.inicio.sectionHeading}
            </SectionHeading>
          </div>
          <p className="max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground/95 sm:text-lg lg:justify-self-end">
            {verbatim.pages.inicio.sectionIntro}
          </p>
        </div>

        <div ref={listRef} className="mt-10 border-y border-border/70 sm:mt-16 lg:mt-20">
          {siteConfig.conditions.map((condition, index) => {
            const number = String(index + 1).padStart(2, "0");
            const image = conditionImages[index] ?? photos.procedure;
            const reverse = index % 2 === 1;

            return (
              <article
                key={condition.id}
                data-condition-card
                className={cn(
                  "group grid items-start gap-6 border-b border-border/70 py-8 transition-transform duration-300 ease-out hover:-translate-y-0.5 sm:py-12 lg:grid-cols-[4.5rem_minmax(0,1fr)_minmax(16rem,24rem)] lg:gap-10",
                  reverse && "lg:grid-cols-[4.5rem_minmax(16rem,24rem)_minmax(0,1fr)]",
                )}
              >
                <p className="font-display text-[2rem] leading-none text-accent/35 sm:text-[2.3rem]">
                  {number}
                </p>

                <div className={cn("space-y-3.5", reverse && "lg:order-3")}>
                  <h3 className="font-display text-[1.35rem] font-medium tracking-tight sm:text-[2rem]">
                    {condition.title}
                  </h3>
                  <p className="max-w-3xl text-[0.92rem] leading-relaxed text-muted-foreground sm:text-base">
                    {condition.description}
                  </p>
                </div>

                <EditorialImage
                  src={image}
                  alt={photoAlts.or}
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  className={cn(
                    "aspect-[4/3] w-full overflow-hidden rounded-lg border border-border/60",
                    reverse && "lg:order-2",
                  )}
                  imageClassName="object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
