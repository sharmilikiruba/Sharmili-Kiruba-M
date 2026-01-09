import { useRouter } from 'next/router';
import { Users, UserCheck, FileText, Activity, Shield, Home, BarChart3, Settings, Lock, FileText as AuditIcon, Layout } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();

  const stats = [
    { label: 'Total Users', value: '7', icon: Users },
    { label: 'Active Visitors', value: '1', icon: UserCheck },
    { label: "Today's Requests", value: '3', icon: FileText },
    { label: 'System Activity', value: '10', icon: Activity },
  ];

  const userStatistics = [
    { label: 'Total Students', value: '3', icon: Users },
    { label: 'Total Wardens', value: '2', icon: Shield },
    { label: 'Total Guards', value: '2', icon: Shield },
    { label: 'Active Hostels', value: '3', icon: Home },
  ];

  const recentActivities = [
    {
      title: 'Created new hostel',
      user: 'Prof. Rajesh Gupta',
      category: 'Hostel Management',
      time: '02:30 PM',
      icon: Activity,
    },
    {
      title: 'Approved visitor request',
      user: 'Dr. Suresh Kumar',
      category: 'Visitor Management',
      time: '02:00 PM',
      icon: Activity,
    },
    {
      title: 'Rejected visitor request',
      user: 'Dr. Suresh Kumar',
      category: 'Visitor Management',
      time: '01:30 AM',
      icon: Activity,
    },
    {
      title: 'Verified visitor entry',
      user: 'Ramesh Singh',
      category: 'Entry/Exit',
      time: '07:52 PM',
      icon: Activity,
    },
    {
      title: 'Updated system config...',
      user: 'Prof. Rajesh Gupta',
      category: 'Settings',
      time: '03:45 PM',
      icon: Activity,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
            H
          </div>
          <div>
            <h1 className="font-semibold text-lg">HVMS</h1>
            <p className="text-xs text-gray-400">Visitor Management</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg mb-2 transition-colors">
            <Layout className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>

          <button 
            onClick={() => router.push('/admin/user-management')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">User Management</span>
          </button>

          <button 
            onClick={() => router.push('/admin/hostel-management')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Hostel Management</span>
          </button>

          <button 
            onClick={() => router.push('/admin/system-config')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">System Config</span>
          </button>

          <button 
            onClick={() => router.push('/admin/reports')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Reports</span>
          </button>

          <button 
            onClick={() => router.push('/admin/security')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <Lock className="w-5 h-5" />
            <span className="font-medium">Security</span>
          </button>

          <button 
            onClick={() => router.push('/admin/audit-logs')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <AuditIcon className="w-5 h-5" />
            <span className="font-medium">Audit Logs</span>
          </button>
        </nav>

        <div className="p-4 text-xs text-gray-500 border-t border-gray-800">
          © 2026 University HVMS
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>/admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-300 rounded-full overflow-hidden">
                <img src="/api/placeholder/36/36" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-sm">
                <div className="font-medium">Prof. Rajesh Gupta</div>
                <div className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full inline-block">ADMIN</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
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
      </main>
    </div>
  );
}