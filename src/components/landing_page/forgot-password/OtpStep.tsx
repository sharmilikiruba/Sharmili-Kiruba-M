import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheck, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface OtpStepProps {
    email: string;
    setOtp: (otp: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export const OtpStep: React.FC<OtpStepProps> = ({ email, setOtp, onNext, onBack }) => {
    const [otp, setLocalOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(30);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);


    const handleResend = async () => {
        setIsLoading(true);
        setError('');
        try {
            await apiClient.post('/auth/resend-otp', { email });
            setTimer(30);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to resend OTP.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setLocalOtp(newOtp);

        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpString = otp.join('');
        if (otpString.length < 6) {
            setError('Please enter the full 6-digit code');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await apiClient.post('/auth/verify-otp', { email, otp: otpString });

            setOtp(otpString);
            onNext();
        } catch (err: any) {
            const errorData = err.response?.data;
            const errorMessage = typeof errorData?.message === 'string'
                ? errorData.message
                : errorData?.error?.message || 'Invalid OTP. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm border border-blue-100">
                    <ShieldCheck size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Verify OTP</h4>
                <p className="text-gray-500 text-sm">
                    We've sent a 6-digit code to <br />
                    <span className="font-bold text-gray-900">{email}</span>
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => { inputRefs.current[index] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                        />
                    ))}
                </div>
                {error && (
                    <p className="text-red-500 text-xs font-medium text-center">{error}</p>
                )}
            </div>

            <div className="space-y-3">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Verifying...</span>
                        </>
                    ) : (
                        <>
                            <span>Verify & Continue</span>
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onBack}
                    className="w-full bg-white text-gray-600 py-3 rounded-xl hover:bg-gray-50 font-semibold transition-all flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={16} />
                    <span>Change Email</span>
                </button>
            </div>

            <div className="text-center">
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0 || isLoading}
                    className="text-sm font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {timer > 0 ? `Resend Code (${timer}s)` : 'Resend Code'}
                </button>
            </div>
        </form>
    );
};
