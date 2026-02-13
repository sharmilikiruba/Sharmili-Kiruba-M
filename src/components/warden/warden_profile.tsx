'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Camera, Lock, CheckCircle2, Clock, XCircle, TrendingUp, Bell, Mail, MessageSquare } from 'lucide-react';

export default function WardenProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    employeeId: '',
    gender: '',
    dob: '',
    mobile: '',
    alternateMobile: '',
    email: '',
    address: '',
    designation: '',
    department: '',
    dateOfJoining: '',
    hostel: '',
    hostelType: '',
    officeLocation: ''
  });

  const [notifications, setNotifications] = useState({
    emergency: true,
    sms: true,
    email: true
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handlePasswordChange = () => {
    // Password change logic here
    setIsPasswordDialogOpen(false);
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                <img src="/api/placeholder/96/96" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{profileData.fullName || 'User Profile'}</h1>
                <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                  {profileData.designation ? profileData.designation.split(' ')[0] : 'Role'}
                </span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  Status
                </span>
              </div>
              <p className="text-blue-100">{profileData.designation}</p>
              <p className="text-sm text-blue-200 mt-1">
                Last Login: -
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
                          <p className="text-3xl font-bold mt-1">0</p>
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
                          <p className="text-3xl font-bold mt-1">0%</p>
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
                          <p className="text-3xl font-bold mt-1">0 <span className="text-base">hrs</span></p>
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
                          <p className="text-3xl font-bold mt-1">0</p>
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
                onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, emergency: checked }))}
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
                onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, sms: checked }))}
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
                onCheckedChange={(checked: boolean) => setNotifications(prev => ({ ...prev, email: checked }))}
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
    </div>
  );
}