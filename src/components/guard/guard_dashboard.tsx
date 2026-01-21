'use client';
import { useRouter } from 'next/navigation';
import { Users, LogIn, LogOut, UserPlus, UserCheck } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();

  const stats = [
    { label: 'Active Visitors', value: '1', icon: Users },
    { label: 'Entries Today', value: '1', icon: LogIn },
    { label: 'Exits Today', value: '0', icon: LogOut },
    { label: 'Pending Exits', value: '1', icon: UserCheck },
  ];

  const quickActions = [
    { label: 'Scan Entry', icon: LogIn, route: '/Guard/Scan-Entry', primary: false },
    { label: 'Walk-in Registration', icon: UserPlus, route: '/Guard/WalkIn-Registration', primary: false },
  ];

  const recentEntries = [
    {
      name: 'Kiran Sharma',
      details: 'Visiting Rahul Sharma • Room A-204',
      time: '07:45 PM',
      status: 'Exited',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Ramesh Yadav</h1>
        <p className="text-gray-600 mt-1">Main Gate • Morning Shift</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600 text-sm font-medium">{stat.label}</span>
              <stat.icon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => router.push(action.route)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${action.primary
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-600 hover:text-blue-600'
                }`}
            >
              <action.icon className="w-5 h-5" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Entries */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Entries</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {recentEntries.map((entry, index) => (
            <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{entry.name}</h3>
                  <p className="text-sm text-gray-600">{entry.details}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{entry.status}</div>
                <div className="text-sm text-gray-600">{entry.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}