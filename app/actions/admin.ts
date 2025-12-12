'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logActivity, ActivityAction } from '@/lib/activity';
import { addMemberSchema, updateMemberSchema, memberSearchSchema } from '@/lib/validations';
import { z } from 'zod';

// Verify admin access
async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== 'ADMIN') {
    redirect('/login');
  }
  return session;
}

// Get members with search and pagination
export async function getMembers(params?: {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  page?: number;
  limit?: number;
}) {
  await requireAdmin();

  const validated = memberSearchSchema.parse({
    search: params?.search || '',
    status: params?.status || 'all',
    page: params?.page || 1,
    limit: params?.limit || 10,
  });

  const where: {
    role: 'MEMBER';
    isActive?: boolean;
    OR?: Array<{ firstName: { contains: string; mode: 'insensitive' } } | { lastName: { contains: string; mode: 'insensitive' } } | { email: { contains: string; mode: 'insensitive' } }>;
  } = {
    role: 'MEMBER',
  };

  // Status filter
  if (validated.status === 'active') {
    where.isActive = true;
  } else if (validated.status === 'inactive') {
    where.isActive = false;
  }

  // Search filter
  if (validated.search) {
    where.OR = [
      { firstName: { contains: validated.search, mode: 'insensitive' } },
      { lastName: { contains: validated.search, mode: 'insensitive' } },
      { email: { contains: validated.search, mode: 'insensitive' } },
    ];
  }

  const [members, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (validated.page - 1) * validated.limit,
      take: validated.limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        referralCode: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      },
    }),
    db.user.count({ where }),
  ]);

  return {
    members,
    total,
    page: validated.page,
    limit: validated.limit,
    totalPages: Math.ceil(total / validated.limit),
  };
}

// Toggle user active status
export async function toggleUserStatus(formData: FormData) {
  const session = await requireAdmin();

  const userId = formData.get('userId') as string;
  const currentStatus = formData.get('currentStatus') === 'true';
  const newStatus = !currentStatus;

  await db.user.update({
    where: { id: userId },
    data: { isActive: newStatus },
  });

  await logActivity({
    userId: session.userId,
    action: newStatus ? ActivityAction.MEMBER_ACTIVATED : ActivityAction.MEMBER_DEACTIVATED,
    details: { targetUserId: userId },
  });

  revalidatePath('/admin/members');
}

// Delete user
export async function deleteUser(formData: FormData) {
  const session = await requireAdmin();

  const userId = formData.get('userId') as string;

  // Get user info before deleting for logging
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { email: true, firstName: true, lastName: true },
  });

  await db.user.delete({
    where: { id: userId },
  });

  await logActivity({
    userId: session.userId,
    action: ActivityAction.MEMBER_DELETED,
    details: {
      deletedUserId: userId,
      deletedUserEmail: user?.email,
      deletedUserName: user ? `${user.firstName} ${user.lastName}` : undefined,
    },
  });

  revalidatePath('/admin/members');
}

// Add new member
export async function addMember(formData: FormData) {
  const session = await requireAdmin();

  try {
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      referralCode: formData.get('referralCode') as string || undefined,
    };

    // Validate input
    const validated = addMemberSchema.parse(data);

    // Check if email already exists
    const existing = await db.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (existing) {
      return { success: false, error: 'Email already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 12);

    // Create user
    const newUser = await db.user.create({
      data: {
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email.toLowerCase(),
        password: hashedPassword,
        referralCode: validated.referralCode || null,
        role: 'MEMBER',
        isActive: true,
      },
    });

    await logActivity({
      userId: session.userId,
      action: ActivityAction.MEMBER_CREATED,
      details: { newUserId: newUser.id, email: newUser.email },
    });

    revalidatePath('/admin/members');
    redirect('/admin/members');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    // Re-throw redirect errors
    throw error;
  }
}

// Get member by ID
export async function getMember(userId: string) {
  await requireAdmin();

  const member = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      referralCode: true,
      isActive: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });

  return member;
}

// Update member
export async function updateMember(formData: FormData) {
  const session = await requireAdmin();

  try {
    const data = {
      userId: formData.get('userId') as string,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      referralCode: formData.get('referralCode') as string || undefined,
      newPassword: formData.get('newPassword') as string || undefined,
    };

    // Validate input
    const validated = updateMemberSchema.parse(data);

    // Check if email is taken by another user
    const existingWithEmail = await db.user.findFirst({
      where: {
        email: validated.email.toLowerCase(),
        NOT: { id: validated.userId },
      },
    });

    if (existingWithEmail) {
      return { success: false, error: 'Email already in use by another member' };
    }

    // Build update data
    const updateData: {
      firstName: string;
      lastName: string;
      email: string;
      referralCode: string | null;
      password?: string;
    } = {
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email.toLowerCase(),
      referralCode: validated.referralCode || null,
    };

    // Only update password if provided
    if (validated.newPassword && validated.newPassword.length >= 6) {
      updateData.password = await bcrypt.hash(validated.newPassword, 12);
    }

    await db.user.update({
      where: { id: validated.userId },
      data: updateData,
    });

    await logActivity({
      userId: session.userId,
      action: ActivityAction.MEMBER_UPDATED,
      details: { targetUserId: validated.userId, updatedFields: Object.keys(updateData) },
    });

    revalidatePath('/admin/members');
    revalidatePath(`/admin/members/${validated.userId}`);
    redirect('/admin/members');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    // Re-throw redirect errors
    throw error;
  }
}
