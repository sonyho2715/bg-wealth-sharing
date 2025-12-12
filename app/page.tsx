import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import ProjectOverview from '@/components/landing/ProjectOverview';
import AboutLeeMeadows from '@/components/landing/AboutLeeMeadows';
import TeamSection from '@/components/landing/TeamSection';
import CertificatesSection from '@/components/landing/CertificatesSection';
import TestimonialsGrid from '@/components/landing/TestimonialsGrid';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import LandingAnnouncementPopup from '@/components/landing/LandingAnnouncementPopup';
import { getActiveAnnouncements } from '@/app/actions/announcements';

export default async function HomePage() {
  const announcements = await getActiveAnnouncements();

  return (
    <main className="min-h-screen">
      <LandingAnnouncementPopup announcements={announcements} />
      <Navigation />
      <HeroSection />
      <ProjectOverview />
      <AboutLeeMeadows />
      <TeamSection />
      <CertificatesSection />
      <TestimonialsGrid />
      <CTASection />
      <Footer />
    </main>
  );
}
