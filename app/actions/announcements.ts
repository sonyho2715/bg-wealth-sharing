'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logActivity, ActivityAction } from '@/lib/activity';
import { announcementSchema } from '@/lib/validations';
import { z } from 'zod';

// Verify admin access
async function requireAdmin() {
  const session = await getSession();
  if (!session.isLoggedIn || session.role !== 'ADMIN') {
    redirect('/login');
  }
  return session;
}

// Get all announcements (admin)
export async function getAnnouncements() {
  await requireAdmin();

  const announcements = await db.announcement.findMany({
    orderBy: [
      { priority: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  return announcements;
}

// Get active announcements (for members)
export async function getActiveAnnouncements() {
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

// Create announcement
export async function createAnnouncement(formData: FormData) {
  const session = await requireAdmin();

  try {
    const data = {
      title: formData.get('title') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as 'GENERAL' | 'EVENT' | 'ZOOM' | 'URGENT',
      priority: parseInt(formData.get('priority') as string) || 0,
      expiresAt: formData.get('expiresAt') as string || null,
    };

    const validated = announcementSchema.parse(data);

    const announcement = await db.announcement.create({
      data: {
        title: validated.title,
        message: validated.message,
        type: validated.type,
        priority: validated.priority,
        expiresAt: validated.expiresAt ? new Date(validated.expiresAt) : null,
      },
    });

    await logActivity({
      userId: session.userId,
      action: ActivityAction.ANNOUNCEMENT_CREATED,
      details: { announcementId: announcement.id, title: announcement.title },
    });

    revalidatePath('/admin/announcements');
    redirect('/admin/announcements');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    throw error;
  }
}

// Update announcement
export async function updateAnnouncement(formData: FormData) {
  const session = await requireAdmin();

  try {
    const id = formData.get('id') as string;
    const data = {
      title: formData.get('title') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as 'GENERAL' | 'EVENT' | 'ZOOM' | 'URGENT',
      priority: parseInt(formData.get('priority') as string) || 0,
      expiresAt: formData.get('expiresAt') as string || null,
    };

    const validated = announcementSchema.parse(data);

    await db.announcement.update({
      where: { id },
      data: {
        title: validated.title,
        message: validated.message,
        type: validated.type,
        priority: validated.priority,
        expiresAt: validated.expiresAt ? new Date(validated.expiresAt) : null,
      },
    });

    await logActivity({
      userId: session.userId,
      action: ActivityAction.ANNOUNCEMENT_UPDATED,
      details: { announcementId: id, title: validated.title },
    });

    revalidatePath('/admin/announcements');
    redirect('/admin/announcements');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    throw error;
  }
}

// Toggle announcement status
export async function toggleAnnouncementStatus(formData: FormData) {
  const session = await requireAdmin();

  const id = formData.get('id') as string;
  const currentStatus = formData.get('currentStatus') === 'true';
  const newStatus = !currentStatus;

  await db.announcement.update({
    where: { id },
    data: { isActive: newStatus },
  });

  await logActivity({
    userId: session.userId,
    action: newStatus ? ActivityAction.ANNOUNCEMENT_ACTIVATED : ActivityAction.ANNOUNCEMENT_DEACTIVATED,
    details: { announcementId: id },
  });

  revalidatePath('/admin/announcements');
}

// Delete announcement
export async function deleteAnnouncement(formData: FormData) {
  const session = await requireAdmin();

  const id = formData.get('id') as string;

  // Get announcement info before deleting
  const announcement = await db.announcement.findUnique({
    where: { id },
    select: { title: true },
  });

  await db.announcement.delete({
    where: { id },
  });

  await logActivity({
    userId: session.userId,
    action: ActivityAction.ANNOUNCEMENT_DELETED,
    details: { announcementId: id, title: announcement?.title },
  });

  revalidatePath('/admin/announcements');
}

// Get single announcement
export async function getAnnouncement(id: string) {
  await requireAdmin();

  const announcement = await db.announcement.findUnique({
    where: { id },
  });

  return announcement;
}
