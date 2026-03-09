import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { WardenProfileData } from './types';

interface EditProfileModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    profileData: WardenProfileData;
    onSave: (data: WardenProfileData) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
    isOpen,
    onOpenChange,
    profileData,
    onSave,
}) => {
    const [formData, setFormData] = useState<WardenProfileData>(profileData);

    useEffect(() => {
        if (isOpen) {
            setFormData(profileData);
        }
    }, [isOpen, profileData]);

    const handleInputChange = (field: keyof WardenProfileData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your personal and contact information
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label>Employee ID (ReadOnly)</Label>
                        <Input
                            value={formData.employeeId}
                            disabled
                            className="mt-1 bg-gray-50"
                        />
                    </div>
                    <div>
                        <Label>Gender</Label>
                        <Input
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label>Date of Birth</Label>
                        <Input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => handleInputChange('dob', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label>Mobile Number</Label>
                        <Input
                            value={formData.mobile}
                            onChange={(e) => handleInputChange('mobile', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <Label>Alternate Mobile</Label>
                        <Input
                            value={formData.alternateMobile}
                            onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <Label>Email Address</Label>
                        <Input
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <Label>Address</Label>
                        <Input
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="mt-1"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
