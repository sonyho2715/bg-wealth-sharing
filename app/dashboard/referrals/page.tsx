import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { getReferralStats } from '@/app/actions/referral';
import ReferralLinkCard from '@/components/dashboard/ReferralLinkCard';
import MessageTemplates from '@/components/dashboard/MessageTemplates';
import ReferralStats from '@/components/dashboard/ReferralStats';

export default async function ReferralsPage() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    redirect('/login');
  }

  const referralCode = session.referralCode;
  let stats = null;

  if (referralCode) {
    const result = await getReferralStats(referralCode);
    if (result.success) {
      stats = result.data;
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Your Referral Hub</h1>
        <p className="text-white/60 mt-1">
          Share your link and use these scripts to invite friends and family. Just 10 minutes a day!
        </p>
      </div>

      {/* Referral Link Card */}
      {referralCode ? (
        <>
          <ReferralLinkCard referralCode={referralCode} firstName={session.firstName} />

          {/* Stats */}
          {stats && <ReferralStats stats={stats} />}

          {/* Message Templates */}
          <MessageTemplates referralCode={referralCode} firstName={session.firstName} />
        </>
      ) : (
        <div className="bg-navy border border-gold/20 rounded-xl p-8 text-center">
          <p className="text-white/60">
            You don&apos;t have a referral code yet. Please contact support to get one assigned.
          </p>
        </div>
      )}
    </div>
  );
}
