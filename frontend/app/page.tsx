import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { CategoriesSection } from "./components/CategorySection";
import { FeaturesSection } from "./components/FeaturesSection";
import { StatsSection } from "./components/StatsSection";
import { CTASection } from "./components/CtaSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
