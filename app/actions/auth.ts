'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { logActivity, ActivityAction } from '@/lib/activity';
import { loginSchema, registerSchema, passwordResetRequestSchema, passwordResetSchema } from '@/lib/validations';
import { z } from 'zod';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    // Validate input
    const validated = loginSchema.parse({ email, password });

    const user = await db.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (!user) {
      await logActivity({
        action: ActivityAction.LOGIN_FAILED,
        details: { email: validated.email, reason: 'User not found' },
      });
      return { success: false, error: 'Invalid email or password' };
    }

    if (!user.isActive) {
      await logActivity({
        userId: user.id,
        action: ActivityAction.LOGIN_FAILED,
        details: { reason: 'Account deactivated' },
      });
      return { success: false, error: 'Account is deactivated. Please contact support.' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      await logActivity({
        userId: user.id,
        action: ActivityAction.LOGIN_FAILED,
        details: { reason: 'Invalid password' },
      });
      return { success: false, error: 'Invalid email or password' };
    }

    // Update last login
    await db.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session
    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.firstName = user.firstName;
    session.lastName = user.lastName;
    session.referralCode = user.referralCode;
    session.role = user.role;
    session.isLoggedIn = true;
    await session.save();

    // Log successful login
    await logActivity({
      userId: user.id,
      action: ActivityAction.LOGIN,
    });

    // Return success with redirect path based on role
    const redirectTo = user.role === 'ADMIN' ? '/admin' : '/dashboard';
    return { success: true, redirectTo };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

export async function logout() {
  const session = await getSession();
  if (session.userId) {
    await logActivity({
      userId: session.userId,
      action: ActivityAction.LOGOUT,
    });
  }
  session.destroy();
  redirect('/login');
}

export async function createUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'MEMBER' | 'ADMIN';
}) {
  try {
    const existingUser = await db.user.findUnique({
      where: { email: data.email.toLowerCase() },
    });

    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await db.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || 'MEMBER',
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Create user error:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

// Register new member
export async function register(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const referralCode = formData.get('referralCode') as string;
  const referredBy = formData.get('referredBy') as string;

  try {
    // Validate input
    const validated = registerSchema.parse({
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      referralCode: referralCode || undefined,
      referredBy,
    });

    // Check if email already exists
    const existingUser = await db.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (existingUser) {
      return { success: false, error: 'An account with this email already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validated.password, 12);

    // Generate unique referral code for new user
    const userReferralCode = `${validated.firstName.toLowerCase().substring(0, 3)}${Date.now().toString(36)}`;

    // Create user
    const user = await db.user.create({
      data: {
        email: validated.email.toLowerCase(),
        password: hashedPassword,
        firstName: validated.firstName,
        lastName: validated.lastName,
        phone: validated.phone,
        referralCode: userReferralCode,
        referredBy: validated.referredBy,
        role: 'MEMBER',
      },
    });

    // Create onboarding progress
    await db.onboardingProgress.create({
      data: {
        userId: user.id,
      },
    });

    // Log activity
    await logActivity({
      userId: user.id,
      action: ActivityAction.USER_CREATED,
      details: { referredBy: validated.referredBy, referralCode: validated.referralCode || null },
    });

    // Mark referral visit as converted if referral code was used
    if (validated.referralCode) {
      await db.referralVisit.updateMany({
        where: {
          referralCode: validated.referralCode,
          converted: false,
        },
        data: {
          converted: true,
        },
      });
    }

    // Auto-login the user
    const session = await getSession();
    session.userId = user.id;
    session.email = user.email;
    session.firstName = user.firstName;
    session.lastName = user.lastName;
    session.referralCode = user.referralCode;
    session.role = user.role;
    session.isLoggedIn = true;
    await session.save();

    await logActivity({
      userId: user.id,
      action: ActivityAction.LOGIN,
      details: { method: 'auto-login after registration' },
    });

    return { success: true, redirectTo: '/dashboard' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed. Please try again.' };
  }
}

// Request password reset
export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;

  try {
    const validated = passwordResetRequestSchema.parse({ email });

    const user = await db.user.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    // Always return success to prevent email enumeration
    if (!user) {
      await logActivity({
        action: ActivityAction.PASSWORD_RESET_REQUESTED,
        details: { email: validated.email, found: false },
      });
      return { success: true, message: 'If an account exists with this email, you will receive reset instructions.' };
    }

    // Delete any existing tokens for this user
    await db.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Save token to database
    await db.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    // Log activity
    await logActivity({
      userId: user.id,
      action: ActivityAction.PASSWORD_RESET_REQUESTED,
    });

    // In production, send email here. For now, return token for demo purposes
    // TODO: Integrate email service (SendGrid, Resend, etc.)
    console.log(`Password reset token for ${user.email}: ${token}`);

    return {
      success: true,
      message: 'If an account exists with this email, you will receive reset instructions.',
      // Remove token in production - only for demo/testing
      token: process.env.NODE_ENV === 'development' ? token : undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    console.error('Password reset request error:', error);
    return { success: false, error: 'Failed to process request' };
  }
}

// Reset password with token
export async function resetPassword(formData: FormData) {
  const token = formData.get('token') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  try {
    const validated = passwordResetSchema.parse({ token, newPassword, confirmPassword });

    // Find valid token
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token: validated.token },
      include: { user: true },
    });

    if (!resetToken) {
      return { success: false, error: 'Invalid or expired reset link' };
    }

    if (resetToken.expiresAt < new Date()) {
      // Delete expired token
      await db.passwordResetToken.delete({
        where: { id: resetToken.id },
      });
      return { success: false, error: 'Reset link has expired. Please request a new one.' };
    }

    if (resetToken.usedAt) {
      return { success: false, error: 'This reset link has already been used' };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validated.newPassword, 12);

    // Update password and mark token as used
    await db.$transaction([
      db.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      db.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    // Log activity
    await logActivity({
      userId: resetToken.userId,
      action: ActivityAction.PASSWORD_RESET_COMPLETED,
    });

    return { success: true, message: 'Password has been reset successfully. You can now log in.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as z.ZodError).issues[0].message };
    }
    console.error('Password reset error:', error);
    return { success: false, error: 'Failed to reset password' };
  }
}
