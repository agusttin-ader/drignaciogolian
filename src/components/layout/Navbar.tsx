"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const navOrder = [
  "#inicio",
  "#consultorio",
  "#historial",
  "#contacto",
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const links = navOrder
    .map((href) => siteConfig.navigation.find((item) => item.href === href))
    .filter((item): item is (typeof siteConfig.navigation)[number] =>
      Boolean(item),
    );

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      // Ignoramos micro-movimientos y el rebote elástico de iOS.
      const delta = y - lastY;
      if (Math.abs(delta) < 6 || y < 0) {
        return;
      }
      // Se oculta al bajar, pero solo una vez pasado el hero inicial.
      setHidden(delta > 0 && y > 140);
      lastY = y;
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

  const onNavigate =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
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
    <header className="pointer-events-none sticky top-0 z-50">
      {/* La barra se traslada sola: el overlay queda fuera de este contenedor
          para que su posición fija siga tomando como referencia la ventana. */}
      <div
        className={cn(
          "border-border/60 pointer-events-auto relative border-b",
          !prefersReducedMotion && "transition-transform duration-300 ease-out",
          hidden && !open && !prefersReducedMotion && "-translate-y-full",
        )}
      >
        <div
          className={cn(
            "bg-background/95 pointer-events-none absolute inset-0 backdrop-blur-sm transition-opacity duration-200",
            scrolled || open ? "opacity-100" : "opacity-92",
          )}
          aria-hidden="true"
        />
        <div className="max-w-content relative mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-10 xl:px-12">
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
            <span className="font-display text-foreground truncate text-[0.98rem] tracking-tight sm:text-[1.08rem]">
              {siteConfig.doctor.title}
            </span>
          </a>

          <nav
            aria-label="Principal"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onNavigate(item.href)}
                className="text-muted-foreground hover:text-foreground focus-visible:outline-ring text-[0.84rem] tracking-[0.04em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              href="#contacto"
              className="bg-accent hidden border border-transparent px-4 text-[0.7rem] tracking-[0.08em] uppercase sm:inline-flex sm:px-6 sm:text-[0.78rem]"
            >
              {siteConfig.ui.reserveCta}
            </Button>
            <button
              type="button"
              className="border-border/80 bg-background/80 text-foreground focus-visible:outline-ring inline-flex min-h-11 min-w-11 items-center justify-center border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
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
                    "absolute top-0 left-0 h-px w-5 bg-current transition-all duration-200",
                    open && "top-[7px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-[7px] left-0 h-px w-5 bg-current transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute top-[14px] left-0 h-px w-5 bg-current transition-all duration-200",
                    open && "top-[7px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className="pointer-events-auto fixed inset-0 z-[70] lg:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <div className="bg-background/88 absolute inset-0 backdrop-blur-md" />
            <motion.div
              className="relative flex h-full flex-col justify-between px-5 pt-28 pb-8 sm:px-8"
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
                  <span className="font-display text-foreground truncate text-[0.95rem] tracking-tight">
                    {siteConfig.doctor.title}
                  </span>
                </a>
                <button
                  type="button"
                  className="border-border/80 bg-background/85 text-foreground focus-visible:outline-ring inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <span aria-hidden="true" className="relative h-4 w-5">
                    <span className="absolute top-[7px] left-0 h-px w-5 rotate-45 bg-current" />
                    <span className="absolute top-[7px] left-0 h-px w-5 -rotate-45 bg-current" />
                  </span>
                </button>
              </div>

              <nav
                aria-label="Móvil"
                className="border-border/60 flex flex-col border-t"
              >
                {links.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate(item.href)}
                    className="border-border/60 font-display text-foreground hover:text-accent border-b py-4 text-[1.5rem] tracking-[-0.01em] transition-colors duration-200"
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.04 * index,
                      duration: 0.18,
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <div className="space-y-4">
                <Button
                  href="#contacto"
                  className="bg-accent w-full border border-transparent text-[0.76rem] tracking-[0.08em] uppercase"
                >
                  {siteConfig.ui.reserveCta}
                </Button>
                <p className="text-muted-foreground text-center text-[0.7rem] tracking-[0.12em] uppercase">
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
