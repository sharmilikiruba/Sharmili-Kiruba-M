'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface ChangePasswordProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
}

export default function ChangePassword({ open, onOpenChange, onSuccess }: ChangePasswordProps) {
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    // Clear fields when dialog opens/closes
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setPasswords({ current: '', new: '', confirm: '' });
        }
        onOpenChange(newOpen);
    };

    const handlePasswordChange = async () => {
        if (passwords.new !== passwords.confirm) {
            alert('New passwords do not match');
            return;
        }
        if (!passwords.new || passwords.new.length < 6) {
            alert('New password must be at least 6 characters');
            return;
        }

        try {
            setIsSavingPassword(true);
            // changed to post as per user request
            const response = await apiClient.post('/admin/change-password', {
                oldPassword: passwords.current,
                newPassword: passwords.new,
            });
            if (response.data.success) {
                setPasswords({ current: '', new: '', confirm: '' });
                onSuccess();
                alert('Password changed successfully!');
            }
        } catch (error: any) {
            console.error('Error changing password:', error);
            alert(error.response?.data?.message || 'Failed to change password');
        } finally {
            setIsSavingPassword(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[400px] w-[95vw] rounded-xl">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <PasswordField
                        label="Current Password"
                        value={passwords.current}
                        onChange={(v) => setPasswords({ ...passwords, current: v })}
                    />
                    <PasswordField
                        label="New Password"
                        value={passwords.new}
                        onChange={(v) => setPasswords({ ...passwords, new: v })}
                    />
                    <PasswordField
                        label="Confirm New Password"
                        value={passwords.confirm}
                        onChange={(v) => setPasswords({ ...passwords, confirm: v })}
                    />
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        className="flex-1 sm:flex-none"
                        onClick={() => handleOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
                        onClick={handlePasswordChange}
                        disabled={isSavingPassword}
                    >
                        {isSavingPassword && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Update Password
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function PasswordField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-1">
            <Label>{label}</Label>
            <Input
                type="password"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
