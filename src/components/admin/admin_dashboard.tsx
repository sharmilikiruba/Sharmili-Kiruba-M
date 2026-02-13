"use client"
import { useRouter } from 'next/navigation';
import { Users, UserCheck, FileText, Activity, Shield, Home, BarChart3, Settings, Lock, FileText as AuditIcon, Layout } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const stats = [
    { label: 'Total Users', value: '0', icon: Users },
    
  ];

  const userStatistics = [
    { label: 'Total Students', value: '0', icon: Users },
    { label: 'Total Wardens', value: '0', icon: Shield },
    { label: 'Total Guards', value: '0', icon: Shield },
    { label: 'Active Hostels', value: '0', icon: Home },
  ];

  const recentActivities = [
    {
      title:'',
      user: '',
      category: '',
      time: '',
      icon: Activity
    },
  
  
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Prof. Rajesh Gupta</h1>
        <p className="text-gray-600 mt-1">Hostel Visitor Management System Administration</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">User Statistics</h2>
          <div className="space-y-4">
            {userStatistics.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <stat.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">{stat.label}</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg mt-1">
                  <activity.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                  <p className="text-sm text-gray-600">
                    {activity.user} • {activity.category}
                  </p>
                </div>
                <span className="text-sm text-gray-500 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}