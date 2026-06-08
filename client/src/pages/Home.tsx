/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Home page: Assembles all sections in order
 * Sections: Hero → About → Portfolio → Process → Contact → Footer
 */

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PortfolioSection from '@/components/PortfolioSection';
import ProcessSection from '@/components/ProcessSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
