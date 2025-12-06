'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required' };
  }

  try {
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (!user.isActive) {
      return { success: false, error: 'Account is deactivated. Please contact support.' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
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
    session.role = user.role;
    session.isLoggedIn = true;
    await session.save();

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

export async function logout() {
  const session = await getSession();
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
