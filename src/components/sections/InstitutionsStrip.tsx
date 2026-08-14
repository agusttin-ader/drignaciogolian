"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const institutions = ["UBA", "UCA", "CEMIC", "IUC", "Hospital J. M. Ramos Mejia"] as const;

export function InstitutionsStrip() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Instituciones de formación y práctica"
      className="border-y border-border/70 bg-background"
    >
      <div className="mx-auto max-w-content px-4 py-5 sm:px-6 sm:py-6 lg:px-10 xl:px-12">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.64rem] tracking-[0.12em] text-muted-foreground uppercase sm:text-xs sm:gap-x-8">
          {institutions.map((name, index) => (
            <motion.li
              key={name}
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.24, delay: prefersReducedMotion ? 0 : index * 0.04 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent/45" aria-hidden="true" />
              {name}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
