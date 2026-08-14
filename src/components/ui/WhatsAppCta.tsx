import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

type WhatsAppCtaProps = {
  className?: string;
  variant?: "primary" | "secondary";
};

export function WhatsAppCta({
  className,
  variant = "secondary",
}: WhatsAppCtaProps) {
  const href = siteConfig.contact.whatsapp;
  const label = siteConfig.ui.whatsappCta;
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-foreground shadow-warm-sm transition-all duration-200 hover:bg-foreground/95 hover:scale-[1.02] active:scale-[0.98]"
      : "border-2 border-border bg-transparent text-foreground transition-all duration-200 hover:border-foreground/35 hover:bg-muted active:scale-[0.98]";

  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${label}. ${siteConfig.ui.pendingLabel}`}
        title={siteConfig.ui.pendingLabel}
        className={cn(
          "inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-xl px-8 py-3.5 text-[0.9rem] font-medium tracking-[0.03em] opacity-55",
          styles,
          className,
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-xl px-8 py-3.5 text-[0.9rem] font-medium tracking-[0.03em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        variant === "primary"
          ? "bg-accent text-accent-foreground shadow-warm-sm transition-all duration-200 hover:bg-foreground/95 hover:scale-[1.02] active:scale-[0.98]"
          : "border-2 border-border transition-all duration-200 hover:bg-muted hover:border-foreground/35 active:scale-[0.98]",
        className,
      )}
    >
      {label}
    </a>
  );
}
