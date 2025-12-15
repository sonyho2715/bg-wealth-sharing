import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import ProjectOverview from '@/components/landing/ProjectOverview';
import TeamSection from '@/components/landing/TeamSection';
import CertificatesSection from '@/components/landing/CertificatesSection';
import TestimonialsGrid from '@/components/landing/TestimonialsGrid';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import ReferralBanner from '@/components/landing/ReferralBanner';
import ReferralTracker from '@/components/landing/ReferralTracker';
import { getReferrerByCode } from '@/app/actions/referral';

interface Props {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ utm_source?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const result = await getReferrerByCode(code);

  if (!result.success || !result.data) {
    return {
      title: 'Abundant Blessing AI Trade - BG Wealth Sharing',
    };
  }

  return {
    title: `Join ${result.data.firstName}'s Team - BG Wealth Sharing`,
    description: `${result.data.firstName} ${result.data.lastName} invites you to join Abundant Blessing AI Trade. Learn how to earn with just 10 minutes a day using copy/paste trading signals.`,
    robots: 'noindex, nofollow', // Prevent duplicate content issues
  };
}

export default async function ReferralPage({ params, searchParams }: Props) {
  const { code } = await params;
  const { utm_source } = await searchParams;

  const result = await getReferrerByCode(code);

  if (!result.success || !result.data) {
    notFound();
  }

  const referrer = result.data;

  return (
    <main className="min-h-screen">
      <ReferralTracker referralCode={code} source={utm_source} />
      <ReferralBanner
        referrerName={`${referrer.firstName} ${referrer.lastName}`}
        referralCode={code}
      />
      <Navigation referralCode={code} />
      <HeroSection referralCode={code} />
      <ProjectOverview />
      <TeamSection />
      <CertificatesSection />
      <TestimonialsGrid />
      <CTASection referralCode={code} />
      <Footer />
    </main>
  );
}
