export interface translation_Props {
  [key: string]: string
}

export interface translation_Props_With_Function {
  [key: string]: (value: string | number, ...rest: (string | number)[]) => string
}

export const translation: translation_Props = {
  MOLT: 'Molt',
  SIGN_IN_TO_MOLT: 'Sign in to Molt',
  EMAIL_OR_PHONE_NUMBER: 'Email or phone number',
  LOGIN_DESCRIPTION: 'Freelance coaches, gym coaches, and Molt-managed accounts in one secure login.',
  SECURE_OTP_AUTHENTICATION: 'Secure OTP-based authentication',
  OR_CONTINUE_WITH: 'Or continue with',
  CONTINUE_WITH_GOOGLE: 'Continue with Google',
  CONTINUE_WITH_APPLE: 'Continue with Apple',
  BY_CONTINUING_AGREE: "By continuing, you agree to Molt's",
  TERMS_OF_SERVICE: 'Terms of Service',
  AND: 'and',
  PRIVACY_POLICY: 'Privacy Policy',
  CONTINUE_WITH_OTP: 'Continue with OTP',
  ONE_STEP_CLOSER: "You're one step closer!",
  VERIFY_DESCRIPTION: "Once verified, you'll unlock full access to client management tools, workout plans, and the Molt coach marketplace.",
  COACHES_VERIFIED: 'Coaches verified this month',
  REGISTER_AS_A_COACH: 'Register as a Coach',
  REGISTER_AS_A_COACH_DESCRIPTION: 'Join the community of elite fitness professionals. Create your freelance account to get started.',
  IDENTITY_VERIFICATION_REQUIRED: 'Identity Verification Required',
  IDENTITY_VERIFICATION_REQUIRED_DESCRIPTION: 'To maintain quality and safety, we verify all coach profiles manually. You will need to upload certification documents in the next step.',
  ALREADY_HAVE_A_VERIFIED_ACCOUNT: 'Already have a verified account?',
  SIGN_IN: 'Sign in',
  COACH_TESTIMONIAL: 'Molt gave me the freedom to manage my freelance clients and scale my business without the administrative headache. Essential tool for any serious coach.',
  VERIFICATION_REQUIRED: 'Verification Required',
  VERIFICATION_REQUIRED_DESCRIPTION:
    'To maintain the quality and trust of our network, all freelance coaches must complete a brief video verification call. Once verified, your profile will be visible to thousands of potential clients.',
  ACCOUNT_STATUS_PENDING: 'Account Status: Pending Approval',
  ACCOUNT_STATUS_PENDING_DESC: 'Your profile is created but currently inactive.',
  BOOK_VERIFICATION_CALL: 'Book Verification Call',
  ILL_DO_THIS_LATER: "I'll do this later",
  CREATE_ACCOUNT: 'Create Account',
  VIDEO_VERIFICATION: 'Video Verification',
  BOOK_A_CALL: 'Book a Call',
  BACK_TO_LOGIN: 'Back to login',
  CHECK_YOUR_EMAIL: 'Check your email',
  SENT_VERIFICATION_CODE: "We've sent a 6-digit verification code to",
  VERIFY_CODE: 'Verify Code',
  DIDNT_RECEIVE_CODE: "Didn't receive the code?",
  CLICK_TO_RESEND: 'Click to resend',
  COPYRIGHT_MOLT: '© 2025 Molt Inc.',
  VERIFICATION_TESTIMONIAL: '"Molt has completely transformed how I manage my client roster. The verification process was seamless and I felt trusted from day one."',
  DONT_HAVE_AN_ACCOUNT: "Don't have an account?",
  SIGN_UP: 'Sign up',
}
