import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import ProjectOverview from '@/components/landing/ProjectOverview';
import DSJEXExplainer from '@/components/landing/DSJEXExplainer';
import TeamSection from '@/components/landing/TeamSection';
import CertificatesSection from '@/components/landing/CertificatesSection';
import TestimonialsGrid from '@/components/landing/TestimonialsGrid';
import CalendlySection from '@/components/landing/CalendlySection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import LandingAnnouncementPopup from '@/components/landing/LandingAnnouncementPopup';
import { getActiveAnnouncements } from '@/app/actions/announcements';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const announcements = await getActiveAnnouncements();

  return (
    <main className="min-h-screen">
      <LandingAnnouncementPopup announcements={announcements} />
      <Navigation />
      <HeroSection />
      <ProjectOverview />
      <DSJEXExplainer />
      <TeamSection />
      <CertificatesSection />
      <TestimonialsGrid />
      <CalendlySection />
      <CTASection />
      <Footer />
    </main>
  );
}
