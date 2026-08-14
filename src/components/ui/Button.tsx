"use client";

import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const styles = {
  primary:
    "bg-accent text-accent-foreground shadow-warm-sm transition-all duration-200 hover:bg-foreground/95 hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "border-2 border-border bg-transparent text-foreground transition-all duration-200 hover:border-foreground/35 hover:bg-muted active:scale-[0.98]",
  ghost: "bg-transparent text-foreground transition-all duration-200 hover:bg-muted",
} as const;

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[0.88rem] font-medium tracking-[0.03em] touch-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-55 sm:px-8 sm:text-[0.9rem]";

type Variant = keyof typeof styles;

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  children: ReactNode;
  magnetic?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  magnetic = true,
  onMouseMove,
  onMouseLeave,
  ...props
}: ButtonLinkProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  function reset() {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0, 0, 0) scale(1)";
    }
  }

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    onMouseMove?.(event);
    if (
      reduced ||
      !ref.current ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const x = magnetic
      ? (event.clientX - rect.left - rect.width / 2) * 0.1
      : 0;
    const y = magnetic
      ? (event.clientY - rect.top - rect.height / 2) * 0.1
      : 0;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)`;
  }

  function handleLeave(event: MouseEvent<HTMLAnchorElement>) {
    onMouseLeave?.(event);
    reset();
  }

  return (
    <a
      ref={ref}
      className={cn(base, styles[variant], className)}
      style={{
        transition: reduced
          ? undefined
          : "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </a>
  );
}
