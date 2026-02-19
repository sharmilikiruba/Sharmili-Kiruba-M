import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, UserCheck, FileText, Activity, Shield, Home, BarChart3, Settings, Lock, FileText as AuditIcon, Layout, Loader2 } from 'lucide-react';
import apiClient from '@/lib/api-client';

interface DashboardStats {
  totalUsers: number;
  students: number;
  wardens: number;
  guards: number;
  activeHostels: number;
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
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsRes, activitiesRes] = await Promise.all([
          apiClient.get('/admin/dashboard-stats'),
          apiClient.get('/admin/recent-activities')
        ]);

        if (statsRes.data.success) {
          setStats(statsRes.data.data);
        }
        if (activitiesRes.data.success) {
          setActivities(activitiesRes.data.data);
        }
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsDisplay = [
    { label: 'Total Users', value: stats?.totalUsers || 0, icon: Users },
  ];

  const userStatistics = [
    { label: 'Total Students', value: stats?.students || 0, icon: Users },
    { label: 'Total Wardens', value: stats?.wardens || 0, icon: Shield },
    { label: 'Total Guards', value: stats?.guards || 0, icon: Shield },
    { label: 'Active Hostels', value: stats?.activeHostels || 0, icon: Home },
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
        <p className="text-gray-600 mt-1">Hostel Visitor Management System Administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          Array(1).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
          statsDisplay.map((stat, index) => (
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
        {/* User Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">User Statistics</h2>
          <div className="space-y-4">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-16 bg-gray-50 rounded-lg animate-pulse"></div>
              ))
            ) : (
              userStatistics.map((stat, index) => (
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

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-20 bg-gray-50 rounded-lg animate-pulse"></div>
              ))
            ) : activities.length > 0 ? (
              activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 bg-gray-100 rounded-lg mt-1">
                    <Activity className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1">{activity.description}</h3>
                    <p className="text-sm text-gray-600">
                      {activity.user} • {activity.type}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">No recent activities</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}