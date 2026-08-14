import { siteConfig, verbatim } from "@/data/site";

export function JsonLd() {
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "");
  const physicianId = `${siteUrl}#physician`;
  const businessId = `${siteUrl}#medicalbusiness`;

  const addresses = verbatim.footer.locations.map((location) => ({
    "@type": "PostalAddress",
    streetAddress: location.address,
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
    name: location.label ?? location.address,
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Physician",
        "@id": physicianId,
        name: siteConfig.doctor.title,
        url: siteConfig.seo.canonicalUrl,
        image: `${siteUrl}${siteConfig.images.hero}`,
        email: siteConfig.contact.email,
        medicalSpecialty: "https://schema.org/Otolaryngologic",
        description: siteConfig.seo.description,
        sameAs: [
          siteConfig.social.instagram,
          verbatim.footer.facebookUrl,
          verbatim.footer.linkedinUrl,
        ],
        worksFor: { "@id": businessId },
      },
      {
        "@type": "MedicalBusiness",
        "@id": businessId,
        name: verbatim.siteTitle,
        url: siteConfig.seo.canonicalUrl,
        image: `${siteUrl}${siteConfig.images.clinic}`,
        email: siteConfig.contact.email,
        medicalSpecialty: "https://schema.org/Otolaryngologic",
        address: addresses,
        employee: { "@id": physicianId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
