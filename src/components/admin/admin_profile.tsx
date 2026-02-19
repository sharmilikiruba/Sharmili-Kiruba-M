'use client';

import { useState } from 'react';
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
  User,
  Shield,
  Lock,
  Pencil,
  ShieldCheck,
  ShieldAlert,
  Loader2,
} from 'lucide-react';
import protectedService from '@/lib/protected-service';

export default function AdminProfile() {
  /** ---------------- STATE ---------------- */
  const [editOpen, setEditOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    gender: '',
    mobile: '',
    altMobile: '',
    email: '',
    address: '',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');

  /** ---------------- HANDLERS ---------------- */
  const handleProfileSave = () => {
    console.log('Updated profile:', profile);
    setEditOpen(false);
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      alert('Passwords do not match');
      return;
    }
    console.log('Password changed');
    setPasswordOpen(false);
  };

  const handleVerifyAccess = async () => {
    try {
      setVerificationStatus('loading');
      const response = await protectedService.checkAdminAccess();
      if (response.success) {
        setVerificationStatus('success');
        setVerificationMessage(response.message);
      }
    } catch (error: any) {
      setVerificationStatus('error');
      setVerificationMessage(error.response?.data?.message || 'Access Denied');
    }
  };

  /** ---------------- UI ---------------- */
  return (
    <div className="p-8 space-y-6">
      {/* HEADER CARD */}
      <Card>
        <CardContent className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-sm opacity-90">
                Chief Warden & System Administrator
              </p>
              <div className="flex gap-2 mt-1">
                <Badge variant="secondary">Admin</Badge>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={() => setPasswordOpen(true)}
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
            Personal & Contact Information
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-6 text-sm">
          <Info label="Full Name" value={profile.name} />
          <Info label="Gender" value={profile.gender} />
          <Info label="Mobile Number" value={profile.mobile} />
          <Info label="Alternate Mobile" value={profile.altMobile} />
          <Info label="Email Address" value={profile.email} />
          <Info label="Address" value={profile.address} />
        </CardContent>
      </Card>

      {/* SYSTEM ACCESS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Administrative & System Access
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-6 text-sm">
          <Info label="Admin ID" value="ADM001" />
          <Info
            label="Designation"
            value="Chief Warden & System Administrator"
          />
          <Info label="Hostel" value="Hostel Administration" />
          <Info label="Date of Assignment" value="" />
          <Info label="Institution" value="" />
          <Info label="Office Location" value="" />
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
              value={profile.name}
              onChange={(v) => setProfile({ ...profile, name: v })}
            />
            <Field
              label="Mobile"
              value={profile.mobile}
              onChange={(v) => setProfile({ ...profile, mobile: v })}
            />
            <Field
              label="Alternate Mobile"
              value={profile.altMobile}
              onChange={(v) =>
                setProfile({ ...profile, altMobile: v })
              }
            />
            <Field
              label="Address"
              value={profile.address}
              onChange={(v) =>
                setProfile({ ...profile, address: v })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProfileSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---------------- CHANGE PASSWORD DIALOG ---------------- */}
      <Dialog open={passwordOpen} onOpenChange={setPasswordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <PasswordField
              label="Current Password"
              value={passwords.current}
              onChange={(v) =>
                setPasswords({ ...passwords, current: v })
              }
            />
            <PasswordField
              label="New Password"
              value={passwords.new}
              onChange={(v) =>
                setPasswords({ ...passwords, new: v })
              }
            />
            <PasswordField
              label="Confirm Password"
              value={passwords.confirm}
              onChange={(v) =>
                setPasswords({ ...passwords, confirm: v })
              }
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPasswordOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ACCESS VERIFICATION section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600" />
            System Privilege Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500">
            Confirm your administrative privileges with the backend security core.
          </p>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleVerifyAccess}
              disabled={verificationStatus === 'loading'}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {verificationStatus === 'loading' && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Verify Admin Access
            </Button>

            {verificationStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg text-sm font-medium">
                <ShieldCheck className="w-4 h-4" />
                {verificationMessage}
              </div>
            )}

            {verificationStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg text-sm font-medium">
                <ShieldAlert className="w-4 h-4" />
                {verificationMessage}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function Field({
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
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
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
