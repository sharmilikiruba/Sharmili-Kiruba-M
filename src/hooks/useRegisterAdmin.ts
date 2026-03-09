'use client';

import { useState } from 'react';
import apiClient from '@/lib/api-client';

export function useRegisterAdmin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const register = async (formData: any) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await apiClient.post('auth/register', formData);

            if (response.status === 201 || response.status === 200) {
                setSuccess(true);
                return { success: true };
            } else {
                throw new Error(response.data?.message || 'Registration failed');
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to register admin. Please try again.';
            setError(errorMessage);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        loading,
        error,
        success,
    };
}
