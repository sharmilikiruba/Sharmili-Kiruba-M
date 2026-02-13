"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Clock, LogOut, Users } from 'lucide-react';

export default function ActiveVisitors() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock active visitors data
  const activeVisitors = [
    {
      id: 0,
      name: '',
      relation: '',
      student: '',
      room: '',
      entryTime: '',
      duration: '',
      status: '',
    },
  ];

  const filteredVisitors = activeVisitors.filter(visitor =>
    visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
    visitor.room.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExit = (visitorId: number) => {
    // In real app, this would initiate exit process
    router.push('/Guard/Scan-Exit');
  };

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => router.push('/Guard/guard_dashboard')}
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
  );
}