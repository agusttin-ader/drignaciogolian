"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

const altFor = (index: number) =>
  `Registro clínico ${index + 1} del consultorio`;

export function BeforeAfterGallerySection() {
  const images = siteConfig.images.beforeAfter;
  const track = [...images, ...images];
  const scrollerRef = useRef<HTMLUListElement>(null);
  const ticking = useRef(false);
  const [index, setIndex] = useState(0);

  function handleScroll() {
    if (ticking.current) {
      return;
    }
    ticking.current = true;
    requestAnimationFrame(() => {
      ticking.current = false;
      const scroller = scrollerRef.current;
      const first = scroller?.firstElementChild;
      if (!scroller || !(first instanceof HTMLElement)) {
        return;
      }
      // Ancho de ficha más el espacio entre ellas.
      const step = first.offsetWidth + 12;
      const next = Math.round(scroller.scrollLeft / step);
      setIndex(Math.min(images.length - 1, Math.max(0, next)));
    });
  }

  return (
    <section
      id="resultados"
      aria-labelledby="before-after-heading"
      className="border-y border-border bg-background"
    >
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 sm:py-20 lg:px-10 lg:py-24 xl:px-12">
        <div className="flex flex-col gap-4 sm:gap-6">
          <p className="text-[0.64rem] font-medium tracking-[0.28em] text-muted-foreground/90 uppercase sm:text-xs">
            Antes y Después
          </p>
          <SectionHeading
            id="before-after-heading"
            className="max-w-3xl font-display text-[1.65rem] font-medium tracking-[-0.01em] sm:text-4xl md:text-5xl"
          >
            {siteConfig.ui.beforeAfterHeading}
          </SectionHeading>
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            {siteConfig.ui.beforeAfterIntro}
          </p>
        </div>
      </div>

      {/* Mobile y tablet: carrusel que se desliza con el dedo, una ficha por vez. */}
      <div className="pb-14 sm:pb-20 lg:hidden">
        <ul
          ref={scrollerRef}
          onScroll={handleScroll}
          // Una zona con scroll propio debe poder recorrerse con el teclado.
          tabIndex={0}
          aria-label="Casos del consultorio, deslizables horizontalmente"
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-p-4 px-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, position) => (
            <li
              key={image}
              className="w-[78%] max-w-[22rem] shrink-0 snap-center sm:w-[52%]"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border/70 bg-sand/30">
                <Image
                  src={image}
                  alt={altFor(position)}
                  width={720}
                  height={720}
                  sizes="80vw"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-5 flex max-w-content items-center justify-between px-4 sm:px-6">
          <p className="text-[0.64rem] tracking-[0.2em] text-muted-foreground/90 uppercase">
            Deslizá para ver más
          </p>
          <p className="font-display text-[0.9rem] text-muted-foreground tabular-nums">
            <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
            {" / "}
            {String(images.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      {/* Escritorio: cinta continua, se detiene al pasar el cursor. */}
      <div className="marquee relative hidden overflow-hidden pb-24 lg:block">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent"
          aria-hidden="true"
        />

        <ul className="marquee-track flex w-max gap-4">
          {track.map((image, position) => {
            const isClone = position >= images.length;
            return (
              <li
                key={`${image}-${position}`}
                className="h-60 w-60 shrink-0 overflow-hidden rounded-lg border border-border/70 bg-sand/30"
                aria-hidden={isClone}
              >
                <Image
                  src={image}
                  alt={isClone ? "" : altFor(position)}
                  width={720}
                  height={720}
                  sizes="240px"
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
