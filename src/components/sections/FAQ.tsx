"use client";

import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";

export function FAQSection() {
  return (
    <section
      id="preguntas"
      aria-labelledby="faq-heading"
      className="bg-sand/85"
    >
      <div className="mx-auto grid max-w-content gap-8 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-14 md:py-32 lg:px-10 xl:px-12">
        <div>
          <p className="text-[0.64rem] font-medium tracking-[0.28em] text-muted-foreground/90 uppercase sm:text-xs">
            Consultas
          </p>
          <SectionHeading
            id="faq-heading"
            className="mt-3 max-w-lg font-display text-[1.65rem] font-medium tracking-[-0.01em] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Preguntas
          </SectionHeading>
          <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-muted-foreground/90 sm:mt-6 sm:text-base">
            Esta sección usa respuestas editoriales de referencia para mantener equilibrio de lectura e interacción hasta recibir el contenido definitivo validado por el doctor.
          </p>
        </div>
        <Reveal delay={0.06} className="md:pt-2">
          <Accordion items={siteConfig.faqPlaceholders} />
        </Reveal>
      </div>
    </section>
  );
}
