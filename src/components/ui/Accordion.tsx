"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("divide-y divide-border/70 border-y border-border/70", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={`${item.question}-${index}`}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  "flex min-h-12 w-full items-center justify-between gap-4 py-5 text-left font-display text-[1.1rem] font-medium leading-snug tracking-[-0.01em] transition-colors duration-200 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-[1.25rem]",
                  isOpen && "text-accent",
                )}
                onClick={() => {
                  setOpenIndex(isOpen ? null : index);
                }}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-[1.4rem] transition-colors duration-200",
                    isOpen ? "text-accent" : "text-muted-foreground",
                  )}
                >
                  {isOpen ? "–" : "+"}
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { height: 0, opacity: 0 }
                  }
                  animate={{ height: "auto", opacity: 1 }}
                  exit={
                    prefersReducedMotion
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.28,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 text-[0.98rem] leading-relaxed text-muted-foreground/95">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
