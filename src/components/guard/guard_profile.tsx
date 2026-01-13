"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Lock, Edit, LogIn, LogOut, Clipboard, AlertTriangle, MapPin, Clock, Shield } from 'lucide-react';

export default function GuardProfile() {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  
  // Profile data
  const [profileData, setProfileData] = useState({
    fullName: 'Ramesh Yadav',
    employeeId: 'SEC2021089',
    gender: 'Male',
    dateOfBirth: '22 Jul 1985',
    mobileNumber: '+91 98765 33333',
    alternateMobile: '+91 98765 33334',
    email: 'ramesh.guard@university.edu',
    address: 'Security Quarters, Block B, University Campus',
    designation: 'Senior Security Guard',
    securityAgency: 'University Security Services',
    dateOfJoining: '15 Mar 2021',
    assignedHostel: 'Krishna Hostel',
    assignedGate: 'Main Gate',
    shiftType: 'Morning',
    shiftStart: '06:00 AM',
    shiftEnd: '02:00 PM',
  });

  const [editForm, setEditForm] = useState({ ...profileData });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const activityMetrics = [
    { label: 'Entries Handled', value: '24', icon: LogIn, color: 'bg-green-50', iconColor: 'text-green-600' },
    { label: 'Exits Handled', value: '18', icon: LogOut, color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'Manual Entries', value: '3', icon: Clipboard, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { label: 'Overstay Alerts', value: '2', icon: AlertTriangle, color: 'bg-red-50', iconColor: 'text-red-600' },
  ];

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...editForm });
    setIsEditModalOpen(false);
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }
    // In real app, send to backend
    alert('Password changed successfully!');
    setIsPasswordModalOpen(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="p-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-xl px-8 py-12 relative">
        <div className="flex items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src="/api/placeholder/128/128" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
              <Camera className="w-5 h-5 text-gray-700" />
            </button>
          </div>
          <div className="flex-1 text-white pb-4">
            <h1 className="text-3xl font-bold">{profileData.fullName}</h1>
            <p className="text-green-100 text-lg mt-1">{profileData.designation}</p>
            <p className="text-green-100 text-sm mt-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last Login: 2024-01-15 06:15:00
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
            <Edit className="w-4 h-4" />
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
              <p className="text-sm text-gray-600 mb-1">Designation</p>
              <p className="font-semibold text-gray-900">{profileData.designation}</p>
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
        <div>
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
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="text"
                    value={editForm.dateOfBirth}
                    onChange={(e) => setEditForm({...editForm, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                  <input
                    type="text"
                    value={editForm.mobileNumber}
                    onChange={(e) => setEditForm({...editForm, mobileNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Mobile</label>
                  <input
                    type="text"
                    value={editForm.alternateMobile}
                    onChange={(e) => setEditForm({...editForm, alternateMobile: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 rounded-t-xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Change Password
              </h2>
              <button 
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-2 hover:bg-blue-700 rounded-lg text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="p-6">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                    required
                    minLength={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                    required
                    minLength={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}