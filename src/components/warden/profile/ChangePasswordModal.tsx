import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PasswordData } from './types';

interface ChangePasswordModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: PasswordData) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onOpenChange, onSave }) => {
    const [passwordData, setPasswordData] = useState<PasswordData>({
        current: '',
        new: '',
        confirm: '',
    });

    const handleSave = () => {
        onSave(passwordData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Enter your current password and choose a new password
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label>Current Password</Label>
                        <Input
                            type="password"
                            value={passwordData.current}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            value={passwordData.new}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label>Confirm New Password</Label>
                        <Input
                            type="password"
                            value={passwordData.confirm}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                            className="mt-1"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Change Password
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
