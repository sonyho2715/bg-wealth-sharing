import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import Sidebar from '@/components/dashboard/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-navy-dark">
      <Sidebar user={{ firstName: session.firstName, lastName: session.lastName, email: session.email }} />
      <main className="lg:ml-64 min-h-screen p-6 pt-20 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
