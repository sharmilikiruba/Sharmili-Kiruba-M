"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Clock, LogOut, Users, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/api-client';

export default function ActiveVisitors() {
  const router = useRouter();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVisitors, setActiveVisitors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchActiveVisitors = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const params = {
        userId: user.id,
        query: searchQuery
      };
      const res = await apiClient.get('/guard/active', { params });

      if (res.data.success) {
        // Map backend response to frontend structure
        // Backend returns Visitor[]
        const mappedVisitors = res.data.data.map((v: any) => ({
          id: v.visitor_id,
          name: v.name,
          relation: v.relation || 'Visitor',
          student: v.student?.fullName || 'N/A',
          room: v.student?.room_no || 'N/A',
          entryTime: v.logs?.[0]?.entry_time || '--:--',
          duration: calculateDuration(v.logs?.[0]?.entry_time),
          status: 'In Premise'
        }));
        setActiveVisitors(mappedVisitors);
      }
    } catch (error) {
      console.error('Error fetching active visitors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateDuration = (entryTime: string) => {
    if (!entryTime) return '-';
    // Simplified duration calc - in a real app, parse time string properly relative to current date/time
    return 'Now'; // Placeholder or implement actual diff logic
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchActiveVisitors();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, user]);

  const handleExit = async (visitorId: number) => {
    // In real app, this would initiate exit process
    router.push(`/Guard/Scan-Entry?mode=exit&visitorId=${visitorId}`);
  };


  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 flex items-center gap-3 sm:gap-4">
        <button
          onClick={() => router.push('/Guard/guard_dashboard')}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors bg-white shadow-sm border border-gray-100"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Active Visitors</h1>
          <p className="text-gray-500 text-sm sm:text-base mt-0.5">Currently inside the hostel premises</p>
        </div>
      </div>

      {/* Active Visitors Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Card Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {activeVisitors.length} <span className="text-gray-500 font-medium">Active</span>
              </h2>
            </div>
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, student..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Desktop Table Header */}
        <div className="hidden sm:block px-6 py-4 bg-gray-50/50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Visitor Info</div>
            <div className="col-span-3">Student & Room</div>
            <div className="col-span-2 text-center">In Time</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-right">Action</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <div className="py-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-500">Loading active visitors...</p>
            </div>
          ) : activeVisitors.length > 0 ? (
            activeVisitors.map((visitor) => (
              <div key={visitor.id} className="p-4 sm:px-6 sm:py-4 hover:bg-gray-50 transition-colors border-b last:border-0">
                {/* Desktop View */}
                <div className="hidden sm:grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold shrink-0">
                      {visitor.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 leading-tight">{visitor.name}</div>
                      <div className="text-xs text-gray-500 font-medium">{visitor.relation}</div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="font-semibold text-gray-900">{visitor.student}</div>
                    <div className="text-xs text-gray-500 font-medium">Room: {visitor.room_no}</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="font-medium text-gray-900 text-sm">{visitor.entryTime}</div>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">
                      {visitor.status}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => handleExit(visitor.id)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Exit pass
                    </button>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-lg border border-blue-100">
                        {visitor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{visitor.name}</div>
                        <div className="text-xs text-gray-500 font-semibold uppercase">{visitor.relation}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200 uppercase">
                      {visitor.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Visiting Student</p>
                      <p className="text-sm font-bold text-gray-900 leading-tight">{visitor.student}</p>
                      <p className="text-xs text-gray-500">Room {visitor.room_no}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Entry details</p>
                      <p className="text-sm font-bold text-gray-900">{visitor.entryTime}</p>
                      <p className="text-xs text-blue-600 font-medium">In: {visitor.duration}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExit(visitor.id)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    Process Departure
                  </button>
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