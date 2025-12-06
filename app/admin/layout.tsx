import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn || !session.userId) {
    redirect('/login');
  }

  // Only allow admins
  if (session.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <AdminSidebar user={{ firstName: session.firstName, lastName: session.lastName, email: session.email }} />
      <main className="lg:ml-64 min-h-screen p-6 pt-20 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
