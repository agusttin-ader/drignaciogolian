"use client";

import { useEffect, type DependencyList } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type GsapModule = typeof import("@/lib/gsap");

export function useLazyGsap(
  effect: (mods: GsapModule) => void | (() => void),
  deps: DependencyList,
) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let cancelled = false;
    let revert: (() => void) | undefined;

    void import("@/lib/gsap").then((mods) => {
      if (cancelled) {
        return;
      }
      mods.initGsap();
      const cleanup = effect(mods);
      revert = typeof cleanup === "function" ? cleanup : undefined;
    });

    return () => {
      cancelled = true;
      revert?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- la lista de dependencias se define desde el componente llamador
  }, [prefersReducedMotion, ...deps]);
}
