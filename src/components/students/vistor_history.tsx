'use client';

import { useState } from 'react';
import {
  Search,
  Calendar,
  Clock,
  User,
  CheckCircle,
  LogOut,
  ChevronDown
} from 'lucide-react';

interface Visit {
  id: string;
  visitorName: string;
  visitorPhoto?: string;
  visitDate: string;
  purpose: string;
  entryTime: string;
  exitTime: string | null;
  status: 'Checked In' | 'Checked Out';
  remarks?: string;
}

const sampleVisits: Visit[] = [];

const allPurposes = [
  'All Purposes',
  'Family Visit',
  'Medical Emergency',
  'Birthday Celebration',
  'Festival Visit',
  'Delivery',
  'Other'
];

export default function VisitorHistory() {
  const [visits] = useState<Visit[]>(sampleVisits);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('All Purposes');

  // Filter visits
  const filteredVisits = visits.filter(visit => {
    const matchesSearch =
      visit.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visit.purpose.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPurpose = selectedPurpose === 'All Purposes' || visit.purpose === selectedPurpose;

    return matchesSearch && matchesPurpose;
  });

  const approvedCount = filteredVisits.length;

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2 tracking-tight">
            Visitor History
          </h1>
          <p className="text-slate-600 text-lg">View your approved visit records</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 mb-6">
          <div className="flex gap-4 items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by visitor name or purpose..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Purpose Filter */}
            <div className="relative w-64">
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full appearance-none px-4 py-3 pr-10 border-2 border-blue-300 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer transition-all hover:border-blue-400"
              >
                {allPurposes.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Header with Count */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">
              Approved Visits ({approvedCount})
            </h2>
          </div>

          {/* Table */}
          {filteredVisits.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="text-left py-4 px-8 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Photo
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Visitor Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Visit Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Entry Time
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Exit Time
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Warden Remarks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredVisits.map((visit) => (
                    <tr
                      key={visit.id}
                      className="hover:bg-blue-50/50 transition-colors duration-150"
                    >
                      {/* Photo */}
                      <td className="py-5 px-8">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center shadow-md">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                      </td>

                      {/* Visitor Name */}
                      <td className="py-5 px-6">
                        <span className="text-slate-800 font-semibold text-base">
                          {visit.visitorName}
                        </span>
                      </td>

                      {/* Visit Date */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">{visit.visitDate}</span>
                        </div>
                      </td>

                      {/* Purpose */}
                      <td className="py-5 px-6">
                        <span className="text-slate-700 font-medium">
                          {visit.purpose}
                        </span>
                      </td>

                      {/* Entry Time */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Clock className="w-4 h-4 text-green-500" />
                          <span className="font-medium">{visit.entryTime}</span>
                        </div>
                      </td>

                      {/* Exit Time */}
                      <td className="py-5 px-6">
                        {visit.exitTime ? (
                          <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-red-500" />
                            <span className="font-medium">{visit.exitTime}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-medium">-</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6">
                        <StatusBadge status={visit.status} />
                      </td>

                      {/* Remarks */}
                      <td className="py-5 px-6">
                        <span className="text-slate-600 text-sm italic">
                          {visit.remarks || 'No remarks'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No visits found
              </h3>
              <p className="text-slate-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {filteredVisits.length > 0 && (
          <div className="grid grid-cols-3 gap-6 mt-6">
            <StatCard
              icon={<CheckCircle className="w-6 h-6" />}
              label="Total Approved Visits"
              value={approvedCount}
              color="blue"
            />
            <StatCard
              icon={<User className="w-6 h-6" />}
              label="Currently Checked In"
              value={filteredVisits.filter(v => v.status === 'Checked In').length}
              color="green"
            />
            <StatCard
              icon={<LogOut className="w-6 h-6" />}
              label="Checked Out"
              value={filteredVisits.filter(v => v.status === 'Checked Out').length}
              color="purple"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: 'Checked In' | 'Checked Out' }) {
  if (status === 'Checked In') {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold border-2 border-green-200 shadow-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
      <LogOut className="w-3.5 h-3.5" />
      {status}
    </span>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'purple';
}) {
  const colorClasses = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-pink-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-shadow">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white mb-4 shadow-md`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
      <div className="text-sm text-slate-600 font-medium">{label}</div>
    </div>
  );
}