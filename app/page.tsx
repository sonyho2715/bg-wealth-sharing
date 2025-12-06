import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import ProjectOverview from '@/components/landing/ProjectOverview';
import AboutLeeMeadows from '@/components/landing/AboutLeeMeadows';
import TeamSection from '@/components/landing/TeamSection';
import TestimonialsGrid from '@/components/landing/TestimonialsGrid';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProjectOverview />
      <AboutLeeMeadows />
      <TeamSection />
      <TestimonialsGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
