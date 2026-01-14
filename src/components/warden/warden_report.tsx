'use client';

import { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  BarChart3,
  Users,
  AlertTriangle,
  XCircle,
  Download,
  Filter as FilterIcon,
  RotateCcw,
  FileText,
  Clock,
  CheckCircle,
  User
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

type ReportType =
  | 'daily-visitor'
  | 'weekly-summary'
  | 'monthly-statistics'
  | 'student-wise'
  | 'emergency-visit'
  | 'rejected-requests';

interface FilterState {
  startDate: string;
  endDate: string;
  student: string;
  purpose: string;
  exportFormat: 'PDF' | 'Excel' | 'CSV';
}

const students = ['All Students', 'Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Singh'];
const purposes = ['All Purposes', 'Family Visit', 'Birthday Celebration', 'Medical Emergency', 'Other'];

// --- Centralized MOCK DATA ---
const MOCK_DATA = {
  'daily-visitor': [
    { visitorName: 'Suresh Sharma', student: 'Rahul Sharma', purpose: 'Family Visit', time: '10:00', duration: '2 hours', status: 'Pending', date: '2026-01-06' },
    { visitorName: 'Rekha Patel', student: 'Priya Patel', purpose: 'Birthday Celebration', time: '16:00', duration: '4 hours', status: 'Pending', date: '2026-01-06' },
    { visitorName: 'Mohan Lal', student: 'Amit Kumar', purpose: 'Medical Emergency', time: '11:00', duration: '1 hour', status: 'Approved', date: '2026-01-06' }
  ],
  'weekly-summary': [
    { day: 'Monday', total: 8, approved: 7, rejected: 0, pending: 0, date: '2026-01-05' },
    { day: 'Tuesday', total: 7, approved: 6, rejected: 1, pending: 1, date: '2026-01-06' },
    { day: 'Wednesday', total: 6, approved: 5, rejected: 0, pending: 2, date: '2026-01-07' },
    { day: 'Thursday', total: 5, approved: 4, rejected: 1, pending: 0, date: '2026-01-08' },
    { day: 'Friday', total: 9, approved: 8, rejected: 1, pending: 0, date: '2026-01-09' },
    { day: 'Saturday', total: 12, approved: 10, rejected: 1, pending: 1, date: '2026-01-10' },
    { day: 'Sunday', total: 14, approved: 12, rejected: 2, pending: 0, date: '2026-01-11' }
  ],
  'monthly-statistics': [
    { week: 'Week 1 (1-7)', total: 45, approved: 40, rejected: 3, emergency: 2, month: '2026-01' },
    { week: 'Week 2 (8-14)', total: 50, approved: 44, rejected: 4, emergency: 3, month: '2026-01' }
  ],
  'student-wise': [
    { studentName: 'Rahul Sharma', total: 12, unique: 4, frequency: '3/month', lastVisit: '2026-01-04' },
    { studentName: 'Priya Patel', total: 8, unique: 3, frequency: '2/month', lastVisit: '2026-01-03' }
  ],
  'emergency-visit': [
    { date: '2026-01-05', visitor: 'Dr. Mohan Kumar', student: 'Amit Kumar', purpose: 'Medical Emergency', responseTime: '15 min', status: 'Approved' }
  ],
  'rejected-requests': [
    { date: '2026-01-02', student: 'Rahul Sharma', visitor: 'Unknown Person', purpose: 'Other', reason: 'Request denied. Late hours and too many visitors.', status: 'Rejected' },
    { date: '2026-01-06', student: 'Sneha Singh', visitor: 'Salesperson', purpose: 'Other', reason: 'Not allowed.', status: 'Rejected' }
  ]
};

export default function WardenReports() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('daily-visitor');
  const [filters, setFilters] = useState<FilterState>({
    startDate: '2026-01-01',
    endDate: '2026-07-01',
    student: 'All Students',
    purpose: 'All Purposes',
    exportFormat: 'PDF'
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      startDate: '2026-01-01',
      endDate: '2026-07-01',
      student: 'All Students',
      purpose: 'All Purposes',
      exportFormat: 'PDF'
    });
  };

  const getFilteredData = (reportType: ReportType) => {
    const data = MOCK_DATA[reportType];

    // For simplicity, typed as any[] to handle versatile structures
    // In a real app, define proper union types or generic interfaces
    return (data as any[]).filter(item => {
      // Date Filter
      const itemDate = item.date || item.lastVisit; // Fallback for student-wise
      if (itemDate) {
        if (itemDate < filters.startDate || itemDate > filters.endDate) return false;
      }

      // Student Filter
      const itemStudent = item.student || item.studentName;
      if (filters.student !== 'All Students' && itemStudent && itemStudent !== filters.student) return false;

      // Purpose Filter
      if (filters.purpose !== 'All Purposes' && item.purpose && item.purpose !== filters.purpose) return false;

      return true;
    });
  };

  const currentData = getFilteredData(selectedReport);

  const handleExport = () => {
    // Get report type name
    const reportNames = {
      'daily-visitor': 'Daily Visitor Report',
      'weekly-summary': 'Weekly Summary',
      'monthly-statistics': 'Monthly Statistics',
      'student-wise': 'Student-wise History',
      'emergency-visit': 'Emergency Visit Log',
      'rejected-requests': 'Rejected Requests'
    };

    const reportName = reportNames[selectedReport];
    const exportData = currentData; // Use the currently filtered data

    if (exportData.length === 0) {
      alert('No data matches the current filters to export.');
      return;
    }

    // --- PDF EXPORT ---
    if (filters.exportFormat === 'PDF') {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text(reportName, 14, 22);

      // Metadata
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);
      doc.text(`Filters: ${filters.startDate} to ${filters.endDate} | Student: ${filters.student} | Purpose: ${filters.purpose}`, 14, 36);

      // Table
      const headers = Object.keys(exportData[0]).map(key => key.charAt(0).toUpperCase() + key.slice(1));
      const rows = exportData.map(item => Object.values(item));

      autoTable(doc, {
        head: [headers],
        body: rows as any,
        startY: 42,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [41, 128, 185] }
      });

      doc.save(`${reportName.replace(/\s/g, '_')}_${filters.startDate}.pdf`);

      // --- EXCEL EXPORT ---
    } else if (filters.exportFormat === 'Excel') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Report");
      XLSX.writeFile(wb, `${reportName.replace(/\s/g, '_')}_${filters.startDate}.xlsx`);

      // --- CSV EXPORT ---
    } else if (filters.exportFormat === 'CSV') {
      const ws = XLSX.utils.json_to_sheet(exportData);
      const csv = XLSX.utils.sheet_to_csv(ws);

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportName.replace(/\s/g, '_')}_${filters.startDate}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports</h1>
          <p className="text-gray-600">Visitor activity and operational reports</p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
              <select
                value={filters.student}
                onChange={(e) => handleFilterChange('student', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {students.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Purpose</label>
              <select
                value={filters.purpose}
                onChange={(e) => handleFilterChange('purpose', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {purposes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
              <select
                value={filters.exportFormat}
                onChange={(e) => handleFilterChange('exportFormat', e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <FilterIcon className="w-4 h-4" />
              Apply
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Report Type</h2>
              </div>
              <div className="space-y-2">
                <ReportBtn icon={<Calendar className="w-5 h-5" />} title="Daily Visitor Report" subtitle="Visitors for selected date" active={selectedReport === 'daily-visitor'} onClick={() => setSelectedReport('daily-visitor')} />
                <ReportBtn icon={<TrendingUp className="w-5 h-5" />} title="Weekly Summary" subtitle="Aggregated weekly data" active={selectedReport === 'weekly-summary'} onClick={() => setSelectedReport('weekly-summary')} />
                <ReportBtn icon={<BarChart3 className="w-5 h-5" />} title="Monthly Statistics" subtitle="Monthly visitor counts" active={selectedReport === 'monthly-statistics'} onClick={() => setSelectedReport('monthly-statistics')} />
                <ReportBtn icon={<Users className="w-5 h-5" />} title="Student-wise History" subtitle="Visitor history per student" active={selectedReport === 'student-wise'} onClick={() => setSelectedReport('student-wise')} />
                <ReportBtn icon={<AlertTriangle className="w-5 h-5" />} title="Emergency Visit Log" subtitle="Emergency visit records" active={selectedReport === 'emergency-visit'} onClick={() => setSelectedReport('emergency-visit')} />
                <ReportBtn icon={<XCircle className="w-5 h-5" />} title="Rejected Requests" subtitle="Rejected visit requests" active={selectedReport === 'rejected-requests'} onClick={() => setSelectedReport('rejected-requests')} />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-end mb-6">
              <button onClick={handleExport} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold shadow-lg">
                <Download className="w-5 h-5" />
                Export {filters.exportFormat}
              </button>
            </div>

            <ReportContent reportType={selectedReport} data={currentData} />

          </main>
        </div>
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function ReportBtn({ icon, title, subtitle, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full text-left p-4 rounded-lg transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className={active ? 'text-white' : 'text-gray-600'}>{icon}</div>
        <div>
          <div className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-900'}`}>{title}</div>
          <div className={`text-xs mt-0.5 ${active ? 'text-blue-100' : 'text-gray-500'}`}>{subtitle}</div>
        </div>
      </div>
    </button>
  );
}

function StatCard({ icon, label, value, bgColor }: any) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-gray-600 text-sm mb-2">{label}</div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
        <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center text-white`}>{icon}</div>
      </div>
    </div>
  );
}

function ReportContent({ reportType, data }: { reportType: ReportType, data: any[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-500">
        <FilterIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No Records Found</h3>
        <p>Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  // --- Daily Report View ---
  if (reportType === 'daily-visitor') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={<Users className="w-6 h-6" />} label="Total Records" value={data.length} bgColor="bg-blue-500" />
          <StatCard icon={<CheckCircle className="w-6 h-6" />} label="Approved" value={data.filter(i => i.status === 'Approved').length} bgColor="bg-green-600" />
          <StatCard icon={<Clock className="w-6 h-6" />} label="Pending" value={data.filter(i => i.status === 'Pending').length} bgColor="bg-yellow-500" />
          <StatCard icon={<AlertTriangle className="w-6 h-6" />} label="Emergency" value={data.filter(i => i.purpose === 'Medical Emergency').length} bgColor="bg-red-500" />
        </div>
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Filtered Visitor Details</h3></div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Visitor Name</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Student</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Purpose</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Time</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Duration</th><th className="text-left py-3 px-6 text-xs font-medium text-gray-600 uppercase">Status</th></tr></thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4 px-6 text-sm">{item.visitorName}</td>
                  <td className="py-4 px-6 text-sm">{item.student}</td>
                  <td className="py-4 px-6 text-sm">{item.purpose}</td>
                  <td className="py-4 px-6 text-sm">{item.time}</td>
                  <td className="py-4 px-6 text-sm">{item.duration}</td>
                  <td className="py-4 px-6"><span className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${item.status === 'Approved' ? 'bg-green-600' : 'bg-yellow-500'}`}>{item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // --- Weekly Report View ---
  if (reportType === 'weekly-summary') {
    return (
      <div className="space-y-6">
        {/* Summary Stats Omitted for Brevity in this View Mode, using Table Primarily */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Weekly Summary</h3></div>
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-6 text-xs uppercase">Day</th>
                <th className="text-left py-3 px-6 text-xs uppercase">Date</th>
                <th className="text-left py-3 px-6 text-xs uppercase">Total Visitors</th>
                <th className="text-left py-3 px-6 text-xs uppercase">Approved</th>
                <th className="text-left py-3 px-6 text-xs uppercase">Rejected</th>
                <th className="text-left py-3 px-6 text-xs uppercase">Pending</th>
              </tr>
            </thead>
            <tbody>
              {data.map((x, i) => (
                <tr key={i} className="border-b">
                  <td className="py-4 px-6 text-sm font-medium">{x.day}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{x.date}</td>
                  <td className="py-4 px-6 text-sm">{x.total}</td>
                  <td className="py-4 px-6 text-sm text-green-600 font-medium">{x.approved}</td>
                  <td className="py-4 px-6 text-sm text-red-600 font-medium">{x.rejected}</td>
                  <td className="py-4 px-6 text-sm text-yellow-600 font-medium">{x.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // --- Monthly Report View ---
  if (reportType === 'monthly-statistics') {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Monthly Statistics</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Week</th><th className="text-left py-3 px-6 text-xs uppercase">Total</th><th className="text-left py-3 px-6 text-xs uppercase">Approved</th><th className="text-left py-3 px-6 text-xs uppercase">Rejected</th><th className="text-left py-3 px-6 text-xs uppercase">Emergency</th></tr></thead>
          <tbody>
            {data.map((x, i) => <tr key={i} className="border-b"><td className="py-4 px-6 text-sm font-medium">{x.week}</td><td className="py-4 px-6 text-sm">{x.total}</td><td className="py-4 px-6 text-sm text-green-600 font-medium">{x.approved}</td><td className="py-4 px-6 text-sm text-red-600 font-medium">{x.rejected}</td><td className="py-4 px-6 text-sm text-orange-600 font-medium">{x.emergency}</td></tr>)}
          </tbody>
        </table>
      </div>
    );
  }

  // --- Student Wise ---
  if (reportType === 'student-wise') {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Student-wise Visitor History</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Student Name</th><th className="text-left py-3 px-6 text-xs uppercase">Total</th><th className="text-left py-3 px-6 text-xs uppercase">Unique</th><th className="text-left py-3 px-6 text-xs uppercase">Frequency</th><th className="text-left py-3 px-6 text-xs uppercase">Last Visit</th></tr></thead>
          <tbody>
            {data.map((x, i) => <tr key={i} className="border-b"><td className="py-4 px-6 text-sm font-medium">{x.studentName}</td><td className="py-4 px-6 text-sm">{x.total}</td><td className="py-4 px-6 text-sm">{x.unique}</td><td className="py-4 px-6 text-sm">{x.frequency}</td><td className="py-4 px-6 text-sm">{x.lastVisit}</td></tr>)}
          </tbody>
        </table>
      </div>
    );
  }

  // --- Emergency Report ---
  if (reportType === 'emergency-visit') {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Emergency Visit Log</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Date</th><th className="text-left py-3 px-6 text-xs uppercase">Visitor</th><th className="text-left py-3 px-6 text-xs uppercase">Student</th><th className="text-left py-3 px-6 text-xs uppercase">Purpose</th><th className="text-left py-3 px-6 text-xs uppercase">Response</th><th className="text-left py-3 px-6 text-xs uppercase">Status</th></tr></thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b"><td className="py-4 px-6 text-sm">{item.date}</td><td className="py-4 px-6 text-sm">{item.visitor}</td><td className="py-4 px-6 text-sm">{item.student}</td><td className="py-4 px-6"><div className="flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-red-500" /><span className="text-sm">{item.purpose}</span></div></td><td className="py-4 px-6 text-sm">{item.responseTime}</td><td className="py-4 px-6"><span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">{item.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // --- Rejected Report ---
  if (reportType === 'rejected-requests') {
    return (
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b"><h3 className="text-lg font-semibold">Rejected Requests Report</h3></div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left py-3 px-6 text-xs uppercase">Date</th><th className="text-left py-3 px-6 text-xs uppercase">Student</th><th className="text-left py-3 px-6 text-xs uppercase">Visitor</th><th className="text-left py-3 px-6 text-xs uppercase">Purpose</th><th className="text-left py-3 px-6 text-xs uppercase">Reason</th><th className="text-left py-3 px-6 text-xs uppercase">Status</th></tr></thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b bg-red-50"><td className="py-4 px-6 text-sm">{item.date}</td><td className="py-4 px-6 text-sm">{item.student}</td><td className="py-4 px-6 text-sm">{item.visitor}</td><td className="py-4 px-6 text-sm">{item.purpose}</td><td className="py-4 px-6 text-sm text-red-700">{item.reason}</td><td className="py-4 px-6"><span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">{item.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}