'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Shield,
  Lock,
  Pencil,
  Loader2,
  Calendar,
  Briefcase,
} from 'lucide-react';
import apiClient from '@/lib/api-client';

interface AdminProfile {
  name: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
  role: string;
  designation: string;
  dob: string;
  created_at?: string;
}

export default function AdminProfile() {
  /** ---------------- STATE ---------------- */
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [profile, setProfile] = useState<AdminProfile>({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    address: '',
    role: 'admin',
    designation: '',
    dob: '',
  });

  const [editProfile, setEditProfile] = useState<AdminProfile>({ ...profile });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  /** ---------------- FETCH PROFILE ON MOUNT ---------------- */
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/admin/profile');
      if (response.data.success) {
        const data = response.data.data;
        const mapped: AdminProfile = {
          name: data.name || data.fullName || (data.user && data.user.name) || '',
          email: data.email || (data.user && data.user.email) || '',
          mobile: data.mobile || data.phone || (data.user && data.user.phone) || '',
          gender: data.gender || '',
          address: data.address || '',
          role: data.role || (data.user && data.user.role) || 'admin',
          designation: data.designation || '',
          dob: data.dob || '',
          created_at: data.created_at || (data.user && data.user.created_at),
        };
        setProfile(mapped);
        setEditProfile(mapped);
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /** ---------------- HANDLERS ---------------- */
  const handleEditOpen = () => {
    setEditProfile({ ...profile });
    setEditOpen(true);
  };

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
        setProfile(editProfile);
        setEditOpen(false);
        fetchProfile(); // Re-fetch to confirm sync
      }
    } catch (error: any) {
      console.error('Error updating admin profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSavingProfile(false);
    }
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
      const response = await apiClient.put('/admin/change-password', {
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      if (response.data.success) {
        setPasswordOpen(false);
        setPasswords({ current: '', new: '', confirm: '' });
        alert('Password changed successfully!');
      }
    } catch (error: any) {
      console.error('Error changing password:', error);
      alert(error.response?.data?.message || 'Failed to change password');
    } finally {
      setIsSavingPassword(false);
    }
  };

  /** ---------------- UI ---------------- */
  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* HEADER CARD */}
      <Card>
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">{profile.name || 'Administrator'}</h2>
              <p className="text-sm opacity-90">{profile.designation || 'System Administrator'}</p>
              <div className="flex justify-center md:justify-start gap-2 mt-2">
                <Badge variant="secondary">Admin</Badge>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            className="w-full md:w-auto"
            onClick={() => {
              setPasswords({ current: '', new: '', confirm: '' });
              setPasswordOpen(true);
            }}
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
        </CardContent>
      </Card>

      {/* PERSONAL INFO */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal &amp; Contact Information
          </CardTitle>
          <Button size="sm" variant="outline" onClick={handleEditOpen}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
          <Info label="Full Name" value={profile.name} />
          <Info label="Gender" value={profile.gender === 'M' ? 'Male' : profile.gender === 'F' ? 'Female' : profile.gender || '—'} />
          <Info label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString() : '—'} />
          <Info label="Mobile Number" value={profile.mobile} />
          <Info label="Email Address" value={profile.email} />
          <Info label="Address" value={profile.address} />
          {profile.created_at && (
            <Info
              label="Account Created"
              value={new Date(profile.created_at).toLocaleDateString()}
            />
          )}
        </CardContent>
      </Card>

      {/* SYSTEM ACCESS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Administrative &amp; System Access
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <Info label="Role" value={profile.role} />
          <Info label="Designation" value={profile.designation || 'System Administrator'} />
        </CardContent>
      </Card>

      {/* ---------------- EDIT PROFILE DIALOG ---------------- */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
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
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProfileSave} disabled={isSavingProfile}>
              {isSavingProfile && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------------- CHANGE PASSWORD DIALOG ---------------- */}
      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
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
              onClick={() => setPasswordOpen(false)}
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
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value || '—'}</p>
    </div>
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
