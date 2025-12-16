import { z } from 'zod';

// Auth validations
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(20, 'Phone number too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  dsjInvitationCode: z.string().min(1, 'DSJ invitation code is required').max(50, 'Invitation code too long'),
  referredBy: z.string().min(1, 'Please enter your leader\'s name').max(100, 'Leader name too long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const passwordResetRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const passwordResetSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Profile validations
export const profileUpdateSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address'),
});

// Member validations (admin)
export const addMemberSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  referralCode: z.string().optional(),
});

export const updateMemberSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  firstName: z.string().min(1, 'First name is required').max(50, 'First name too long'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name too long'),
  email: z.string().email('Invalid email address'),
  referralCode: z.string().optional(),
  newPassword: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
});

// Announcement validations
export const announcementSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message too long'),
  type: z.enum(['GENERAL', 'EVENT', 'ZOOM', 'URGENT']),
  priority: z.number().int().min(0).max(100).default(0),
  expiresAt: z.string().optional().nullable(),
});

// Search/filter validations
export const memberSearchSchema = z.object({
  search: z.string().max(100).optional().default(''),
  status: z.enum(['all', 'active', 'inactive']).optional().default('all'),
  onboarding: z.enum(['all', 'not_started', 'in_progress', 'complete']).optional().default('all'),
  activity: z.enum(['all', 'recent', 'dormant', 'at_risk']).optional().default('all'),
  joinDate: z.enum(['all', 'this_week', 'this_month', 'earlier']).optional().default('all'),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;
export type PasswordResetRequestInput = z.infer<typeof passwordResetRequestSchema>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
export type AddMemberInput = z.infer<typeof addMemberSchema>;
export type UpdateMemberInput = z.infer<typeof updateMemberSchema>;
export type AnnouncementInput = z.infer<typeof announcementSchema>;
export type MemberSearchInput = z.infer<typeof memberSearchSchema>;
