'use client';

import { useState } from 'react';
import { useRegisterAdmin } from '@/hooks/useRegisterAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface RegisterAdminFormProps {
    onBackToLogin: () => void;
}

export function RegisterAdminForm({ onBackToLogin }: RegisterAdminFormProps) {
    const { register, loading, error, success } = useRegisterAdmin();
    const [formData, setFormData] = useState({
        institutionName: '',
        fullName: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await register(formData);

        if (result.success) {
            // Redirect to login after successful registration
            setTimeout(() => {
                onBackToLogin();
            }, 2000);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Register Admin</h2>
                <p className="text-gray-500 text-sm mt-1">
                    Set up the system admin account (one-time only)
                </p>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {success && (
                <Alert variant="success" className="mb-6">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>Registration successful! Redirecting to login...</AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution Name</Label>
                    <Input
                        id="institutionName"
                        name="institutionName"
                        type="text"
                        placeholder="Enter institution name"
                        value={formData.institutionName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Role:</span> Admin
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Only one admin can be registered. After registration, this page will no
                        longer be accessible.
                    </p>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={loading}
                >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Register Admin
                </Button>
            </form>

            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={onBackToLogin}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                    ← Back to Login
                </button>
            </div>
        </div>
    );
}
