"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const navOrder = ["#inicio", "#consultorio", "#historial", "#contacto"] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const links = navOrder
    .map((href) => siteConfig.navigation.find((item) => item.href === href))
    .filter((item): item is (typeof siteConfig.navigation)[number] =>
      Boolean(item),
    );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const scrollY = window.scrollY;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const onNavigate = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) {
      return;
    }
    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-background/95 backdrop-blur-sm transition-opacity duration-200",
          scrolled || open ? "opacity-100" : "opacity-92",
        )}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-10 xl:px-12">
        <a
          href="#inicio"
          className="group inline-flex min-w-0 items-center gap-2 pr-2"
        >
          <Image
            src="/images/logo-ig-mark-only-dark-v2.webp"
            alt={siteConfig.doctor.title}
            width={110}
            height={110}
            className="h-11 w-11 rounded-sm object-contain sm:h-12 sm:w-12"
            sizes="48px"
            priority
          />
          <span className="truncate font-display text-[0.98rem] tracking-tight text-foreground sm:text-[1.08rem]">
            {siteConfig.doctor.title}
          </span>
        </a>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onNavigate(item.href)}
              className="text-[0.84rem] tracking-[0.04em] text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            href="#contacto"
            className="hidden border border-transparent bg-accent px-4 text-[0.7rem] tracking-[0.08em] uppercase sm:inline-flex sm:px-6 sm:text-[0.78rem]"
          >
            {siteConfig.ui.reserveCta}
          </Button>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border/80 bg-background/80 text-foreground lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => {
              setOpen((value) => !value);
            }}
          >
            <span className="sr-only">
              {open ? "Cerrar menú" : "Abrir menú"}
            </span>
            <span aria-hidden="true" className="relative h-4 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-5 bg-current transition-all duration-200",
                  open && "top-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[14px] h-px w-5 bg-current transition-all duration-200",
                  open && "top-[7px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-[70] lg:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <div className="absolute inset-0 bg-background/88 backdrop-blur-md" />
            <motion.div
              className="relative flex h-full flex-col justify-between px-5 pb-8 pt-28 sm:px-8"
              initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? undefined : { y: 12, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              drag={prefersReducedMotion ? false : "y"}
              dragDirectionLock
              dragElastic={{ top: 0, bottom: 0.18 }}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 600) {
                  setOpen(false);
                }
              }}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-8 sm:top-6">
                <a
                  href="#inicio"
                  onClick={onNavigate("#inicio")}
                  className="inline-flex items-center gap-2 pr-4"
                >
                  <Image
                    src="/images/logo-ig-mark-only-dark-v2.webp"
                    alt={siteConfig.doctor.title}
                    width={104}
                    height={104}
                    className="h-10 w-10 rounded-sm object-contain"
                    sizes="40px"
                  />
                  <span className="truncate font-display text-[0.95rem] tracking-tight text-foreground">
                    {siteConfig.doctor.title}
                  </span>
                </a>
                <button
                  type="button"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border/80 bg-background/85 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <span aria-hidden="true" className="relative h-4 w-5">
                    <span className="absolute left-0 top-[7px] h-px w-5 rotate-45 bg-current" />
                    <span className="absolute left-0 top-[7px] h-px w-5 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <nav aria-label="Móvil" className="flex flex-col gap-2">
                {links.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate(item.href)}
                    className="rounded-xl border border-border/60 bg-background/80 px-4 py-3 text-[1.05rem] tracking-[0.03em] text-foreground"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.04 * index, duration: 0.18 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-4">
                <Button
                  href="#contacto"
                  className="w-full border border-transparent bg-accent text-[0.76rem] tracking-[0.08em] uppercase"
                >
                  {siteConfig.ui.reserveCta}
                </Button>
                <p className="text-center text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase">
                  Ignacio Golian · Otorrinolaringólogo
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
