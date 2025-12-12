'use server';

import { revalidatePath } from 'next/cache';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logActivity, ActivityAction } from '@/lib/activity';
import { profileUpdateSchema, passwordChangeSchema } from '@/lib/validations';
import { z } from 'zod';

// Verify member access
async function requireMember() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    throw new Error('Unauthorized');
  }
  return session;
}

// Update profile
export async function updateProfile(formData: FormData) {
  const session = await requireMember();

  try {
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
    };

    // Validate input
    const validated = profileUpdateSchema.parse(data);

    // Check if email is taken by another user
    if (validated.email !== session.email) {
      const existingUser = await db.user.findFirst({
        where: {
          email: validated.email.toLowerCase(),
          NOT: { id: session.userId },
        },
      });

      if (existingUser) {
        return { success: false, error: 'Email already in use' };
      }
    }

    // Update user
    await db.user.update({
      where: { id: session.userId },
      data: {
        firstName: validated.firstName,
        lastName: validated.lastName,
        email: validated.email.toLowerCase(),
      },
    });

    // Update session
    session.firstName = validated.firstName;
    session.lastName = validated.lastName;
    session.email = validated.email.toLowerCase();
    await session.save();

    // Log activity
    await logActivity({
      userId: session.userId,
      action: ActivityAction.PROFILE_UPDATED,
      details: { updatedFields: Object.keys(data) },
    });

    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    console.error('Profile update error:', error);
    return { success: false, error: 'Failed to update profile' };
  }
}

// Change password
export async function changePassword(formData: FormData) {
  const session = await requireMember();

  try {
    const data = {
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    // Validate input
    const validated = passwordChangeSchema.parse(data);

    // Get current user with password
    const user = await db.user.findUnique({
      where: { id: session.userId },
      select: { password: true },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(validated.currentPassword, user.password);
    if (!isValidPassword) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validated.newPassword, 12);

    // Update password
    await db.user.update({
      where: { id: session.userId },
      data: { password: hashedPassword },
    });

    // Log activity
    await logActivity({
      userId: session.userId,
      action: ActivityAction.PASSWORD_CHANGED,
    });

    return { success: true, message: 'Password changed successfully' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    console.error('Password change error:', error);
    return { success: false, error: 'Failed to change password' };
  }
}

// Get member profile
export async function getProfile() {
  const session = await requireMember();

  const user = await db.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      referralCode: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });

  return user;
}

// Update onboarding progress
export async function updateOnboardingProgress(step: number, completed: boolean) {
  const session = await requireMember();

  const stepField = `step${step}` as 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6' | 'step7';

  await db.onboardingProgress.upsert({
    where: { userId: session.userId },
    create: {
      userId: session.userId,
      [stepField]: completed,
    },
    update: {
      [stepField]: completed,
    },
  });

  // Log step completion
  if (completed) {
    await logActivity({
      userId: session.userId,
      action: ActivityAction.ONBOARDING_STEP_COMPLETED,
      details: { step },
    });
  }

  // Check if all steps are completed
  const progress = await db.onboardingProgress.findUnique({
    where: { userId: session.userId },
  });

  if (progress && progress.step1 && progress.step2 && progress.step3 &&
      progress.step4 && progress.step5 && progress.step6 && progress.step7) {
    await logActivity({
      userId: session.userId,
      action: ActivityAction.ONBOARDING_COMPLETED,
    });
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/onboarding');

  return { success: true };
}

// Get onboarding progress
export async function getOnboardingProgress() {
  const session = await requireMember();

  let progress = await db.onboardingProgress.findUnique({
    where: { userId: session.userId },
  });

  // Create if doesn't exist
  if (!progress) {
    progress = await db.onboardingProgress.create({
      data: { userId: session.userId },
    });
  }

  return progress;
}
