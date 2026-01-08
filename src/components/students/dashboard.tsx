'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  ClipboardCheck,
  User,
  LogOut
} from 'lucide-react';

export default function StudentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const view = useMemo(
    () => searchParams.get('view') || 'dashboard',
    [searchParams]
  );

  // ---------------- MOCK DATA ----------------
  const studentInfo = {
    name: 'Rahul Sharma',
    roll: '21CS101',
    email: 'rahul.sharma@university.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science',
    hostel: 'Krishna Hostel',
    room: 'A-204'
  };

  const labelMap: Record<string, string> = {
    name: 'Name',
    roll: 'Roll Number',
    email: 'Email',
    phone: 'Phone',
    department: 'Department',
    hostel: 'Hostel',
    room: 'Room'
  };

  const recentRequests = [
    { name: 'Suresh Sharma', purpose: 'Family Visit', status: 'Pending', color: 'bg-yellow-500' },
    { name: 'Kiran Sharma', purpose: 'Family Visit', status: 'Approved', color: 'bg-green-500' },
    { name: 'Ramesh Sharma', purpose: 'Friend Visit', status: 'Rejected', color: 'bg-red-500' }
  ];

  const stats = [
    {
      title: 'Pending',
      count: recentRequests.filter(r => r.status === 'Pending').length,
      icon: Clock,
      bg: 'bg-yellow-100',
      iconBg: 'bg-yellow-500'
    },
    {
      title: 'Approved',
      count: recentRequests.filter(r => r.status === 'Approved').length,
      icon: CheckCircle,
      bg: 'bg-green-100',
      iconBg: 'bg-green-500'
    },
    {
      title: 'Rejected',
      count: recentRequests.filter(r => r.status === 'Rejected').length,
      icon: XCircle,
      bg: 'bg-red-100',
      iconBg: 'bg-red-500'
    },
    {
      title: 'Total',
      count: recentRequests.length,
      icon: ClipboardCheck,
      bg: 'bg-blue-100',
      iconBg: 'bg-blue-500'
    }
  ];

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    localStorage.clear();
    router.push('/login/login_page');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push('/app/student/student_dashboard')}
        >
          Student Dashboard
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/student/student_dashboard?view=profile')}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <User className="w-5 h-5" /> Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </header>

      <main className="p-8">

        {/* ================= DASHBOARD ================= */}
        {view === 'dashboard' && (
          <>
            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Welcome, {studentInfo.name}</h2>
                <p className="text-gray-600">
                  {studentInfo.hostel} • Room {studentInfo.room}
                </p>
              </div>

              <button
                onClick={() => router.push('/app/student/student_dashboard?view=new')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                New Request
              </button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {stats.map((s, i) => (
                <div key={i} className={`${s.bg} p-6 rounded-xl hover:shadow-md transition`}>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">{s.title}</p>
                      <p className="text-3xl font-bold">{s.count}</p>
                    </div>
                    <div className={`${s.iconBg} p-3 rounded-lg`}>
                      <s.icon className="text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border">
              <div className="p-6 border-b font-bold">Recent Requests</div>
              {recentRequests.map((r, i) => (
                <div key={i} className="p-6 flex justify-between border-b last:border-none">
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-sm text-gray-600">{r.purpose}</p>
                  </div>
                  <span className={`${r.color} text-white px-4 py-1 rounded-full text-xs font-semibold`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= PROFILE ================= */}
        {view === 'profile' && (
          <>
            <div className="flex justify-between mb-6">
              <h2 className="text-3xl font-bold">My Profile</h2>
              <button
                onClick={() => router.push('/app/student/student_dashboard')}
                className="px-4 py-2 border rounded-lg"
              >
                Back
              </button>
            </div>

            <div className="bg-white rounded-xl p-8 border grid md:grid-cols-2 gap-6">
              {Object.entries(studentInfo).map(([key, value]) => (
                <div key={key}>
                  <p className="text-sm text-gray-500">{labelMap[key]}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= NEW REQUEST ================= */}
        {view === 'new' && (
          <>
            <div className="flex justify-between mb-6">
              <h2 className="text-3xl font-bold">New Visitor Request</h2>
              <button
                onClick={() => router.push('/student/student_dashboard')}
                className="px-4 py-2 border rounded-lg"
              >
                Back
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl border">
              <p className="text-gray-600">Visitor request form goes here.</p>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
