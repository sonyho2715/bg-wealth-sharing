'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logActivity, ActivityAction } from '@/lib/activity';

// Get onboarding progress for current user
export async function getOnboardingProgress() {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return { success: false, error: 'Not authenticated' };
  }

  const progress = await db.onboardingProgress.findUnique({
    where: { userId: session.userId },
  });

  // Return array of completed step numbers
  const completedSteps: number[] = [];
  if (progress) {
    if (progress.step1) completedSteps.push(1);
    if (progress.step2) completedSteps.push(2);
    if (progress.step3) completedSteps.push(3);
    if (progress.step4) completedSteps.push(4);
    if (progress.step5) completedSteps.push(5);
    if (progress.step6) completedSteps.push(6);
    if (progress.step7) completedSteps.push(7);
  }

  return { success: true, completedSteps };
}

// Toggle a step's completion status
export async function toggleOnboardingStep(stepId: number) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return { success: false, error: 'Not authenticated' };
  }

  if (stepId < 1 || stepId > 7) {
    return { success: false, error: 'Invalid step' };
  }

  const stepKey = `step${stepId}` as 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6' | 'step7';

  // Get current progress or create new
  const existing = await db.onboardingProgress.findUnique({
    where: { userId: session.userId },
  });

  if (existing) {
    // Toggle the step
    const newValue = !existing[stepKey];
    await db.onboardingProgress.update({
      where: { userId: session.userId },
      data: { [stepKey]: newValue },
    });

    // Check if all steps completed
    const updated = await db.onboardingProgress.findUnique({
      where: { userId: session.userId },
    });

    const allComplete = updated &&
      updated.step1 && updated.step2 && updated.step3 &&
      updated.step4 && updated.step5 && updated.step6 && updated.step7;

    if (allComplete) {
      await logActivity({
        userId: session.userId,
        action: ActivityAction.ONBOARDING_COMPLETED,
        details: { completedAt: new Date().toISOString() },
      });
    } else if (newValue) {
      await logActivity({
        userId: session.userId,
        action: ActivityAction.ONBOARDING_STEP_COMPLETED,
        details: { step: stepId },
      });
    }

    return { success: true, isComplete: newValue };
  } else {
    // Create new progress with this step completed
    await db.onboardingProgress.create({
      data: {
        userId: session.userId,
        [stepKey]: true,
      },
    });

    await logActivity({
      userId: session.userId,
      action: ActivityAction.ONBOARDING_STEP_COMPLETED,
      details: { step: stepId },
    });

    return { success: true, isComplete: true };
  }
}

// Mark a specific step as complete (without toggle)
export async function completeOnboardingStep(stepId: number) {
  const session = await getSession();
  if (!session.isLoggedIn || !session.userId) {
    return { success: false, error: 'Not authenticated' };
  }

  if (stepId < 1 || stepId > 7) {
    return { success: false, error: 'Invalid step' };
  }

  const stepKey = `step${stepId}` as 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'step6' | 'step7';

  await db.onboardingProgress.upsert({
    where: { userId: session.userId },
    create: {
      userId: session.userId,
      [stepKey]: true,
    },
    update: {
      [stepKey]: true,
    },
  });

  // Check if all steps completed
  const progress = await db.onboardingProgress.findUnique({
    where: { userId: session.userId },
  });

  const allComplete = progress &&
    progress.step1 && progress.step2 && progress.step3 &&
    progress.step4 && progress.step5 && progress.step6 && progress.step7;

  if (allComplete) {
    await logActivity({
      userId: session.userId,
      action: ActivityAction.ONBOARDING_COMPLETED,
      details: { completedAt: new Date().toISOString() },
    });
  } else {
    await logActivity({
      userId: session.userId,
      action: ActivityAction.ONBOARDING_STEP_COMPLETED,
      details: { step: stepId },
    });
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/onboarding');

  return { success: true };
}
