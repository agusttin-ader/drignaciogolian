"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ConversionBand() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="bg-accent text-accent-foreground"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-5 px-4 py-9 sm:px-6 sm:py-10 lg:flex-row lg:items-center lg:px-10 xl:px-12">
        <p className="max-w-2xl text-[0.95rem] leading-relaxed sm:text-lg">
          Si respirás mal o estás evaluando un tratamiento nasal, empecemos por una consulta clínica con plan claro.
        </p>
        <Button
          href="#contacto"
          className="w-full border border-accent-foreground/35 bg-accent-foreground/10 text-[0.78rem] tracking-[0.08em] text-accent-foreground uppercase hover:bg-accent-foreground/20 sm:w-auto sm:text-[0.82rem]"
        >
          {siteConfig.ui.reserveCta}
        </Button>
      </div>
    </motion.section>
  );
}
