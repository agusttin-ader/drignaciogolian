import { AboutSection } from "@/components/sections/About";
import { BeforeAfterGallerySection } from "@/components/sections/BeforeAfterGallery";
import { ConversionBand } from "@/components/sections/ConversionBand";
import { ConditionsSection } from "@/components/sections/Conditions";
import { ContactSection } from "@/components/sections/Contact";
import { FAQSection } from "@/components/sections/FAQ";
import { HeroSection } from "@/components/sections/Hero";
import { InstitutionsStrip } from "@/components/sections/InstitutionsStrip";

export default function Home() {
  return (
    <main id="contenido" className="flex-1">
      <HeroSection />
      <InstitutionsStrip />
      <ConditionsSection />
      <ConversionBand />
      <AboutSection />
      <BeforeAfterGallerySection />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
