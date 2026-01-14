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
  UserPlus,
  X
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// --- Types ---
type ReportType =
  | 'visitor-statistics'
  | 'warden-performance'
  | 'security-report'
  | 'student-wise'
  | 'hostel-wise'
  | 'custom-report';

export interface VisitorStat {
  date: string;
  visitor: string;
  student: string;
  purpose: string;
  entryTime: string;
  exitTime: string;
  duration: string;
  status?: string;
}

export interface WardenPerf {
  name: string;
  hostel: string;
  totalRequests: number;
  approved: number;
  rejected: number;
  approvalRate: string;
  avgResponseTime: string;
}

export interface SecurityEvent {
  timestamp: string;
  visitor: string;
  student: string;
  eventType: string;
  status: 'Normal' | 'Warning' | 'Alert';
  remarks: string;
}

export interface StudentStat {
  studentId: string;
  studentName: string;
  totalVisitors: number;
  uniqueVisitors: number;
  frequency: string;
  lastVisit: string;
}

export interface HostelStat {
  name: string; // Hostel Name
  totalVisitors: number;
  peakTime: string;
  compliance: string;
}

// --- Centralized Data ---
const REPORTS_DATA: {
  visitorStats: VisitorStat[];
  wardenPerf: WardenPerf[];
  securityEvents: SecurityEvent[];
  studentStats: StudentStat[];
  hostelStats: HostelStat[];
} = {
  visitorStats: [
    { date: '2026-01-04', visitor: 'Kiran Sharma', student: 'Rahul Sharma', purpose: 'Family Visit', entryTime: '14:00', exitTime: '17:30', duration: '3 hours', status: 'Completed' },
    { date: '2026-01-05', visitor: 'Dr. Mohan Kumar', student: 'Amit Kumar', purpose: 'Medical Emergency', entryTime: '08:00', exitTime: '17:30', duration: '1 hour', status: 'Completed' },
    // Add more mock data if needed for testing date range
    { date: '2026-01-06', visitor: 'Sunita Devi', student: 'Priya Patel', purpose: 'Parent Meeting', entryTime: '15:30', exitTime: '18:00', duration: '2h 30m', status: 'Completed' },
  ],
  wardenPerf: [
    { name: 'Dr. Suresh Kumar', hostel: 'Krishna Hostel', totalRequests: 156, approved: 142, rejected: 14, approvalRate: '91%', avgResponseTime: '25 min' },
    { name: 'Dr. Meera Singh', hostel: 'Saraswati Hostel', totalRequests: 134, approved: 118, rejected: 16, approvalRate: '88%', avgResponseTime: '18 min' },
    { name: 'Dr. Anil Sharma', hostel: 'Vivekananda Hostel', totalRequests: 98, approved: 89, rejected: 9, approvalRate: '91%', avgResponseTime: '32 min' },
  ],
  securityEvents: [
    { timestamp: 'Jan 06, 02:00 PM', visitor: 'Dr. Mohan Kumar', student: 'Amit Kumar', eventType: 'Entry', status: 'Normal', remarks: 'Verified and allowed' },
    { timestamp: 'Jan 05, 10:15 PM', visitor: 'Kiran Sharma', student: 'Rahul Sharma', eventType: 'Exit', status: 'Normal', remarks: 'On time exit' },
    { timestamp: 'Jan 06, 01:00 AM', visitor: 'Raj Malhotra', student: 'Vikash Gupta', eventType: 'Overstay', status: 'Warning', remarks: 'Exceeded by 45 min' },
    { timestamp: 'Jan 04, 07:30 PM', visitor: 'Unknown Person', student: 'N/A', eventType: 'Denied', status: 'Alert', remarks: 'No valid pass' },
    { timestamp: 'Jan 04, 03:45 PM', visitor: 'Sunita Devi', student: 'Priya Patel', eventType: 'Manual Entry', status: 'Warning', remarks: 'System bypass - emergency' },
  ],
  studentStats: [
    { studentId: 'STU001', studentName: 'Rahul Sharma', totalVisitors: 12, uniqueVisitors: 4, frequency: '3/month', lastVisit: '2026-01-04' },
    { studentId: 'STU002', studentName: 'Priya Patel', totalVisitors: 8, uniqueVisitors: 3, frequency: '2/month', lastVisit: '2026-01-03' },
    { studentId: 'STU003', studentName: 'Amit Kumar', totalVisitors: 5, uniqueVisitors: 2, frequency: '1.5/month', lastVisit: '2026-01-05' },
  ],
  hostelStats: [
    { name: 'Krishna Hostel', totalVisitors: 456, peakTime: '14:00-16:00', compliance: '94%' },
    { name: 'Saraswati Hostel', totalVisitors: 389, peakTime: '15:00-17:00', compliance: '97%' },
    { name: 'Vivekananda Hostel', totalVisitors: 278, peakTime: '14:00-15:00', compliance: '92%' },
  ]
};

// Helper function to export data
const exportData = (data: any[], format: 'pdf' | 'csv' | 'excel', title: string) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  if (format === 'csv') {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (format === 'excel') {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, `${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.xlsx`);
  } else if (format === 'pdf') {
    const doc = new jsPDF();
    doc.text(title, 14, 22);

    // Create headers (keys of the first object)
    const headers = Object.keys(data[0]).map(key =>
      key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
    );
    const rows = data.map(item => Object.values(item));

    autoTable(doc, {
      head: [headers],
      body: rows as any[],
      startY: 30,
    });
    doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`);
  }
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('visitor-statistics');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Filter Data based on date range
  const getFilteredVisitorStats = () => {
    let data = REPORTS_DATA.visitorStats;
    if (dateFrom) data = data.filter(d => d.date >= dateFrom);
    if (dateTo) data = data.filter(d => d.date <= dateTo);
    return data;
  };

  const getFilteredSecurityEvents = () => {
    // Note: Security events mock data uses 'Jan 06, 02:00 PM' format which is hard to compare directly with 'YYYY-MM-DD'
    // For this demonstration, we'll skipping complex parsing and return all data
    // In a real app, use consistent ISO dates. 
    return REPORTS_DATA.securityEvents;
  };

  const getFilteredStudentStats = () => {
    let data = REPORTS_DATA.studentStats;
    if (dateFrom) data = data.filter(d => d.lastVisit >= dateFrom);
    if (dateTo) data = data.filter(d => d.lastVisit <= dateTo);
    return data;
  };

  // Warden and Hostel stats are aggregates, usually calculated from a backend query with dates
  // Here we just return the static aggregate data
  const getFilteredWardenPerf = () => REPORTS_DATA.wardenPerf;
  const getFilteredHostelStats = () => REPORTS_DATA.hostelStats;

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    let data: any[] = [];
    let title = '';

    switch (selectedReport) {
      case 'visitor-statistics':
        data = getFilteredVisitorStats();
        title = 'Visitor Statistics';
        break;
      case 'warden-performance':
        data = getFilteredWardenPerf();
        title = 'Warden Performance';
        break;
      case 'security-report':
        data = getFilteredSecurityEvents();
        title = 'Security Report';
        break;
      case 'student-wise':
        data = getFilteredStudentStats();
        title = 'Student Wise Report';
        break;
      case 'hostel-wise':
        data = getFilteredHostelStats();
        title = 'Hostel Wise Report';
        break;
      default:
        return;
    }

    exportData(data, format, title);
  };

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
                          value={dateFrom}
                          onChange={(e) => setDateFrom(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="From"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          value={dateTo}
                          onChange={(e) => setDateTo(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="To"
                        />
                      </div>
                    </div>
                  </div>

                  {selectedReport === 'hostel-wise' && (
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
                  )}
                </div>

                {/* Export Buttons */}
                {selectedReport !== 'custom-report' && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-medium text-slate-600 mb-3">Export</h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleExport('pdf')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        PDF
                      </button>
                      <button
                        onClick={() => handleExport('excel')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Excel
                      </button>
                      <button
                        onClick={() => handleExport('csv')}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                      >
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
            {selectedReport === 'visitor-statistics' && <VisitorStatistics data={getFilteredVisitorStats()} />}
            {selectedReport === 'warden-performance' && <WardenPerformance data={getFilteredWardenPerf()} />}
            {selectedReport === 'security-report' && <SecurityReport data={getFilteredSecurityEvents()} />}
            {selectedReport === 'student-wise' && <StudentWise data={getFilteredStudentStats()} />}
            {selectedReport === 'hostel-wise' && <HostelWise data={getFilteredHostelStats()} />}
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
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
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
function VisitorStatistics({ data }: { data: VisitorStat[] }) {
  const totalVisits = data.length;
  // Count unique visitors
  const uniqueVisitors = new Set(data.map(d => d.visitor)).size;

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
          value={totalVisits.toString()}
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
          value={uniqueVisitors.toString()}
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
              {data.length > 0 ? (
                data.map((visit, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-sm text-slate-700">{visit.date}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{visit.visitor}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{visit.student}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{visit.purpose}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{visit.entryTime}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{visit.exitTime}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{visit.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-4 text-center text-slate-500">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Warden Performance Component
function WardenPerformance({ data }: { data: WardenPerf[] }) {
  const totalRequests = data.reduce((sum, item) => sum + item.totalRequests, 0);
  const totalApproved = data.reduce((sum, item) => sum + item.approved, 0);
  const totalRejected = data.reduce((sum, item) => sum + item.rejected, 0);
  const avgApprovalRate = totalRequests > 0 ? Math.round((totalApproved / totalRequests) * 100) : 0;

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
          value={totalRequests.toString()}
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6 text-slate-600" />}
          label="Avg Approval Rate"
          value={`${avgApprovalRate}%`}
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
          value={totalRejected.toString()}
        />
      </div>

      {/* Warden Performance Comparison Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-6">Warden Performance Comparison</h3>
        <div className="h-96 flex items-end justify-around gap-8 px-8">
          {data.map((warden) => (
            <WardenBar
              key={warden.name}
              name={warden.name}
              approved={warden.approved}
              rejected={warden.rejected}
              total={warden.totalRequests}
              approvalRate={warden.approvalRate}
            />
          ))}
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
              {data.map((warden, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-700">{warden.name}</td>
                  <td className="py-3 px-4 text-sm text-slate-700">{warden.hostel}</td>
                  <td className="py-3 px-4 text-sm text-slate-700 text-center">{warden.totalRequests}</td>
                  <td className="py-3 px-4 text-sm text-green-600 text-center font-medium">{warden.approved}</td>
                  <td className="py-3 px-4 text-sm text-red-600 text-center font-medium">{warden.rejected}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {warden.approvalRate}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700 text-center">{warden.avgResponseTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Security Report Component

function SecurityReport({ data }: { data: SecurityEvent[] }) {
  const totalEvents = data.length;
  const overstays = data.filter(d => d.eventType === 'Overstay').length;
  const denied = data.filter(d => d.eventType === 'Denied').length;
  const manualEntries = data.filter(d => d.eventType === 'Manual Entry').length;

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
          value={totalEvents.toString()}
        />
        <StatCard
          icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
          label="Overstays"
          value={overstays.toString()}
          bgColor="bg-amber-50"
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-red-500" />}
          label="Denied Entries"
          value={denied.toString()}
          bgColor="bg-red-50"
        />
        <StatCard
          icon={<UserPlus className="w-6 h-6 text-slate-600" />}
          label="Manual Entries"
          value={manualEntries.toString()}
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
              {data.length > 0 ? (
                data.map((event, index) => (
                  <tr key={index} className={`border-b border-slate-100 hover:bg-slate-50 ${event.status === 'Warning' ? 'bg-amber-50' : event.status === 'Alert' ? 'bg-red-50' : ''
                    }`}>
                    <td className="py-3 px-4 text-sm text-slate-700">{event.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{event.visitor}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{event.student}</td>
                    <td className="py-3 px-4 text-sm text-slate-700">{event.eventType}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Normal' ? 'bg-blue-100 text-blue-700' :
                        event.status === 'Warning' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{event.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-slate-500">No events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Student-wise Component
function StudentWise({ data }: { data: StudentStat[] }) {
  const totalStudents = data.length;
  // Calculate average visitors per student (simplified)
  const totalVisitors = data.reduce((acc, curr) => acc + curr.totalVisitors, 0);
  const avgVisitors = totalStudents > 0 ? (totalVisitors / totalStudents).toFixed(1) : "0";

  // Find most active student
  const mostActive = data.reduce((prev, current) => (prev.totalVisitors > current.totalVisitors) ? prev : current, data[0] || { studentName: 'N/A' });

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
          value={totalStudents.toString()}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-slate-600" />}
          label="Avg Visitors/Student"
          value={avgVisitors}
        />
        <StatCard
          icon={<Eye className="w-6 h-6 text-slate-600" />}
          label="Most Active"
          value={mostActive.studentName}
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
              {data.map((student, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm text-slate-700">{student.studentId}</td>
                  <td className="py-3 px-4 text-sm text-slate-700">{student.studentName}</td>
                  <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.totalVisitors}</td>
                  <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.uniqueVisitors}</td>
                  <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.frequency}</td>
                  <td className="py-3 px-4 text-sm text-slate-700 text-center">{student.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Hostel-wise Component
function HostelWise({ data }: { data: HostelStat[] }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Hostel-wise Report</h1>
        <p className="text-slate-600">Visitor statistics per hostel</p>
      </div>

      {/* Hostel Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        {data.map((hostel, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4">{hostel.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Visitors</span>
                <span className="text-lg font-bold text-slate-800">{hostel.totalVisitors}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Peak Time</span>
                <span className="text-sm font-medium text-slate-700">{hostel.peakTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Compliance</span>
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {hostel.compliance}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hostel Comparison Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-6">Hostel Comparison</h3>
        <div className="h-96 flex items-end justify-around gap-16 px-12">
          {data.map((hostel, index) => (
            <HostelBar key={index} name={hostel.name} visitors={hostel.totalVisitors} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Custom Report Component
function CustomReport() {
  const [selectedFields, setSelectedFields] = useState({
    visitorName: true,
    studentName: true,
    hostel: true,
    visitDate: true,
    entryTime: true,
    exitTime: true,
    duration: true,
    purpose: true,
    status: true,
  });

  const [sortBy, setSortBy] = useState('visitDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [exportFormat, setExportFormat] = useState('excel');
  const [showPreview, setShowPreview] = useState(false);
  const [savedConfigs, setSavedConfigs] = useState<any[]>([]);

  // Use centralized mock data for preview
  const sampleData = REPORTS_DATA.visitorStats.map(stat => ({
    visitorName: stat.visitor,
    studentName: stat.student,
    hostel: 'Krishna Hostel', // Mock data as hostel isn't in visitorStats
    visitDate: stat.date,
    entryTime: stat.entryTime,
    exitTime: stat.exitTime,
    duration: stat.duration,
    purpose: stat.purpose,
    status: stat.status,
  }));

  const handleFieldToggle = (field: keyof typeof selectedFields) => {
    setSelectedFields({
      ...selectedFields,
      [field]: !selectedFields[field],
    });
  };

  const handlePreview = () => {
    const selectedCount = Object.values(selectedFields).filter(Boolean).length;
    if (selectedCount === 0) {
      alert('Please select at least one field to preview');
      return;
    }
    setShowPreview(true);
  };

  const handleSaveConfiguration = () => {
    const configName = prompt('Enter a name for this configuration:');
    if (!configName) return;

    const config = {
      id: Date.now(),
      name: configName,
      fields: selectedFields,
      sortBy,
      sortOrder,
      exportFormat,
      savedAt: new Date().toISOString(),
    };

    setSavedConfigs([...savedConfigs, config]);
    alert(`Configuration "${configName}" saved successfully!`);
  };

  const handleExport = async () => {
    const selectedCount = Object.values(selectedFields).filter(Boolean).length;
    if (selectedCount === 0) {
      alert('Please select at least one field to export');
      return;
    }

    // Filter data based on selected fields
    const filteredData = sampleData.map(row => {
      const filtered: any = {};
      Object.keys(selectedFields).forEach(key => {
        if (selectedFields[key as keyof typeof selectedFields]) {
          filtered[key] = row[key as keyof typeof row];
        }
      });
      return filtered;
    });

    if (exportFormat === 'csv') {
      exportToCSV(filteredData);
    } else if (exportFormat === 'excel') {
      exportToExcel(filteredData);
    } else if (exportFormat === 'pdf') {
      exportToPDF(filteredData);
    }
  };

  const exportToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header]}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom-report-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('CSV exported successfully!');
  };

  const exportToExcel = (data: any[]) => {
    const headers = Object.keys(data[0]);
    const tableHTML = `
        <html>
          <head>
            <meta charset="utf-8">
              <style>
                table {border-collapse: collapse; width: 100%; }
                th, td {border: 1px solid #000; padding: 8px; text-align: left; }
                th {background-color: #2563eb; color: white; font-weight: bold; }
              </style>
          </head>
          <body>
            <h2>Custom Visitor Report</h2>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <table>
              <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${data.map(row => `<tr>${headers.map(h => `<td>${row[h]}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </body>
        </html>
        `;

    const blob = new Blob([tableHTML], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `custom-report-${Date.now()}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Excel file exported successfully!');
  };

  const exportToPDF = async (data: any[]) => {
    try {
      const { jsPDF } = await import('jspdf');
      await import('jspdf-autotable');

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('Custom Visitor Report', 14, 20);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
      doc.text(`Total Records: ${data.length}`, 14, 34);

      const headers = Object.keys(data[0]).map(key =>
        key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
      );
      const tableData = data.map(row => Object.values(row)) as any[];

      (doc as any).autoTable({
        startY: 40,
        head: [headers],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 9,
        },
        bodyStyles: {
          fontSize: 8,
        },
        columnStyles: {
          0: { cellWidth: 'auto' },
        },
        margin: { top: 40, left: 10, right: 10 },
      });

      doc.save(`custom-report-${Date.now()}.pdf`);
      alert('PDF exported successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to export PDF. Please try again.');
    }
  };

  const getFieldLabel = (field: string) => {
    return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

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
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.visitorName}
                  onChange={() => handleFieldToggle('visitorName')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Visitor Name</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.studentName}
                  onChange={() => handleFieldToggle('studentName')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Student Name</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.hostel}
                  onChange={() => handleFieldToggle('hostel')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Hostel</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.visitDate}
                  onChange={() => handleFieldToggle('visitDate')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Visit Date</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.entryTime}
                  onChange={() => handleFieldToggle('entryTime')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Entry Time</span>
              </label>
            </div>
          </div>

          <div>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.exitTime}
                  onChange={() => handleFieldToggle('exitTime')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Exit Time</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.duration}
                  onChange={() => handleFieldToggle('duration')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Duration</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.purpose}
                  onChange={() => handleFieldToggle('purpose')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Purpose</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
                <input
                  type="checkbox"
                  checked={selectedFields.status}
                  onChange={() => handleFieldToggle('status')}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">Status</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="visitDate">Visit Date</option>
              <option value="visitorName">Visitor Name</option>
              <option value="duration">Duration</option>
              <option value="studentName">Student Name</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">Sort Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>

        <div className="mt-8">
          <label className="text-sm font-medium text-slate-600 mb-2 block">Export Format</label>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="excel">Excel (.xls)</option>
            <option value="pdf">PDF (.pdf)</option>
            <option value="csv">CSV (.csv)</option>
          </select>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePreview}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
          >
            <Eye className="w-5 h-5" />
            Preview Report
          </button>
          <button
            onClick={handleSaveConfiguration}
            className="px-6 py-3 border-2 border-slate-300 rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            <FileText className="w-5 h-5 inline-block mr-2" />
            Save Configuration
          </button>
          <button
            onClick={handleExport}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30"
          >
            <Download className="w-5 h-5 inline-block mr-2" />
            Export
          </button>
        </div>

        {/* Saved Configurations */}
        {savedConfigs.length > 0 && (
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h4 className="text-sm font-medium text-slate-600 mb-4">Saved Configurations ({savedConfigs.length})</h4>
            <div className="space-y-2">
              {savedConfigs.map((config) => (
                <div
                  key={config.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                >
                  <div>
                    <div className="text-sm font-medium text-slate-800">{config.name}</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Saved on {new Date(config.savedAt).toLocaleDateString()} at {new Date(config.savedAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFields(config.fields);
                      setSortBy(config.sortBy);
                      setSortOrder(config.sortOrder);
                      setExportFormat(config.exportFormat);
                      alert(`Configuration "${config.name}" loaded successfully!`);
                    }}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Load
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-8 py-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Report Preview</h2>
                <p className="text-sm text-slate-600 mt-1">Preview of selected fields ({Object.values(selectedFields).filter(Boolean).length} fields)</p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-white rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-8">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b-2 border-slate-300">
                      {Object.entries(selectedFields).map(([key, value]) =>
                        value && (
                          <th key={key} className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-r border-slate-200 last:border-r-0">
                            {getFieldLabel(key)}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-200 hover:bg-blue-50 transition-colors">
                        {Object.entries(selectedFields).map(([key, value]) =>
                          value && (
                            <td key={key} className="px-4 py-3 text-sm text-slate-700 border-r border-slate-100 last:border-r-0">
                              {row[key as keyof typeof row]}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Preview Information</p>
                    <p className="text-sm text-blue-700 mt-1">
                      This is a preview with sample data ({sampleData.length} records shown). The actual export will include all matching records based on your selected date range and filters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 py-4 border-t border-slate-200 flex gap-3 justify-end bg-slate-50">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2.5 border-2 border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-white transition-colors"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  handleExport();
                }}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 shadow-lg shadow-green-600/30"
              >
                <Download className="w-4 h-4" />
                Export This Report
              </button>
            </div>
          </div>
        </div>
      )}
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