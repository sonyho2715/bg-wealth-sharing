const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_THRESHOLD = 0.5; // Score threshold (0.0 - 1.0)

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score?: number; error?: string }> {
  // Skip verification in development if no secret key is set
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY not set, skipping verification');
    return { success: true, score: 1.0 };
  }

  if (!token) {
    return { success: false, error: 'No reCAPTCHA token provided' };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data: RecaptchaResponse = await response.json();

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes']);
      return { success: false, error: 'reCAPTCHA verification failed' };
    }

    // Check score threshold for v3
    if (data.score !== undefined && data.score < RECAPTCHA_THRESHOLD) {
      console.warn(`reCAPTCHA score too low: ${data.score}`);
      return { success: false, score: data.score, error: 'Suspicious activity detected' };
    }

    return { success: true, score: data.score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Failed to verify reCAPTCHA' };
  }
}
