export type ForgotPasswordStep = 'EMAIL' | 'OTP' | 'RESET';

export interface ForgotPasswordState {
    email: string;
    otp: string;
    step: ForgotPasswordStep;
}
