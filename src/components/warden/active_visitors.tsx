import React, { useState } from 'react';
import { LayoutDashboard, FileText, CheckCircle, Users, BarChart3, Search, Phone, Clock } from 'lucide-react';

const ActiveVisitorsPage = () => {
  const [activeMenu, setActiveMenu] = useState('active');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pending', label: 'Pending Requests', icon: FileText },
    { id: 'approved', label: 'Approved Visits', icon: CheckCircle },
    { id: 'active', label: 'Active Visitors', icon: Users },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const activeVisitors = [
    {
      id: 1,
      name: 'Dr. Mohan Kumar',
      student: 'Amit Kumar',
      room: 'Room C-310',
      duration: '43h 36m',
      status: 'Active',
      avatar: 'D'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">
              H
            </div>
            <div>
              <h1 className="text-xl font-bold">HVMS</h1>
              <p className="text-xs text-slate-400">Visitor Management</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  activeMenu === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">© 2026 University HVMS</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">/warden/active</div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              🔔
            </button>
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                DS
              </div>
              <div>
                <div className="text-sm font-semibold">Dr. Suresh Kumar</div>
                <div className="text-xs text-white bg-blue-600 px-2 py-0.5 rounded">WARDEN</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Active Visitors</h1>
              <p className="text-gray-600">1 visitors currently inside</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Currently Active</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search visitors..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    />
                  </div>
                </div>
              </div>

              {/* Visitor Cards */}
              <div className="p-6">
                {activeVisitors.map((visitor) => (
                  <div key={visitor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold flex-shrink-0">
                          {visitor.avatar}
                        </div>

                        {/* Visitor Info */}
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{visitor.name}</h3>
                            <span className="inline-flex px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                              {visitor.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            Visiting {visitor.student}
                          </p>
                          <p className="text-sm text-gray-500">
                            {visitor.room}
                          </p>

                          {/* Duration */}
                          <div className="flex items-center gap-2 mt-4 text-gray-600">
                            <Clock size={16} />
                            <span className="text-sm">Inside for {visitor.duration}</span>
                          </div>
                        </div>
                      </div>

                      {/* Call Button */}
                      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Phone size={16} />
                        <span className="text-sm font-medium">Call Student</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActiveVisitorsPage;