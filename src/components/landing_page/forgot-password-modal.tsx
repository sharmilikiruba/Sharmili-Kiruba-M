'use client';

import { useState } from 'react';
import { X, Mail, ArrowRight, CheckCircle } from 'lucide-react';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        // Simulate API call
        setIsLoading(true);
        setError('');

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            // Here you would typically call your backend API
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="text-center mb-6">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                                    <Mail size={24} />
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Enter the email address associated with your account and we'll send you a link to reset your password.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="name@example.com"
                                    autoFocus
                                />
                                {error && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Sending Link...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Reset Link</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 animate-in zoom-in duration-300">
                                <CheckCircle size={32} />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Check your mail</h4>
                            <p className="text-gray-600 text-sm mb-6">
                                We have sent a password reset link to<br />
                                <span className="font-semibold text-gray-900">{email}</span>
                            </p>

                            <button
                                onClick={onClose}
                                className="w-full bg-gray-100 text-gray-900 py-2.5 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                            >
                                Back to Login
                            </button>

                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-4 inline-block"
                            >
                                Click to resend
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
