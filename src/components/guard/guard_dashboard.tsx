'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Users, LogIn, LogOut, UserPlus, UserCheck } from 'lucide-react';
import apiClient from '@/lib/api-client';

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [guardName, setGuardName] = useState('');
  const [guardDetails, setGuardDetails] = useState('');
  const [stats, setStats] = useState([
    { label: 'Active Visitors', value: '0', icon: Users },
    { label: 'Entries Today', value: '0', icon: LogIn },
    { label: 'Exits Today', value: '0', icon: LogOut },
    { label: 'Pending Exits', value: '0', icon: UserCheck },
  ]);

  const quickActions = [
    { label: 'Scan Entry', icon: LogIn, route: '/Guard/Scan-Entry?mode=entry', primary: false },
    { label: 'Scan Exit', icon: LogOut, route: '/Guard/Scan-Entry?mode=exit', primary: false },
    { label: 'Walk-in Registration', icon: UserPlus, route: '/Guard/WalkIn-Registration', primary: false },
  ];

  const [recentEntries, setRecentEntries] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch both dashboard overview and specific stats in parallel
        const [dashboardRes, statsRes] = await Promise.all([
          apiClient.get('/guard/dashboard'),
          apiClient.get('/guard/stats')
        ]);

        if (dashboardRes.data.success) {
          const { guard, recentEntries: entries } = dashboardRes.data.data;
          setGuardName(guard.name);
          setGuardDetails(`${guard.gate} • ${guard.shift}`);

          setRecentEntries(
            entries.map((entry: any) => ({
              name: entry.visitorName,
              details: `Visiting: ${entry.studentName} (${entry.room})`,
              time: new Date(entry.entryTime).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
              status: entry.status,
            }))
          );
        }

        if (statsRes.data.success) {
          const dashboardStats = statsRes.data.data;
          setStats([
            { label: 'Active Visitors', value: (dashboardStats.activeVisitors || 0).toString(), icon: Users },
            { label: 'Entries Today', value: (dashboardStats.entriesToday || 0).toString(), icon: LogIn },
            { label: 'Exits Today', value: (dashboardStats.exitsToday || 0).toString(), icon: LogOut },
            { label: 'Pending Exits', value: (dashboardStats.pendingExits || 0).toString(), icon: UserCheck },
          ]);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome, {guardName || 'Guard'}
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          {guardDetails || 'Loading details...'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <span className="text-gray-500 text-[10px] sm:text-sm font-semibold uppercase tracking-wider">
                {stat.label}
              </span>
              <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 text-blue-500/40" />
            </div>
            <div className="text-2xl sm:text-4xl font-bold text-gray-900">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => router.push(action.route)}
              className={`flex items-center sm:justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all active:scale-95 ${action.primary
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
            >
              <div className={`p-2 rounded-lg ${action.primary ? 'bg-white/20' : 'bg-gray-100'}`}>
                <action.icon className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Entries */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Entries
        </h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
          {recentEntries.length > 0 ? (
            recentEntries.map((entry, index) => (
                <div key={index} className="p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/50 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {entry.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {entry.details}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {entry.status}
                  </div>
                  <div className="text-sm text-gray-600">
                    {entry.time}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-sm text-gray-500">
              No recent entries
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
