"use client";
import React, { useState, useEffect } from 'react';
import { Shield, MapPin, Phone, Mail, Calendar, Edit2, Key, HelpCircle, LogOut, CheckCircle, Clock, ShieldCheck, ShieldAlert, Loader2, Camera, Lock, LogIn, Clipboard, AlertTriangle, User } from 'lucide-react';
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
                setStats(prev => ({
                    ...prev,
                    ...response.data.data
                }));
            }
        } catch (error) {
            console.error('Error fetching guard stats:', error);
        } finally {
            setIsStatsLoading(false);
        }
    };

    const activityMetrics = [
        { label: 'Entries Handled', value: (stats?.entriesHandled ?? 0).toString(), icon: LogIn, color: 'bg-green-50', iconColor: 'text-green-600' },
        { label: 'Exits Handled', value: (stats?.exitsHandled ?? 0).toString(), icon: LogOut, color: 'bg-blue-50', iconColor: 'text-blue-600' },
        { label: 'Manual Entries', value: (stats?.manualEntries ?? 0).toString(), icon: Clipboard, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
        { label: 'Overstay Alerts', value: (stats?.overstayAlerts ?? 0).toString(), icon: AlertTriangle, color: 'bg-red-50', iconColor: 'text-red-600' },
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
        <div className="p-4 sm:p-8">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-xl px-4 sm:px-8 py-8 sm:py-12 relative">
                <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
                    <div className="relative">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-gray-200" />
                        </div>
                    </div>
                    <div className="flex-1 text-white">
                        <h1 className="text-2xl sm:text-3xl font-bold">{profileData.fullName || 'Guard Profile'}</h1>
                        <p className="text-green-100 text-xs sm:text-sm mt-1 sm:mt-2 flex items-center justify-center sm:justify-start gap-2">
                            <Clock className="w-4 h-4" />
                            {profileData.employeeId}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition-colors w-full sm:w-auto"
                    >
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Change Password</span>
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
            <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 border-t-0 p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                        <User className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                        Personal Info
                    </h2>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 text-sm sm:text-base"
                    >
                        <Edit2 className="w-4 h-4" />
                        Edit
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Full Name</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{profileData.fullName}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Employee ID</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{profileData.employeeId}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Gender</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{profileData.gender}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Date of Birth</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{profileData.dateOfBirth}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Mobile Number</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{profileData.mobileNumber}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Alternate Mobile</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{profileData.alternateMobile}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base break-all">{profileData.email}</p>
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-xs text-gray-500 mb-0.5">Address</p>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{profileData.address || '—'}</p>
                    </div>
                </div>
            </div>

            {/* Guard Assignment & Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    Assignment & Activity
                </h2>

                <div className="space-y-8">
                    {/* Employment Info */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Employment</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Employee ID</p>
                                <p className="font-semibold text-gray-900">{profileData.employeeId}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-0.5">Joining Date</p>
                                <p className="font-semibold text-gray-900">{profileData.dateOfJoining}</p>
                            </div>
                        </div>
                    </div>

                    {/* Duty Details */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Duty Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Assigned Gate</p>
                                    <p className="font-bold text-gray-900">{profileData.assignedGate}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">Shift Hours</p>
                                    <p className="font-bold text-gray-900">{profileData.shiftStart} - {profileData.shiftEnd}</p>
                                    <span className="inline-block px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-[10px] font-bold mt-1 uppercase">
                                        {profileData.shiftType}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Activity (Today)</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {activityMetrics.map((metric, index) => (
                                <div key={index} className={`${metric.color} rounded-xl p-4 sm:p-5 border border-black/5`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className={`p-1.5 ${metric.color} rounded-lg`}>
                                            <metric.icon className={`w-4 h-4 ${metric.iconColor}`} />
                                        </div>
                                    </div>
                                    <p className="text-2xl font-black text-gray-900">{metric.value}</p>
                                    <p className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase mt-1">{metric.label}</p>
                                </div>
                            ))}
                        </div>
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
