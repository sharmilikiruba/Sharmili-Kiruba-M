'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Camera, Lock, CheckCircle2, Clock, XCircle, TrendingUp, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';
import { WardenProfileData, PasswordData } from './types';
import { EditProfileModal } from './EditProfileModal';
import { ChangePasswordModal } from './ChangePasswordModal';

export default function Profile() {
    const { user } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState<WardenProfileData>({
        fullName: '',
        employeeId: '',
        gender: '',
        dob: '',
        mobile: '',
        alternateMobile: '',
        email: '',
        address: '',
        designation: 'Warden',
        dateOfJoining: '',
        hostel_name: '',
        hostel_type: '',
        location: ''
    });

    const [stats, setStats] = useState({
        totalRequests: 0,
        approvalRate: 0,
        avgResponseTime: '0 hrs',
        rejectedRequests: 0
    });

    const [notifications, setNotifications] = useState({
        emergency: true,
        email: true
    });

    useEffect(() => {
        if (user?.id) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get(`/warden/profile/${user?.id}`);
            if (response.data.success) {
                const { profile, stats: wardenStats } = response.data.data;
                setProfileData({
                    fullName: profile.name || '',
                    employeeId: profile.emp_id || '',
                    gender: profile.gender || '',
                    dob: profile.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
                    mobile: profile.user?.phone || profile.phone || '',
                    alternateMobile: profile.alternate_phone || '',
                    email: profile.user?.email || user?.email || '',
                    address: profile.address || '',
                    designation: 'Warden',
                    dateOfJoining: profile.joining_date ? new Date(profile.joining_date).toISOString().split('T')[0] : '',
                    hostel_name: profile.hostel?.hostel_name || 'Not Assigned',
                    hostel_type: profile.hostel?.hostel_type || '',
                    location: profile.hostel?.location || ''
                });

                if (wardenStats) {
                    setStats(wardenStats);
                }

                if (profile.notification_preferences) {
                    setNotifications({
                        emergency: profile.notification_preferences.emergency_alerts ?? true,
                        email: profile.notification_preferences.email_notifications ?? true
                    });
                }
            }
        } catch (error) {
            console.error('Error fetching warden profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveProfile = async (updatedData: WardenProfileData) => {
        try {
            const payload = {
                name: updatedData.fullName,
                gender: updatedData.gender,
                dob: updatedData.dob,
                phone: updatedData.mobile,
                alternate_phone: updatedData.alternateMobile,
                address: updatedData.address,
                email: updatedData.email,
                profile_completed: true
            };

            // Using the correct endpoint: PATCH /warden/profile/:userId
            const response = await apiClient.patch(`/warden/profile/${user?.id}`, payload);
            if (response.data.success) {
                setIsEditModalOpen(false);
                setProfileData(updatedData);
                alert('Profile updated successfully!');
            }
        } catch (error: any) {
            console.error('Error updating profile:', error);
            alert(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const handlePasswordChange = async (passwordData: PasswordData) => {
        if (passwordData.new !== passwordData.confirm) {
            alert('New passwords do not match');
            return;
        }

        try {
            const response = await apiClient.post('/warden/change-password', {
                oldPassword: passwordData.current,
                newPassword: passwordData.new
            });

            if (response.data.success) {
                setIsPasswordDialogOpen(false);
                alert('Password changed successfully!');
            }
        } catch (error: any) {
            console.error('Error changing password:', error);
            alert(error.response?.data?.message || 'Failed to change password');
        }
    };

    const handleNotificationToggle = async (type: keyof typeof notifications, checked: boolean) => {
        const updatedNotifications = { ...notifications, [type]: checked };
        setNotifications(updatedNotifications);

        try {
            // Using the specific endpoint provided: PATCH /warden/profile/:userId/notifications
            await apiClient.patch(`/warden/profile/${user?.id}/notifications`, {
                emergency_alerts: updatedNotifications.emergency,
                email_notifications: updatedNotifications.email
            });
        } catch (error) {
            console.error('Error updating notification preferences:', error);
            setNotifications(notifications);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 sm:px-8 py-6">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:justify-between gap-6 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                        <div>
                            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-1">
                                <h1 className="text-xl sm:text-2xl font-bold">{profileData.fullName || 'User Profile'}</h1>
                                <div className="flex gap-2">
                                    <span className="bg-green-500 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full">
                                        Warden
                                    </span>
                                    <span className="bg-white/20 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full">
                                        Active
                                    </span>
                                </div>
                            </div>
                            <p className="text-blue-100 text-sm sm:text-base">{profileData.hostel_name} • {profileData.employeeId}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
                        onClick={() => setIsPasswordDialogOpen(true)}
                    >
                        <Lock className="w-4 h-4 mr-2" />
                        Change Password
                    </Button>
                </div>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center p-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-2 text-gray-600">Loading profile...</span>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                {/* Personal & Contact Information */}
                <Card className="mb-6">
                    <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                            <span className="text-blue-600">👤</span>
                            Personal & Contact Information
                        </CardTitle>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditModalOpen(true)}
                            className="w-full sm:w-auto"
                        >
                            Edit Profile
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-1">
                                <Label className="text-gray-500 text-sm">Full Name</Label>
                                <p className="font-medium">{profileData.fullName || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-500 text-sm">Employee ID</Label>
                                <p className="font-medium">{profileData.employeeId || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-500 text-sm">Gender</Label>
                                <p className="font-medium">{profileData.gender || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-500 text-sm">Date of Birth</Label>
                                <p className="font-medium">{profileData.dob || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-500 text-sm">Mobile Number</Label>
                                <p className="font-medium">{profileData.mobile || 'N/A'}</p>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-gray-500 text-sm">Alternate Mobile</Label>
                                <p className="font-medium">{profileData.alternateMobile || 'N/A'}</p>
                            </div>
                            <div className="col-span-1 sm:col-span-2 space-y-1">
                                <Label className="text-gray-500 text-sm">Email Address</Label>
                                <p className="font-medium">{profileData.email || 'N/A'}</p>
                            </div>
                            <div className="col-span-1 sm:col-span-2 space-y-1">
                                <Label className="text-gray-500 text-sm">Address</Label>
                                <p className="font-medium">{profileData.address || 'N/A'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Warden Assignment & Performance */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <span className="text-blue-600">📋</span>
                            Warden Assignment & Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold mb-4 text-gray-900">Employment Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <Label className="text-gray-500 text-sm">Employee ID</Label>
                                        <p className="mt-1 font-medium">{profileData.employeeId || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Designation</Label>
                                        <p className="mt-1 font-medium">{profileData.designation || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Date of Joining</Label>
                                        <p className="mt-1 font-medium">{profileData.dateOfJoining || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4 text-gray-900">Hostel Assignment</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                    <div>
                                        <Label className="text-gray-500 text-sm">Assigned Hostel(s)</Label>
                                        <p className="mt-1 font-medium">{profileData.hostel_name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Hostel Type</Label>
                                        <p className="mt-1 font-medium">{profileData.hostel_type || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-500 text-sm">Office Location</Label>
                                        <p className="mt-1 font-medium">{profileData.location || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-4 text-gray-900">Performance Metrics</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Card className="bg-white border-gray-100 shadow-sm">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Total Requests</p>
                                                    <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
                                                </div>
                                                <div className="p-2 bg-gray-50 rounded-lg">
                                                    <TrendingUp className="w-5 h-5 text-gray-400" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-green-50/50 border-green-100 shadow-sm">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm text-green-600 mb-1">Approval Rate</p>
                                                    <p className="text-3xl font-bold text-green-700">{stats.approvalRate}%</p>
                                                </div>
                                                <div className="p-2 bg-green-100/50 rounded-lg">
                                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm text-blue-600 mb-1">Avg Response</p>
                                                    <p className="text-3xl font-bold text-blue-700">{stats.avgResponseTime.split(' ')[0]} <span className="text-lg">{stats.avgResponseTime.split(' ')[1] || 'hrs'}</span></p>
                                                </div>
                                                <div className="p-2 bg-blue-100/50 rounded-lg">
                                                    <Clock className="w-5 h-5 text-blue-600" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card className="bg-red-50/50 border-red-100 shadow-sm">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="text-sm text-red-600 mb-1">Rejected</p>
                                                    <p className="text-3xl font-bold text-red-700">{stats.rejectedRequests}</p>
                                                </div>
                                                <div className="p-2 bg-red-100/50 rounded-lg">
                                                    <XCircle className="w-5 h-5 text-red-600" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <span className="text-blue-600">🔔</span>
                            Notification Preferences
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Emergency Alerts</Label>
                                    <p className="text-sm text-gray-500 italic">Receive immediate notifications for emergency requests</p>
                                </div>
                                <Switch
                                    checked={notifications.emergency}
                                    onCheckedChange={(checked) => handleNotificationToggle('emergency', checked)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Email Notifications</Label>
                                    <p className="text-sm text-gray-500 italic">Receive daily summaries and important updates</p>
                                </div>
                                <Switch
                                    checked={notifications.email}
                                    onCheckedChange={(checked) => handleNotificationToggle('email', checked)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Modals */}
            <EditProfileModal
                isOpen={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                profileData={profileData}
                onSave={handleSaveProfile}
            />

            <ChangePasswordModal
                isOpen={isPasswordDialogOpen}
                onOpenChange={setIsPasswordDialogOpen}
                onSave={handlePasswordChange}
            />
        </div>
    );
}
