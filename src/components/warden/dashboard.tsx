'use client';

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  CheckCircle,
  Users,
  BarChart3,
  Bell,
  FileText,
  UserCheck,
  XCircle,
  Calendar,
  Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';

export default function WardenDashboard() {
  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [wardenName, setWardenName] = useState<string>('');
  const [stats, setStats] = useState([
    {
      title: 'Pending Requests',
      count: 0,
      icon: ClipboardList,
      color: 'bg-yellow-100',
      iconColor: 'bg-yellow-500'
    },
    {
      title: 'Approved Today',
      count: 0,
      icon: CheckCircle,
      color: 'bg-green-100',
      iconColor: 'bg-green-500'
    },
    {
      title: 'Rejected Today',
      count: 0,
      icon: XCircle,
      color: 'bg-red-100',
      iconColor: 'bg-red-500'
    },
    {
      title: 'Active Visitors',
      count: 0,
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'bg-blue-500'
    },
    {
      title: 'Monthly Visitors',
      count: 0,
      icon: Calendar,
      color: 'bg-white',
      iconColor: 'bg-gray-200',
      subtext: 'This month'
    }
  ]);

  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [activeVisitors, setActiveVisitors] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // 1. Get Warden Profile for Hostel ID
        const profileRes = await apiClient.get(`/warden/profile/${user?.id}`);
        if (profileRes.data.success) {
          const profile = profileRes.data.data.profile;
          setWardenName(profile.name);
          const hostelId = profile.hostel_id;

          if (hostelId) {
            // 2. Fetch Aggregated Dashboard Data
            const res = await apiClient.get(`/warden/dashboard-data/${hostelId}`);
            if (res.data.success) {
              const data = res.data.data;
              setDashboardData(data);

              // Update Stats Cards
              setStats(prev => [
                { ...prev[0], count: data.stats.pending || 0 },
                { ...prev[1], count: data.stats.approvedToday || 0 },
                { ...prev[2], count: data.stats.rejectedToday || 0 },
                { ...prev[3], count: data.stats.active || 0 },
                { ...prev[4], count: data.stats.monthlyTotal || 0 },
              ]);

              // Update Pending Requests List
              setPendingRequests(data.pendingRequests.map((r: any) => ({
                id: r.visitor_id,
                visitorName: r.name,
                studentName: r.student?.fullName || 'N/A',
                room: r.student?.room_no || 'N/A',
                avatar: r.name.charAt(0).toUpperCase(),
                priority: r.visit_purpose?.toLowerCase().includes('urgent') ? 'Urgent' : 'Normal',
                date: new Date(r.visit_date).toLocaleDateString()
              })));

              // Update Active Visitors List
              setActiveVisitors(data.activeVisitors.map((v: any) => ({
                id: v.visitor_id,
                visitorName: v.name,
                visitingStudent: v.student?.fullName || 'N/A',
                room: v.student?.room_no || 'N/A',
                since: v.logs && v.logs.length > 0 ? `${v.logs[0].entry_time} (${new Date(v.logs[0].entry_date).toLocaleDateString()})` : '-',
                status: 'In Premise'
              })));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching warden dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchDashboardData();
    }
  }, [user]);

  const SkeletonCard = () => (
    <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
          <div className="h-8 bg-gray-300 rounded w-16 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
        <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );

  const SkeletonRow = () => (
    <div className="p-6 border-b border-gray-100 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-24"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="h-6 bg-gray-200 rounded-full w-20 mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 sm:gap-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Welcome Back!
          </h2>
          {isLoading ? (
            <div className="flex flex-col gap-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          ) : (
            <div className="flex flex-col mb-4">
              <p className="text-gray-700 font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-blue-600">{wardenName}</span>
              </p>
              <p className="text-gray-700 font-semibold flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                Assigned to <span className="text-blue-600">{dashboardData?.hostelName || 'N/A'}</span>
              </p>
            </div>
          )}
          <p className="text-gray-500 text-sm font-medium">Manage your daily activities and visitor requests</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          stats.map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-700 text-sm font-semibold mb-2">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900 tracking-tight">{stat.count}</p>
                  {stat.subtext && (
                    <p className="text-xs text-gray-500 font-medium mt-1">{stat.subtext}</p>
                  )}
                </div>
                <div className={`${stat.iconColor} p-3 rounded-xl shadow-inner`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Pending Requests */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Pending Requests</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">Require your immediate attention</p>
            </div>
            <button
              onClick={() => router.push('/Warden/Pending_Request')}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 font-bold text-sm transition-colors ring-1 ring-blue-100 hover:ring-blue-200">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <div key={request.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        <span className="text-white font-bold text-lg">{request.avatar}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-0.5">{request.visitorName}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <span>{request.studentName}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>Room {request.room}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold mb-2 shadow-sm ${request.priority === 'Urgent' ? 'bg-red-50 text-red-600 ring-1 ring-red-100' : 'bg-gray-50 text-gray-600 ring-1 ring-gray-100'
                        }`}>
                        {request.priority.toUpperCase()}
                      </span>
                      <p className="flex items-center justify-end gap-1 text-xs text-gray-400 font-bold">
                        <Calendar className="w-3 h-3" />
                        {request.date}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-400 font-bold">All caught up! No pending requests.</p>
              </div>
            )}
          </div>
        </div>

        {/* Active Visitors */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Active Visitors</h3>
              <p className="text-sm text-gray-500 font-medium mt-1">Currently within the premises</p>
            </div>
            <button
              onClick={() => router.push('/Warden/Active_Visitors')}
              className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 font-bold text-sm transition-colors ring-1 ring-emerald-100 hover:ring-emerald-200">
              View All
            </button>
          </div>
          <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : activeVisitors.length > 0 ? (
              activeVisitors.map((visitor) => (
                <div key={visitor.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                        {visitor.visitorName}
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                      </h4>
                      <p className="text-sm text-gray-500 font-medium mb-3">
                        Visiting <span className="text-gray-700 font-bold">{visitor.visitingStudent}</span> • Room {visitor.room}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded">
                          <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
                          Checked-in: {visitor.since}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-black shadow-lg shadow-emerald-200 uppercase tracking-wider">
                        {visitor.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-400 font-bold">No visitors currently on premise.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
