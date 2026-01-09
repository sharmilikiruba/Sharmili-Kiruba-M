import { useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Search, Clock, LogOut, Users } from 'lucide-react';

export default function ActiveVisitors() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock active visitors data
  const activeVisitors = [
    {
      id: 1,
      name: 'Dr. Mohan Kumar',
      relation: 'Father',
      student: 'Amit Kumar',
      room: 'C-310',
      entryTime: '01:40 PM',
      duration: '91h 48m',
      status: 'Overstay',
    },
  ];

  const filteredVisitors = activeVisitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExit = (visitorId: number) => {
    // In real app, this would initiate exit process
    router.push('/scan-exit');
  };

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
          <button 
            onClick={() => router.push('/guard')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
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
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Scan Entry</span>
          </button>

          <button 
            onClick={() => router.push('/scan-exit')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="font-medium">Scan Exit</span>
          </button>

          <button 
            onClick={() => router.push('/walk-in-registration')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg mb-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span className="font-medium">Walk-in Registration</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
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
            <span>/guard/active</span>
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

        {/* Content */}
        <div className="p-8">
          <div className="mb-6 flex items-center gap-4">
            <button 
              onClick={() => router.push('/guard')}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Active Visitors</h1>
              <p className="text-gray-600 mt-1">Currently inside the hostel premises</p>
            </div>
          </div>

          {/* Active Visitors Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {/* Card Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-gray-700" />
                  <h2 className="text-xl font-bold text-gray-900">
                    {filteredVisitors.length} Active Visitors
                  </h2>
                </div>
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search visitors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
                  />
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                <div className="col-span-2">Visitor</div>
                <div className="col-span-2">Student</div>
                <div className="col-span-1">Room</div>
                <div className="col-span-2">Entry Time</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Action</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((visitor) => (
                  <div key={visitor.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{visitor.name}</div>
                          <div className="text-sm text-gray-600">{visitor.relation}</div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium text-gray-900">{visitor.student}</div>
                      </div>
                      <div className="col-span-1">
                        <div className="font-medium text-gray-900">{visitor.room}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium text-gray-900">{visitor.entryTime}</div>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{visitor.duration}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800">
                          {visitor.status}
                        </span>
                      </div>
                      <div className="col-span-1">
                        <button
                          onClick={() => handleExit(visitor.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Exit
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No active visitors found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}