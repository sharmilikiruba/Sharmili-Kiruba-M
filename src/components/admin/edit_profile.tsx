'use client';

import { useState, useEffect } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import apiClient from '@/lib/api-client';
import { AdminProfile } from './admin_profile';

interface EditProfileProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialProfile: AdminProfile;
    onSuccess: (updatedProfile: AdminProfile) => void;
}

export default function EditProfile({ open, onOpenChange, initialProfile, onSuccess }: EditProfileProps) {
    const [editProfile, setEditProfile] = useState<AdminProfile>({ ...initialProfile });
    const [isSavingProfile, setIsSavingProfile] = useState(false);

    useEffect(() => {
        if (open) {
            setEditProfile({ ...initialProfile });
        }
    }, [open, initialProfile]);

    const handleProfileSave = async () => {
        try {
            setIsSavingProfile(true);
            const response = await apiClient.put('/admin/profile', {
                name: editProfile.name,
                email: editProfile.email,
                mobile: editProfile.mobile,
                gender: editProfile.gender,
                address: editProfile.address,
                dob: editProfile.dob,
                designation: editProfile.designation,
            });
            if (response.data.success) {
                onSuccess(editProfile);
            }
        } catch (error: any) {
            console.error('Error updating admin profile:', error);
            alert(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsSavingProfile(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Field
                        label="Full Name"
                        value={editProfile.name}
                        onChange={(v) => setEditProfile({ ...editProfile, name: v })}
                    />
                    <Field
                        label="Email Address"
                        type="email"
                        value={editProfile.email}
                        onChange={(v) => setEditProfile({ ...editProfile, email: v })}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label>Gender</Label>
                            <Select
                                value={editProfile.gender}
                                onValueChange={(v) => setEditProfile({ ...editProfile, gender: v })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="M">Male</SelectItem>
                                    <SelectItem value="F">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Field
                            label="Date of Birth"
                            type="date"
                            value={editProfile.dob ? editProfile.dob.split('T')[0] : ''}
                            onChange={(v) => setEditProfile({ ...editProfile, dob: v })}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field
                            label="Mobile"
                            value={editProfile.mobile}
                            onChange={(v) => setEditProfile({ ...editProfile, mobile: v })}
                        />
                        <Field
                            label="Designation"
                            value={editProfile.designation}
                            onChange={(v) => setEditProfile({ ...editProfile, designation: v })}
                        />
                    </div>
                    <Field
                        label="Address"
                        value={editProfile.address}
                        onChange={(v) => setEditProfile({ ...editProfile, address: v })}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleProfileSave} disabled={isSavingProfile}>
                        {isSavingProfile && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function Field({
    label,
    value,
    type = "text",
    onChange,
}: {
    label: string;
    value: string;
    type?: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-1">
            <Label>{label}</Label>
            <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}
