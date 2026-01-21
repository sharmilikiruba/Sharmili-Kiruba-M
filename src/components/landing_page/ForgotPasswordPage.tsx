'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EmailStep } from './forgot-password/EmailStep';
import { OtpStep } from './forgot-password/OtpStep';
import { ResetPasswordStep } from './forgot-password/ResetPasswordStep';
import { ForgotPasswordStep } from './forgot-password/types';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [step, setStep] = useState<ForgotPasswordStep>('EMAIL');
    const [email, setEmail] = useState('');

    const renderStep = () => {
        switch (step) {
            case 'EMAIL':
                return (
                    <EmailStep
                        email={email}
                        setEmail={setEmail}
                        onNext={() => setStep('OTP')}
                    />
                );
            case 'OTP':
                return (
                    <OtpStep
                        email={email}
                        onNext={() => setStep('RESET')}
                        onBack={() => setStep('EMAIL')}
                    />
                );
            case 'RESET':
                return (
                    <ResetPasswordStep
                        onComplete={() => {
                            router.push('/login/login_page');
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col py-12 px-4 shadow-sm">
            {/* Header / Logo Area */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">HVMS</h1>
                <p className="text-gray-500 font-medium">Hostel Visitor Management System</p>
            </div>

            <div className="flex-1 flex items-start justify-center">
                <div className="w-full max-w-md">
                    {/* Main Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                        <div className="p-8 md:p-10">
                            {renderStep()}
                        </div>

                        {/* Progress Indicators */}
                        <div className="px-10 pb-10 flex justify-center gap-2">
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 'EMAIL' ? 'w-10 bg-blue-600' : 'w-2 bg-gray-200'}`} />
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 'OTP' ? 'w-10 bg-blue-600' : 'w-2 bg-gray-200'}`} />
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 'RESET' ? 'w-10 bg-blue-600' : 'w-2 bg-gray-200'}`} />
                        </div>
                    </div>

                    {/* Footer Nav */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => router.push('/login/login_page')}
                            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 font-semibold transition-all hover:gap-3"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Login</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="text-center mt-12 text-gray-400 text-sm font-medium">
                © 2026 HVMS Portal. All rights reserved.
            </div>
        </div>
    );
}
