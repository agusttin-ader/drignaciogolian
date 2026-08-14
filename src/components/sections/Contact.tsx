"use client";

import { type FormEvent, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCta } from "@/components/ui/WhatsAppCta";
import { EditorialImage } from "@/components/media/EditorialImage";
import { siteConfig, verbatim } from "@/data/site";
import { photos } from "@/lib/photos";
import { cn } from "@/lib/utils";

type FieldErrors = {
  name?: string;
  reason?: string;
  email?: string;
};

const fieldClass =
  "mt-2 w-full rounded-lg border bg-background px-4 text-[0.95rem] transition-colors duration-200 focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ContactSection() {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fields = verbatim.pages.contacto.formFields;
  const mail = siteConfig.contact.email;

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!name.trim()) {
      next.name = "Completá este campo.";
    }
    if (!reason.trim()) {
      next.reason = "Completá este campo.";
    }
    if (!email.trim()) {
      next.email = "Completá este campo.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = "Ingresá un e-mail válido.";
    }
    return next;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0 || !mail) {
      setIsSubmitting(false);
      return;
    }

    const subject = encodeURIComponent(`Consulta — ${name}`);
    const body = encodeURIComponent(
      `${fields[0]}: ${name}\n${fields[1]}: ${reason}\n${fields[2]}: ${email}`,
    );
    setTimeout(() => {
      setIsSubmitting(false);
    }, 250);
    window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contact-heading"
      className="bg-accent text-accent-foreground"
    >
      <EditorialImage
        src={photos.clinic}
        alt={siteConfig.images.clinicAlt}
        sizes="100vw"
        className="h-36 w-full sm:h-56 lg:h-64"
        imageClassName="object-cover object-center"
      />

      <div className="mx-auto grid max-w-content gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-32 xl:px-12">
        <Reveal>
          <p className="text-[0.64rem] font-medium tracking-[0.28em] text-accent-foreground/55 uppercase sm:text-xs">
            {verbatim.pages.contacto.heading}
          </p>
          <SectionHeading
            id="contact-heading"
            className="mt-3 max-w-lg font-display text-[1.65rem] font-medium tracking-[-0.01em] text-accent-foreground sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            {verbatim.footer.agendaHeading}
          </SectionHeading>
          <p className="mt-4 max-w-xl text-[0.92rem] leading-relaxed text-accent-foreground/85 sm:text-base">
            {siteConfig.ui.contactIntro}
          </p>

          <ul className="mt-8 space-y-7 sm:mt-12">
            {verbatim.footer.locations.map((location) => (
              <li key={location.address} className="border-t border-white/12 pt-5">
                {location.label ? (
                  <h3 className="text-[0.7rem] tracking-[0.2em] text-accent-foreground/50 uppercase">
                    {location.label}
                  </h3>
                ) : null}
                {"name" in location && location.name ? (
                  <p className="mt-1 text-[0.95rem] font-medium">{location.name}</p>
                ) : null}
                <p className="mt-2 font-display text-[1.1rem] leading-snug sm:text-[1.25rem]">{location.address}</p>
                <p className="mt-1 text-[0.92rem] text-accent-foreground/60">{location.hours}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg bg-background p-5 text-foreground shadow-warm-lg sm:p-8 lg:p-10">
            <form className="space-y-5" onSubmit={onSubmit} noValidate>
              <div>
                <label htmlFor="contact-name" className="text-[0.88rem] font-medium">
                  {fields[0]}
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Escribí tu nombre completo para responder la consulta.
                </p>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (errors.name) {
                      setErrors((current) => ({ ...current, name: undefined }));
                    }
                  }}
                  className={cn(
                    fieldClass,
                    "min-h-12",
                    errors.name ? "border-[#7a332c]" : "border-border",
                  )}
                />
                {errors.name ? (
                  <p id="contact-name-error" className="mt-2 text-sm text-[#7a332c]" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact-reason" className="text-sm font-medium">
                  {fields[1]}
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Indicá síntomas, tiempo de evolución y estudios previos si los tenés.
                </p>
                <textarea
                  id="contact-reason"
                  name="reason"
                  required
                  rows={4}
                  aria-invalid={Boolean(errors.reason)}
                  aria-describedby={
                    errors.reason ? "contact-reason-error" : undefined
                  }
                  value={reason}
                  onChange={(event) => {
                    setReason(event.target.value);
                    if (errors.reason) {
                      setErrors((current) => ({
                        ...current,
                        reason: undefined,
                      }));
                    }
                  }}
                  className={cn(
                    fieldClass,
                    "py-3",
                    errors.reason ? "border-[#7a332c]" : "border-border",
                  )}
                />
                {errors.reason ? (
                  <p
                    id="contact-reason-error"
                    className="mt-2 text-sm text-[#7a332c]"
                    role="alert"
                  >
                    {errors.reason}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium">
                  {fields[2]}
                </label>
                <p className="mt-1 text-xs text-muted-foreground">
                  Este correo se usa para la respuesta inicial y coordinación.
                </p>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (errors.email) {
                      setErrors((current) => ({ ...current, email: undefined }));
                    }
                  }}
                  className={cn(
                    fieldClass,
                    "min-h-12",
                    errors.email ? "border-[#7a332c]" : "border-border",
                  )}
                />
                {errors.email ? (
                  <p
                    id="contact-email-error"
                    className="mt-2 text-sm text-[#7a332c]"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-[0.9rem] font-medium tracking-[0.03em] text-accent-foreground shadow-warm-sm transition-all duration-200 hover:bg-foreground/95 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/50 border-t-accent-foreground"
                    />
                    Enviando...
                  </>
                ) : (
                  verbatim.pages.contacto.submitLabel
                )}
              </button>
              {submitted ? (
                <p className="text-sm text-muted-foreground" role="status">
                  Se abrirá tu correo para enviar la consulta.
                </p>
              ) : null}
            </form>

            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-4 text-[0.88rem] text-muted-foreground">
                {siteConfig.ui.whatsappPrompt}
              </p>
              <WhatsAppCta variant="primary" className="w-full sm:w-auto" />
            </div>

            <aside className="mt-8 border-t border-border pt-6">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] text-muted-foreground/90 uppercase">
                Qué esperar en la consulta
              </h3>
              <ul className="mt-4">
                {siteConfig.ui.contactExpectations.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border/60 py-3 text-[0.9rem] leading-relaxed text-muted-foreground last:border-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
