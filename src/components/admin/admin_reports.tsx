'use client';

import { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Eye,
  Shield,
  UserCheck,
  Building2,
  Filter,
  Calendar,
  Download,
  FileText,
  AlertTriangle,
  XCircle,
  UserPlus
} from 'lucide-react';

type ReportType = 
  | 'visitor-statistics' 
  | 'warden-performance' 
  | 'security-report'
  | 'student-wise'
  | 'hostel-wise'
  | 'custom-report';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('visitor-statistics');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[1600px] mx-auto p-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Report Selection */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Select Report Section */}
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-slate-800 text-lg mb-4">Select Report</h3>
                
                <div className="space-y-2">
                  <ReportCard
                    icon={<Users className="w-5 h-5" />}
                    title="Visitor Statistics"
                    isActive={selectedReport === 'visitor-statistics'}
                    onClick={() => setSelectedReport('visitor-statistics')}
                  />
                  <ReportCard
                    icon={<UserCheck className="w-5 h-5" />}
                    title="Warden Performance"
                    isActive={selectedReport === 'warden-performance'}
                    onClick={() => setSelectedReport('warden-performance')}
                  />
                  <ReportCard
                    icon={<Shield className="w-5 h-5" />}
                    title="Security Report"
                    isActive={selectedReport === 'security-report'}
                    onClick={() => setSelectedReport('security-report')}
                  />
                  <ReportCard
                    icon={<Users className="w-5 h-5" />}
                    title="Student-wise"
                    isActive={selectedReport === 'student-wise'}
                    onClick={() => setSelectedReport('student-wise')}
                  />
                  <ReportCard
                    icon={<Building2 className="w-5 h-5" />}
                    title="Hostel-wise"
                    isActive={selectedReport === 'hostel-wise'}
                    onClick={() => setSelectedReport('hostel-wise')}
                  />
                  <ReportCard
                    icon={<Filter className="w-5 h-5" />}
                    title="Custom Report"
                    isActive={selectedReport === 'custom-report'}
                    onClick={() => setSelectedReport('custom-report')}
                  />
                </div>
              </div>

              {/* Filters Section */}
              <div className="p-6">
                <h3 className="font-bold text-slate-800 mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                      Date Range
                    </label>
                    <div className="space-y-2">
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="From"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="To"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600 mb-2 block">
                      Hostel
                    </label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All Hostels</option>
                      <option>Krishna Hostel</option>
                      <option>Saraswati Hostel</option>
                      <option>Vivekananda Hostel</option>
                    </select>
                  </div>
                </div>

                {/* Export Buttons */}
                {selectedReport !== 'custom-report' && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-medium text-slate-600 mb-3">Export</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <FileText className="w-4 h-4" />
                        PDF
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Excel
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download className="w-4 h-4" />
                        CSV
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {selectedReport === 'visitor-statistics' && <VisitorStatistics />}
            {selectedReport === 'warden-performance' && <WardenPerformance />}
            {selectedReport === 'security-report' && <SecurityReport />}
            {selectedReport === 'student-wise' && <StudentWise />}
            {selectedReport === 'hostel-wise' && <HostelWise />}
            {selectedReport === 'custom-report' && <CustomReport />}
          </main>
        </div>
      </div>
    </div>
  );
}

// Report Selection Card Component
function ReportCard({ 
  icon, 
  title, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  isActive: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
          : 'text-slate-600 hover:bg-slate-50'
      }`}
    >
      {icon}
      <span className="font-medium text-sm">{title}</span>
    </button>
  );
}

// Visitor Statistics Component
function VisitorStatistics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Reports & Analytics</h1>
        <p className="text-slate-600">Operational insights and compliance monitoring</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-slate-600" />}
          label="Total Visits"
          value="1,247"
          change="+12% from last month"
          subChange="↑ 12% from last week"
          changePositive
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-slate-600" />}
          label="Avg Duration"
          value="2h 15m"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-slate-600" />}
          label="Peak Hours"
          value="2-4 PM"
        />
        <StatCard
          icon={<Eye className="w-6 h-6 text-slate-600" />}
          label="Frequent Visitors"
          value="89"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Visitor Trend Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Visitor Trend</h3>
          <div className="h-64 relative">
            <svg viewBox="0 0 600 200" className="w-full h-full">
              {/* X-axis labels */}
              <text x="50" y="195" className="text-xs fill-slate-400">Jan 1</text>
              <text x="150" y="195" className="text-xs fill-slate-400">Jan 2</text>
              <text x="250" y="195" className="text-xs fill-slate-400">Jan 3</text>
              <text x="350" y="195" className="text-xs fill-slate-400">Jan 4</text>
              <text x="450" y="195" className="text-xs fill-slate-400">Jan 5</text>
              <text x="550" y="195" className="text-xs fill-slate-400">Jan 6</text>
              
              {/* Y-axis labels */}
              <text x="10" y="160" className="text-xs fill-slate-400">15</text>
              <text x="10" y="120" className="text-xs fill-slate-400">30</text>
              <text x="10" y="80" className="text-xs fill-slate-400">45</text>
              <text x="10" y="40" className="text-xs fill-slate-400">60</text>
              
              {/* Area chart */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f87171" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {/* Green area */}
              <path
                d="M 40 100 L 100 120 L 160 110 L 220 60 L 280 50 L 340 65 L 400 55 L 460 70 L 520 60 L 580 75 L 580 180 L 40 180 Z"
                fill="url(#areaGradient)"
              />
              
              {/* Pink/Red stroke on top */}
              <path
                d="M 40 90 L 100 110 L 160 100 L 220 50 L 280 45 L 340 55 L 400 50 L 460 65 L 520 55 L 580 70"
                fill="none"
                stroke="url(#strokeGradient)"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* Request Status Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Request Status</h3>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {/* Approved - 79% (green) */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="40"
                  strokeDasharray="396 396"
                  strokeDashoffset="0"
                />
                {/* Pending - 12% (yellow) - starting at 79% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="40"
                  strokeDasharray="60 396"
                  strokeDashoffset="-313"
                />
                {/* Rejected - 9% (red) - starting at 91% */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="40"
                  strokeDasharray="45 396"
                  strokeDashoffset="-373"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">79%</div>
                  <div className="text-xs text-slate-500">Approved</div>
                </div>
              </div>
            </div>
            <div className="ml-8 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-slate-600">Approved 79%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-sm text-slate-600">Pending 12%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-slate-600">Rejected 9%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Visit Purpose Distribution */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Visit Purpose Distribution</h3>
          <div className="space-y-3">
            <PurposeBar label="Family Visit" percentage={75} color="bg-blue-600" />
            <PurposeBar label="Medical" percentage={30} color="bg-blue-600" />
            <PurposeBar label="Birthday" percentage={25} color="bg-blue-600" />
            <PurposeBar label="Delivery" percentage={15} color="bg-blue-600" />
            <PurposeBar label="Other" percentage={10} color="bg-blue-600" />
          </div>
        </div>

        {/* Hourly Distribution */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Hourly Distribution</h3>
          <div className="h-48 flex items-end justify-between gap-2">
            <HourBar height={20} label="8AM" />
            <HourBar height={45} label="10AM" />
            <HourBar height={60} label="12PM" />
            <HourBar height={80} label="2PM" />
            <HourBar height={90} label="4PM" />
            <HourBar height={65} label="6PM" />
            <HourBar height={25} label="8PM" />
          </div>
        </div>
      </div>

      {/* Recent Visits Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Recent Visits</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Visitor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Purpose</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Entry Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Exit Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">2026-01-04</td>
                <td className="py-3 px-4 text-sm text-slate-700">Kiran Sharma</td>
                <td className="py-3 px-4 text-sm text-slate-700">Rahul Sharma</td>
                <td className="py-3 px-4 text-sm text-slate-700">Family Visit</td>
                <td className="py-3 px-4 text-sm text-slate-700">14:00</td>
                <td className="py-3 px-4 text-sm text-slate-700">17:30</td>
                <td className="py-3 px-4 text-sm text-slate-700">3 hours</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">2026-01-05</td>
                <td className="py-3 px-4 text-sm text-slate-700">Dr. Mohan Kumar</td>
                <td className="py-3 px-4 text-sm text-slate-700">Amit Kumar</td>
                <td className="py-3 px-4 text-sm text-slate-700">Medical Emergency</td>
                <td className="py-3 px-4 text-sm text-slate-700">08:00</td>
                <td className="py-3 px-4 text-sm text-slate-700">17:30</td>
                <td className="py-3 px-4 text-sm text-slate-700">1 hour</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Warden Performance Component
function WardenPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Warden Performance</h1>
        <p className="text-slate-600">Performance metrics and comparison</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={<FileText className="w-6 h-6 text-slate-600" />}
          label="Total Requests"
          value="388"
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6 text-slate-600" />}
          label="Avg Approval Rate"
          value="90%"
          change="↑ 2% from last week"
          changePositive
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-slate-600" />}
          label="Avg Response Time"
          value="25 min"
          change="-5 min improvement"
          subChange="↑ 5% from last week"
          changePositive
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-slate-600" />}
          label="Rejections"
          value="39"
        />
      </div>

      {/* Warden Performance Comparison Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-6">Warden Performance Comparison</h3>
        <div className="h-96 flex items-end justify-around gap-8 px-8">
          <WardenBar 
            name="Dr. Suresh Kumar" 
            approved={145} 
            rejected={11} 
            total={156}
            approvalRate="91%"
          />
          <WardenBar 
            name="Dr. Meera Singh" 
            approved={118} 
            rejected={16} 
            total={134}
            approvalRate="88%"
          />
          <WardenBar 
            name="Dr. Anil Sharma" 
            approved={89} 
            rejected={9} 
            total={98}
            approvalRate="91%"
          />
        </div>
        <div className="flex items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-slate-600">Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-500"></div>
            <span className="text-sm text-slate-600">Rejected</span>
          </div>
        </div>
      </div>

      {/* Detailed Performance Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Detailed Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Warden Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Hostel</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Total Requests</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Approved</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Rejected</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Approval Rate</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Avg Response Time</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Dr. Suresh Kumar</td>
                <td className="py-3 px-4 text-sm text-slate-700">Krishna Hostel</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">156</td>
                <td className="py-3 px-4 text-sm text-green-600 text-center font-medium">142</td>
                <td className="py-3 px-4 text-sm text-red-600 text-center font-medium">14</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    91%
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">25 min</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Dr. Meera Singh</td>
                <td className="py-3 px-4 text-sm text-slate-700">Saraswati Hostel</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">134</td>
                <td className="py-3 px-4 text-sm text-green-600 text-center font-medium">118</td>
                <td className="py-3 px-4 text-sm text-red-600 text-center font-medium">16</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    88%
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">18 min</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Dr. Anil Sharma</td>
                <td className="py-3 px-4 text-sm text-slate-700">Vivekananda Hostel</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">98</td>
                <td className="py-3 px-4 text-sm text-green-600 text-center font-medium">89</td>
                <td className="py-3 px-4 text-sm text-red-600 text-center font-medium">9</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    91%
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">32 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Security Report Component
function SecurityReport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Security Report</h1>
        <p className="text-slate-600">Entry/Exit logs, overstays, and security alerts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          icon={<Shield className="w-6 h-6 text-slate-600" />}
          label="Total Events"
          value="234"
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
          label="Overstays"
          value="12"
          bgColor="bg-amber-50"
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-red-500" />}
          label="Denied Entries"
          value="8"
          bgColor="bg-red-50"
        />
        <StatCard
          icon={<UserPlus className="w-6 h-6 text-slate-600" />}
          label="Manual Entries"
          value="5"
        />
      </div>

      {/* Security Events Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Security Events</h3>
        <p className="text-sm text-slate-600 mb-4">Entry/Exit logs, overstays, and security alerts</p>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Visitor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Event Type</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Jan 06, 02:00 PM</td>
                <td className="py-3 px-4 text-sm text-slate-700">Dr. Mohan Kumar</td>
                <td className="py-3 px-4 text-sm text-slate-700">Amit Kumar</td>
                <td className="py-3 px-4 text-sm text-slate-700">Entry</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Normal
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">Verified and allowed</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">Jan 05, 10:15 PM</td>
                <td className="py-3 px-4 text-sm text-slate-700">Kiran Sharma</td>
                <td className="py-3 px-4 text-sm text-slate-700">Rahul Sharma</td>
                <td className="py-3 px-4 text-sm text-slate-700">Exit</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Normal
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">On time exit</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-amber-50">
                <td className="py-3 px-4 text-sm text-slate-700">Jan 06, 01:00 AM</td>
                <td className="py-3 px-4 text-sm text-slate-700">Raj Malhotra</td>
                <td className="py-3 px-4 text-sm text-slate-700">Vikash Gupta</td>
                <td className="py-3 px-4 text-sm text-slate-700">Overstay</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    Warning
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">Exceeded by 45 min</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-red-50">
                <td className="py-3 px-4 text-sm text-slate-700">Jan 04, 07:30 PM</td>
                <td className="py-3 px-4 text-sm text-slate-700">Unknown Person</td>
                <td className="py-3 px-4 text-sm text-slate-700">N/A</td>
                <td className="py-3 px-4 text-sm text-slate-700">Denied</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Alert
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">No valid pass</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50 bg-amber-50">
                <td className="py-3 px-4 text-sm text-slate-700">Jan 04, 03:45 PM</td>
                <td className="py-3 px-4 text-sm text-slate-700">Sunita Devi</td>
                <td className="py-3 px-4 text-sm text-slate-700">Priya Patel</td>
                <td className="py-3 px-4 text-sm text-slate-700">Manual Entry</td>
                <td className="py-3 px-4 text-center">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    Warning
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">System bypass - emergency</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Student-wise Component
function StudentWise() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Student-wise Report</h1>
        <p className="text-slate-600">Visitor statistics per student</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6 text-slate-600" />}
          label="Active Students"
          value="485"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-slate-600" />}
          label="Avg Visitors/Student"
          value="2.5"
        />
        <StatCard
          icon={<Eye className="w-6 h-6 text-slate-600" />}
          label="Most Active"
          value="Rahul S."
        />
      </div>

      {/* Student Visitor Statistics Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Student Visitor Statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Student Name</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Total Visitors</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Unique Visitors</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Frequency</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">STU001</td>
                <td className="py-3 px-4 text-sm text-slate-700">Rahul Sharma</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">12</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">4</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">3/month</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">2026-01-04</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">STU002</td>
                <td className="py-3 px-4 text-sm text-slate-700">Priya Patel</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">8</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">3</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">2/month</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">2026-01-03</td>
              </tr>
              <tr className="border-b border-slate-100 hover:bg-slate-50">
                <td className="py-3 px-4 text-sm text-slate-700">STU003</td>
                <td className="py-3 px-4 text-sm text-slate-700">Amit Kumar</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">5</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">2</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">1.5/month</td>
                <td className="py-3 px-4 text-sm text-slate-700 text-center">2026-01-05</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Hostel-wise Component
function HostelWise() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Hostel-wise Report</h1>
        <p className="text-slate-600">Visitor statistics per hostel</p>
      </div>

      {/* Hostel Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Krishna Hostel</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Visitors</span>
              <span className="text-lg font-bold text-slate-800">456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Peak Time</span>
              <span className="text-sm font-medium text-slate-700">14:00-16:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Compliance</span>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                94%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Saraswati Hostel</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Visitors</span>
              <span className="text-lg font-bold text-slate-800">389</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Peak Time</span>
              <span className="text-sm font-medium text-slate-700">15:00-17:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Compliance</span>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                97%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Vivekananda Hostel</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Visitors</span>
              <span className="text-lg font-bold text-slate-800">278</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Peak Time</span>
              <span className="text-sm font-medium text-slate-700">14:00-15:00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Compliance</span>
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                92%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hostel Comparison Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-6">Hostel Comparison</h3>
        <div className="h-96 flex items-end justify-around gap-16 px-12">
          <HostelBar name="Krishna Hostel" visitors={456} />
          <HostelBar name="Saraswati Hostel" visitors={389} />
          <HostelBar name="Vivekananda Hostel" visitors={278} />
        </div>
      </div>
    </div>
  );
}

// Custom Report Component
function CustomReport() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Custom Report Builder</h1>
        <p className="text-slate-600">Build your own report by selecting fields and filters</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Select Fields</h3>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Visitor Name</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Student Name</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Hostel</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Visit Date</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Entry Time</span>
              </label>
            </div>
          </div>

          <div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Exit Time</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Duration</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Purpose</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-slate-700">Status</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">Sort By</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Visit Date</option>
              <option>Visitor Name</option>
              <option>Duration</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">Sort Order</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Descending</option>
              <option>Ascending</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <label className="text-sm font-medium text-slate-600 mb-2 block">Export Format</label>
          <select className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Excel</option>
            <option>PDF</option>
            <option>CSV</option>
          </select>
        </div>

        <div className="flex gap-4 mt-8">
          <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors">
            <Eye className="w-5 h-5" />
            Preview Report
          </button>
          <button className="px-6 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            <FileText className="w-5 h-5 inline-block mr-2" />
            Save Configuration
          </button>
          <button className="px-6 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition-colors">
            <Download className="w-5 h-5 inline-block mr-2" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ 
  icon, 
  label, 
  value, 
  change, 
  subChange, 
  changePositive,
  bgColor = "bg-white"
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  change?: string;
  subChange?: string;
  changePositive?: boolean;
  bgColor?: string;
}) {
  return (
    <div className={`${bgColor} rounded-2xl shadow-lg border border-slate-200 p-6`}>
      <div className="flex items-start justify-between mb-3">
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
      <div className="text-sm text-slate-600 mb-2">{label}</div>
      {change && (
        <div className={`text-xs ${changePositive ? 'text-green-600' : 'text-slate-500'}`}>
          {change}
        </div>
      )}
      {subChange && (
        <div className={`text-xs ${changePositive ? 'text-green-600' : 'text-slate-500'}`}>
          {subChange}
        </div>
      )}
    </div>
  );
}

function PurposeBar({ label, percentage, color }: { label: string; percentage: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm text-slate-600">{label}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-8">
        <div
          className={`${color} h-8 rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function HourBar({ height, label }: { height: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-12 bg-green-500 rounded-t-lg transition-all duration-300"
        style={{ height: `${height}%` }}
      ></div>
      <span className="text-xs text-slate-600">{label}</span>
    </div>
  );
}

function WardenBar({ 
  name, 
  approved, 
  rejected, 
  total,
  approvalRate 
}: { 
  name: string; 
  approved: number; 
  rejected: number; 
  total: number;
  approvalRate: string;
}) {
  const approvedHeight = (approved / 160) * 100;
  const rejectedHeight = (rejected / 160) * 100;

  return (
    <div className="flex flex-col items-center gap-3 flex-1 relative group">
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-10">
        <div className="font-medium">{name}</div>
        <div className="text-xs">Approved: {approved}</div>
        <div className="text-xs">Rejected: {rejected}</div>
      </div>
      <div className="flex flex-col items-center gap-1 w-full">
        <div
          className="w-full bg-green-500 rounded-t-lg transition-all duration-300"
          style={{ height: `${approvedHeight * 2}px`, minHeight: '10px' }}
        ></div>
        <div
          className="w-full bg-red-500 transition-all duration-300"
          style={{ height: `${rejectedHeight * 3}px`, minHeight: '10px' }}
        ></div>
      </div>
      <div className="text-center">
        <div className="text-xs font-medium text-slate-700 mb-1">{name}</div>
        <div className="text-xs text-slate-500">Total: {total}</div>
        <div className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium mt-1">
          {approvalRate}
        </div>
      </div>
    </div>
  );
}

function HostelBar({ name, visitors }: { name: string; visitors: number }) {
  const height = (visitors / 500) * 100;

  return (
    <div className="flex flex-col items-center gap-3 flex-1 relative group">
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-10">
        <div>Total Visitors: {visitors}</div>
      </div>
      <div
        className="w-full bg-blue-600 rounded-t-lg transition-all duration-300"
        style={{ height: `${height * 3}px`, minHeight: '50px' }}
      ></div>
      <div className="text-center">
        <div className="text-sm font-medium text-slate-700">{name}</div>
      </div>
    </div>
  );
}