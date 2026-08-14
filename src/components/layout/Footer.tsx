import Image from "next/image";
import { siteConfig, verbatim } from "@/data/site";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.75A4 4 0 0 0 3.75 7.75v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-8.5a4 4 0 0 0-4-4h-8.5Zm8.94 1.31a1.06 1.06 0 1 1 0 2.12 1.06 1.06 0 0 1 0-2.12ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.58c0-.87.24-1.46 1.5-1.46h1.6V4.45c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.06v2.11H7.75v3h2.59V21h3.16Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.55 8.7H3.67V20h2.88V8.7Zm.2-3.5c0 .95-.72 1.7-1.64 1.7h-.02c-.9 0-1.62-.75-1.62-1.7 0-.96.73-1.7 1.65-1.7.92 0 1.62.74 1.63 1.7ZM20.5 13.52V20h-2.87v-6.15c0-1.54-.54-2.6-1.9-2.6-1.03 0-1.64.7-1.91 1.37-.1.25-.12.6-.12.95V20h-2.88s.04-10.2 0-11.3h2.88V10.3c.38-.58 1.06-1.4 2.58-1.4 1.88 0 3.3 1.24 3.3 3.9Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 sm:py-20 md:grid-cols-[1.4fr_1fr_0.8fr] md:gap-14 lg:px-10 lg:py-24 xl:px-12">
        <div>
          <Image
            src="/images/logo-ig-mark-only-dark-v2.webp"
            alt={siteConfig.doctor.title}
            width={130}
            height={130}
            className="h-14 w-14 rounded-sm object-contain"
            sizes="56px"
          />
          {siteConfig.contact.email ? (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-3.5 block text-[0.88rem] text-muted-foreground decoration-accent/50 underline-offset-4 transition-all duration-200 hover:text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {siteConfig.contact.email}
            </a>
          ) : null}
        </div>
        <div>
          <p className="text-[0.64rem] tracking-[0.2em] text-muted-foreground/85 uppercase sm:text-[0.68rem] sm:tracking-[0.24em]">
            {verbatim.footer.agendaHeading}
          </p>
          <ul className="mt-3.5 space-y-3 text-[0.84rem] text-muted-foreground/90 sm:text-[0.88rem]">
            {verbatim.footer.locations.map((location) => (
              <li key={location.address}>
                {location.label ? (
                  <span className="text-foreground/95">{location.label} · </span>
                ) : null}
                {location.address}
                {location.hours ? (
                  <span className="mt-0.5 block text-[0.78rem]">{location.hours}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Redes" className="flex items-start gap-2.5">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${verbatim.footer.instagramHandle}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/75 text-muted-foreground transition-all duration-200 hover:border-foreground/35 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <InstagramIcon />
          </a>
          <a
            href={verbatim.footer.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/75 text-muted-foreground transition-all duration-200 hover:border-foreground/35 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <FacebookIcon />
          </a>
          <a
            href={verbatim.footer.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/75 text-muted-foreground transition-all duration-200 hover:border-foreground/35 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <LinkedInIcon />
          </a>
        </nav>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-content px-4 py-6 pb-8 text-[0.72rem] text-muted-foreground/75 sm:px-6 sm:text-[0.75rem] lg:px-10 xl:px-12">
          © {year} {siteConfig.doctor.title}
        </p>
      </div>
    </footer>
  );
}
