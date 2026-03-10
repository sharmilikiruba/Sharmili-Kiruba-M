'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import EditProfile from './edit_profile';
import ChangePassword from './change_password';

export interface AdminProfile {
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
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /** ---------------- HANDLERS ---------------- */
  const handleEditOpen = () => {
    setEditOpen(true);
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
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg gap-4 sm:gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4">
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
            className="w-full md:w-auto mt-2 md:mt-0"
            onClick={() => {
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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 sm:p-6 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <User className="w-5 h-5 text-blue-600" />
            Personal Info
          </CardTitle>
          <Button size="sm" variant="outline" onClick={handleEditOpen} className="h-8 px-3">
            <Pencil className="w-3.5 h-3.5 mr-2" />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-6 p-4 sm:p-6 pt-2 text-sm">
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
        <CardHeader className="p-4 sm:p-6 pb-2">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Shield className="w-5 h-5 text-blue-600" />
            Administrative Info
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 pt-2 text-sm">
          <Info label="Role" value={profile.role} />
          <Info label="Designation" value={profile.designation || 'System Administrator'} />
        </CardContent>
      </Card>

      <EditProfile
        open={editOpen}
        onOpenChange={setEditOpen}
        initialProfile={profile}
        onSuccess={(updatedProfile) => {
          setProfile(updatedProfile);
          setEditOpen(false);
          fetchProfile(); // Re-fetch to confirm sync
        }}
      />

      <ChangePassword
        open={passwordOpen}
        onOpenChange={setPasswordOpen}
        onSuccess={() => setPasswordOpen(false)}
      />
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
