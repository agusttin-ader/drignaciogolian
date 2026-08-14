"use client";

import { useRef, type ReactNode } from "react";
import { useLazyGsap } from "@/hooks/useLazyGsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ id, children, className }: SectionHeadingProps) {
  const wrapRef = useRef<HTMLHeadingElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLazyGsap(({ gsap }) => {
    if (prefersReducedMotion || !wrapRef.current) {
      return;
    }

    const inner = wrapRef.current.querySelector("[data-heading-inner]");
    if (!inner) {
      return;
    }

    const tween = gsap.fromTo(
      inner,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapRef.current,
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
    <h2 id={id} ref={wrapRef} className={cn("overflow-hidden", className)}>
      <span data-heading-inner className="block pb-1 will-change-transform">
        {children}
      </span>
    </h2>
  );
}
