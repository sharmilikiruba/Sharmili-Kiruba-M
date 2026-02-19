'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Lock, CheckCircle2, Clock, XCircle, TrendingUp, Bell, Mail, MessageSquare, Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';
import protectedService from '@/lib/protected-service';

export default function WardenProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [profileData, setProfileData] = useState({
    fullName: '',
    employeeId: '',
    gender: '',
    dob: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    address: '',
    designation: 'Warden',
    department: '',
    dateOfJoining: '',
    hostel: '',
    hostelType: '',
    officeLocation: ''
  });

  const [stats, setStats] = useState({
    totalRequests: 0,
    approvalRate: 0,
    avgResponseTime: '0 hrs',
    rejectedRequests: 0
  });

  const [notifications, setNotifications] = useState({
    emergency: true,
    sms: false,
    email: true
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
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
          mobile: profile.phone || '',
          alternateMobile: profile.alternate_phone || '',
          email: profile.user?.email || user?.email || '',
          address: profile.address || '',
          designation: 'Warden',
          department: profile.hostel?.department || '',
          dateOfJoining: profile.joining_date ? new Date(profile.joining_date).toISOString().split('T')[0] : '',
          hostel: profile.hostel?.name || 'Not Assigned',
          hostelType: profile.hostel?.type || '',
          officeLocation: profile.hostel?.location || ''
        });

        if (wardenStats) {
          setStats(wardenStats);
        }

        if (profile.notification_preferences) {
          setNotifications({
            emergency: profile.notification_preferences.emergency_alerts ?? true,
            sms: profile.notification_preferences.sms_notifications ?? false,
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: profileData.fullName,
        gender: profileData.gender,
        dob: profileData.dob,
        phone: profileData.mobile,
        email: profileData.email,
        alternate_phone: profileData.alternateMobile,
        address: profileData.address,
        profile_completed: true
      };

      const response = await apiClient.patch(`/warden/profile/${user?.id}`, payload);
      if (response.data.success) {
        setIsEditing(false);
        alert('Profile updated successfully!');
        // Refresh profile to get updated user info if changed
        fetchProfile();
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handlePasswordChange = async () => {
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
        setPasswordData({ current: '', new: '', confirm: '' });
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
      await apiClient.patch(`/warden/profile/${user?.id}/notifications`, {
        emergency_alerts: updatedNotifications.emergency,
        sms_notifications: updatedNotifications.sms,
        email_notifications: updatedNotifications.email
      });
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      // Revert on failure
      setNotifications(notifications);
    }
  };

  const handleVerifyAccess = async () => {
    try {
      setVerificationStatus('loading');
      const response = await protectedService.checkWardenAccess();
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-blue-500 overflow-hidden flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20">
                {profileData.fullName ? profileData.fullName.charAt(0) : 'U'}
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{profileData.fullName || 'User Profile'}</h1>
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  Warden
                </span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="text-blue-100">{profileData.hostel} • {profileData.employeeId}</p>
              <p className="text-sm text-blue-200 mt-1">
                Connected to VMS
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-white text-blue-600 hover:bg-blue-50"
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

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Personal & Contact Information */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <span className="text-blue-600">👤</span>
              Personal & Contact Information
            </CardTitle>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : handleEditToggle}
            >
              {isEditing ? 'Save Changes' : 'Edit'}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-600">Full Name</Label>
                <Input
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-600">Employee ID</Label>
                <Input
                  value={profileData.employeeId}
                  disabled
                  className="mt-1 bg-gray-50"
                />
              </div>
              <div>
                <Label className="text-gray-600">Gender</Label>
                <Input
                  value={profileData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-600">Date of Birth</Label>
                <Input
                  type="date"
                  value={profileData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-600">Mobile Number</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={profileData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    disabled={!isEditing}
                  />
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded self-center">
                    Verified
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Alternate Mobile</Label>
                <Input
                  value={profileData.alternateMobile}
                  onChange={(e) => handleInputChange('alternateMobile', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-gray-600">Email Address</Label>
                <Input
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-gray-600">Address</Label>
                <Input
                  value={profileData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  className="mt-1"
                />
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
                <h3 className="font-semibold mb-4">Employment Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-600">Employee ID</Label>
                    <p className="mt-1 font-medium">{profileData.employeeId}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Designation</Label>
                    <p className="mt-1 font-medium">{profileData.designation}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Department</Label>
                    <p className="mt-1 font-medium">{profileData.department}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Date of Joining</Label>
                    <p className="mt-1 font-medium">{profileData.dateOfJoining}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Hostel Assignment</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label className="text-gray-600">Assigned Hostel(s)</Label>
                    <p className="mt-1 font-medium">{profileData.hostel}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Hostel Type</Label>
                    <p className="mt-1 font-medium">{profileData.hostelType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Office Location</Label>
                    <p className="mt-1 font-medium">{profileData.officeLocation}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-4 gap-4">
                  <Card className="bg-white border-gray-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-gray-600">Total Requests</p>
                          <p className="text-3xl font-bold mt-1">{stats.totalRequests}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-gray-600">Approval Rate</p>
                          <p className="text-3xl font-bold mt-1">{stats.approvalRate}%</p>
                        </div>
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-gray-600">Avg Response Time</p>
                          <p className="text-3xl font-bold mt-1">{stats.avgResponseTime.split(' ')[0]} <span className="text-base">{stats.avgResponseTime.split(' ')[1] || 'hrs'}</span></p>
                        </div>
                        <Clock className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm text-gray-600">Rejected Requests</p>
                          <p className="text-3xl font-bold mt-1">{stats.rejectedRequests}</p>
                        </div>
                        <XCircle className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium">Emergency Alerts</p>
                <p className="text-sm text-gray-600">Receive instant notifications for emergency visit requests</p>
              </div>
              <Switch
                checked={notifications.emergency}
                onCheckedChange={(checked: boolean) => handleNotificationToggle('emergency', checked)}
              />
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-600">Get SMS alerts for pending requests and approvals</p>
                </div>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked: boolean) => handleNotificationToggle('sms', checked)}
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive email summaries and daily reports</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked: boolean) => handleNotificationToggle('email', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
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
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Verification section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          Access Verification
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Verify your high-level access permissions with the backend server.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={handleVerifyAccess}
            disabled={verificationStatus === 'loading'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {verificationStatus === 'loading' ? 'Verifying...' : 'Verify Role Access'}
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
  );
}