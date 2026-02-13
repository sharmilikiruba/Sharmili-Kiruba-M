import React, { useState } from 'react';
import { Lock, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface ResetPasswordStepProps {
    email: string;
    otp: string;
    onComplete: () => void;
}

export const ResetPasswordStep: React.FC<ResetPasswordStepProps> = ({ email, otp, onComplete }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Using standard auth endpoint consistent with login flow
            // If backend requires /post/auth/reset-password specifically, this path needs adjustment
            await apiClient.post('/auth/reset-password', {
                email,
                otp,
                password
            });

            setIsSuccess(true);
            setTimeout(() => {
                onComplete();
            }, 2000);
        } catch (err: any) {
            console.error('Reset password error:', err);
            const errorMessage = err.response?.data?.message
                || err.response?.data?.error
                || 'Failed to reset password. Please try again.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-8 animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm border border-green-100">
                    <CheckCircle2 size={48} />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Success!</h4>
                <p className="text-gray-500 font-medium">
                    Your password has been reset successfully. <br />
                    Redirecting you to login...
                </p>
                <div className="mt-8 flex justify-center">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm border border-blue-100">
                    <Lock size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Reset Password</h4>
                <p className="text-gray-500 text-sm">
                    Create a strong password to secure your account.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">
                        New Password
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors text-gray-400">
                            <Lock size={18} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                            placeholder="Min. 8 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 ml-1">
                        Confirm New Password
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors text-gray-400">
                            <Lock size={18} />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                            placeholder="Repeat password"
                        />
                    </div>
                </div>
                {error && (
                    <p className="text-red-500 text-xs font-medium mt-1 ml-1">{error}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Updating Password...</span>
                    </>
                ) : (
                    <>
                        <span>Save Password</span>
                    </>
                )}
            </button>
        </form>
    );
};
