"use client";

import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

type FloatingWhatsAppProps = {
  className?: string;
};

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2c-5.44 0-9.87 4.43-9.87 9.87 0 1.74.45 3.44 1.32 4.94L2 22l5.34-1.4a9.86 9.86 0 0 0 4.7 1.2h.01c5.44 0 9.87-4.43 9.87-9.87a9.8 9.8 0 0 0-2.87-7.02Zm-7.01 15.23h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.17.83.85-3.1-.2-.32a8.2 8.2 0 0 1-1.27-4.36c0-4.53 3.69-8.22 8.23-8.22 2.19 0 4.25.86 5.8 2.41a8.14 8.14 0 0 1 2.41 5.82c0 4.53-3.69 8.22-8.23 8.22Zm4.5-6.15c-.25-.12-1.48-.73-1.71-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.98-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.26a7.45 7.45 0 0 1-1.39-1.73c-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.08s.89 2.42 1.01 2.58c.12.17 1.73 2.63 4.19 3.69.59.25 1.05.4 1.41.51.59.19 1.12.16 1.55.1.47-.07 1.48-.6 1.69-1.17.21-.58.21-1.08.14-1.17-.06-.08-.23-.14-.48-.27Z" />
    </svg>
  );
}

export function FloatingWhatsApp({ className }: FloatingWhatsAppProps) {
  const href = siteConfig.contact.whatsapp ?? "#contacto";
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={siteConfig.ui.whatsappCta}
      className={cn(
        "fixed bottom-5 right-5 z-[65] inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-warm-lg transition-transform duration-200 hover:scale-105 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      <WhatsAppIcon />
    </a>
  );
}
