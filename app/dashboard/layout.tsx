import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { db } from '@/lib/db';
import Sidebar from '@/components/dashboard/Sidebar';
import AnnouncementPopup from '@/components/dashboard/AnnouncementPopup';

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
      <Sidebar user={{ firstName: session.firstName, lastName: session.lastName, email: session.email, referralCode: session.referralCode }} />
      <main className="lg:ml-64 min-h-screen p-6 pt-20 lg:pt-6">
        {children}
      </main>
      <AnnouncementPopup announcements={announcements} />
    </div>
  );
}
