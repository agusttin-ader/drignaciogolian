"use client";

import { useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let refresh: (() => void) | undefined;

    void import("@/lib/gsap").then(({ initGsap, ScrollTrigger }) => {
      if (cancelled) {
        return;
      }
      initGsap();
      refresh = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", refresh);
      void document.fonts.ready.then(refresh);
    });

    return () => {
      cancelled = true;
      if (refresh) {
        window.removeEventListener("load", refresh);
      }
    };
  }, [prefersReducedMotion]);

  return children;
}
