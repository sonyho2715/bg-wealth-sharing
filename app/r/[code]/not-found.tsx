import Link from 'next/link';
import { TrendingUp, Home } from 'lucide-react';

export default function ReferralNotFound() {
  return (
    <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto bg-gold/20 rounded-full flex items-center justify-center mb-6">
          <TrendingUp className="w-10 h-10 text-gold" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          Referral Link Not Found
        </h1>
        <p className="text-white/60 mb-8">
          This referral link may be invalid or expired. Please check with your
          team member for a valid link.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-light text-navy-dark font-semibold rounded-xl transition-all"
        >
          <Home className="w-5 h-5" />
          Visit Main Site
        </Link>
      </div>
    </div>
  );
}
