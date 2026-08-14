import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { siteConfig } from "@/data/site";
import { fontDisplay, fontSans } from "@/lib/fonts";
import "./globals.css";

const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, "");
const ogImage = `${siteUrl}${siteConfig.seo.ogImage}`;

export const viewport: Viewport = {
  themeColor: "#f7f3ed",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.canonicalUrl),
  title: {
    default: siteConfig.seo.title,
    template: `%s · ${siteConfig.doctor.name}`,
  },
  description: siteConfig.seo.description,
  alternates: {
    canonical: siteConfig.seo.canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.seo.canonicalUrl,
    siteName: siteConfig.seo.title,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: ogImage,
        width: 771,
        height: 1024,
        alt: siteConfig.images.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${fontSans.variable} ${fontDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-base text-foreground">
        <JsonLd />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground focus:outline focus:outline-2 focus:outline-offset-2"
        >
          Saltar al contenido
        </a>
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
