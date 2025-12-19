import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import Sidebar from '@/components/dashboard/Sidebar';
import AnnouncementPopup from '@/components/dashboard/AnnouncementPopup';
import WelcomeModal from '@/components/dashboard/WelcomeModal';
import MobileBottomNav from '@/components/dashboard/MobileBottomNav';

async function getActiveAnnouncements() {
  const now = new Date();

  const announcements = await db.announcement.findMany({
    where: {
      isActive: true,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: now } },
      ],
    },
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  return announcements;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    redirect('/login');
  }

  const announcements = await getActiveAnnouncements();

  return (
    <div className="min-h-screen bg-navy-dark">
      <Sidebar user={{ firstName: session.firstName, lastName: session.lastName, email: session.email }} />
      <main className="lg:ml-64 min-h-screen p-6 pt-20 lg:pt-6 pb-24 lg:pb-6">
        {children}
      </main>
      <MobileBottomNav />
      <AnnouncementPopup announcements={announcements} />
      <WelcomeModal firstName={session.firstName} />
    </div>
  );
}
