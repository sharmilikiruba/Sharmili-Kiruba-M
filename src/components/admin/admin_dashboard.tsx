'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Activity, Shield, Home } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface DashboardStats {
  totalStudents: number;
  totalWardens: number;
  totalGuards: number;
  totalHostels: number;
  totalUsers: number;
}

interface ActivityItem {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  user?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/admin/dashboard/stats');
      if (response.data.success) {
        setStats(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch dashboard stats');
      }
    } catch (err: any) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.response?.data?.message || 'Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users },
  ];

  const userStatistics = [
    { label: 'Total Students', value: stats?.totalStudents || 0, icon: Users },
    { label: 'Total Wardens', value: stats?.totalWardens || 0, icon: Shield },
    { label: 'Total Guards', value: stats?.totalGuards || 0, icon: Shield },
    { label: 'Active Hostels', value: stats?.totalHostels || 0, icon: Home },
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Error Alert */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-semibold hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome</h1>
        <p className="text-gray-600 mt-1">Hostel Visitor Management System Administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          userStatistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">System Overview</h2>
          <div className="space-y-4">
            {loading ? (
              Array(1).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-gray-50 rounded-lg animate-pulse"></div>
              ))
            ) : (
              statsDisplay.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <stat.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">{stat.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
