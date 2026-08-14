"use client";

import { useRef, type ReactNode } from "react";
import { useLazyGsap } from "@/hooks/useLazyGsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLazyGsap(({ gsap }) => {
    if (prefersReducedMotion || !ref.current) {
      return;
    }

    const tween = gsap.fromTo(
      ref.current,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [prefersReducedMotion, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
