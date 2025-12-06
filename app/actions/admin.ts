'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

// Verify admin access
async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== 'ADMIN') {
    redirect('/login');
  }
  return session;
}

// Toggle user active status
export async function toggleUserStatus(formData: FormData) {
  await requireAdmin();

  const userId = formData.get('userId') as string;
  const currentStatus = formData.get('currentStatus') === 'true';

  await db.user.update({
    where: { id: userId },
    data: { isActive: !currentStatus },
  });

  revalidatePath('/admin/members');
}

// Delete user
export async function deleteUser(formData: FormData) {
  await requireAdmin();

  const userId = formData.get('userId') as string;

  await db.user.delete({
    where: { id: userId },
  });

  revalidatePath('/admin/members');
}

// Add new member
export async function addMember(formData: FormData) {
  await requireAdmin();

  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Check if email already exists
  const existing = await db.user.findUnique({
    where: { email },
  });

  if (existing) {
    return { success: false, error: 'Email already exists' };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'MEMBER',
      isActive: true,
    },
  });

  revalidatePath('/admin/members');
  redirect('/admin/members');
}
