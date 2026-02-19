"use client";
import React, { useState, useEffect } from 'react';
import { Shield, MapPin, Phone, Mail, Calendar, Edit2, Key, HelpCircle, LogOut, CheckCircle, Clock, ShieldCheck, ShieldAlert, Loader2, Camera, Lock, LogIn, Clipboard, AlertTriangle } from 'lucide-react';
import { EditProfileModal } from './EditProfileModal';
import { ChangePasswordModal } from './ChangePasswordModal';
import { ProfileData, PasswordForm } from './types';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';
import protectedService from '@/lib/protected-service';

export default function GuardProfile() {
    const { user } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isStatsLoading, setIsStatsLoading] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [verificationMessage, setVerificationMessage] = useState('');

    // Profile data
    const [profileData, setProfileData] = useState<ProfileData>({
        fullName: '',
        employeeId: '',
        gender: '',
        dateOfBirth: '',
        mobileNumber: '',
        alternateMobile: '',
        email: '',
        address: '',
        securityAgency: '',
        dateOfJoining: '',
        assignedHostel: '',
        assignedGate: '',
        shiftType: '',
        shiftStart: '',
        shiftEnd: '',
    });

    const [stats, setStats] = useState({
        entriesHandled: 0,
        exitsHandled: 0,
        manualEntries: 0,
        overstayAlerts: 0
    });

    useEffect(() => {
        if (user?.id) {
            fetchProfile();
            fetchStats();
        }
    }, [user]);

    const fetchProfile = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get(`/guard/profile/${user?.id}`);
            if (response.data.success) {
                const guard = response.data.data;
                setProfileData({
                    fullName: guard.name || '',
                    employeeId: guard.emp_id || '',
                    gender: guard.gender || '',
                    dateOfBirth: guard.dob ? new Date(guard.dob).toISOString().split('T')[0] : '',
                    mobileNumber: guard.phone || '',
                    alternateMobile: guard.alternate_phone || '',
                    email: guard.user?.email || user?.email || '',
                    address: guard.address || '',
                    securityAgency: guard.security_agency || '',
                    dateOfJoining: guard.joining_date ? new Date(guard.joining_date).toISOString().split('T')[0] : '',
                    assignedHostel: guard.assignedGate?.hostel?.name || 'Not assigned',
                    assignedGate: guard.assignedGate?.gate_name || 'Not assigned',
                    shiftType: guard.shift_type || '',
                    shiftStart: guard.shift_start_time || '',
                    shiftEnd: guard.shift_end_time || '',
                });
            }
        } catch (error) {
            console.error('Error fetching guard profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            setIsStatsLoading(true);
            const response = await apiClient.get('/guard/stats');
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching guard stats:', error);
        } finally {
            setIsStatsLoading(false);
        }
    };

    const activityMetrics = [
        { label: 'Entries Handled', value: stats.entriesHandled.toString(), icon: LogIn, color: 'bg-green-50', iconColor: 'text-green-600' },
        { label: 'Exits Handled', value: stats.exitsHandled.toString(), icon: LogOut, color: 'bg-blue-50', iconColor: 'text-blue-600' },
        { label: 'Manual Entries', value: stats.manualEntries.toString(), icon: Clipboard, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
        { label: 'Overstay Alerts', value: stats.overstayAlerts.toString(), icon: AlertTriangle, color: 'bg-red-50', iconColor: 'text-red-600' },
    ];

    const handleEditSave = async (updatedData: ProfileData) => {
        try {
            const payload = {
                name: updatedData.fullName,
                gender: updatedData.gender,
                dob: updatedData.dateOfBirth,
                phone: updatedData.mobileNumber,
                email: updatedData.email,
                alternate_phone: updatedData.alternateMobile,
                address: updatedData.address,
            };

            const response = await apiClient.put(`/guard/profile/${user?.id}`, payload);
            if (response.data.success) {
                setIsEditModalOpen(false);
                alert('Profile updated successfully!');
                fetchProfile();
            }
        } catch (error: any) {
            console.error('Error updating guard profile:', error);
            alert(error.response?.data?.message || 'Failed to update profile');
        }
    };

    const handlePasswordSave = async (data: PasswordForm) => {
        if (data.newPassword !== data.confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        try {
            const response = await apiClient.post('/guard/change-password', {
                oldPassword: data.currentPassword,
                newPassword: data.newPassword
            });

            if (response.data.success) {
                setIsPasswordModalOpen(false);
                alert('Password changed successfully!');
            }
        } catch (error: any) {
            console.error('Error changing password:', error);
            alert(error.response?.data?.message || 'Failed to change password');
        }
    };

    const handleVerifyAccess = async () => {
        try {
            setVerificationStatus('loading');
            const response = await protectedService.checkGuardAccess();
            if (response.success) {
                setVerificationStatus('success');
                setVerificationMessage(response.message);
            }
        } catch (error: any) {
            setVerificationStatus('error');
            setVerificationMessage(error.response?.data?.message || 'Access Denied');
        }
    };

    return (
        <div className="p-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-xl px-8 py-12 relative">
                <div className="flex items-end gap-6">
                    <div className="relative">
                        <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                            <Shield className="w-16 h-16 text-gray-200" />
                        </div>
                        <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                            <Camera className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                    <div className="flex-1 text-white pb-4">
                        <h1 className="text-3xl font-bold">{profileData.fullName || 'Guard Profile'}</h1>
                        <p className="text-green-100 text-sm mt-2 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {profileData.employeeId}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors mb-4"
                    >
                        <Lock className="w-5 h-5" />
                        Change Password
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="flex items-center justify-center p-12 bg-white border border-gray-200 border-t-0 rounded-b-xl shadow-sm mb-6">
                    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
                    <span className="ml-2 text-gray-600">Loading profile...</span>
                </div>
            )}

            {/* Personal & Contact Information */}
            <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Personal & Contact Information
                    </h2>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Full Name</p>
                        <p className="font-semibold text-gray-900">{profileData.fullName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                        <p className="font-semibold text-gray-900">{profileData.employeeId}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Gender</p>
                        <p className="font-semibold text-gray-900">{profileData.gender}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                        <p className="font-semibold text-gray-900">{profileData.dateOfBirth}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Mobile Number</p>
                        <p className="font-semibold text-gray-900">
                            {profileData.mobileNumber}
                            <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Verified</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Alternate Mobile</p>
                        <p className="font-semibold text-gray-900">{profileData.alternateMobile}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Email Address</p>
                        <p className="font-semibold text-gray-900">{profileData.email}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-600 mb-1">Address</p>
                        <p className="font-semibold text-gray-900">{profileData.address}</p>
                    </div>
                </div>
            </div>

            {/* Guard Assignment & Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                    Guard Assignment & Activity
                </h2>

                {/* Employment Information */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Employment Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                            <p className="font-semibold text-gray-900">{profileData.employeeId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Security Agency</p>
                            <p className="font-semibold text-gray-900">{profileData.securityAgency}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Date of Joining</p>
                            <p className="font-semibold text-gray-900">{profileData.dateOfJoining}</p>
                        </div>
                    </div>
                </div>

                {/* Gate & Shift Assignment */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Gate & Shift Assignment</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Assigned Hostel</p>
                                <p className="font-semibold text-gray-900">{profileData.assignedHostel}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <MapPin className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Assigned Gate(s)</p>
                                <p className="font-semibold text-gray-900">{profileData.assignedGate}</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6 mt-4">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Shift Type</p>
                            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                {profileData.shiftType}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Shift Start Time</p>
                                <p className="font-semibold text-gray-900">{profileData.shiftStart}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Shift End Time</p>
                                <p className="font-semibold text-gray-900">{profileData.shiftEnd}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Metrics */}
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Activity Metrics (Today)</h3>
                    <div className="grid grid-cols-4 gap-4">
                        {activityMetrics.map((metric, index) => (
                            <div key={index} className={`${metric.color} rounded-xl p-6`}>
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-medium text-gray-700">{metric.label}</p>
                                    <div className={`p-2 ${metric.color} rounded-lg`}>
                                        <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
                                    </div>
                                </div>
                                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Role Verification section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        Access Verification
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Verify your security personnel access clearances with the central server.
                    </p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleVerifyAccess}
                            disabled={verificationStatus === 'loading'}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            {verificationStatus === 'loading' ? 'Verifying...' : 'Verify Guard Access'}
                        </button>

                        {verificationStatus === 'success' && (
                            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg text-sm">
                                <ShieldCheck className="w-4 h-4" />
                                {verificationMessage}
                            </div>
                        )}

                        {verificationStatus === 'error' && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg text-sm">
                                <ShieldAlert className="w-4 h-4" />
                                {verificationMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                data={profileData}
                onSave={handleEditSave}
            />

            <ChangePasswordModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                onSave={handlePasswordSave}
            />
        </div>
    );
}
