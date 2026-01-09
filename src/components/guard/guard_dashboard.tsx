import { useRouter } from 'next/router';
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
    { label: 'Scan Entry', icon: LogIn, route: '/scan-entry', primary: true },
    { label: 'Scan Exit', icon: LogOut, route: '/scan-exit', primary: false },
    { label: 'Walk-in Registration', icon: UserPlus, route: '/walk-in-registration', primary: false },
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
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg mb-2 hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-medium">Dashboard</span>
          </button>

          <button 
            onClick={() => router.push('/scan-entry')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <LogIn className="w-5 h-5" />
            <span className="font-medium">Scan Entry</span>
          </button>

          <button 
            onClick={() => router.push('/scan-exit')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Scan Exit</span>
          </button>

          <button 
            onClick={() => router.push('/walk-in-registration')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span className="font-medium">Walk-in Registration</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Active Visitors</span>
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
            <span>/guard</span>
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
                <div className="font-medium">Ramesh Yadav</div>
                <div className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full inline-block">GUARD</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
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
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
                    action.primary
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
      </main>
    </div>
  );
}