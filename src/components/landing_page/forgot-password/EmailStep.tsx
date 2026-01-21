import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';

interface EmailStepProps {
    email: string;
    setEmail: (email: string) => void;
    onNext: () => void;
}

export const EmailStep: React.FC<EmailStepProps> = ({ email, setEmail, onNext }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setIsLoading(true);
        setError('');

        // Simulate API call to send OTP
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-sm border border-blue-100">
                    <Mail size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Forgot Password?</h4>
                <p className="text-gray-500 text-sm">
                    Enter your email address and we'll send you a 6-digit verification code.
                </p>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                    Email Address
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-blue-600 transition-colors text-gray-400">
                        <Mail size={18} />
                    </div>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                        placeholder="name@university.edu"
                        autoFocus
                    />
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
                        <span>Sending OTP...</span>
                    </>
                ) : (
                    <>
                        <span>Send OTP</span>
                        <ArrowRight size={18} />
                    </>
                )}
            </button>
        </form>
    );
};
